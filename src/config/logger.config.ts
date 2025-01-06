import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
    stdout: process.env.LOGGER_STDOUT === 'true' || true,
    path: process.env.LOGGER_PATH || 'logs/app.log',
    rotateTime: parseInt(process.env.LOGGER_ROTATE_TIME, 10) || 86400000, // Default to 1 day
    serviceNames: process.env.LOGGER_SERVICE_NAMES
        ? process.env.LOGGER_SERVICE_NAMES.split(',')
        : [],
}));
