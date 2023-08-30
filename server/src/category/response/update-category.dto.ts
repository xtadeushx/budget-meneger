import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { Category } from '../entities/category.entity';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  category: Category;
}
