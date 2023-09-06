import { instance } from '../../../api/axios.api';
import { ApiPath } from '../../../common/enums/enums';
import { ICategoryItem } from '../../categories/types';
import { ITransactionsLoaderResponse } from '../types';

const transactionsLoader = async (): Promise<ITransactionsLoaderResponse> => {
  const categories = await instance.get<ICategoryItem[]>(
    `${ApiPath.CATEGORIES}`,
  );
  const data = {
    categories: categories.data,
  };
  return data;
};

export { transactionsLoader };
