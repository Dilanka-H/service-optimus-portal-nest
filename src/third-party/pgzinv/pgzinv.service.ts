import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { RestService } from 'src/common/services/rest.service';
import { PgzinvConfiguration } from 'src/config/pgzinv.config';
import {
  IRequestServiceProvisioning,
  IResponseServiceProvisioning,
} from './interfaces.ts/service-provisioning.interface';

@Injectable()
export class PgzinvService {
  constructor(
    private readonly pgzinvConfiguration: PgzinvConfiguration,
    private readonly restService: RestService,
  ) {}

  baseUrlServiceProvisioning = this.pgzinvConfiguration.pgzinvBaseUrl;

  async serviceProvisioning(
    payload: IRequestServiceProvisioning,
    config: AxiosRequestConfig,
  ): Promise<IResponseServiceProvisioning> {
    const url = `${this.baseUrlServiceProvisioning}${this.pgzinvConfiguration.pgzinvServiceProvisioningUrl}`;
    const res = await this.restService.post(url, payload, config);
    if (res.statusCode !== 200) {
      return {
        errorMsg: res.message,
      };
    }
    return {
      resourceItemList: res.data.resourceItemList || [],
      responseHeader: res.data.responseHeader || {},
    };
  }
}
