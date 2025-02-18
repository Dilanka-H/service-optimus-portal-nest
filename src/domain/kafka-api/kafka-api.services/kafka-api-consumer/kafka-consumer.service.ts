import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import { XMLParser } from "fast-xml-parser";
import { Model } from 'mongoose';
import { STATUS_INIT, STATUS_QUEUE, TIMEZONE_THAI } from 'src/common/constants';
import { IMasterCustomerCondition, IMasterCustomerSetParams, IOptimusJobListCondition, IOptimusJobListSetParams, IOptimusOmniOrderCondition, IOptimusOmniOrderSetParams, IOptimusOrderCondition, IOptimusOrderSetParams } from 'src/common/interfaces/database_domain.interface';
import { getFormattedDateYYYYMMDD, mapValues } from 'src/common/utils';
import { KafkaConfiguration } from 'src/config/kafka.config';
import { MongoService } from 'src/database/mongo/mongo.service';
import { MasterCustomers, MasterCustomersDocument } from 'src/database/mongo/schema/master_customers.schema';
import { ItemsList, OptimusJobLists, OptimusJobListsDocument } from 'src/database/mongo/schema/optimusjoblists.shema';
import { OptimusOmniOrders, OptimusOmniOrdersDocument } from 'src/database/mongo/schema/optimusomniorders.schema';
import { OptimusOrders, OptimusOrdersDocument } from 'src/database/mongo/schema/optimusorders.schema';
import { OptimusJobListsService } from 'src/database/mongo/services/optimusjoblists.service';
import { KafkaConsumerService } from 'src/jobs/kafka/kafka.consumer';
import { KafkaConsumerDto } from '../../dto/kafka-consumer.dto';
import { IKafkaConsumerResponse } from './interfaces';

dayjs.extend(timezone);

const topics = ['sap.proxy.trackingStatusUpdated', 'sap.BusinessPartner.Replicate.Out'];
const validBPGroups = ["Z001","Z002"]
const trackingCarrierMap =  {
    "วันทูวัน": "One To One",
    "เคอรี่": "Kerry",
    "แพนไทย": "Panthai",
    "โกลบอล เจท": "JnT",
    "One To One": "One To One",
    "Kerry": "Kerry",
    "Panthai": "Panthai",
    "JnT": "JnT",
}

@Injectable()
export class KafkaApiConsumerService {
    private xmlParser = new XMLParser()
    constructor(
        @InjectModel(OptimusOrders.name) private OptimusOrdersModel: Model<OptimusOrdersDocument>,
        @InjectModel(OptimusOmniOrders.name) private OptimusOmniOrdersModel: Model<OptimusOmniOrdersDocument>,
        @InjectModel(OptimusJobLists.name) private OptimusJobListsModel: Model<OptimusJobListsDocument>,
        @InjectModel(MasterCustomers.name) private MasterCustomersModel: Model<MasterCustomersDocument>,
        private kafkaService: KafkaConsumerService,
        private kafkaConfig: KafkaConfiguration,
        private mongoService: MongoService,
        private optimusJobListsService: OptimusJobListsService
    ){}
    async kafkaConsumer(kafkaConsumerDto: KafkaConsumerDto): Promise<IKafkaConsumerResponse> {
        const response = new IKafkaConsumerResponse()
        const conditionOptimusOrder: IOptimusOrderCondition = {}
        const conditionOptimusOmniOrder: IOptimusOmniOrderCondition = {}
        const setParamsOptimusOrder: IOptimusOrderSetParams = {}
        const setParamsOptimusOmniOrder: IOptimusOmniOrderSetParams = {}
        if (kafkaConsumerDto.start) {
            response.result = await this.kafkaService.createConsumer(this.kafkaConfig, topics, async (message) => {
                console.log('Processing message:', message.topic, message.offset);
                if (message.topic === "sap.proxy.trackingStatusUpdated") {
                    // this.logKafka(request, message.value.toString(), null);
                    const jsonContent = JSON.parse(message.value.toString());
                    if (jsonContent.body.Item && jsonContent.body.Item.length > 0) {
                        const carrierName = mapValues(trackingCarrierMap, jsonContent.body.CarrierName);
                        conditionOptimusOrder.orderNo = jsonContent.body.Item[0].CustomerReference
                        conditionOptimusOrder.orderStatus = STATUS_INIT
                        conditionOptimusOmniOrder.orderNo = jsonContent.body.Item[0].CustomerReference
                        conditionOptimusOmniOrder.orderStatus = STATUS_INIT
                        setParamsOptimusOrder.trackingNo = jsonContent.body.CarrierTrackingNumber
                        setParamsOptimusOrder.forwarderName = carrierName
                        setParamsOptimusOrder.modifyDateTime = dayjs.tz(Date.now(), TIMEZONE_THAI).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                        const result = await this.mongoService.updateEncryptedDocuments(this.OptimusOrdersModel, conditionOptimusOrder, setParamsOptimusOrder);
                        if (result.matchedCount === 1) {
                            this.optimusOrdersFlow(conditionOptimusOrder);
                        } else if (result.matchedCount === 0) {
                            setParamsOptimusOmniOrder.orderStatus = STATUS_QUEUE
                            setParamsOptimusOmniOrder['letter.trackingNo'] = jsonContent.body.CarrierTrackingNumber
                            setParamsOptimusOmniOrder['letter.forwarderName'] = carrierName
                            this.mongoService.updateEncryptedDocuments(this.OptimusOmniOrdersModel, conditionOptimusOmniOrder, setParamsOptimusOmniOrder);
                        }
                    }
                } else if (message.topic === "sap.BusinessPartner.Replicate.Out") {
                    const result = this.xmlParser.parse(message.value.toString());
                    const setParamsMasterCustomer: IMasterCustomerSetParams = {};
                    const consditionMasterCustomer: IMasterCustomerCondition = {};
                    let businessPartnerSRRM = [];
                    if (Array.isArray(result["n0:BusinessPartnerSUITEBulkReplicateRequest"].BusinessPartnerSUITEReplicateRequestMessage)) {
                        businessPartnerSRRM = result["n0:BusinessPartnerSUITEBulkReplicateRequest"].BusinessPartnerSUITEReplicateRequestMessage;
                    } else {
                        businessPartnerSRRM = [result["n0:BusinessPartnerSUITEBulkReplicateRequest"].BusinessPartnerSUITEReplicateRequestMessage];
                    }
                    if (businessPartnerSRRM) {
                        for (const item of businessPartnerSRRM) {
                            const bpGroup = item.BusinessPartner.NumberRangeIntervalBusinessPartnerGroupCode;
                            if (bpGroup && validBPGroups.includes(bpGroup)) {
                                consditionMasterCustomer.SAPCode = item.BusinessPartner.InternalID;
                                setParamsMasterCustomer.categoryCode = item.BusinessPartner.CategoryCode;
                                if (setParamsMasterCustomer.categoryCode === 1) {
                                    const name = item.BusinessPartner.Common.Person.Name;
                                    setParamsMasterCustomer.customerName = `${name.FormOfAddressCode} ${name.GivenName} ${name.FamilyName}`.trim();
                                } else if (setParamsMasterCustomer.categoryCode === 2) {
                                    const name = item.BusinessPartner.Common.Organisation.Name;
                                    setParamsMasterCustomer.customerName = `${name.FirstLineName} ${name.SecondLineName} ${name.ThirdLineName} ${name.FourthLineName}`.trim();
                                }
                                setParamsMasterCustomer.status = item.BusinessPartner.Common.BlockedIndicator ? "TERMINATE" : "ACTIVE";
                                setParamsMasterCustomer.lastUpdate = dayjs.tz(new Date(), TIMEZONE_THAI).utc().toDate();
                                this.mongoService.updateEncryptedDocuments(this.MasterCustomersModel, consditionMasterCustomer, setParamsMasterCustomer);
                            }
                        }
                    }
                }
            })
        } else {
            response.result = await this.kafkaService.disconnectConsumer(this.kafkaConfig.kafkaGroupId)
        }
        return response
    }

