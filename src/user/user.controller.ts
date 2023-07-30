import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { getUser } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UpdatePasswordDto, UpdateUserDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@getUser('id') userId: number) {
    return this.userService.getUser(userId);
  }

  @Patch('update')
  updateUser(@getUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }

  @Patch('update-password')
  updatePassword(
    @getUser('id') userId: number,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(userId, dto);
  }
}
