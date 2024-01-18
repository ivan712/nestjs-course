import { User } from '../core/user.entity';
import { UserModelDocument } from './user.model';

export class MapperUser {
  static fromModelToEntity(userModel: UserModelDocument): User {
    const result = {} as User;
    ['email', 'phoneNumber', 'role', 'password'].forEach((key) => {
      result[key] = userModel[key];
    });
    result.id = String(userModel._id);

    return result;
  }
}
