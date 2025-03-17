import { Request } from 'express';
import { TIMEZONE_THAI } from './constants';
import { StandardResponse } from './interfaces/response.interface';

const dayjs = require('dayjs');

export function populateMetricLabels(duration: string, node: string, action: string, request: Request, response: StandardResponse) {
  if (duration) {
    return {
      node: node,
      url: request.path,
      method: request.method,
      action: action,
      result: `${response.resultCode === '20000' ? 'Success' : 'Fail'}`,
      Result_Code: response.resultCode,
      Result_Desc: response.resultDescription,
      duration: duration,
    };
  } else {
    return {
      node: node,
      url: request.path,
      method: request.method,
      action: action,
      result: `${response.resultCode === '20000' ? 'Success' : 'Fail'}`,
      Result_Code: response.resultCode,
      Result_Desc: response.resultDescription,
    };
  }
}

export function mapValues(map, word) {
  for (const [key, value] of Object.entries(map)) {
    if (word.includes(key)) {
      return value;
    }
  }
  return word;
}

export function getFormattedDateYYYYMMDD(date?: Date) {
  const today = date ? date : new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

export function generateTransactionId(): any {
  let emptyString: string = '';
  const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  while (emptyString.length < 2) {
    emptyString += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  const randomAlphabet: string = emptyString;
  const today: any = dayjs().format('YYYYMMD');
  const randomNumber: string = Math.floor(Math.random() * 1000000).toString();
  const transactionId: string = randomAlphabet + today + randomNumber;
  return transactionId;
}

export const setObjectParams = <T>(source: Partial<T>, key: keyof T, value: any, transform = (v) => v) => {
  if (value !== undefined && value !== null) {
    source[key] = transform(value);
  }
};

export const setDateRangeConditionString = (source, key, startDate, endDate) => {
  if (startDate && endDate) {
    source[key] = {
      $gte: dayjs.tz(startDate, TIMEZONE_THAI).startOf('day').utc().toISOString(),
      $lte: dayjs.tz(endDate, TIMEZONE_THAI).endOf('day').utc().toISOString(),
    };
  }
};

export const setDateRangeConditionDate = (source, key, startDate, endDate) => {
  if (startDate && endDate) {
    source[key] = {
      $gte: dayjs.tz(startDate, TIMEZONE_THAI).startOf('day').utc().toDate(),
      $lte: dayjs.tz(endDate, TIMEZONE_THAI).endOf('day').utc().toDate(),
    };
  }
};
