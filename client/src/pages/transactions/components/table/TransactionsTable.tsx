import { useLoaderData } from "react-router-dom";
import { ITransactionsLoaderResponse } from "../../types";
import TransactionsTableItem from "../table-item/TransactionsTableItem";

const TransactionsTable: React.FC = () => {
  const { transactions } = useLoaderData() as ITransactionsLoaderResponse
  return (
    <>
      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold">№</td>
              <td className="font-bold">Title</td>
              <td className="font-bold">Amount($)</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Date</td>
              <td className="text-right">Action</td>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 && transactions.map((el, ind) => (
              <TransactionsTableItem
                key={el.id}
                ind={ind}
                title={el.title}
                amount={el.amount}
                id={el.id}
                createAt={el.createAt}
                category={el?.category.title}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export { TransactionsTable };