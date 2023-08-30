import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class ResponseCreateTransactionDto {
  @ApiProperty({ example: 'salary' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'title must be more than 4 symbols' })
  title: string;

  @ApiProperty({ example: 'income' })
  type: 'expense' | 'income';

  @ApiProperty({ example: '100' })
  amount: number;

  @ApiProperty({ example: '1' })
  @IsOptional()
  user?: {
    id: number;
  };
  @ApiProperty({ example: '2' })
  @IsOptional()
  category: {
    id: number;
  };
}
