import {
  Controller,
  Body,
  Req,
  UseGuards,
  Delete,
  Patch,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
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

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Patch()
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Body() dto: CreateUserDto,
    @Req() request,
  ): Promise<CreateUserDto> {
    const { email } = request.user;
    return this.userService.updateUser(email, dto);
  }
}
