import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from 'src/user/user.entity';

export interface IRegisterData {
  email: string;
  phoneNumber: string;
  role: Role;
  password: string;
}
