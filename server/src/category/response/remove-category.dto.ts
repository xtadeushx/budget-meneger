import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RemoveCategoryDto {
  @ApiProperty({ example: `The category with id was removed` })
  @IsString()
  message: string;
}
