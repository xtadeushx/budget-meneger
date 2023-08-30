import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpCode } from 'src/common/enums/http/http-code';
import { ApiPath, TransactionApiPath } from 'src/common/enums/enums';
import { ResponseCreateTransactionDto } from './response/create-transaction.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller(ApiPath.TRANSACTIONS)
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
  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
  })
  findAllByType(@Req() req, @Param('type') type: string) {
    const { id } = req.user;
    return this.transactionService.findAllByType(+id, type);
  }

  @ApiTags('API')
  @Get(TransactionApiPath.PAGINATION)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
  })
  findAllWithPagination(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 3,
  ) {
    const { id } = req.user;
    return this.transactionService.findAllWithPagination(+id, +page, +limit);
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
  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
  })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @ApiTags('API')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch(':type/:id')
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
  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
  })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
