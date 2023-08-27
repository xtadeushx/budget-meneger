import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Req() request): Promise<string> {
    const { email } = request.user;
    return this.userService.deleteUser(email);
  }
}
