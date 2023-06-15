import path from 'path';
import { createLogger, format, transports } from 'winston';
import { getLogDateAndTime } from '../app/modules/user/user.utils';
const { combine, timestamp, label, printf } = format;
import DailyRotateFile from 'winston-daily-rotate-file';

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = getLogDateAndTime(timestamp);
  return `${date} [${label}] ${level} : ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'REXROX!' }), timestamp(), myFormat),

  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// error

const errorLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'REXROX!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };
