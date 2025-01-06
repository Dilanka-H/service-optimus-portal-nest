import { Configuration, Value } from "@itgorillaz/configify";
import { path, serviceEnv } from "./common";
import * as fs from 'fs';

@Configuration()
export class ESBConfiguration {
  @Value('ESB_USERNAME')
  esbUsername: string;
  @Value('ESB_PASSWORD')
  esbPassword: string;
  
  constructor() {
    // if (serviceEnv !== 'local') {
    //   this.esbUsername = fs.readFileSync(`${path}${serviceEnv}-optimus-esb-username`, 'utf8').trim();
    //   this.esbPassword = fs.readFileSync(`${path}${serviceEnv}-optimus-esb-password`, 'utf8').trim();
    // }
  }
}