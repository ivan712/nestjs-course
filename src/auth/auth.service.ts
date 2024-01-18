import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/core/user.entity';
import { AccessToken } from './interfaces/accessToken.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);
    dto.password = passwordHash;
    return this.userService.create(dto);
  }

  async login(dto: LoginDto): Promise<AccessToken> {
    await this.userService.validateUser(dto);

    const payload = { email: dto.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
