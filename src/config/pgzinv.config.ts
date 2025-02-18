import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class PgzinvConfiguration {
  @Value('PGZINV_BASE_URL')
  pgzinvBaseUrl: string;
  @Value('PGZINV_SERVICE_PROVISIONING_URL')
  pgzinvServiceProvisioningUrl: string;
  @Value('PGZINV_HEADERS_HOST')
  pgzinvHeadersHost: string;
  @Value('PGZINV_TIMEOUT')
  pgzinvTimeout: string;
  @Value('PGZINV_ERROR_PREFIX_CODE')
  pgzinvErrorPrefixCode: string;

  constructor() {
    // if (serviceEnv !== 'local') {
    //   this.skyAccountEndpoints = fs.readFileSync(`${path}${serviceEnv}-optimus-sky-account`, 'utf8').trim();
    // }
  }
}
