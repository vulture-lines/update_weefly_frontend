import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const paymentIcons = {
  upi: "/assets/paymentpage/upi.png",
  "debit-creditCard": "/assets/paymentpage/card.png",
  netBanking: "/assets/paymentpage/netbanking.png",
  wallet: "/assets/paymentpage/wallet.png",
  emi: "/assets/paymentpage/emi.png",
  payLater: "/assets/paymentpage/paylater.png",
};

export default function AgentPaymentPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const stored = location.state?.flight;
    if (stored) {
      setFlight(stored);
    }
  }, [location]);

  if (!flight)
    return <p className="text-center mt-20 font-['Lato']">Loading...</p>;

  return (
    <div className=" font-sans flex justify-center">
      <div className="w-full px-4">
        {/* <h1 className="text-[24px] font-semibold mb-12 relative left-[29px] font-['Plus Jakarta Sans'] ml-[14px]">
          Complete your Booking
        </h1>

        <div className="w-full max-w-[1090px] mx-auto flex items-center mb-10 relative justify-start gap-[214px]">
          <div className="absolute top-[32px] left-[28px] right-[28px] h-[1px] z-0 bg-[radial-gradient(circle,#D1D5DB_1px,transparent_1.5px)] bg-[length:10px_1px]" />
          {["Review your booking", "Travelers Details", "Seat Selection", "Payment"].map((label, index) => (
            <div key={index} className={`relative flex flex-col items-center ${index === 0 || index === 3 ? "w-[150px]" : "flex-1"}`}>
              <div className={`w-[56px] h-[56px] rounded-full text-white flex items-center justify-center text-[16px] font-semibold z-10 font-['Plus Jakarta Sans'] ${index === 3 ? "bg-[#EE5128]" : "bg-gray-400"}`}>
                {`0${index + 1}`}
              </div>
              <span className={`text-[14px] mt-2 text-center font-['Lato'] ${index === 3 ? "text-black font-semibold" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div> */}

        <div className="flex flex-col lg:flex-row justify-between gap-4 xl:gap-8">
          {/* Left */}
          {/* <div className="w-full lg:w-[740px] space-y-6"> */}
          <div className="w-full lg:max-w-[740px] space-y-6">
            <div className="rounded-md bg-white">
              <div className="flex flex-col md:flex-row space-y-6 py-6 justify-between items-center px-4 pt-4">
                <div className="flex flex-col min-w-[170px] relative">
                  <img
                    src={flight.logo}
                    alt={flight.airline}
                    className="w-[120px] h-[40px] object-contain mb-[25px]"
                  />
                  <div className="absolute top-[38px] left-[4px] flex items-center space-x-2">
                    <span className="text-[13px] text-gray-500">
                      {flight.flightNumber}
                    </span>
                    <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold">
                      {flight.class}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[22px] font-bold text-black">
                      {" "}
                      {new Date(flight?.departureTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      {flight.departureCity}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="text-black text-sm">✈</span>
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                    </div>
                    <span className="text-[12px] text-gray-400 mt-[4px]">
                      {flight.duration}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-[22px] font-bold text-black">
                      {new Date(flight?.arrivalTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      {flight.arrivalCity}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-center lg:items-end space-y-[2px] mt-12 w-[152px]">
                  <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                    <span className="text-[20px] pr-2">{flight.currency}</span>
                    {flight.price.toLocaleString()}
                    <span className="text-[12px] text-black font-normal">
                      /pax
                    </span>
                  </p>
                  <p className="text-[13px] text-gray-400 line-through font-normal leading-none">
                    {flight.currency}
                    {flight.originalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border-t border-[#CCCCCC] text-sm font-medium text-[#EE5128]">
                <div className="flex space-x-8">
                  <span>{t("booking-card.Flight-details")}</span>
                  <span className="hidden lg:block">
                    {t("booking-card.price-details")}
                  </span>
                  <span className="hidden lg:block">
                    {t("booking-card.policy")}
                  </span>
                  <span className="hidden lg:block">
                    {t("booking-card.refund")}
                  </span>
                  <span className="hidden lg:block">
                    {t("booking-card.reschedule")}
                  </span>
                </div>
                <button
                  className="bg-[#EE5128] text-white px-4 py-1.5 rounded font-semibold
             hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                >
                  {t("booking-card.book-now")}
                </button>
              </div>
            </div>

            {/* Payment Timing */}
            <div className="bg-white p-6 rounded-md shadow-sm ">
              <h2 className="text-[18px] font-semibold text-black mb-1">
                {t("paytime.title")}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Lorem ipsum Lorem ipsum Lorem ipsum
              </p>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked
                  className="accent-[#EE5128]"
                  readOnly
                />
                <span className="text-sm text-black">
                  {t("paytime.payNow")}
                </span>
                <input type="checkbox" disabled className="accent-[#ccc]" />
                <span className="text-sm text-gray-400">
                  {t("paytime.payLater")}
                </span>
              </label>
            </div>

            {/* Payment Methods */}

            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              <div className="bg-[#FFE4DB] p-4 font-semibold">
                Payment methods
              </div>
              <div className="divide-y divide-gray-300">
                {Object.entries(paymentIcons).map(([method, icon]) => (
                  <div
                    key={method}
                    className="flex items-center justify-between px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={icon}
                        alt={method}
                        className="w-6 h-6 object-contain"
                      />
                      <div>
                        <p className="font-semibold">
                          {t(`payment-methods.${method}`)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Lorem ipsum Lorem ipsum Lorem
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="text-gray-400" size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full relative lg:max-w-[360px] space-y-6">
            <div className="w-[360px] h-[280px] bg-white rounded-[12px]  shadow-sm overflow-hidden">
              <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                <h2 className="font-semibold text-[18px]">
                  {t("booking-details.title")}
                </h2>
              </div>
              <div className="flex justify-between items-center px-6 mt-[20px]">
                <div className="text-center">
                  <p className="text-[20px] font-bold">
                    {new Date(flight?.departureTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {flight.departureCity}
                  </p>
                </div>
                <div className="flex flex-col items-center relative">
                  <p className="text-xs text-gray-500 mb-[2px]">
                    {flight.duration}
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                    <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                    <span className="text-black text-sm">✈</span>
                    <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                    <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                  </div>
                  <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                    Refundable
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[20px] font-bold">
                    {" "}
                    {new Date(flight?.arrivalTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {flight.arrivalCity}
                  </p>
                </div>
              </div>
              <div className="flex justify-between px-6 mt-6">
                <div className="text-left w-1/2 border-r pr-4">
                  <p className="text-sm font-semibold">
                    {t("booking-details.departure")}
                  </p>
                  <p className="text-xs text-gray-500 mt-[2px]">
                    Thu, 06 Jul, 2025
                  </p>
                </div>
                <div className="text-left w-1/2 pl-4">
                  <p className="text-sm font-semibold">
                    {t("booking-details.landing")}
                  </p>
                  <p className="text-xs text-gray-500 mt-[2px]">
                    Thu, 06 Jul, 2025
                  </p>
                </div>
              </div>
              <div className="flex justify-around mt-6 text-sm font-medium ml-2">
                <span className="relative mr-8">
                  {t("booking-details.policy")}
                </span>
                <span>{t("booking-details.refund")}</span>
                <span>{t("booking-details.reschedule")}</span>
              </div>
            </div>

            {/* <div className="bg-white rounded-md  shadow-sm overflow-hidden">
              <div className="bg-[#FFE4DB] p-4 font-semibold">
                Price summary
              </div>
              <div className="p-4 space-y-3 text-[14px] text-black">
                <div className="flex justify-between">
                  <span>Adult x 1</span>
                  <span className="font-semibold">$2500</span>
                </div>
                <div className="flex justify-between">
                  <span>Total taxes +</span>
                  <span className="font-semibold">$500</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Charged</span>
                  <span className="font-semibold">$200</span>
                </div>
                <div className="flex justify-between border-t pt-3 text-[#EE5128] font-semibold">
                  <span>Total</span>
                  <span>$3200</span>
                </div>
              </div>
            </div> */}

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
      </div>
    </div>
  );
}
