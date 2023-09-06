import { FaTrash } from "react-icons/fa"
import { ITransactionItem } from "../../types"
import { formatDateShort } from "../../../../helpers/date/date-helper"

interface ITransactionItemProps extends ITransactionItem {
  ind: number
  category: string
}

const TransactionsTableItem: React.FC<ITransactionItemProps> = ({ ind, title, amount, createAt, category }) => {
  return (
    <>
      <tr>
        <td>{ind + 1}</td>
        <td>{title}</td>
        <td>{amount}</td>
        <td>{category}</td>
        <td>{formatDateShort(createAt)}</td>
        <td>
          <button className="flex gap-2 items-center text-white px-4 py-2 rounded-md hover:btn-red ml-auto">
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  )
}

export default TransactionsTableItem