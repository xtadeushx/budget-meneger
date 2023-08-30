import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ExceptionMessage } from 'src/common/enums/enums';
import { ResponseAuthUserDto } from './dto/response-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUsers(dto: CreateAuthDto): Promise<CreateAuthDto> {
    const { email } = dto;
    const existUser = await this.userService.findOne(email);
    if (existUser)
      throw new BadRequestException(ExceptionMessage.USERNAME_ALREADY_EXISTS);
    return this.userService.createUser(dto);
  }

  async login(email: string, password: string): Promise<ResponseAuthUserDto> {
    const user = await this.userService.findOne(email);
    if (!user)
      throw new UnauthorizedException(ExceptionMessage.PASSWORDS_NOT_MATCH);
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (user && isPasswordMatch) {
      const token = await this.jwtService.signAsync({
        email,
        password,
        id: user.id,
      });
      const publicUser = {
        id: user.id,
        email: user.email,
      };
      return { user: publicUser, token };
    }
    throw new UnauthorizedException(ExceptionMessage.PASSWORDS_NOT_MATCH);
  }
}
