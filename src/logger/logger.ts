import { createLogger, format, transports } from 'winston';
import chalk from 'chalk'
const { combine, timestamp, prettyPrint, colorize, printf, json, ms, simple } = format;

const Logger = createLogger({
  format: combine(
    timestamp(),
  ),
  transports: [
    new transports.Console(
      {
        format: combine(
          colorize({
            level: true,
          }),
          timestamp({ format: 'YYYY.MM.DD HH:mm:ss' }),
          ms(),
          printf(info => `${chalk.gray(info.timestamp)} ${info.level} ${chalk.gray(info.ms)}\n${info.message}`),
        ),
      }
    ),
    new transports.File({ filename: 'log0.log', format: json() })
  ]
});

export default Logger;