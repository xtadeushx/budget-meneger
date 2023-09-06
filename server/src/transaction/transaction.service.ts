import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCreateTransactionDto } from './response/create-transaction.dto';
import { ExceptionMessage } from 'src/common/enums/enums';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    id: number,
  ): Promise<ResponseCreateTransactionDto> {
    const { title, type, amount } = createTransactionDto;
    const newTransaction = {
      title,
      type,
      amount,
      user: { id },
      category: {
        id: +createTransactionDto.category.id,
      },
    };

    if (!newTransaction)
      throw new BadRequestException(ExceptionMessage.UNKNOWN_ERROR);
    this.transactionRepository.save(newTransaction);
    return newTransaction;
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: {
        category: true,
      },
      order: {
        createAt: 'DESC',
      },
    });
    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        user: true,
        category: true,
      },
    });
    if (!transaction)
      throw new NotFoundException(ExceptionMessage.TRANSACTION_NOT_EXISTS);
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        user: true,
        category: true,
      },
    });
    if (!transaction)
      throw new NotFoundException(ExceptionMessage.TRANSACTION_NOT_EXISTS);
    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const existTransaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        user: true,
        category: true,
      },
    });
    if (!existTransaction)
      throw new NotFoundException(ExceptionMessage.TRANSACTION_NOT_EXISTS);
    await this.transactionRepository.delete({ id: id });
    return `The category with #${id} was removed`;
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: {
        category: true,
        user: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return transactions;
  }

  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
        type,
      },
    });
    const total = transactions.reduce((acc, prew) => acc + prew.amount, 0);
    return total;
  }
}
