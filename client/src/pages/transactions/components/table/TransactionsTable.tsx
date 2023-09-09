import ReactPaginate from "react-paginate";
import TransactionsTableItem from "../table-item/TransactionsTableItem";
import { useTransactionsPagination } from "../../hooks/hook.transactions";

interface ITransactionsTableProps {
  limit: number;
}

const TransactionsTable: React.FC<ITransactionsTableProps> = ({ limit = 3 }) => {

  const { setCurrentPage, transactionsData, totalPages } = useTransactionsPagination(limit)

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center"
        activeClassName="bg-blue-600 rounded-sm"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousClassName="text-white  py-1 px-2 bg-slate-500 dark:bg-slate-800  text-xs rounded-sm"
        nextClassName="text-white  py-1 px-2 bg-slate-500 dark:bg-slate-800  text-xs rounded-sm"
        disabledClassName="text-white/50 cursor-not-allowed"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
      <div className="bg-slate-500 dark:bg-slate-800 px-4 py-3 mt-4 rounded-md">
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
            {transactionsData?.length > 0 && transactionsData.map((el, ind) => (
              <TransactionsTableItem
                key={el.id}
                ind={ind}
                title={el.title}
                amount={el.amount}
                id={el.id}
                createAt={el.createAt}
                category={el?.category.title}
                type={el.type}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export { TransactionsTable };