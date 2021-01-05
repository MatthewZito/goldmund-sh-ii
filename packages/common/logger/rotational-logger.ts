// import path from 'path';
// import winston from 'winston';
// import clfDate from 'clf-date';

// require('winston-daily-rotate-file');

// function generateLogger (logsPath: string, logsPrefix: string) {
//   const infofile = new winston.transports.DailyRotateFile({
//     level: 'info',
//     filename: path.resolve(logsPath, `${logsPrefix}-%DATE%-info.log`),
//     datePattern: 'YYYY-MM-DD',
//     frequency: '1d',
//     zippedArchive: true,
//     maxSize: '20m',
//     maxFiles: '6d'
//   });

//   const logger = winston.createLogger({
//     transports: [ infofile ]
//   });

//   logger.stream = {
//     write: function(message, encoding) {
//       logger.info(message);
//     }
//   };

//   logger.combinedFormat = function(err, req, res) {
//     // [FORMAT] :remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent'
//     return `${req.ip} - - [${clfDate(new Date())}] \'${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\' ${err.status || 500} - ${req.headers['user-agent']}`;
//   };

//   return logger;
// }

// export default generateLogger;
