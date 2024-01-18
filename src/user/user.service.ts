import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserMongoRepository } from './mongo/user.mongoRepository';
import { UserRepository } from './core/user.repository';
import { RegisterDto } from '../auth/dto/register.dto';
import { UNAUTHORIZED_USER, USER_ALREADY_EXIST } from './user.constants';
import { User } from './core/user.entity';
import { LoginDto } from 'src/auth/dto/login.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserMongoRepository) private userRepository: UserRepository,
  ) {}

  async create(dto: RegisterDto): Promise<User> {
    const user = await this.userRepository.getByEmail(dto.email);
    if (user) throw new BadRequestException(USER_ALREADY_EXIST);
    return await this.userRepository.create(dto);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.getByEmail(email);
  }

  async validateUser(dto: LoginDto): Promise<void> {
    const user = await this.getByEmail(dto.email);
    if (!user) throw new UnauthorizedException(UNAUTHORIZED_USER);
    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException(UNAUTHORIZED_USER);
  }
}
