import { toast } from 'react-toastify';
import { instance } from '../api/axios.api';
import { ApiPath, CategoryApiPath } from '../common/enums/enums';
import { ICategoryItem } from '../pages/categories/types';

class CategoryService {
  constructor() {}

  public async addCategory(category: { title: string }) {
    const { data } = await instance.post<ICategoryItem>(
      `${ApiPath.CATEGORIES}`,
      category,
    );
    toast.success('Category was added successfully');
    if (data) return data;
  }

  public async getAllCategories(): Promise<ICategoryItem[] | undefined> {
    const { data } = await instance.get<ICategoryItem[]>(
      `${ApiPath.CATEGORIES}`,
    );
    if (data) return data;
  }

  public async updateCategory(category: { title: string; id: number }) {
    await instance.patch(
      `${ApiPath.CATEGORIES}${CategoryApiPath.CATEGORY}/${category.id}`,
      category,
    );
    toast.success('Category was updated successfully');
  }

  public async removeCategory(id: number) {
    await instance.delete(
      `${ApiPath.CATEGORIES}${CategoryApiPath.CATEGORY}/${id}`,
    );
    toast.success('Category was deleted successfully');
  }
}

const categoryService = new CategoryService();

export { categoryService };