    private async optimusOrdersFlow(conditionOptimusOrder: IOptimusOrderCondition) {
        const optimusOrder = await this.mongoService.findDocuments(this.OptimusOrdersModel, conditionOptimusOrder)
        const conditionOptimusJobList: IOptimusJobListCondition = {jobDate: getFormattedDateYYYYMMDD(), jobStatus: "init", jobType: optimusOrder[0].orderType, jobZone: optimusOrder[0].deliveryProvince, itemsSize: {$lt: 20}}
        const optimusJob = await this.mongoService.findDocuments(this.OptimusJobListsModel, conditionOptimusJobList)
        const setParamsOptimusJobList: IOptimusJobListSetParams = {}
        const setParamsOptimusOrder: IOptimusOrderSetParams = {}
        const itemsList: ItemsList = {
            orderNo: optimusOrder[0].orderNo,
            orderStatus: STATUS_QUEUE,
            newMobileNo: optimusOrder[0].moreInfo.nuMobileData.newMobileNo,
            orderDateTime: optimusOrder[0].orderDateTime,
            serialNo: ""
        } 
        if (optimusJob && optimusJob.length > 0) {
            setParamsOptimusJobList.itemsList = optimusJob[0].itemsList
            setParamsOptimusJobList.itemsList.push(itemsList)
            const conditionOptimusJobList: IOptimusJobListCondition = {jobId: optimusJob[0].jobId}
            await this.mongoService.updateEncryptedDocuments(this.OptimusJobListsModel, conditionOptimusJobList, setParamsOptimusJobList)
            setParamsOptimusOrder.jobListId = optimusJob[0].jobId
            setParamsOptimusOrder.orderStatus = STATUS_QUEUE
            setParamsOptimusOrder['moreInfo.jobDate'] = optimusJob[0].jobDate
            setParamsOptimusOrder.modifyDateTime = dayjs.tz(Date.now(), TIMEZONE_THAI).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
            await this.mongoService.updateEncryptedDocuments(this.OptimusOrdersModel, conditionOptimusOrder, setParamsOptimusOrder);
        } else {
            const newJob = await this.optimusJobListsService.createOptimusJobList({
                orderDate: getFormattedDateYYYYMMDD(),
                orderType: optimusOrder[0].orderType,
                jobZone: optimusOrder[0].deliveryProvince,
                itemsSize: 1,
                itemsList: [itemsList],
                createBy: optimusOrder[0].createBy
            } as Partial<OptimusJobLists>)
            if (newJob) {
                console.log("New Job")
                setParamsOptimusOrder.jobListId = newJob.jobId
                setParamsOptimusOrder.orderStatus = STATUS_QUEUE
                setParamsOptimusOrder['moreInfo.jobDate'] = newJob.jobDate
                await this.mongoService.updateEncryptedDocuments(this.OptimusOrdersModel, conditionOptimusOrder, setParamsOptimusOrder)
            }
        }
    }
}
