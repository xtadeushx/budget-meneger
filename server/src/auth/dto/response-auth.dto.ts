import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString } from 'class-validator';

class UserResponse {
  id: number;
  @ApiProperty()
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;
}

export class ResponseAuthUserDto {
  @ApiProperty()
  @IsObject()
  user: UserResponse;

  @ApiProperty()
  @IsString()
  token: string;
}
