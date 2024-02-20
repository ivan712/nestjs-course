import { UserModelDocument } from './repositories/mongo/user.model';

export enum Role {
  admin = 'admin',
  user = 'user',
}

export class User {
  constructor({ mongoDoc }: { mongoDoc?: UserModelDocument }) {
    this.id = String(mongoDoc._id);
    this.email = mongoDoc.email;
    this.phoneNumber = mongoDoc.phoneNumber;
    this.role = mongoDoc.role;
    this.password = mongoDoc.password;
  }

  id: string;
  email: string;
  phoneNumber: string;
  role: Role;
  password: string;
}
