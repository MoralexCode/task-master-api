'use strict'
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format;
const myFormat = printf(info => {
    return `[${info.timestamp}] [${(info.code != null || info.code != undefined) ? info.code : 200}]  ${info.level}: ${info.message} ${(info.error != null || info.error != undefined) ? ' => ' + info.error : ' '}`;
});
module.exports = createLogger({
    level: 'info',
    format: combine(
        /*label({
               label: 'ING. OSCAR MORALES GARCIA'
           }),*/
        timestamp(), myFormat), //format.combine(format.json(), format.timestamp()), //winston.format.json(),
    transports: [
        new transports.File({
            filename: '${__dirname}/../logs/combined.log',
            maxsize: 5120000 // 5 MB
        })
    ]
});