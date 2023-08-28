import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { CreateAuthDto } from './dto/create-auth.dto';
import { TokenService } from 'src/token/token.service';
import { ExceptionMessage } from 'src/common/enums/enums';
import { ResponseAuthUserDto } from './dto/response-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
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
    const isPasswordMatch = await argon2.verify(user.password, password);

    if (user && isPasswordMatch) {
      const token = await this.tokenService.generateJwtToken({
        email,
        password,
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
