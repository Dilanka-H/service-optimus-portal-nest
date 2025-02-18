// src/logger/logger.ts

import { LoggerFormat } from './format';
import { IAccessLog, IInfoLog, ILogOption, IRootLog, IServiceLog } from "./interface";

export default class Logger {
    private loggerFormat: LoggerFormat;
    private options: ILogOption;

    constructor(logOption: ILogOption) {
        this.loggerFormat = new LoggerFormat();
        this.options = logOption;
    }

    public appLog(message: IInfoLog): void {
        if (this.options.stdout) {
            const formattedLog = this.loggerFormat.appLogFormat(message);
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
