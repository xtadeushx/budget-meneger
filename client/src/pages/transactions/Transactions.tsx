import TransactionsForm from "./components/form/TransactionsForm";
import { TransactionsStatistic } from "./components/statistic/TransactionsStatistic";
import { TransactionsTable } from "./components/table/TransactionsTable";

const Transactions: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* Add transaction form */}
        <div className="grid col-span-2">
          <TransactionsForm />
        </div>
        {/* Statistic block */}
        <TransactionsStatistic />
      </div>
      {/* Transaction */}
      <div className="my5">
        <TransactionsTable limit={2} />
      </div>
    </>
  )
}

export { Transactions };