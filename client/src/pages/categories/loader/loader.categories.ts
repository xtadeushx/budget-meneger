import { instance } from '../../../api/axios.api';
import { ApiPath } from '../../../common/enums/enums';
import { ICategoryItem } from '../types';

const categoriesLoader = async (): Promise<ICategoryItem[]> => {
  const { data } = await instance.get<ICategoryItem[]>(`${ApiPath.CATEGORIES}`);
  return data;
};

export { categoriesLoader };
