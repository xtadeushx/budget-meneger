import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { CreateAuthDto } from './dto/create-auth.dto';
import { TokenService } from 'src/token/token.service';

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
      throw new BadRequestException(`User ${dto.email} already exists`);
    return this.userService.createUser(dto);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const isPasswordMatch = await argon2.verify(user.password, password);

    if (user && isPasswordMatch) {
      const { password, transactions, categories, ...result } = user;
      const token = await this.tokenService.generateJwtToken({
        email,
        password,
      });
      return { user: result, token };
    }
    throw new UnauthorizedException('user email or password mismatch');
  }
}
