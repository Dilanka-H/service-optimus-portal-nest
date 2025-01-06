// src/logger/interfaces.ts

export interface IRegister {
    (server: any, options: IEventOption): void;
    attributes?: any;
}

export interface IEventOption {
    log: any;
    headers: string[];
    hiddenFields: string[];
    hiddenPin: IOption[];
    kafkaEnable: boolean;
    kafkaOption: any;
    kafkaRetryOption: any;
    producerOptions: any;
}

export interface IOption {
    field: string;
    start: number;
    end: number;
}

export interface ILogOption {
    stdout?: boolean;
    path: string;
    rotateTime: number;
    serviceNames?: string[];
}

export interface ILoggerData {
    name: string;
    timestamp: string;
    request: {
        id: string;
        ip: string;
        apiRequestId: string;
        method: string;
        uri: string;
        headers: Record<string, any>;
        params: Record<string, any>;
        body: any;
    };
    response: {
        status: number;
        body: any;
        time: number;
    };
    error: {
        message: string;
        instance: string;
    };
}

export interface IInfoLog {
    timestamp: string;
    id: string;
    ip: string | Record<string, string>;
    requestId: string | Record<string, string>;
    sessionId: string | Record<string, string>;
    requestMethod: string;
    requestUri: string;
    requestHeaders: Record<string, string>;
    requestParams: Record<string, string>;
    requestBody: any;
    responseStatus: number;
    responseBody: any;
    responseTime: number;
    clientModule: string | Record<string, string>;
    clientPageName: string | Record<string, string>;
    clientAction: string | Record<string, string>;
    clientPageUrl: string | Record<string, string>;
}

export interface IAccessLog {
    timestamp: string;
    id: string;
    ip: string | Record<string, string>;
    requestId: string | Record<string, string>;
    requestMethod: string;
    requestUri: string;
    requestHeaders: Record<string, string>;
    requestParams: Record<string, string>;
    requestBody: any;
}

export interface IRootLog {
    timestamp: string;
    id: string;
    ip: string | Record<string, string>;
    requestId: string | Record<string, string>;
    logMessage: string;
}

export interface IErrorLog {
    timestamp: string;
    id: string;
    ip: string | Record<string, string>;
    requestId: string | Record<string, string>;
}

export interface IServiceLog {
    name: string;
    timestamp: string;
    id: string;
    ip: string | Record<string, string>;
    requestId: string | Record<string, string>;
    requestMethod: string;
    requestUri: string;
    requestHeaders: Record<string, string>;
    requestParams: Record<string, string>;
    requestBody: any;
    responseStatus: number;
    responseBody: any;
    responseTime: number;
    errorMessage: string;
    errorInstance: string;
}
