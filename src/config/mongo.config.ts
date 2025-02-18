import { Configuration, Value } from "@itgorillaz/configify";

@Configuration()
export class MongoConfiguration {
  @Value('MONGO_URI')
  mongoURI: string;
  @Value('MONGO_ENCRYPT_MASTER_KEY')
  mongoEncryptMasterKey: string;
  @Value('MONGO_ENCRYPT_DATA_KEY')
  mongoEncryptDataKey: string;
  @Value('MONGO_SALT_GENERATOR')
  mongoSaltGenerator: string;

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