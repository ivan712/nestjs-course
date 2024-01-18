export enum Role {
  admin = 'admin',
  user = 'user',
}

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  role: Role;
  password: string;
}
