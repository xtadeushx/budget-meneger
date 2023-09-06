import { ActionFunction } from 'react-router-dom';
import { instance } from '../../../api/axios.api';
import {
  ActionMethods,
  ApiPath,
  CategoryApiPath,
} from '../../../common/enums/enums';

const categoryActions: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case ActionMethods.POST: {
      const formData = await request.formData();
      const category = {
        title: formData.get('title'),
      };
      await instance.post(`${ApiPath.CATEGORIES}`, category);
      return null;
    }

    case ActionMethods.PATCH: {
      const formData = await request.formData();
      const category = {
        title: formData.get('title'),
        id: formData.get('id'),
      };
      await instance.patch(
        `${ApiPath.CATEGORIES}${CategoryApiPath.CATEGORY}/${category.id}`,
        category,
      );
      return null;
    }

    case ActionMethods.DELETE: {
      const formData = await request.formData();
      const categoryId = formData.get('id');

      await instance.delete(
        `${ApiPath.CATEGORIES}${CategoryApiPath.CATEGORY}/${categoryId}`,
      );
      return null;
    }
    default:
      break;
  }
};

export { categoryActions };
