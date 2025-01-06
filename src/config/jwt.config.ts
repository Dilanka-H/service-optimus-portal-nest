import { Configuration, Value } from "@itgorillaz/configify";
import { path, serviceEnv } from "./common";
import * as fs from 'fs';

@Configuration()
export class JWTConfiguration {
  @Value('JWT_SECRET_KEY')
  jwtSecretKey: string;
  @Value('JWT_EXPIRY')
  jwtExpiry: string;
  

  constructor() {
    // if (serviceEnv !== 'local') {
    //   this.jwtSecretKey = fs.readFileSync(`${path}${serviceEnv}-optimus-jwt-secret-key`, 'utf8').trim();
    // }
  }
}