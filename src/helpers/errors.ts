import type { APIGatewayProxyResult } from 'aws-lambda'

export class HttpError extends Error {
  public response: APIGatewayProxyResult

  public logLevel: 'error' | 'warn' | undefined

  public constructor(
    response: APIGatewayProxyResult,
    constructorOpt: any,
    logLevel?: 'error' | 'warn'
  ) {
    super(response.body)
    this.response = response
    this.logLevel = logLevel
    Error.captureStackTrace(this, constructorOpt)
  }
}

export class BadRequest extends HttpError {
  public constructor(errorMessage?: string) {
    const message = errorMessage || 'Bad request'
    const status = 400
    super(
      {
        statusCode: status,
        body: JSON.stringify({
          status,
          message
        })
      },
      BadRequest
    )
  }
}

export class NotFound extends HttpError {
  public constructor() {
    const message = 'Not Found'
    const status = 404
    super(
      { statusCode: status, body: JSON.stringify({ status, message }) },
      NotFound,
      'warn'
    )
  }
}

export class BadGateway extends HttpError {
  public constructor() {
    const message = 'Bad Gateway'
    const status = 502
    super(
      { statusCode: status, body: JSON.stringify({ status, message }) },
      BadGateway,
      'error'
    )
  }
}

export class GatewayTimeout extends HttpError {
  public constructor() {
    const message = 'Gateway Timeout'
    const status = 504
    super(
      { statusCode: status, body: JSON.stringify({ status, message }) },
      GatewayTimeout,
      'error'
    )
  }
}

export class InternalServerError extends HttpError {
  public constructor() {
    const message = 'Internal Server Error'
    const status = 500
    super(
      { statusCode: status, body: JSON.stringify({ status, message }) },
      InternalServerError,
      'error'
    )
  }
}
