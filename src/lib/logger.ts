export interface WinstonCompatibleLoggerInterface {
  debug(message: string, ...meta: any[]): void
  info(message: string, ...meta: any[]): void
  warn(message: string, ...meta: any[]): void
  error(message: string, ...meta: any[]): void
}
export type AppLogger = WinstonCompatibleLoggerInterface

const createLogger = (): AppLogger => {
    console.info('ENV_NAME is local, using good old console for logging')
    console.debug = console.log.bind(console)
    return console
}

export default createLogger()
