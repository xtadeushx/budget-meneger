import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResponseAuthUserDto } from './dto/response-auth.dto';
import { ApiPath, AuthApiPath, HttpCode } from 'src/common/enums/enums';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @Post(AuthApiPath.REGISTER)
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: HttpCode.CREATED,
    type: CreateAuthDto,
  })
  async register(@Body() dto: CreateAuthDto): Promise<CreateAuthDto> {
    return await this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @Post(AuthApiPath.LOGIN)
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: HttpCode.OK,
    type: ResponseAuthUserDto,
  })
  async login(@Body() dto: CreateAuthDto) {
    const { email, password } = dto;
    return await this.authService.login(email, password);
  }

  @ApiTags('API')
  @Get(AuthApiPath.PROFILE)
  @UseGuards(JwtAuthGuard)
  async profile(@Req() request) {
    return request.user;
  }
}
