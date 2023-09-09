import { instance } from '../../../api/axios.api';
import { ApiPath, TransactionApiPath } from '../../../common/enums/enums';
import { ICategoryItem } from '../../categories/types';
import { ITransactionItem, ITransactionsLoaderResponse } from '../types/types';

const transactionsLoader = async (): Promise<ITransactionsLoaderResponse> => {
  const categories = await instance.get<ICategoryItem[]>(
    `${ApiPath.CATEGORIES}`,
  );
  const transactions = await instance.get<ITransactionItem[]>(
    `${ApiPath.TRANSACTIONS}`,
  );
  const totalIncome = await instance.get<number>(
    `${ApiPath.TRANSACTIONS}${TransactionApiPath.INCOME}${TransactionApiPath.FIND}`,
  );
  const totalExpense = await instance.get<number>(
    `${ApiPath.TRANSACTIONS}${TransactionApiPath.EXPENSE}${TransactionApiPath.FIND}`,
  );
  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };
  return data;
};

export { transactionsLoader };
