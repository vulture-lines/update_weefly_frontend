import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EarthImage from "../../assets/images/agentdashboard/earth.png";
import EarthImagenew from "../../assets/images/agentdashboard/new.png";
const chartData = [
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

const regionData = [
  { region: "North America", color: "bg-red-400", width: "w-[60%]" },
  { region: "Southen America", color: "bg-orange-400", width: "w-[45%]" },
  { region: "Africa", color: "bg-pink-400", width: "w-[50%]" },
  { region: "Asia", color: "bg-yellow-400", width: "w-[40%]" },
  { region: "Australia", color: "bg-violet-500", width: "w-[35%]" },
];

const formatYAxis = (value) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
};

export default function DashboardChartSection() {
  return (
    <div className="flex gap-[21px] font-[Lato] ml-[20px]">
      {/* Sales Performance Chart */}
      <div className="w-[393px] h-[330px] bg-white rounded-[12px] shadow-sm px-[30px] pt-[24px] pb-[20px]">
        <div className="flex justify-between items-center mb-[10px]">
          <h2 className="text-[18px] font-semibold leading-[24px]">
            Sales performance
          </h2>
          <select className="border px-[8px] py-[2px] text-[14px] rounded-[6px] outline-none">
            <option>Yearly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={formatYAxis}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "6px",
                  border: "1px solid #f3f4f6",
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                }}
                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                itemStyle={{ fontSize: "13px", lineHeight: "1.3" }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#000000"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#FB7185"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traveler Origins Section */}

      <div className="w-[400px] h-[330px] bg-white rounded-[12px] shadow-sm px-[24px] py-[20px] flex flex-col font-[Lato]">
        {/* Title */}
        <h2 className="text-[18px] font-semibold mb-4">
          Traveler Origins by Region
        </h2>

        {/* Content Section */}
        <div className="flex items-start">
          {/* Earth Image */}
          <div className="w-[220px] flex items-center justify-center">
            <img
              src={EarthImage}
              alt="Earth"
              className="w-[300px] h-[250px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
            />
          </div>
          {/* <div className="w-[220px] flex items-center justify-center">
            <img
              src={EarthImagenew}
              alt="Earth"
              className=" object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
            />
          </div> */}
          {/* Region Bars */}
          <div className="flex-1 pl-4 pt-[6px] space-y-3">
            {regionData.map((region, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-[2px]">
                  <span className="text-[13px] text-gray-600 w-[120px] truncate mr-[50px] ">
                    {region.region}
                  </span>
                </div>
                <div className="w-[100px] h-1 bg-gray-200 rounded-full">
                  <div
                    className={`${region.color} ${region.width} h-full rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
