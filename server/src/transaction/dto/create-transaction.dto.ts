import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionDto {
  @ApiProperty({ example: 'salary' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'title must be more than 4 symbols' })
  title: string;

  @ApiProperty({ example: 'income' })
  type: 'expense' | 'income';

  @ApiProperty({ example: '100' })
  amount: number;

  @IsOptional()
  user?: User;

  @IsOptional()
  category?: Category;
}
