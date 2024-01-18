import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './mongo/user.model';
import { UserMongoRepository } from './mongo/user.mongoRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserMongoRepository],
})
export class UserModule {}
