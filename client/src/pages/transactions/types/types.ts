import { ICategoryItem } from '../../categories/types';

export interface ITransactionItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
  amount: number;
  createAt: string;
  id: number;
  title: string;
  type?: ITransactionType;
  updatedAt?: string;
}

type ITransactionType = 'income' | 'expense';

export interface ITransactionsLoaderResponse {
  categories: ICategoryItem[];
  transactions: ITransactionItem[];
  totalIncome: number;
  totalExpense: number;
}
