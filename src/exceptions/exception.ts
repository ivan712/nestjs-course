import { ExceptionCodes } from './codes';
import { ExceptionMessages } from './messages';

export default class Exception {
  public message: string;

  public code: number;

  public isBusinessLogicError: boolean;

  public constructor(
    code = ExceptionCodes.INTERNAL_SERVER_ERROR,
    message = ExceptionMessages.INTERNAL_SERVER_ERROR,
  ) {
    this.isBusinessLogicError = true;
    this.message = message;
    this.code = code;
  }

  public getCode() {
    return this.code;
  }

  public getMessage() {
    return this.message;
  }
}
