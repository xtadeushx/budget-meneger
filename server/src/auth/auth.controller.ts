import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseAuthUserDto } from './dto/response-auth.dto';
import { ApiPath, AuthApiPath, HttpCode } from 'src/common/enums/enums';

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @Post(AuthApiPath.REGISTER)
  @ApiResponse({
    status: HttpCode.CREATED,
    type: CreateAuthDto,
  })
  async register(@Body() dto: CreateAuthDto): Promise<CreateAuthDto> {
    return await this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @UseGuards(LocalAuthGuard)
  @Post(AuthApiPath.REGISTER)
  @ApiResponse({
    status: HttpCode.OK,
    type: ResponseAuthUserDto,
  })
  async login(@Body() dto: CreateAuthDto): Promise<ResponseAuthUserDto> {
    const { email, password } = dto;
    return await this.authService.login(email, password);
  }
}
