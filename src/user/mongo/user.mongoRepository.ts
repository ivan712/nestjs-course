import { Model, Types } from 'mongoose';
import { UserRepository } from '../core/user.repository';
import { UserModel, UserModelDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../core/user.entity';
import { MapperUser } from './mapper';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModelDocument>,
  ) {}

  async create(dto: RegisterDto): Promise<User> {
    return MapperUser.fromModelToEntity(await this.userModel.create(dto));
  }

  async getById(id: string): Promise<User | null> {
    const userId = new Types.ObjectId(id);
    const user = await this.userModel.findById(userId);
    if (!user) return null;
    return MapperUser.fromModelToEntity(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return MapperUser.fromModelToEntity(user);
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.getById(id);
    if (!user) return null;
    await this.userModel.findByIdAndDelete(new Types.ObjectId(id));

    return user;
  }
}
