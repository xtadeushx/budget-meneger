
const TransactionsStatistic: React.FC = () => {

  return (
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
  )
}

export { TransactionsStatistic };