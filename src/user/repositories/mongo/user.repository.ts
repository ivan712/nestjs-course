import { Model, Types } from 'mongoose';
import { UserRepository } from '../user-repository.interface';
import { UserModel, UserModelDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../user.entity';
import { Injectable } from '@nestjs/common';
import { IRegisterData } from 'src/auth/interfaces/register-data.interface';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModelDocument>,
  ) {}

  async create(registerData: IRegisterData): Promise<User> {
    return new User({ mongoDoc: await this.userModel.create(registerData) });
  }

  async getById(id: string): Promise<User | null> {
    const userId = new Types.ObjectId(id);
    const user = await this.userModel.findById(userId);
    if (!user) return null;
    return new User({ mongoDoc: user });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return new User({ mongoDoc: user });
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.getById(id);
    if (!user) return null;
    await this.userModel.findByIdAndDelete(new Types.ObjectId(id));

    return user;
  }
}
