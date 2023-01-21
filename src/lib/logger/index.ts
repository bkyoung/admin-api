import { createLogger, format, transports } from 'winston'

const { combine, errors, json } = format

export default (service: string, logLevel = process.env.LOG_LEVEL) => {
  const logger = createLogger({
    level: logLevel || 'info',
    defaultMeta: { service },
    exitOnError: false,
    format: combine(errors({ stack: true }), json()),
  })

  logger.add(new transports.Console())
  // new transports.Console({
  //   format: combine(colorize(), simple()),
  // })

  process.on('unhandledRejection', (err: any) => {
    logger.error(err.stack)
  })

  process.on('uncaughtException', (err) => {
    logger.error(err.stack)
  })

  return logger
}
