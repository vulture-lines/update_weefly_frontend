import React from "react";
import { ChevronDown } from "lucide-react";
import { bookingsData } from "../../bookingsData";

export default function Bookings() {
  return (
    <div className=" h-[835px] bg-white border border-gray-100 rounded-xl shadow-sm px-[43px] pt-[20px] pb-6 font-sans overflow-y-auto scroll-thin  scrollbar-thumb-gray-100 scrollbar-track-transparent mt-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[28px] font-semibold">All Bookings</h1>
        <select className="border border-gray-300 rounded px-4 py-2 text-sm w-[120px]">
          <option>Monthly</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex gap-[20px] mt-[40px] mb-[24px]">
        {/* Date Range */}
        <div className="bg-[#FAFAFA] px-[16px] py-[12px] rounded-md text-gray-400 text-sm w-[180px] flex justify-between items-center">
          <span>Date Range</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Booking Type */}
        <div className="bg-[#FAFAFA] px-[16px] py-[12px] rounded-md text-gray-400 text-sm w-[180px] flex justify-between items-center">
          <span>Booking type</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Booking Rows */}
      <div className="space-y-[24px] pr-1">
        {bookingsData.map((booking) => (
          <div
            key={booking.id}
            className="flex justify-between items-center border-b border-gray-200 pb-[16px]"
          >
            {/* Left Content */}
            <div className="flex gap-[16px] items-center w-full">
              <img
                src={booking.profileImg}
                alt="profile"
                className="w-[48px] h-[48px] rounded-md object-cover"
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center text-[14px] font-medium">
                  <span>{booking.name}</span>
                  <span className="text-black font-bold">
                    {booking.departureTime}
                  </span>
                  <img
                    src={booking.flightIcon}
                    alt="flight"
                    className="w-[80px] h-[28px] object-contain"
                  />
                  <span className="text-black font-bold">
                    {booking.arrivalTime}
                  </span>
                </div>
                <div className="flex justify-between text-[12px] text-gray-500 mt-[2px]">
                  <span>{booking.date}</span>
                  <span className="mr-8">{booking.from}</span>
                  <span className="mr-7">{booking.duration}</span>
                  <span>{booking.to}</span>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <button className="ml-4 bg-[#F45626] text-white text-[13px] font-semibold px-3 py-[5px] h-[30px] rounded-md whitespace-nowrap">
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
