import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiTags('API')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiTags('API')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('hello')
  @ApiTags('API')
  find() {
    return 'Hello';
  }
}
