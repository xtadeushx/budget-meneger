import { FaTrash } from "react-icons/fa"
import { ITransactionItem } from "../../types/types"
import { formateDate } from "../../../../helpers/date/date.helper"
import { Form } from "react-router-dom"
import { ApiPath } from "../../../../common/enums/enums"
import { formatToUSD } from "../../../../helpers/helpers"

interface ITransactionItemProps extends ITransactionItem {
  ind: number
  category: string
}

const TransactionsTableItem: React.FC<ITransactionItemProps> = ({
  type, id, ind, title, amount, createAt, category
}) => {
  return (
    <>
      <tr>
        <td>{ind + 1}</td>
        <td>{title}</td>
        <td className={
          type === 'income'
            ? 'text-green-500'
            : 'text-red-500'}>
          {type === 'income'
            ? `+ ${formatToUSD.format(amount)}`
            : `- ${formatToUSD.format(amount)}`}
        </td>
        <td>{category}</td>
        <td>{formateDate(createAt)}</td>
        <td>
          <Form className='flex' method='DELETE' action={`/${ApiPath.TRANSACTIONS}`}>
            <input type="hidden" name='id' value={id} />
            <button className="flex gap-2 items-center text-white px-4 py-2 rounded-md hover:btn-red ml-auto">
              <FaTrash />
            </button>
          </Form>
        </td>
      </tr>
    </>
  )
}

export default TransactionsTableItem