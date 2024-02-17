import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { IAccessToken } from './interfaces/access-token.interface';
import { IRegisterData } from './interfaces/register-data.interface';
import { ILoginData } from './interfaces/login-data.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async register(registerData: IRegisterData): Promise<User> {
    const salt = await genSalt(10);
    const passwordHash = await hash(registerData.password, salt);
    registerData.password = passwordHash;
    return this.userService.create(registerData);
  }

  async login(loginData: ILoginData): Promise<IAccessToken> {
    await this.userService.validateUser(loginData);

    const payload = { email: loginData.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
