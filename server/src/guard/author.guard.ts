import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params;
    let entity;

    switch (type) {
      case 'transaction':
        entity = this.transactionService.findOne(id);
        break;
      case 'category':
        entity = this.categoryService.findOne(id);
        break;
      default:
        throw new BadRequestException('something went wrong...');
    }

    const user = request.user;
    if (entity && user && entity.user.id === user.id) {
      return true;
    }
    throw new BadRequestException('something went wrong...');
  }
}
