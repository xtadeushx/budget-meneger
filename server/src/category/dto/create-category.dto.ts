import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateCategoryDto {
  @ApiProperty({ example: 'salary' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'title must be more than 4 symbols' })
  title: string;

  @IsOptional()
  user?: User;
}
