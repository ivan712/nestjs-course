import { ExceptionCodes } from './codes';
import { ExceptionMessages } from './messages';

export default class Exception extends Error {
  public message: string;

  public code: number;

  public constructor(
    code = ExceptionCodes.INTERNAL_SERVER_ERROR,
    message = ExceptionMessages.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.message = message;
    this.code = code;

    Object.setPrototypeOf(this, Exception.prototype);
  }

  public getCode() {
    return this.code;
  }

  public getMessage() {
    return this.message;
  }
}
