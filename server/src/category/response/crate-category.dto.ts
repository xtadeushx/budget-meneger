import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResponseCategoryDto {
  @ApiProperty({ example: 'salary' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'title must be more than 4 symbols' })
  title: string;

  @ApiProperty({ example: '1' })
  user: {
    id: number;
  };
}
