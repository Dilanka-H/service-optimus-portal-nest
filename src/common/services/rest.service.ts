import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { IRestResponse } from '../interfaces/rest.service.interface';

@Injectable()
export class RestService {
  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<IRestResponse> {
    try {
      const response = await axios.post<T>(url, data, config);
      return {
        statusCode: response.status,
        message: response.statusText,
        data: response.data,
      };
    } catch (error) {
      return {
        statusCode: error.response?.status,
        message: error.message || 'An error occurred',
        data: null,
      };
    }
  }
}
