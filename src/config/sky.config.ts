import { Configuration, Value } from "@itgorillaz/configify";

@Configuration()
export class SKYConfiguration {
  @Value('SKY_ACCOUNT_ENDPOINTS')
  skyAccountEndpoints: string;
  
  constructor() {
    // if (serviceEnv !== 'local') {
    //   this.skyAccountEndpoints = fs.readFileSync(`${path}${serviceEnv}-optimus-sky-account`, 'utf8').trim();
    // }
  }
}