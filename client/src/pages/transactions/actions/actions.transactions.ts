import { ActionFunction } from 'react-router-dom';
import { ActionMethods, ApiPath } from '../../../common/enums/enums';
import { instance } from '../../../api/axios.api';
import { toast } from 'react-toastify';

const transactionsActions: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case ActionMethods.POST: {
      const formDate = await request.formData();

      const transaction = {
        title: formDate.get('title'),
        type: formDate.get('type'),
        amount: formDate.get('amount'),
        category: {
          id: formDate.get('categoryId'),
        },
      };

      await instance.post(`${ApiPath.TRANSACTIONS}`, transaction);
      toast.success('Transaction added successfully');
      return null;
    }
    case ActionMethods.PATCH: {
      return null;
    }
    case ActionMethods.DELETE: {
      return null;
    }
    default:
      break;
  }
};

export { transactionsActions };
