import { StandardResponse } from "./interfaces/response.interface";
import { Request } from 'express';

const dayjs = require("dayjs");

export function populateMetricLabels(duration: string, node: string, action: string, request: Request, response: StandardResponse) {
    if (duration) {
        return {
            node: node, 
            url: request.path,
            method: request.method,
            action: action,
            result: `${response.resultCode==="20000"?'Success':'Fail'}`,
            Result_Code: response.resultCode,
            Result_Desc: response.resultDescription,
            duration: duration
        }
    } else {
        return {
            node: node, 
            url: request.path,
            method: request.method,
            action: action,
            result: `${response.resultCode==="20000"?'Success':'Fail'}`,
            Result_Code: response.resultCode,
            Result_Desc: response.resultDescription,
        }
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

export function getFormattedDateYYYYMMDD(date?: Date){
    const today = date? date: new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}${month}${day}`;
};

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