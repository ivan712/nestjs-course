import { Inject, Injectable } from '@nestjs/common';
import { UserMongoRepository } from './repositories/mongo/user.repository';
import { UserRepository } from './repositories/user-repository.interface';
import { User } from './user.entity';
import { compare } from 'bcryptjs';
import { IRegisterData } from 'src/auth/interfaces/register-data.interface';
import { ILoginData } from 'src/auth/interfaces/login-data.interface';
import Exception from 'src/exceptions/exception';
import { ExceptionMessages } from 'src/exceptions/messages';
import { ExceptionCodes } from 'src/exceptions/codes';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserMongoRepository) private userRepository: UserRepository,
  ) {}

  async create(registerData: IRegisterData): Promise<User> {
    const user = await this.userRepository.getByEmail(registerData.email);
    if (user)
      throw new Exception(
        ExceptionCodes.BAD_REQUEST,
        ExceptionMessages.USER_ALREADY_EXIST,
      );
    return this.userRepository.create(registerData);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }

  async validateUser(loginData: ILoginData): Promise<void> {
    const user = await this.getByEmail(loginData.email);
    if (!user)
      throw new Exception(
        ExceptionCodes.NOT_FOUND,
        ExceptionMessages.USER_NOT_FOUND,
      );
    const isPasswordValid = await compare(loginData.password, user.password);
    if (!isPasswordValid)
      throw new Exception(
        ExceptionCodes.BAD_REQUEST,
        ExceptionMessages.UNAUTHORIZED_USER,
      );
  }
}
