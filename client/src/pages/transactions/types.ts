import { ICategoryItem } from '../categories/types';

export interface ITransactionsLoaderResponse {
  categories: ICategoryItem[];
  transactions: ITransactionItem[];
}
export interface ITransactionItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
  amount: number;
  createAt: string;
  id: number;
  title: string;
  type?: 'income' | 'expense';
  updatedAt?: string;
}
