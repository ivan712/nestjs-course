import { Role } from '../../user/user.entity';

export interface IRegisterData {
  email: string;
  phoneNumber: string;
  role: Role;
  password: string;
}
