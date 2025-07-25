import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(+id);
  }

  @Post()
  createUser(@Body() user: Partial<User>): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
    return this.userService.updateUser(+id, user);
  }

  @Delete(':id')
  destroyUser(@Param('id') id: string) {
    return this.userService.destroyUser(+id);
  }
}
