import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard)
  @Get('findByEmail/:email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }
}
