import { Configuration, Value } from "@itgorillaz/configify";
import { path, serviceEnv } from "./common";
import * as fs from 'fs';

@Configuration()
export class AppConfiguration {
  @Value('APP_PORT')
  appPort: string;
  @Value('ENCRYPT_KEY')
  encryptKey: string;
  @Value('SERVICE_CLIENTS')
  serviceClients: string;
  
  constructor() {
    // if (serviceEnv !== 'local') {
    //   this.encryptKey = fs.readFileSync(`${path}${serviceEnv}-optimus-utils-encrypt-key`, 'utf8').trim();
    //   this.serviceClients = fs.readFileSync(`${path}${serviceEnv}-optimus-service-clients`, 'utf8').trim();
    // }
  }
}