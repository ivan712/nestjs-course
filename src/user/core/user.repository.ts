import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from './user.entity';

export interface UserRepository {
  create(dto: RegisterDto): Promise<User>;
  delete(id: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}
