import { ActionFunction } from 'react-router-dom';
import { ActionMethods } from '../../../common/enums/enums';

const transactionsActions: ActionFunction = ({ request }) => {
  switch (request.method) {
    case ActionMethods.POST: {
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
