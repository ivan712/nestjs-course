import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import Exception from './exception';
import { ExceptionCodes } from './codes';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof Exception) {
          const code = error.getCode();
          const message = error.message;

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
          throw new HttpException(
            { statusCode: status, message: { code, message } },
            status,
          );
        } else {
          throw error;
        }
      }),
    );
  }
}
