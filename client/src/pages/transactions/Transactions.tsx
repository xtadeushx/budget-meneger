import TransactionsForm from "./components/form/TransactionsForm";

const Transactions: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* Add transaction form */}
        <div className="grid col-span-2">
          <TransactionsForm />
        </div>
        {/* Statistic block */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid col-span-2 gap-3">
            <div>
              <p className="flex uppercase text-md font-bold text-center">
                Total income
              </p>
              <p className="bg-green-600 p-1 rounded-sm text-center mt-2">
                1000$
              </p>
            </div>
            <div>
              <p className="flex uppercase text-md font-bold text-center">
                Total expense
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-center mt-2">
                500$
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Transaction */}
      <div className="my5">Table</div>
    </>
  )
}

export { Transactions };