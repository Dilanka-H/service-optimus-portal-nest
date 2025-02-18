import { Configuration, Value } from "@itgorillaz/configify";
// import { path, serviceEnv } from "./common";
// import * as fs from 'fs';

@Configuration()
export class KafkaConfiguration {
  @Value('KAFKA_SERVER_URI')
  kafkaServerUri: string;
  @Value('KAFKA_MECHANISM')
  kafkaMechanism: 'plain';
  @Value('KAFKA_USERNAME')
  kafkaUsername: string;
  @Value('KAFKA_PASSWORD')
  kafkaPassword: string;
  @Value('KAFKA_GROUP_ID')
  kafkaGroupId: string;
  @Value('KAFKA_SSL')
  kafkaSSL: boolean;

  constructor() {
    // console.log("dhwsidhsij", serviceEnv)
    // if (serviceEnv !== 'local') {
    //   this.mongoURI = fs.readFileSync(`${path}${serviceEnv}-optimus-db-host`, 'utf8').trim();
    //   this.mongoEncryptMasterKey = fs.readFileSync(`${path}${serviceEnv}-optimus-db-encrypt-masterkey`, 'utf8').trim();
    //   this.mongoEncryptDataKey = fs.readFileSync(`${path}${serviceEnv}-optimus-db-encrypt-data-key`, 'utf8').trim();
    //   this.mongoSaltGenerator = fs.readFileSync(`${path}${serviceEnv}-optimus-db-salt-generator`, 'utf8').trim();
    // }
  }
  

}