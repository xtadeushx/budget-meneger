import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUserResponseDto } from './dto/response-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @Post('register')
  @ApiResponse({
    status: 201,
    type: CreateAuthDto,
  })
  async register(@Body() dto: CreateAuthDto): Promise<CreateAuthDto> {
    return await this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AuthUserResponseDto,
  })
  async login(@Body() dto: CreateAuthDto): Promise<any> {
    const { email, password } = dto;
    return await this.authService.login(email, password);
  }
}
