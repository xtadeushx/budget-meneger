import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';

class UserResponse {
  id: number;

  transactions: Array<any>;

  categories: Array<any>;

  @ApiProperty()
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @IsDate()
  createAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class AuthUserResponseDto {
  @ApiProperty()
  @IsObject()
  user: UserResponse;

  @ApiProperty()
  @IsString()
  token: string;
}
