import { Minus, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import KidsMeal from "../../../assets/images/meals/KidsMeal.jpg";
import NonVegMeal from "../../../assets/images/meals/NonVegMeal.jpg";
import SpecialMeal from "../../../assets/images/meals/SpecialMeal.jpg";
import VegMeal from "../../../assets/images/meals/VegMeal.jpg";
import { useTranslation } from "react-i18next";

export default function AgentSeatSelection() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeTab, setActiveTab] = useState("Seats");
  const [mealCounts, setMealCounts] = useState({});
  const [luggageCounts, setLuggageCounts] = useState({});

  const mealsList = [
    {
      name: `${t("meals.vegMeal")}`,
      src: VegMeal,
      price: 12,
    },
    { name: `${t("meals.nonVegMeal")}`, src: NonVegMeal, price: 15 },
    { name: `${t("meals.kidsMeal")}`, src: KidsMeal, price: 10 },
    { name: `${t("meals.specialMeal")}`, src: SpecialMeal, price: 20 },
  ];
  const ExtraLuggages = [
    {
      name: `${t("luggages.luggage")} 5KG`,
      src: "https://t4.ftcdn.net/jpg/04/66/06/43/360_F_466064335_04MRapnpqJgXlXEKZaYPMhrUVxDt1OYV.jpg",
      price: 12,
    },
    {
      name: `${t("luggages.luggage")} 15KG`,
      src: "https://t4.ftcdn.net/jpg/12/18/68/43/360_F_1218684354_iksVUo0R81UUcvZ55iNeCExPrvtgZcMk.jpg",
      price: 20,
    },
    {
      name: `${t("luggages.luggage")} 25KG`,
      src: "https://t4.ftcdn.net/jpg/01/16/94/15/360_F_116941514_j9jLAQMxaZczLoh5uV0LaoNaPaPAlkgL.jpg",
      price: 25,
    },
    {
      name: `${t("luggages.luggage")} 35KG`,
      src: "https://www.shutterstock.com/image-photo/two-stylish-plastic-luggage-suitcases-600nw-2176706263.jpg",
      price: 35,
    },
  ];

  useEffect(() => {
    if (location.state && location.state.flight) {
      setFlight(location.state.flight);
    }
  }, [location]);

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleMealCountChange = (mealName, delta) => {
    setMealCounts((prev) => {
      const newCount = (prev[mealName] || 0) + delta;
      return {
        ...prev,
        [mealName]: newCount < 0 ? 0 : newCount,
      };
    });
  };
  const handleLuggageCountChange = (luggageName, delta) => {
    setLuggageCounts((prev) => {
      const newCount = (prev[luggageName] || 0) + delta;
      return {
        ...prev,
        [luggageName]: newCount < 0 ? 0 : newCount,
      };
    });
  };

  if (!flight)
    return <div className="text-center mt-20 font-['Lato']">Loading...</div>;

  return (
    <div className="font-sans flex justify-center">
      <div className="w-full max-w-[1140px] px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Section: Dynamic Content Based on Active Tab */}
          <div className="w-full lg:max-w-[680px] order-2 lg:order-1">
            <div className="w-full h-auto lg:h-[550px] rounded-md shadow-sm overflow-hidden bg-white">
              {/* Tabs */}
              <div className="flex items-center px-6 bg-[#EE5128] py-3 space-x-8 font-['Plus Jakarta Sans'] text-[16px]">
                {["Seats", "Meals", "Extra luggages"].map((tab) => (
                  <span
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-white font-semibold relative flex gap-2 cursor-pointer ${
                      activeTab === tab ? "border-b-2 border-white" : ""
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-start gap-6 p-6 w-full">
                {/* Left Content Based on Active Tab */}
                <div className="w-full md:w-[260px] flex-shrink-0">
                  {activeTab === "Seats" && (
                    <>
                      <div className="text-[14px] font-semibold flex justify-between">
                        <span>
                          {new Date(flight?.departureTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                        <span>
                          {new Date(flight?.arrivalTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <div className="text-[12px] text-gray-500 flex justify-between mb-1">
                        <span>{flight.departureCity}</span>
                        <span>{flight.arrivalCity}</span>
                      </div>
                      <div className="text-center text-[12px] text-gray-500 bottom-9 relative">
                        {flight.duration} ✈
                      </div>
                      <img
                        src={flight.logo}
                        alt="logo"
                        className="h-[40px] object-contain mt-1 mb-1 relative"
                      />
                      <p className="text-[13px] text-gray-400 relative left-[8px]">
                        {flight.flightNumber}
                      </p>
                      <p className="bg-green-600 text-white text-[12px] px-2 py-[2px] rounded w-fit bottom-6 left-[65px] relative mt-1">
                        Business
                      </p>
                      <div className="mt-5 w-full md:w-[200px] h-[100px]">
                        <p className="font-semibold text-[14px] mb-2 relative left-2">
                          Seat fare :
                        </p>
                        <div className="border rounded-md bg-white px-3 py-4 text-sm h-full flex flex-col justify-between">
                          <div className="flex justify-between">
                            <span>{t("seats.adult")} 2 :</span>
                            <span>$800</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>{t("seats.totalFare")} :</span>
                            <span>$800</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-12">
                        <p className="font-semibold text-[14px] mb-2">
                          {t("seats.type.title")} :
                        </p>
                        <div className="grid grid-cols-2 text-[12px] gap-y-2 gap-x-4">
                          <span>
                            <span className="inline-block w-6 h-4 bg-green-700 mr-2" />
                            {t("seats.type.free")}
                          </span>
                          <span>
                            <span className="inline-block w-6 h-4 bg-blue-500 mr-2" />
                            $300-500
                          </span>
                          <span>
                            <span className="inline-block w-6 h-4 bg-purple-700 mr-2" />
                            $300-500
                          </span>
                          <span>
                            <span className="inline-block w-6 h-4 bg-yellow-400 mr-2" />
                            $300-500
                          </span>
                          <span>
                            <span className="inline-block w-6 h-4 bg-indigo-300 mr-2" />
                            $300-500
                          </span>
                          <span>
                            <span className="inline-block w-6 h-4 bg-pink-400 mr-2" />
                            $300-500
                          </span>
                          <span>
                            <span className="inline-block w-6 h-4 bg-sky-500 mr-2" />
                            {t("seats.type.non-reclining")}
                          </span>
                          <span>
                            <span className="inline-block w-6 h-4 bg-black mr-2" />
                            {t("seats.type.exit-seats")}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "Meals" && (
                    <div className="w-full">
                      <p className="font-semibold text-[16px] mb-4">
                        {t("meals.title")}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full overflow-auto h-[400px] no-scrollbar">
                        {mealsList.map((meal, index) => (
                          <div
                            key={index}
                            className="rounded-md w-full flex flex-col justify-between p-4 bg-white shadow-sm"
                          >
                            <img
                              src={meal.src}
                              alt={meal.name}
                              className="w-full h-[120px] object-contain mb-3 rounded"
                            />
                            <div className="">
                              <div className="flex flex-col justify-between items-left mb-2">
                                <span className="font-base text-base">
                                  {meal.name}
                                </span>
                                <span className="font-bold">${meal.price}</span>
                              </div>
                              <div className="flex items-center justify-center space-x-4">
                                <button
                                  className="w-8 h-8 text-xl font-semibold p-2 flex justify-center items-center rounded-md bg-[#EE5128] text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200 cursor-pointer"
                                  onClick={() =>
                                    handleMealCountChange(meal.name, -1)
                                  }
                                >
                                  <Minus />
                                </button>
                                <span className="text-lg font-medium">
                                  {mealCounts[meal.name] || 0}
                                </span>
                                <button
                                  className="w-8 h-8 text-xl font-semibold p-2 flex justify-center items-center rounded-md bg-[#EE5128] text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200 cursor-pointer"
                                  onClick={() =>
                                    handleMealCountChange(meal.name, 1)
                                  }
                                >
                                  <Plus />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === "Extra luggages" && (
                    <div className="w-full">
                      <p className="font-semibold text-[16px] mb-4">
                        {t("luggages.title")}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full overflow-auto h-[400px] no-scrollbar">
                        {ExtraLuggages.map((Luggage, index) => (
                          <div
                            key={index}
                            className="rounded-md w-full flex flex-col justify-between p-4 bg-white shadow-sm"
                          >
                            <img
                              src={Luggage.src}
                              alt={Luggage.name}
                              className="w-full h-[120px] object-contain mb-3 rounded"
                            />
                            <div className="">
                              <div className="flex flex-col justify-between items-center mb-2">
                                {/* <span className="font-base text-base ">
                                  {Luggage.name}
                                </span> */}

                                <span className="font-base text-base whitespace-nowrap overflow-hidden text-ellipsis">
                                  {Luggage.name}
                                </span>
                              </div>
                              <div className="flex justify-center">
                                <span className="font-bold text-center">
                                  ${Luggage.price}
                                </span>
                              </div>

                              <div className="flex items-center justify-center space-x-4">
                                <button
                                  className="w-8 h-8 text-xl font-semibold p-2 flex justify-center items-center rounded-md bg-[#EE5128] text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200 cursor-pointer"
                                  onClick={() =>
                                    handleLuggageCountChange(Luggage.name, -1)
                                  }
                                >
                                  <Minus />
                                </button>
                                <span className="text-lg font-medium">
                                  {luggageCounts[Luggage.name] || 0}
                                </span>
                                <button
                                  className="w-8 h-8 text-xl font-semibold p-2 flex justify-center items-center rounded-md bg-[#EE5128] text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200 cursor-pointer"
                                  onClick={() =>
                                    handleLuggageCountChange(Luggage.name, 1)
                                  }
                                >
                                  <Plus />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Seat Capsule */}
                <div className="relative w-full md:w-[300px] md:ml-12 md:bottom-6 mx-auto">
                  <div className="relative h-[500px] md:h-[540px] bg-[url('/assets/seat-1.png')] bg-cover bg-center overflow-hidden">
                    <div className="h-full w-full overflow-x-hidden overflow-y-auto md:pr-1 no-scrollbar">
                      <style jsx>{`
                        .no-scrollbar::-webkit-scrollbar {
                          display: none;
                        }
                        .no-scrollbar {
                          -ms-overflow-style: none;
                          scrollbar-width: none;
                        `}</style>
                      <div className="w-[240px] h-[900px] bg-white rounded-t-[140px] rounded-b-[40px] mt-15 shadow-inner flex flex-col pt-4 px-4 mx-auto">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="text-sm font-semibold mb-3">
                            Front
                          </div>
                          <div className="flex justify-between w-full px-2 mb-2 text-xs font-semibold">
                            <div className="flex gap-2">
                              {["A", "B", "C"].map((l) => (
                                <span key={l} className="w-5 text-center">
                                  {l}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {["D", "E", "F"].map((l) => (
                                <span key={l} className="w-5 text-center">
                                  {l}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {Array.from({ length: 30 }, (_, i) => {
                            const row = i + 1;
                            return (
                              <div
                                key={row}
                                className="flex items-center justify-between gap-2"
                              >
                                <span className="text-xs w-4 text-right">
                                  {row}
                                </span>
                                <div className="flex gap-1">
                                  {["A", "B", "C"].map((col) => {
                                    const seatId = `${col}${row}`;
                                    const isSelected =
                                      selectedSeats.includes(seatId);
                                    const isBooked = ["C2", "C4"].includes(
                                      seatId
                                    );
                                    return (
                                      <div
                                        key={seatId}
                                        onClick={() =>
                                          !isBooked && handleSeatSelect(seatId)
                                        }
                                        className={`w-5 h-5 rounded-sm cursor-pointer ${
                                          isBooked
                                            ? "bg-black"
                                            : isSelected
                                            ? "bg-[#EE5128]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                    );
                                  })}
                                </div>
                                <div className="w-3" />
                                <div className="flex gap-1">
                                  {["D", "E", "F"].map((col) => {
                                    const seatId = `${col}${row}`;
                                    const isSelected =
                                      selectedSeats.includes(seatId);
                                    const isBooked = ["C2", "C4"].includes(
                                      seatId
                                    );
                                    return (
                                      <div
                                        key={seatId}
                                        onClick={() =>
                                          !isBooked && handleSeatSelect(seatId)
                                        }
                                        className={`w-5 h-5 rounded-sm cursor-pointer ${
                                          isBooked
                                            ? "bg-black"
                                            : isSelected
                                            ? "bg-[#EE5128]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                    );
                                  })}
                                </div>
                                <span className="text-xs w-4 text-left">
                                  {row}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - On mobile, will display at the top */}
          <div className="flex flex-col gap-6 w-full lg:max-w-[360px] order-1 lg:order-2">
            {/* Booking Details - First on mobile */}
            <div className="h-auto md:h-[280px] bg-white rounded-[12px] shadow-sm overflow-hidden">
              <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                <h2 className="font-semibold text-[18px] font-['Plus Jakarta Sans']">
                  {t("booking-details.title")}
                </h2>
              </div>
              <div className="flex justify-between items-center px-6 mt-[20px]">
                <div className="text-center">
                  <p className="text-[20px] font-bold font-['Plus Jakarta Sans']">
                    {/* {flight.departureTime} */}
                    {new Date(flight?.departureTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-['Lato']">
                    {flight.departureCity}
                  </p>
                </div>
                <div className="flex flex-col items-center relative">
                  <p className="text-xs text-gray-500 mb-[2px] font-['Lato']">
                    {flight.duration}
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                    <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                    <span className="text-black text-sm">✈</span>
                    <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                    <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                  </div>
                  <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded font-['Lato']">
                    Refundable
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[20px] font-bold font-['Plus Jakarta Sans']">
                    {/* {flight.arrivalTime} */}
                    {new Date(flight?.arrivalTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-['Lato']">
                    {flight.arrivalCity}
                  </p>
                </div>
              </div>
              <div className="flex justify-between px-6 mt-6">
                <div className="text-left w-1/2 border-r pr-4">
                  <p className="text-sm font-semibold text-black font-['Plus Jakarta Sans']">
                    {t("booking-details.departure")}
                  </p>
                  <p className="text-xs text-gray-500 mt-[2px] font-['Lato']">
                    Thu, 06 Jul, 2025
                  </p>
                </div>
                <div className="text-left w-1/2 pl-4">
                  <p className="text-sm font-semibold text-black font-['Plus Jakarta Sans']">
                    {t("booking-details.landing")}
                  </p>
                  <p className="text-xs text-gray-500 mt-[2px] font-['Lato']">
                    Thu, 06 Jul, 2025
                  </p>
                </div>
              </div>
              <div className="flex justify-around mt-6 mb-4 text-sm font-medium font-['Plus Jakarta Sans'] ml-2">
                <span className="relative mr-8">
                  {t("booking-details.policy")}
                </span>
                <span>{t("booking-details.refund")}</span>
                <span>{t("booking-details.reschedule")}</span>
              </div>
            </div>

            {/* Price Summary - Second on mobile */}
            <div className="bg-white rounded-md shadow-sm">
              <div className="bg-[#FFE4DB] p-4 font-semibold font-['Plus Jakarta Sans']">
                {t("summary.title")}
              </div>
              <div className="p-4 space-y-3 text-[14px] text-black font-['Lato']">
                <div className="flex justify-between">
                  <span>{t("summary.adult")} x 1</span>
                  <span className="font-semibold flex gap-1">
                    <span>{flight.currency}</span>
                    <span>{flight.price.toLocaleString()}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("summary.totalTax")} +</span>
                  <span className="font-semibold flex gap-1">
                    <span>{flight.currency}</span> <span>500.00</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("summary.otherCharged")}</span>
                  <span className="font-semibold flex gap-1">
                    {" "}
                    <span>{flight.currency}</span> <span>200.00</span>
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3 text-[#EE5128] font-semibold">
                  <span>{t("summary.total")}</span>
                  <span>
                    {" "}
                    <span>{flight.currency}</span>{" "}
                    <span>
                      {(parseFloat(flight.price) + 500 + 200).toLocaleString(
                        "en-ZA",
                        { minimumFractionDigits: 2 }
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 w-full lg:max-w-[656px] mx-auto text-center lg:ml-[-215px] flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            onClick={() =>
              navigate("/agent-dashboard/booking/payment", {
                state: { flight },
              })
            }
            className="bg-[#EE5128] text-white px-6 py-2 lg:relative lg:left-5 rounded font-semibold font-['Plus Jakarta Sans'] w-full md:w-auto hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
          >
            {t("continue-booking")}
          </button>
          <button className="text-[#EE5128] font-semibold text-sm lg:relative lg:left-16 mt-2 md:mt-0 hover:underline">
            {t("skip-extra")}
          </button>
        </div>
      </div>
    </div>
  );
}
