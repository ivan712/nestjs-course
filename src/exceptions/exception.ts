import { ExceptionCodes } from './codes';
import { ExceptionMessages } from './messages';

export default class Exception {
  public message: string;

  public code: number;

  public constructor(
    code = ExceptionCodes.INTERNAL_SERVER_ERROR,
    message = ExceptionMessages.INTERNAL_SERVER_ERROR,
  ) {
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
