import { useLoaderData } from "react-router-dom";
import { ITransactionsLoaderResponse } from "../../types/types";
import { formatToUSD } from "../../../../helpers/helpers";
import { Chart } from "../chart/Chart";

const TransactionsStatistic: React.FC = () => {
  const { totalExpense, totalIncome } = useLoaderData() as ITransactionsLoaderResponse;
  return (
    <div className="rounded-md bg-slate-800 p-3">
      <div className="grid col-span-2 gap-3">
        <div>
          <p className="flex uppercase text-md font-bold text-center">
            Total income
          </p>
          <p className="bg-green-600 p-1 rounded-sm text-center mt-2">
            {formatToUSD.format(totalIncome)}
          </p>
        </div>
        <div>
          <p className="flex uppercase text-md font-bold text-center">
            Total expense
          </p>
          <p className="bg-red-500 p-1 rounded-sm text-center mt-2">
            {formatToUSD.format(totalExpense)}
          </p>
        </div>
        <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
      </div>
    </div>
  )
}

export { TransactionsStatistic };