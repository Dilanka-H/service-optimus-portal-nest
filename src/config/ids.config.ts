import { Configuration, Value } from "@itgorillaz/configify";
import { path, serviceEnv } from "./common";
import * as fs from 'fs';

@Configuration()
export class IDSConfiguration {
  @Value('IDS_AUTH_TOKEN')
  idsAuthToken: string;
  @Value('IDS_CLIENT_ID')
  idsClientId: string;
  @Value('IDS_CLIENT_SECRET')
  idsClientSecret: string;
  

  constructor() {
    // if (serviceEnv !== 'local') {
    //   this.idsAuthToken = fs.readFileSync(`${path}${serviceEnv}-optimus-ids-auth-token`, 'utf8').trim();
    //   this.idsClientId = 
    // this.idsClientSecret
    // }
  }
}