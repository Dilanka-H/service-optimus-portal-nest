// src/logger/logger.ts

import { ILogOption, IInfoLog, IAccessLog, IRootLog, IServiceLog } from "./interface";
import { LoggerFormat } from './format';

export default class Logger {
    private loggerFormat: LoggerFormat;
    private options: ILogOption;

    constructor(logOption: ILogOption) {
        this.loggerFormat = new LoggerFormat();
        this.options = logOption;
    }

    public appLog(message: IInfoLog): void {
        if (this.options.stdout) {
            const formattedLog = this.loggerFormat.appLogFormat(message, this.options);
            console.log(formattedLog);
        }
    }

    public accessLog(message: IAccessLog): void {
        if (this.options.stdout) {
            const formattedLog = this.loggerFormat.accessLogFormat(message, this.options);
            console.log(formattedLog);
        }
    }

    public infoLog(message: IInfoLog): void {
        if (this.options.stdout) {
            const formattedLog = this.loggerFormat.infoLogFormat(message, this.options);
            console.log(formattedLog);
        }
    }

    public rootLog(message: IRootLog): void {
        if (this.options.stdout) {
            const formattedLog = this.loggerFormat.rootLogFormat(message, this.options);
            console.log(formattedLog);
        }
    }

    public serviceLog(message: IServiceLog): void {
        if (this.options.stdout) {
            const formattedLog = this.loggerFormat.serviceLogFormat(message, this.options);
            console.log(formattedLog);
        }
    }
}
