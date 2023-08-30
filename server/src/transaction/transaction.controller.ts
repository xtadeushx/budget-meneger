import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpCode } from 'src/common/enums/http/http-code';
import { ApiPath } from 'src/common/enums/enums';
import { ResponseCreateTransactionDto } from './response/create-transaction.dto';

@Controller(ApiPath.TRANSACTION)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiTags('API')
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: HttpCode.CREATED,
    type: ResponseCreateTransactionDto,
  })
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req,
  ): Promise<ResponseCreateTransactionDto> {
    const { id } = req.user;
    return this.transactionService.create(createTransactionDto, +id);
  }

  @ApiTags('API')
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
  })
  findAll(@Req() req) {
    const { id } = req.user;
    return this.transactionService.findAll(+id);
  }

  @ApiTags('API')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
  })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: HttpCode.OK,
  })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @ApiTags('API')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
  })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
