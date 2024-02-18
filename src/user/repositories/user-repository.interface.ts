import { User } from '../user.entity';
import { IRegisterData } from '../../auth/interfaces/register-data.interface';

export interface UserRepository {
  create(registerData: IRegisterData): Promise<User>;
  delete(id: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}
