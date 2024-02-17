import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { UserMongoRepository } from 'src/user/repositories/mongo/user.repository';
import {
  UserModel,
  UserModelSchema,
} from 'src/user/repositories/mongo/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
      }),
    }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelSchema },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserMongoRepository,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
