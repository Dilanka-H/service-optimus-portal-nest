import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfiguration } from 'src/config/mongo.config';
import { MongoService } from './mongo.service';
import { MasterCustomersRepository } from './repositories/mastercustomers/mastercustomers.repository';
import { OptimusJobListsRepository } from './repositories/optimusjoblists/optimusjoblists.repository';
import { OptimusOmniOrdersRepository } from './repositories/optimusomniorders/optimusomniorders.repository';
import { OptimusOrdersRepository } from './repositories/optimusorders/optimusorders.repository';
import { PoHeadersRepository } from './repositories/po_headers/po_headers.respository';
import { PoJobsRepository } from './repositories/po_jobs/po_jobs.respository';
import { SaleOrderItemsRepository } from './repositories/saleorderitems/saleorderitems.repository';
import { SaleOrderJobListsRepository } from './repositories/saleorderjoblists/saleorderjoblists.repository';
import { encryptMasterCustomersSchema, MasterCustomers, MasterCustomersSchema } from './schema/master_customers.schema';
import { OmniOrders, OmniOrdersSchema } from './schema/omniorders.schema';
import { OptimusEndpoints, OptimusEndpointsSchema } from './schema/optimus_endpoints.schema';
import { OptimusCancelJobs, OptimusCancelJobsSchema } from './schema/optimuscanceljobs.schema';
import { OptimusConfigChannels, OptimusConfigChannelsSchema } from './schema/optimusconfigchannels.schema';
import { OptimusConfigMachines, OptimusConfigMachinesSchema } from './schema/optimusconfigmachines.schema';
import { OptimusConfigs, OptimusConfigsSchema } from './schema/optimusconfigs.schema';
import { encryptOptimusJobListsSchema, OptimusJobLists, OptimusJobListsSchema } from './schema/optimusjoblists.shema';
import { OptimusMaterials, OptimusMaterialsSchema } from './schema/optimusmaterials.schema';
import { OptimusMenus, OptimusMenusSchema } from './schema/optimusmenus.schema';
import {
  encryptOptimusOmniOrdersSchema,
  OptimusOmniOrders,
  OptimusOmniOrdersSchema,
} from './schema/optimusomniorders.schema';
import { encryptOptimusOrdersSchema, OptimusOrders, OptimusOrdersSchema } from './schema/optimusorders.schema';
import { OptimusPersoSimOrders, OptimusPersoSimOrdersSchema } from './schema/optimuspersosimorders.schema';
import { OptimusRepairJobLists, OptimusRepairJobListsSchema } from './schema/optimusrepairjoblists.schema';
import { OptimusRoleMenus, OptimusRoleMenusSchema } from './schema/optimusrolemenus.schema';
import { OptimusSimProfiles, OptimusSimProfilesSchema } from './schema/optimussimprofiles.schema';
import { OptimusStatusLogs, OptimusStatusLogsSchema } from './schema/optimusstatuslogs.schema';
import { OptimusTrackingPrintItems, OptimusTrackingPrintItemsSchema } from './schema/optimustrackingprintitems.schema';
import { OptimusUserRoles, OptimusUserRolesSchema } from './schema/optimususerroles.schema';
import { PersoSimOrders, PersoSimOrdersSchema } from './schema/persosimorders.schema';
import { PersoSimTransactions, PersoSimTransactionsSchema } from './schema/persosimtransactions.schema';
import { PoHeaders, PoHeadersSchema } from './schema/po_headers.schema';
import { PoJobs, PoJobsSchema } from './schema/po_jobs.schema';
import { encryptSaleOrderItemsSchema, SaleOrderItems, SaleOrderItemsSchema } from './schema/saleorderitems.schema';
import {
  encryptSaleOrderJobListsSchema,
  SaleOrderJobLists,
  SaleOrderJobListsSchema,
} from './schema/saleorderjoblists.schema';
import { encryptSaleOrdersSchema, SaleOrders, SaleOrdersSchema } from './schema/saleorders.schema';
import {
  encryptSaleOrderTransactionsSchema,
  SaleOrderTransactions,
  SaleOrderTransactionsSchema,
} from './schema/saleordertransactions.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [MongoConfiguration],
      useFactory: async (mongoConfig: MongoConfiguration) => ({
        uri: mongoConfig.mongoURI,
      }),
    }),
    MongooseModule.forFeatureAsync([
      {
        name: OptimusJobLists.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptOptimusJobListsSchema(mongoConfig);
          return OptimusJobListsSchema;
        },
        inject: [MongoConfiguration],
      },
      {
        name: SaleOrderJobLists.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptSaleOrderJobListsSchema(mongoConfig);
          return SaleOrderJobListsSchema;
        },
        inject: [MongoConfiguration],
      },
      {
        name: SaleOrderItems.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptSaleOrderItemsSchema(mongoConfig);
          return SaleOrderItemsSchema;
        },
        inject: [MongoConfiguration],
      },
      {
        name: OmniOrders.name,
        useFactory: async () => {
          return OmniOrdersSchema;
        },
      },
      {
        name: OptimusEndpoints.name,
        useFactory: async () => {
          return OptimusEndpointsSchema;
        },
      },
      {
        name: OptimusCancelJobs.name,
        useFactory: async () => {
          return OptimusCancelJobsSchema;
        },
      },
      {
        name: OptimusConfigChannels.name,
        useFactory: async () => {
          return OptimusConfigChannelsSchema;
        },
      },
      {
        name: OptimusConfigMachines.name,
        useFactory: async () => {
          return OptimusConfigMachinesSchema;
        },
      },
      {
        name: OptimusConfigs.name,
        useFactory: async () => {
          return OptimusConfigsSchema;
        },
      },
      {
        name: OptimusMaterials.name,
        useFactory: async () => {
          return OptimusMaterialsSchema;
        },
      },
      {
        name: OptimusMenus.name,
        useFactory: async () => {
          return OptimusMenusSchema;
        },
      },
      {
        name: OptimusOmniOrders.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptOptimusOmniOrdersSchema(mongoConfig);
          return OptimusOmniOrdersSchema;
        },
        inject: [MongoConfiguration],
      },
      {
        name: OptimusOrders.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptOptimusOrdersSchema(mongoConfig);
          return OptimusOrdersSchema;
        },
        inject: [MongoConfiguration],
      },
      {
        name: OptimusPersoSimOrders.name,
        useFactory: async () => {
          return OptimusPersoSimOrdersSchema;
        },
      },
      {
        name: OptimusRepairJobLists.name,
        useFactory: async () => {
          return OptimusRepairJobListsSchema;
        },
      },
      {
        name: OptimusRoleMenus.name,
        useFactory: async () => {
          return OptimusRoleMenusSchema;
        },
      },
      {
        name: OptimusSimProfiles.name,
        useFactory: async () => {
          return OptimusSimProfilesSchema;
        },
      },
      {
        name: OptimusStatusLogs.name,
        useFactory: async () => {
          return OptimusStatusLogsSchema;
        },
      },
      {
        name: OptimusTrackingPrintItems.name,
        useFactory: async () => {
          return OptimusTrackingPrintItemsSchema;
        },
      },
      {
        name: OptimusUserRoles.name,
        useFactory: async () => {
          return OptimusUserRolesSchema;
        },
      },
      {
        name: PersoSimOrders.name,
        useFactory: async () => {
          return PersoSimOrdersSchema;
        },
      },
      {
        name: PersoSimTransactions.name,
        useFactory: async () => {
          return PersoSimTransactionsSchema;
        },
      },
      {
        name: SaleOrders.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptSaleOrdersSchema(mongoConfig);
          return SaleOrdersSchema;
        },
        inject: [MongoConfiguration],
      },
      {
        name: SaleOrderTransactions.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptSaleOrderTransactionsSchema(mongoConfig);
          return SaleOrderTransactionsSchema;
        },
        inject: [MongoConfiguration],
      },
      {
        name: PoHeaders.name,
        useFactory: async () => {
          return PoHeadersSchema;
        },
      },
      {
        name: PoJobs.name,
        useFactory: async () => {
          return PoJobsSchema;
        },
      },
      {
        name: MasterCustomers.name,
        useFactory: async (mongoConfig: MongoConfiguration) => {
          encryptMasterCustomersSchema(mongoConfig);
          return MasterCustomersSchema;
        },
        inject: [MongoConfiguration],
      },
    ]),
  ],
  providers: [
    MongoService,
    PoHeadersRepository,
    PoJobsRepository,
    OptimusJobListsRepository,
    SaleOrderItemsRepository,
    SaleOrderJobListsRepository,
    OptimusOrdersRepository,
    MasterCustomersRepository,
    OptimusOmniOrdersRepository,
  ],
  exports: [MongooseModule, MongoService, OptimusJobListsRepository, PoHeadersRepository, PoJobsRepository],
})
export class MongoModule {}
