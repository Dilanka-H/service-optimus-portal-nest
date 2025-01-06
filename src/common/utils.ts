import { StandardResponse } from "./interfaces/response.interface";
import { Request } from 'express';

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