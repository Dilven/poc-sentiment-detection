import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import logger from "../lib/logger"
import { HttpError } from "./errors"

export const albAdapter =
  <
    T extends Record<string, number | string> | string,
    V extends (event: APIGatewayProxyEvent) => Promise<T>
  >(
    handler: V
  ) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.debug('Event received', event)
    let response
    try {
      const result = await handler(event)
      response = {
        statusCode: 200,
        body: result
          ? typeof result === 'string'
            ? result
            : JSON.stringify(result)
          : undefined
      }
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.logLevel) {
          logger[error.logLevel](error.message)
        }
        response = error.response
      } else {
        logger.error('Unexpected handler error: ', error)
        response = {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal Server Error' })
        }
      }
    }
    return response
  }
