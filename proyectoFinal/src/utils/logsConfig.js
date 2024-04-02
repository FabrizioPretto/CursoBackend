import winston from 'winston';

let LOG_LEVEL = process.argv[3];
let logger;

const logConfigDev = {
    level: 'debug',
    transports: [
        new winston.transports.Console()
    ]
}

const logConfigProd = {
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error'
        })
    ]
}

if (LOG_LEVEL === 'dev') { logger = winston.createLogger(logConfigDev); }
else { logger = winston.createLogger(logConfigProd); }

export { logger };

