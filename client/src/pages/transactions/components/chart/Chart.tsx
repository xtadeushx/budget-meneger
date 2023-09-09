import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface IChartProps {
  totalIncome: number,
  totalExpense: number
}

const COLORS = ['#0d880d', '#e92604'];

const Chart: React.FC<IChartProps> = ({ totalIncome, totalExpense }) => {
  const data = [
    { name: 'income', value: totalIncome },
    { name: 'expense', value: totalExpense },
  ];
  return (

    <PieChart width={360} height={240}>
      <Pie
        data={data}
        cx={'50%'}
        cy={'50%'}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
}

export { Chart };