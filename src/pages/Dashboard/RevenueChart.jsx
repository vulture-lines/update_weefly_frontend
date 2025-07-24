// export default function RevenueChart() {
//   return (
//     <div className="bg-white p-4 rounded shadow mt-6">
//       <p className="text-lg font-semibold mb-4">Total Revenue</p>
//       <img src="/revenue-chart.png" alt="Chart" className="w-full h-auto rounded" />
//     </div>
//   );
// }

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data similar to the chart in the image
const data = [
  { name: "Jan", earnings: 70000, expenses: 200000 },
  { name: "Feb", earnings: 150000, expenses: 280000 },
  { name: "Mar", earnings: 160000, expenses: 100000 },
  { name: "Apr", earnings: 200000, expenses: 350000 },
  { name: "May", earnings: 280000, expenses: 190000 },
  { name: "Jun", earnings: 387530, expenses: 230000 },
  { name: "Jul", earnings: 320000, expenses: 330000 },
  { name: "Aug", earnings: 180000, expenses: 280000 },
  { name: "Sep", earnings: 160000, expenses: 170000 },
  { name: "Oct", earnings: 180000, expenses: 126570 },
  { name: "Nov", earnings: 220000, expenses: 350000 },
  { name: "Dec", earnings: 230000, expenses: 360000 },
];

function RevenueChart() {
  // Format the y-axis values
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const line1 = payload.find((p) => p.dataKey === "earnings");
    const line2 = payload.find((p) => p.dataKey === "expenses");

    return (
      <div className="p-3 bg-white border border-gray-300 rounded shadow-md">
        <p className="font-bold">{`Month: ${label}`}</p>
        {line1 && (
          <p className="text-blue-500">{`Users Visited (earnings): ${line1.value}`}</p>
        )}
        {line2 && (
          <p className="text-green-500">{`Page Views (expenses): ${line2.value}`}</p>
        )}
      </div>
    );
  };
  return (
    <div className="h-[500px] p-4 rounded shadow bg-white mt-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Total Revenue</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary"></div>
            Earnings
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-black"></div>
            Expenses
          </div>
        </div>
      </div>
      <div className="w-full h-full p-10 rounded-3xl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              // vertical={false}
              //   vertical={false}
              horizontal={false}
              //   stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af" }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af" }}
              tickFormatter={formatYAxis}
              tickMargin={10}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#FF5B5B"
              strokeWidth={3}
              isAnimationActive={true}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#000000"
              strokeWidth={3}
              isAnimationActive={true}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Tooltip />
            {/* <Tooltip content={<CustomTooltip />} /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;

// #FF5B5B
