import { ActionFunction } from 'react-router-dom';
import {
  ActionMethods,
  ApiPath,
  TransactionApiPath,
} from '../../../common/enums/enums';
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
      toast.success('Transaction was updated successfully');

      return null;
    }
    case ActionMethods.DELETE: {
      const formDate = await request.formData();
      const transactionId = formDate.get('id');
      await instance.delete(
        `${ApiPath.TRANSACTIONS}${TransactionApiPath.TRANSACTION}/${transactionId}`,
      );
      toast.success('Transaction was deleted successfully');
      return null;
    }
    default:
      break;
  }
};

export { transactionsActions };
