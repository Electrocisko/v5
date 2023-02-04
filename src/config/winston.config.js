import winston, { format } from 'winston';  

const { combine, simple, timestamp, printf } = format;

let logLevel = 'debug'

const logger = winston.createLogger({
    format: combine(
        simple(),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        printf( info => `[${info.timestamp}] ${info.level} ${info.message}`)
        ),
    transports:[
        new winston.transports.Console({level:logLevel}),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    ]
});

export default logger;