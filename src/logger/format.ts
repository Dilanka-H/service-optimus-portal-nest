// src/logger/format.ts

import { IInfoLog, IAccessLog, IRootLog, IServiceLog } from "./interface";

export class LoggerFormat {

    generalRequestInfo(loginInfo: IInfoLog | IAccessLog | IRootLog | IServiceLog): string {
        const { timestamp, id, ip, requestId } = loginInfo;
        return `TIMESTAMP|${timestamp}|ID|${id}|IP|${ip}|REQUEST_ID|${requestId}|`;
    }

    appLogFormat(applog: IInfoLog): string | any {
        return {
            logger: applog.requestHeaders["x-request-type"],
            channel: applog.requestBody.channel,
            timestamp: applog.timestamp,
            id: applog.id,
            ip: applog.ip,
            sessionId: applog.sessionId,
            requestId: applog.requestId,
            status: applog.requestBody.status,
            activityType: applog.requestBody.activityType,
            activityTitle: applog.requestBody.activityTitle,
            log: applog.requestBody.moreInfo
        };
    }

    infoLogFormat(loginInfo: IInfoLog, options?: any): string | any {
        if (options && options.json) {
            return {
                'logger': 'info',
                'appId': options.appId,
                'sessionId': loginInfo.sessionId,
                'TIMESTAMP': loginInfo.timestamp,
                'ID': loginInfo.id,
                'IP': loginInfo.ip,
                'REQUEST_ID': loginInfo.requestId,
                'REQUEST_METHOD': loginInfo.requestMethod,
                'REQUEST_URI': loginInfo.requestUri,
                'REQUEST_HEADER': loginInfo.requestHeaders,
                'REQUEST_PARAMS': loginInfo.requestParams,
                'REQUEST_BODY': loginInfo.requestBody,
                'RESPONSE_STATUS': loginInfo.responseStatus,
                'RESPONSE_BODY': loginInfo.responseBody,
                'RESPONSE_TIME': loginInfo.responseTime,
                'CLIENT_MODULE': loginInfo.clientModule,
                'CLIENT_PAGE_NAME': loginInfo.clientPageName,
                'CLIENT_ACTION': loginInfo.clientAction,
                'CLIENT_PAGE_URL': loginInfo.clientPageUrl,
            };
        }

        const { requestMethod, requestUri, requestHeaders, requestParams, requestBody, responseStatus, responseBody, responseTime, clientModule, clientPageName, clientAction, clientPageUrl } = loginInfo;
        return this.generalRequestInfo(loginInfo)
            + `REQUEST_METHOD|${requestMethod}|REQUEST_URI|${requestUri}|REQUEST_HEADER|${this.stringify(requestHeaders)}|`
            + `REQUEST_PARAMS|${this.stringify(requestParams)}|REQUEST_BODY|${this.stringify(requestBody)}|`
            + `RESPONSE_STATUS|${responseStatus}|RESPONSE_BODY|${this.stringify(responseBody)}|`
            + `CLIENT_MODULE|${clientModule}|CLIENT_PAGE_NAME|${clientPageName}|CLIENT_ACTION|${clientAction}|CLIENT_PAGE_URL|${clientPageUrl}|RESPONSE_TIME|${responseTime}`;
    }

    accessLogFormat(loginInfo: IAccessLog, options?: any): string | any {
        if (options && options.json) {
            return {
                'logger': 'access',
                'appId': options.appId,
                'TIMESTAMP': loginInfo.timestamp,
                'ID': loginInfo.id,
                'IP': loginInfo.ip,
                'REQUEST_ID': loginInfo.requestId,
                'REQUEST_METHOD': loginInfo.requestMethod,
                'REQUEST_URI': loginInfo.requestUri,
                'REQUEST_HEADER': loginInfo.requestHeaders,
                'REQUEST_PARAMS': loginInfo.requestParams,
                'REQUEST_BODY': loginInfo.requestBody,
            };
        }

        const { requestMethod, requestUri, requestHeaders, requestParams, requestBody } = loginInfo;
        return this.generalRequestInfo(loginInfo)
            + `REQUEST_METHOD|${requestMethod}|REQUEST_URI|${requestUri}|REQUEST_HEADER|${this.stringify(requestHeaders)}|`
            + `REQUEST_PARAMS|${this.stringify(requestParams)}|REQUEST_BODY|${this.stringify(requestBody)}`;
    }

    rootLogFormat(loginInfo: IRootLog, options?: any): string | any {
        if (options && options.json) {
            return {
                'TIMESTAMP': loginInfo.timestamp,
                'ID': loginInfo.id,
                'IP': loginInfo.ip,
                'REQUEST_ID': loginInfo.requestId,
                'LOG_MESSAGE': loginInfo.logMessage
            };
        }

        const { logMessage } = loginInfo;
        return this.generalRequestInfo(loginInfo)
            + `LOG_MESSAGE|${logMessage}`;
    }

    serviceLogFormat(loginInfo: IServiceLog, options?: any): string | any {
        if (options && options.json) {
            return {
                'logger': 'service',
                'appId': options.appId,
                'resultCode': loginInfo.responseBody?.resultCode || '',
                'resultDescription': loginInfo.responseBody?.resultDescription || '',
                'TIMESTAMP': loginInfo.timestamp,
                'ID': loginInfo.id,
                'IP': loginInfo.ip,
                'REQUEST_ID': loginInfo.requestId,
                'REQUEST_METHOD': loginInfo.requestMethod,
                'REQUEST_URI': loginInfo.requestUri,
                'REQUEST_HEADER': loginInfo.requestHeaders,
                'REQUEST_PARAMS': loginInfo.requestParams,
                'REQUEST_BODY': loginInfo.requestBody,
                'RESPONSE_STATUS': loginInfo.responseStatus,
                'RESPONSE_BODY': loginInfo.responseBody,
                'RESPONSE_TIME': loginInfo.responseTime,
                'ERROR_MESSAGE': loginInfo.errorMessage,
                'ERROR_INSTANCE': loginInfo.errorInstance,
            };
        }

        const { requestMethod, requestUri, requestHeaders, requestParams, requestBody, responseStatus, responseBody, responseTime, errorMessage, errorInstance } = loginInfo;
        return this.generalRequestInfo(loginInfo)
            + `REQUEST_METHOD|${requestMethod}|REQUEST_URI|${requestUri}|REQUEST_HEADER|${this.stringify(requestHeaders)}|`
            + `REQUEST_PARAMS|${this.stringify(requestParams)}|REQUEST_BODY|${this.stringify(requestBody)}|`
            + `RESPONSE_STATUS|${responseStatus}|RESPONSE_BODY|${this.stringify(responseBody)}|`
            + `RESPONSE_TIME|${responseTime}|ERROR_MESSAGE|${this.stringify(errorMessage)}|`
            + `ERROR_INSTANCE|${this.stringify(errorInstance)}`;
    }

    private stringify(data: any): string {
        try {
            const jsonData: string = JSON.stringify(data);
            if (jsonData === '{}' || jsonData === '[]' || !data || data === null) {
                return '';
            }
            return jsonData.replace(/\|/g, '\\:').trim();
        } catch (err) {
            return 'Error: ' + err.message;
        }
    }
}
