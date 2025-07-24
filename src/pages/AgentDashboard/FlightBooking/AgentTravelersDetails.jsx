import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

function AgentTravelersDetails() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    if (location.state && location.state.flight) {
      setFlight(location.state.flight);
    }
  }, [location]);

  if (!flight)
    return <p className="text-center mt-20 font-sans ">Loading...</p>;

  return (
    <div className=" font-sans flex justify-center">
      <div className="w-full flex flex-col items-start">
        {/* Travelers + Booking side-by-side */}
        <div className="flex flex-col lg:flex-row gap-10 items-start w-full">
          {/* Travelers Details */}
          <div className="max-w-[656px] w-full min-h-[339px] bg-white rounded-md">
            <div className="bg-[#FFE4DB] p-3 rounded-t-md">
              <h2 className="font-semibold font-jakarta">
                {t("traveller-details.title")}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 px-6 py-4">
              {[
                "Full name",
                "last name",
                "Nationality",
                "Email",
                "Phone number",
                "Passport number",
                "Passport issuing country",
                "Passport entry",
                "Visa details",
                "Cancellation policy",
              ].map((field, idx) => (
                <input
                  key={idx}
                  placeholder={field}
                  className="border border-[#CCCCCC] rounded p-2 text-sm w-full"
                />
              ))}
            </div>
          </div>

          {/* Booking Details */}
          <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
            <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
              <h2 className="font-semibold text-[18px] font-jakarta">
                {t("booking-details.title")}
              </h2>
            </div>

            <div className="flex justify-between items-center px-6 mt-[20px]">
              <div className="text-center">
                <p className="text-[20px] font-bold font-jakarta">
                  {/* {flight.departureTime} */}
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
                <p className="text-[20px] font-bold font-jakarta">
                  {/* {flight.arrivalTime} */}
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
                <p className="text-sm font-semibold text-black font-jakarta m">
                  {t("booking-details.departure")}
                </p>
                <p className="text-xs text-gray-500 mt-[2px]">
                  Thu, 06 jul, 2025
                </p>
              </div>
              <div className="text-left w-1/2 pl-4">
                <p className="text-sm font-semibold text-black font-jakarta ml-5">
                  {t("booking-details.landing")}
                </p>
                <p className="text-xs text-gray-500 mt-[2px] ml-5">
                  Thu, 06 jul, 2025
                </p>
              </div>
            </div>

            <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
              <span>{t("booking-details.policy")}</span>
              <span className="ml-10">{t("booking-details.refund")}</span>
              <span>{t("booking-details.reschedule")}</span>
            </div>
          </div>
        </div>

        {/* Save Details Section */}
        <div className="w-full max-w-[656px] bg-white rounded-md p-6 mt-6 font-sans">
          <h3 className="font-semibold text-black mb-1 font-jakarta">
            {t("traveller-details.save-details.title")}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            {t("traveller-details.save-details.description")}
          </p>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="accent-[#EE5128] mt-[3px]" />
            <span className="text-sm">
              {t("traveller-details.save-details.term")}
            </span>
          </label>
        </div>

        {/* Continue Button */}
        <div className="mt-6  max-w-[656px] text-left">
          <button
            onClick={() =>
              navigate("/agent-dashboard/booking/SeatSelection", {
                state: { flight },
              })
            }
            className="bg-[#EE5128] text-white px-6 py-2 relative rounded font-semibold font-jakarta hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
          >
            {t("continue-booking")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentTravelersDetails;
