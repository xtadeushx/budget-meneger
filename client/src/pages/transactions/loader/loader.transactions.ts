import { instance } from '../../../api/axios.api';
import { ApiPath } from '../../../common/enums/enums';
import { ICategoryItem } from '../../categories/types';
import { ITransactionItem, ITransactionsLoaderResponse } from '../types';

const transactionsLoader = async (): Promise<ITransactionsLoaderResponse> => {
  const categories = await instance.get<ICategoryItem[]>(
    `${ApiPath.CATEGORIES}`,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transactions = await instance.get<ITransactionItem[]>(
    `${ApiPath.TRANSACTIONS}`,
  );
  const data = {
    categories: categories.data,
    transactions: transactions.data,
  };
  return data;
};

export { transactionsLoader };
