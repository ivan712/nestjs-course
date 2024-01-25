import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import Exception from './Exception';
import { ExceptionCodes } from './codes';

@Catch(Exception)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = exception.getCode();
    const message = exception.message;

    let status;
    switch (code) {
      case ExceptionCodes.BAD_REQUEST:
        status = 400;
        break;
      case ExceptionCodes.NOT_FOUND:
        status = 404;
        break;
      default:
        status = 500;
        break;
    }
    response.status(status).json({
      statusCode: status,
      message: {
        code,
        message,
      },
    });
  }
}
