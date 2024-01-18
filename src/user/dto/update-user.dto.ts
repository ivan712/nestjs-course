import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from 'src/user/core/user.entity';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEnum(Role)
  role: Role;
}
