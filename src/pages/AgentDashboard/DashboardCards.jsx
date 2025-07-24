import React from "react";
import EarningsIcon from "../../assets/images/agentdashboard/earnings.png";
import UsersIcon from "../../assets/images/agentdashboard/earnings.png";
import RecurringIcon from "../../assets/images/agentdashboard/earnings.png";
import ArrowUp from "../../assets/images/agentdashboard/vector.png";

const cardData = [
  {
    id: 1,
    title: "Total Earnings",
    value: "$12,000",
    icon: EarningsIcon,
    growth: "12%",
  },
  {
    id: 2,
    title: "Total Users",
    value: "200",
    icon: UsersIcon,
    growth: "12%",
  },
  {
    id: 3,
    title: "Recurring Users",
    value: "20",
    icon: RecurringIcon,
    growth: "12%",
  },
];

export default function StatCards() {
  return (
    <div className=" flex flex-wrap lg:flex-nowrap  gap-[20px] px-6 py-8 font-[Lato]">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="w-[255px] h-[117px] bg-white rounded-[5px] shadow-sm px-[16px] py-[16px] relative"
        >
          {/* 3-dot menu */}
          <div className="absolute top-[14px] right-[16px] flex space-x-[3px]">
            <div className="w-[4px] h-[4px] bg-black rounded-full" />
            <div className="w-[4px] h-[4px] bg-black rounded-full" />
            <div className="w-[4px] h-[4px] bg-black rounded-full" />
          </div>

          {/* Card Content */}
          <div className="flex items-center h-full gap-[12px]">
            {/* Icon */}
            <div className="w-[53px] h-[53px] bg-[#FFE7E3] rounded-full flex items-center justify-center">
              <img
                src={card.icon}
                alt={card.title}
                className="w-[24px] h-[24px]"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
              <p className="text-[15px] text-[#A3A3A3] leading-[17px] mb-[2px]">
                {card.title}
              </p>
              <div className="flex items-center">
                <p
                  className="text-[30px] font-bold text-black leading-[36px]"
                  style={{ width: "112px", height: "36px" }}
                >
                  {card.value}
                </p>
                <span className="flex items-center ml-[8px] h-[16px] px-[6px] rounded-full bg-[#DFFFE2] text-[10px] text-[#14B851] font-semibold">
                  {card.growth}
                  <img
                    src={ArrowUp}
                    alt="arrow"
                    className="w-[10px] h-[10px] ml-[3px]"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
