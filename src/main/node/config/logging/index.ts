import * as winston from 'winston';
import * as moment from 'moment';

const { combine, label, timestamp, printf } = winston.format;

const logFormat = printf(info => {
    return `${moment(new Date(info.timestamp)).format("DD/MM/YYYY:HH:mm:ss")} - [${info.label}] -> ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        label({ label: 'Blog Yao!' }),
        timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console
    ]
});

export default logger;