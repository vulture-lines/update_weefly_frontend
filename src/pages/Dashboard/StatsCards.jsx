import { useState } from "react";
import { Building2, Banknote, Plane, Wallet } from "lucide-react";

const stats = [
  {
    label: "Total Booking",
    value: "19280",
    icon: Building2,
  },
  {
    label: "Total Revenue",
    value: "$29382",
    icon: Banknote,
  },
  {
    label: "Active flights",
    value: "05",
    icon: Plane,
  },
  {
    label: "Total Expenses",
    value: "$5366",
    icon: Wallet,
  },
];

export default function StatsCards() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {stats.map((item, index) => {
        const isActive = index === activeIndex;
        const Icon = item.icon;

        return (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`min-w-[249px] h-[132px] cursor-pointer rounded-md border border-gray-300 transition-all duration-200 p-4 flex flex-col justify-between ${
              isActive
                ? "bg-[#f9632c] text-white border-[#f9632c]"
                : "bg-white text-black"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${
                  isActive ? "bg-white" : "bg-[#f9632c]"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  color={isActive ? "#f9632c" : "white"}
                />
              </div>
              <span
                className={`text-[14px] font-medium ${
                  isActive ? "text-white" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </div>

            <div>
              <p className="text-[22px] font-bold leading-none">{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
