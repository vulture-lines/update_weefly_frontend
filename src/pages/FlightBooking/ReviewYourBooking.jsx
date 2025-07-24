import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
import AirIndiaLogo from "../../assets/images/AirIndiaLogo.svg";
import FlightLogo from "../../assets/images/FlightIcon.svg";
import White_Concierge from "../../assets/images/ReviewYourBooking/White_Concierage.svg";
import White_Money_Exchange from "../../assets/images/ReviewYourBooking/white_money_exchange.svg";
import White_eSim from "../../assets/images/ReviewYourBooking/white_eSim.svg";
import White_Extra_Luggage from "../../assets/images/ReviewYourBooking/White_Extra_luggage.svg";
import White_Visa_Process from "../../assets/images/ReviewYourBooking/White_Visa_process.svg";
import { useTranslation } from "react-i18next";

import {
  fetchExchangeRates,
  convertToRequestedCurrency,
} from "../../utils/Currencyconverter";
import {
  ArrowRight,
  Check,
  Dot,
  Info,
  PercentCircleIcon,
  X,
} from "lucide-react";

const ServicesOfferedIcons = [
  { Image: White_Concierge, label: "Meal" },
  // { Image: White_Money_Exchange, label: "Money exchange" },
  // { Image: White_eSim, label: "E-sim / Internet" },
  { Image: White_Extra_Luggage, label: "Extra luggage" },
  { Image: White_Visa_Process, label: "Visa process" },
];

export default function ReviewYourBooking() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  //   const [flight, setFlight] = useState(null);
  const TicketData = location.state;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [AlternativeFares, setAlternativeFares] = useState([]);
  const [structuredFeatures, setstructuredFeatures] = useState([]);
  const [seatOptions, setseatOptions] = useState([]);
  const [luggageOptions, setluggageOptions] = useState([]);
  const [tickets, setTickets] = useState([]);
  /*console.log(TicketData.outwordTicketId);
  console.log(TicketData.returnTicketId);
  console.log("tripType", TicketData.tripType);
  console.log("travalers", TicketData.travalers); */
  const [supportedCards, setsupportedCards] = useState([]);

  // useEffect(() => {
  //   if (location.state && location.state.tripType) {
  //     // setFlight(location.state.flight);
  //     const data =  {location.state.outwordTicketId,
  // 			location.state.returnTicketId,
  // 			location.state.routingId,
  // 			location.state.tripType}
  //     console.log(data);

  //   }
  // }, [location]);

  // useEffect(() => {
  // 	if (location.state && location.state.tripType) {
  // 		const data = {
  // 			outwordTicketId: location.state.outwordTicketId,
  // 			returnTicketId: location.state.returnTicketId,
  // 			routingId: location.state.routingId,
  // 			tripType: location.state.tripType,
  // 		}
  // 		console.log(data)
  // 	}
  // }, [location])

  // console.log(TicketData.outwordTicketId);
  const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;

  /*function parseFeaturesToTable(featuresJson) {
    const fareClasses = ["Standard", "Inclusive", "Inclusive Plus"];
    const table = [
      [
        "Feature",
        "Regular (Standard)",
        "Flexi (Inclusive)",
        "Super6E (Inclusive Plus)",
      ],
    ];

    for (const feature of featuresJson) {
      const featureType = feature?.["$"]?.Label || feature?.["$"]?.Type;
      const row = [featureType];

      const classMap = {
        Standard: "-",
        Inclusive: "-",
        "Inclusive Plus": "-",
      };

      for (const option of feature.Option || []) {
        const id = option.$.Id;
        const value = option.$.Value || option.$.MinValue || "0.00";
        const currency = option.$.Currency || "";
        const provision =
          (option.Condition || []).find((c) => c.$.Type === "Provision")?.$
            .Value || "";
        const supplierClass = (option.Condition || []).find(
          (c) => c.$.Type === "SupplierClass"
        )?.$.Value;
        const weight = (option.Condition || []).find(
          (c) => c.$.Type === "MaxWeight"
        )?.$.Value;

        if (!supplierClass) continue;

        const classes = supplierClass.split(",").map((c) => c.trim());

        for (const cls of classes) {
          if (fareClasses.includes(cls)) {
            let display = `ID ${id}`;
            if (featureType.toLowerCase().includes("bag") && weight) {
              display += ` (${weight}, ${value} ${currency})`;
            } else if (value !== "0.00") {
              display += ` (${value} ${currency})`;
              if (provision.toLowerCase() === "bundled") {
                display += ", Bundled";
              } else {
                display += ", Paid";
              }
            } else {
              display +=
                provision === "Bundled"
                  ? " (0.00 " + currency + ", Bundled)"
                  : " (Free)";
            }
            classMap[cls] = display;
          }
        }
      }

      row.push(
        classMap["Standard"],
        classMap["Inclusive"],
        classMap["Inclusive Plus"]
      );
      table.push(row);
      const [headers, ...rows] = inputArray;

      const plans = {
        Regular: [],
        Flexi: [],
        Super6E: [],
      };

      for (const row of rows) {
        const [feature, regular, flexi, super6e] = row;

        plans.Regular.push({ Feature: feature, Value: regular });
        plans.Flexi.push({ Feature: feature, Value: flexi });
        plans.Super6E.push({ Feature: feature, Value: super6e });
      }

      return plans;
    }
  }
    */

  const handleProcessDetails = async () => {
    const flightTickets = [];
    const routeid = TicketData.routingId;
    let outwardid = TicketData.outwordTicketId.id;
    let returnid;

    // if (TicketData.tripType === 'Round Trip') {
    // 	returnid = TicketData.returnTicketId.id
    // 	console.log('Hello')
    // }

    if (TicketData.tripType === "One Way") {
      flightTickets.push(TicketData.outwordTicketId);
    } else if (TicketData.tripType === "Round Trip") {
      flightTickets.push(TicketData.outwordTicketId, TicketData.returnTicketId);
      returnid = TicketData.returnTicketId.id;
    }
    console.log("Routing Id", routeid);

    console.log("outwordTicketId", TicketData.outwordTicketId);

    if (!routeid || !outwardid) {
      console.warn("Missing routeid or outwardid");
      return;
    }

    const response = await fetch(`${backendUrl}/process-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // routingId: TicketData.routingId || routeid,
        routingId: routeid,
        outwardId: outwardid,
        ...(returnid && { returnId: returnid }),
      }),
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      const seatOptions =
        res.requiredParameterList[0].RequiredParameter[15].DisplayText[0];
      const LuggageOptions =
        res.requiredParameterList[0].RequiredParameter[16].DisplayText[0];
      let sf = res.Features.Feature;

      console.log(sf);
      // console.log(sf);
      let result = [];

      // sf.forEach((item) => {
      //   const type = item?.$?.Type || "";
      //   const label = item?.$?.Label || "";

      //   // Always check Type for these
      //   if (
      //     type === "FlightChange" ||
      //     type === "Cancellation" ||
      //     type === "SmallCabinBag" ||
      //     type === "HoldBag" ||
      //     type === "LargeCabinBag"
      //   ) {
      //     result.push(item);
      //   }

      //   // For all Seat types regardless of label
      //   if (type === "Seat") {
      //     result.push(item);
      //   }
      // });

      // console.log(result);
      setseatOptions(seatOptions);
      setluggageOptions(LuggageOptions);
      setAlternativeFares(res.AlternativeFares);
      setstructuredFeatures(sf);
      setTickets(flightTickets);
      setIsPopupOpen(true);

      setsupportedCards(res.supportedCardlist);
      // trigger the navigation
      // navigate("/booking/TravelersDetails", {
      //   state: {
      //     flights: flightTickets,
      //     routingId: TicketData.routingId,
      //     travalers: TicketData.travalers,
      //     tripType: TicketData.tripType,
      //     seatOption: seatOptions,
      //     luggageOptions: luggageOptions,
      //     // Add price information
      //     outwordPrice: TicketData.outwordTicketId.price,
      //     returnPrice: TicketData.returnTicketId?.price || 0,
      //     currency: TicketData.outwordTicketId.currency || "CVE",
      //     cardlist: supportedCards,
      //   },
      // });
    }
  };

  useEffect(() => {
    handleProcessDetails();
  }, []);

  const handleNavigate = () => {
    console.log(tickets);

    navigate("/booking/TravelersDetails", {
      state: {
        flights: tickets,
        routingId: TicketData.routingId,
        travalers: TicketData.travalers,
        tripType: TicketData.tripType,
        seatOption: seatOptions,
        luggageOptions: luggageOptions,
        // Add price information
        outwordPrice: TicketData.outwordTicketId.price,
        returnPrice: TicketData.returnTicketId?.price || 0,
        currency: TicketData.outwordTicketId.currency || "CVE",
        cardlist: supportedCards,
      },
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-start px-4 sm:px-6 xl:px-0 font-sans">
        {/* Desktop Layout */}
        {/* {TicketData.tripType === 'one_way'} */}
        {TicketData.tripType === "One Way" ? (
          <div className="hidden xl:block w-full">
            <FlightDetailCard
              title={`${t("booking-card.leaving-from")}`}
              flight={TicketData.outwordTicketId}
            />
          </div>
        ) : TicketData.tripType === "Round Trip" ? (
          <div className="hidden xl:block w-full">
            <FlightDetailCard
              title={`${t("booking-card.leaving-from")}`}
              flight={TicketData.outwordTicketId}
            />
            <FlightDetailCard
              title={`${t("booking-card.returning-from")}`}
              flight={TicketData.returnTicketId}
            />
          </div>
        ) : (
          <div className=""></div>
        )}

        {/* Mobile Layout */}
        {TicketData.tripType === "One Way" ? (
          <div className="xl:hidden w-full">
            <FlightPriceCard
              title={`${t("booking-card.leaving-from")}`}
              flight={TicketData.outwordTicketId}
            />
          </div>
        ) : TicketData.tripType === "Round Trip" ? (
          <div className="xl:hidden w-full">
            <FlightPriceCard
              title={`${t("booking-card.leaving-from")}`}
              flight={TicketData.outwordTicketId}
            />
            <FlightPriceCard
              title={`${t("booking-card.returning-from")}`}
              flight={TicketData.returnTicketId}
            />
          </div>
        ) : (
          <div className=""></div>
        )}

        {/* Services Section */}
        {/* <div className="bg-white rounded-[17px] px-[20px] sm:px-[44px] py-[30px] mt-[30px]">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center items-start gap-[30px]">
          <p className="text-sm sm:text-[17px] bg-[#FFE2DA] rounded-[13px] px-6 py-3">
            Weefly pro Enjoy Zero Convenience Fee and More @ $2000 rupees
          </p>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#EE5128] size-[20px]" />
            <p className="text-base sm:text-[21px] font-medium">Add now</p>
          </div>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-5 gap-5 mt-8">
          {ServicesOfferedIcons.map((service, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-[55px] h-[55px] bg-[#EE5128] rounded-full flex justify-center items-center">
                <img src={service.Image} alt={service.label} />
              </div>
              <p className="text-xs sm:text-[15px] text-center">
                {service.label}
              </p>
            </div>
          ))}
        </div>
      </div> */}

        {/* Continue Button */}
        <div className="text-center xl:text-right mt-[40px]">
          <button
            // onClick={() => handleProcessDetails()}
            onClick={() => handleNavigate()}
            className="bg-[#EE5128] text-white text-[15px] px-[37px] py-[14px] rounded-[5px] font-semibold text-nowrap hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
          >
            {t("continue-booking")}
          </button>
        </div>
      </div>
      {/* {AlternativeFares &&
        structuredFeatures &&
        isPopupOpen &&
        seatOptions &&
        luggageOptions &&
        tickets && (
          <FeaturesPlanPopup
            setIsPopupOpen={setIsPopupOpen}
            handleProcessDetails={handleProcessDetails}
            TicketData={TicketData}
            AlternativeFares={AlternativeFares}
            structuredFeatures={structuredFeatures}
            seat={seatOptions}
            luggage={luggageOptions}
            tickets={tickets}
            supportedCardlist={supportedCards}
          />
        )} */}
    </>
  );
}

function FlightDetailCard({ title, flight }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-[17px] bg-white px-[44px] py-[38px] mt-6">
      <h4 className="text-[20px] font-semibold flex gap-2 items-center mb-4">
        {title} <img src={TakeOffPlane} alt="plane" />
      </h4>

      <div className="max-w-[636px] font-semibold text-base text-white bg-[#EE5128] rounded-[7px] flex flex-col sm:flex-row items-center justify-between px-[22px] py-[14px] mb-[24px]">
        <p>
          {flight?.departureCity} - {flight?.arrivalCity} | {flight?.stops}{" "}
          {t("booking-card.stops")}
        </p>
        <p>
          {t("booking-card.duration")} : {flight?.duration}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6 px-[44px]">
        {/* Left: Airline */}
        <div className="flex flex-col items-start gap-2 min-w-[100px]">
          <img
            src={flight?.logo}
            alt={`${flight?.airline} logo`}
            className="h-[30px] object-contain"
          />
          <p className="text-gray-500 text-sm">{flight?.flightNumber}</p>
          <p className="bg-[#008905] text-white text-xs px-2 py-1 rounded">
            {flight?.class}
          </p>
        </div>

        {/* Center: Times and Plane */}
        <div className="flex-1 flex justify-between items-center">
          <div className="text-center min-w-[80px]">
            <p className="text-[32px] font-bold">{flight?.departureTime}</p>
            <p className="text-sm text-gray-500">{flight?.departureCity}</p>
          </div>

          <div className="flex flex-col items-center gap-2 px-4">
            <div className="relative w-[220px]  border-t border-dashed border-gray-300">
              <div className="absolute left-0 w-3 h-3 bg-gray-300 rounded-full -top-[6px] border-2 border-white"></div>
              <div className="absolute right-0 w-3 h-3 bg-gray-300 rounded-full -top-[6px] border-2 border-white"></div>
              <img
                src={FlightLogo}
                alt="Plane"
                className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-[24px] h-[24px] bg-white"
              />
            </div>
            <p className="text-sm text-gray-500">{flight?.duration}</p>
            <p className="bg-[#008905] text-white text-xs px-2 py-1 rounded">
              Refundable
            </p>
          </div>

          <div className="text-center min-w-[80px]">
            <p className="text-[32px] font-bold"> {flight?.arrivalTime}</p>
            <p className="text-sm text-gray-500">{flight?.arrivalCity}</p>
          </div>

          <div className="">
            <p className="text-[#EE5128] font-extrabold text-[32px]">
              {flight.price}{" "}
              <span className="text-lg font-medium">/ {flight.currency}</span>
            </p>
            {/* <p className="text-lg text-gray-400 line-through">
              {flight.originalPrice}
            </p> */}
          </div>
        </div>
      </div>

      <div className="h-px border border-dashed border-gray-300 my-10 relative">
        <div className="w-10 h-10 bg-gray-100 rounded-full absolute -left-[60px] -top-[20px]"></div>
        <div className="w-10 h-10 bg-gray-100 rounded-full absolute -right-[60px] -top-[20px]"></div>
      </div>

      {/* <div className="flex gap-[42px] text-[18px]">
        <p>{t("booking-card.Flight-details")}</p>
        <p>{t("booking-card.price-details")}</p>
        <p>{t("booking-card.policy")}</p>
        <p>{t("booking-card.refund")}</p>
        <p>{t("booking-card.reschedule")}</p>
      </div> */}
    </div>
  );
}

function FlightPriceCard({ title, flight }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden w-full p-4">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <img src={TakeOffPlane} alt="plane" className="w-4 h-4" />
      </div>

      <div className="bg-[#EE5128] text-white text-xs font-medium rounded-lg px-4 py-2">
        <p>
          {flight?.departureCity} - {flight?.arrivalCity} | {flight?.stops}{" "}
          {t("booking-card.stops")}
        </p>
        <span className="ml-2">
          {t("booking-card.duration")} : {flight?.duration}
        </span>
      </div>

      <div className="flex flex-col items-center mt-4 gap-1">
        <img
          src={flight?.logo}
          alt={`${flight?.airline} logo`}
          className="h-[30px] object-contain"
        />
        <p className="text-[11px] text-gray-500">{flight?.flightNumber}</p>
        <span className="text-[11px] bg-[#008905] text-white px-2 py-1 rounded">
          {flight?.class}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-center">
          <p className="text-xl font-bold">{flight?.departureTime}</p>
          <p className="text-[11px] text-gray-500">{flight?.departureCity}</p>
        </div>

        <div className="flex-1 flex flex-col items-center mx-2">
          <div className="w-full border-t border-dashed border-gray-300 relative">
            <img
              src={FlightLogo}
              alt="flight"
              className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white"
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{flight?.duration}</p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold">{flight?.arrivalTime}</p>
          <p className="text-[11px] text-gray-500">{flight?.arrivalCity}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[#EE5128] font-extrabold text-lg">
          {flight.price}{" "}
          <span className="text-sm font-medium">/ {flight.currency}</span>
        </p>
        {/* <p className="text-[13px] text-gray-400 line-through">
          {flight.originalPrice}
        </p> */}
      </div>

      <div className="flex justify-between items-center mt-4 border-t pt-3 border-gray-100">
        <button className="text-[#EE5128] text-sm font-medium">
          {t("booking-card.Flight-details")} ▼
        </button>
        <button className="bg-[#EE5128] text-white text-sm font-semibold px-4 py-2 rounded">
          {t("booking-card.book-now")}
        </button>
      </div>
    </div>
  );
}

// add Selecting Features plan popup

const FeaturesPlanPopup = ({
  setIsPopupOpen,
  TicketData,
  AlternativeFares,
  structuredFeatures,
  seat,
  luggage,
  tickets,
  supportedCardlist,
}) => {
  // const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;
  //console.log("cards", supportedCardlist);
  let commissionDetails = [];
  const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;
  const getcommission = async () => {
    try {
      const res = await fetch(`${transactionUrl}/getcommissiondetails`);
      const result = await res.json();
      // console.log("co", result.commissionDetail);
      const commission = result.commissionDetail;
      // console.log(commission)
      commissionDetails = commission;
    } catch (error) {
      console.error("Failed to fetch supplier route:", error);
    }
  };

  console.log(AlternativeFares);

  useEffect(() => {
    getcommission();
  }, []);
  const getCommissionDetail = async (tfPrice) => {
    try {
      if (!commissionDetails) {
        return console.log("Error");
      } else {
        const Commission = commissionDetails.Commission;
        if (Commission) {
          if (commissionDetails.CommissionType.toLowerCase() === "percentage") {
            const commissionAmount = (tfPrice * Commission) / 100;
            const totalAmount = tfPrice + commissionAmount;
            return totalAmount.toFixed(2);
          } else if (
            commissionDetails.CommissionType.toLowerCase() === "amount"
          ) {
            const totalAmount = tfPrice + Commission;
            return totalAmount.toFixed(2);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function convertAllPricesToCVE(features) {
    const rates = await fetchExchangeRates("CVE");
    for (const feature of features) {
      if (feature.Option && Array.isArray(feature.Option)) {
        for (const option of feature.Option) {
          const optionData = option["$"];

          if (optionData.Currency && optionData.Value) {
            const originalPrice = parseFloat(optionData.Value);
            const originalCurrency = optionData.Currency;

            const tfPrice = parseFloat(
              convertToRequestedCurrency(
                originalPrice,
                originalCurrency,
                "CVE",
                rates
              ).toFixed(2)
            );

            const convertedPrice = await getCommissionDetail(tfPrice);
            optionData.Value = convertedPrice.toString();
            optionData.Currency = "CVE";
          }

          if (optionData.Currency && optionData.MinValue) {
            const originalMin = parseFloat(optionData.MinValue);
            const originalCurrency = optionData.Currency;

            const tfMin = parseFloat(
              convertToRequestedCurrency(
                originalMin,
                originalCurrency,
                "CVE",
                rates
              ).toFixed(2)
            );

            const convertedMin = await getCommissionDetail(tfMin);
            optionData.MinValue = convertedMin.toString();
            optionData.Currency = "CVE";
          }
        }
      }
    }
    return features;
  }
  function parseFeaturesToPlans(featuresJson) {
    const fareClasses = ["Standard", "Inclusive", "Inclusive Plus"];
    const table = [
      [
        "Feature",
        "Regular (Standard)",
        "Flexi (Inclusive)",
        "Super6E (Inclusive Plus)",
      ],
    ];

    for (const feature of featuresJson) {
      const featureType = feature?.["$"]?.Label || feature?.["$"]?.Type;
      const row = [featureType];

      const classMap = {
        Standard: "-",
        Inclusive: "-",
        "Inclusive Plus": "-",
      };

      for (const option of feature.Option || []) {
        const id = option.$.Id;
        const value = option.$.Value || option.$.MinValue || "0.00";
        const currency = option.$.Currency || "";
        const provision =
          (option.Condition || []).find((c) => c.$.Type === "Provision")?.$
            .Value || "";
        const supplierClass = (option.Condition || []).find(
          (c) => c.$.Type === "SupplierClass"
        )?.$.Value;
        const weight = (option.Condition || []).find(
          (c) => c.$.Type === "MaxWeight"
        )?.$.Value;

        if (!supplierClass) continue;

        const classes = supplierClass.split(",").map((c) => c.trim());

        for (const cls of classes) {
          if (fareClasses.includes(cls)) {
            let display = `ID ${id}`;
            if (featureType.toLowerCase().includes("bag") && weight) {
              display += ` (${weight}, ${value} ${currency})`;
            } else if (value !== "0.00") {
              display += ` (${value} ${currency})`;
              display +=
                provision.toLowerCase() === "bundled" ? ", Bundled" : ", Paid";
            } else {
              display +=
                provision === "Bundled"
                  ? ` (0.00 ${currency}, Bundled)`
                  : " (Free)";
            }
            classMap[cls] = display;
          }
        }
      }

      row.push(
        classMap["Standard"],
        classMap["Inclusive"],
        classMap["Inclusive Plus"]
      );
      table.push(row);
    }

    // Convert to 3-plan format
    const [_, ...rows] = table;

    const plans = {
      Regular: [],
      Flexi: [],
      Super6E: [],
    };

    for (const row of rows) {
      const [feature, regular, flexi, super6e] = row;

      plans.Regular.push({ Feature: feature, Value: regular });
      plans.Flexi.push({ Feature: feature, Value: flexi });
      plans.Super6E.push({ Feature: feature, Value: super6e });
    }

    return plans;
  }

  const [selectedTab, setSelectedTab] = useState("outward");
  // console.log("AlternativeFares:", AlternativeFares);
  // console.log("structuredFeatures:", structuredFeatures);

  // console.log("lu" + luggage);
  // console.log("se" + seat);
  // console.log("ti" + tickets);

  const [feature, setFeature] = useState([]);

  useEffect(() => {
    const processFeatures = async () => {
      const updated = await convertAllPricesToCVE(structuredFeatures);
      setFeature(updated);
    };

    processFeatures();
  }, [structuredFeatures]);

  useEffect(() => {
    if (feature && feature.length > 0) {
      const plans = parseFeaturesToPlans(feature);
      console.log("plans:", plans);
      // You can also set this to state if you want to use it in the UI
      // setPlans(plans);
    }
  }, [feature]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/booking/TravelersDetails", {
      state: {
        flights: tickets,
        routingId: TicketData.routingId,
        travalers: TicketData.travalers,
        tripType: TicketData.tripType,
        seatOption: seat,
        luggageOptions: luggage,
        // Add price information
        outwordPrice: TicketData.outwordTicketId.price,
        returnPrice: TicketData.returnTicketId?.price || 0,
        currency: TicketData.outwordTicketId.currency || "CVE",
        cardlist: supportedCardlist,
      },
    });
  };
  return (
    <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black/20 z-50 backdrop-blur-lg">
      <div className="p-6 bg-white rounded-2xl max-w-9/12 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-jakarta font-medium">Select Your Fare</h2>
          <div
            className="text-gray-600 cursor-pointer"
            onClick={() => setIsPopupOpen(false)}
          >
            <X />
          </div>
        </div>

        {/* tab section */}

        <div className="py-6 font-jakarta">
          <div className="flex items-center">
            <div
              className={`${
                selectedTab === "outward" ? "border-b-4 border-orange-600" : ""
              } cursor-pointer p-2 px-10 flex items-center gap-8 border-r`}
              onClick={() => setSelectedTab("outward")}
            >
              <div className="flex flex-col gap-1 text-sm">
                {/* <img
                  src={TicketData.outwordTicketId.logo}
                  alt={TicketData.outwordTicketId.airline}
                  loading="lazy"
                  className="w-10 rounded"
                /> */}
                {/* <p className="tracking-tighter text-sm font-medium">
                  {TicketData.outwordTicketId.airline}
                </p> */}
              </div>
              <div className="flex flex-col text-sm">
                <p className="flex font-medium justify-between">
                  <span>London</span>
                  <span>
                    <ArrowRight />
                  </span>
                  <span>Madrid</span>
                  <span>
                    <Dot />
                  </span>
                  <span>Tue, 15 Jul</span>
                </p>
                <p className="flex font-semibold">
                  <span>06:30</span>
                  <span> - </span> <span> 20:30</span>
                  <span>
                    <Dot />
                  </span>
                  <span>15 ( 1hr)</span>
                </p>
              </div>
            </div>
            <div
              className={`${
                selectedTab === "return" ? "border-b-4 border-orange-600" : ""
              } cursor-pointer p-2 px-10 flex items-center gap-8`}
              onClick={() => setSelectedTab("return")}
            >
              <div className="flex flex-col gap-1">
                {/* <img
                  src={TicketData.returnTicketId.logo}
                  alt={TicketData.returnTicketId.airline}
                  loading="lazy"
                  className=" w-10 rounded"
                /> */}
                {/* <p className="tracking-tighter text-sm font-medium">
                  {TicketData.returnTicketId.airline}
                </p> */}
              </div>
              <div className="flex flex-col text-sm">
                <p className=" flex font-medium justify-between">
                  <span>Madrid</span>
                  <span>
                    <ArrowRight />
                  </span>
                  <span>London</span>
                  <span>
                    <Dot />
                  </span>
                  <span>Tue, 15 Jul</span>
                </p>
                <p className="flex font-semibold">
                  <span>06:30</span>
                  <span> - </span> <span> 20:30</span>
                  <span>
                    <Dot />
                  </span>
                  <span>15 ( 1hr)</span>
                </p>
              </div>
            </div>
          </div>
          <div className="py-6 flex">
            <div className="max-w-[250px] w-full px-4">
              <div className="mt-42 flex flex-col gap-2">
                <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                  Cancellation Fee
                </p>
                <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                  Date Change Fee
                </p>
                <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                  Seat Selection
                </p>
                <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                  Meal Selection
                </p>
                <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                  Cabin Bag/Adult
                </p>
                <p className="flex items-center gap-2 text-sm py-2">
                  Check-in Bag/Adult
                </p>
              </div>
            </div>
            {selectedTab.includes("outward") ? (
              <div className="w-full inline-flex gap-4 overflow-x-scroll text-nowrap">
                <div className="border-2 border-gray-600 hover:border-orange-600 p-8 w-[300px] rounded-xl flex flex-col gap-2 group">
                  <p className=" font-semibold">Regular</p>
                  <p className=" font-semibold text-xl">CVE 2000</p>
                  <button className="border-2 border-[#EE5128] text-[#EE5128] group-hover:border-0 group-hover:bg-[#EE5128] group-hover:text-white text-sm font-semibold px-4 py-2 rounded w-full mb-4 flex justify-center items-center">
                    <span className="group-hover:block hidden">
                      <Check />
                    </span>{" "}
                    Select
                  </button>

                  {/* {listedplans.Regular.map((r) => (
                    <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                      {r.Value}
                      <span>
                        <Info className="h-4 w-4" />
                      </span>{" "}
                    </p>
                  ))} */}

                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Cancellation fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Date Change fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Seat
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Meal
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    7 kg Cabin{" "}
                    <span className="text-black/50">( 1 Pc x 7 kg )</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2">
                    15 kg Check-in{" "}
                    <span className="text-black/50">( 1 Pc x 15 kg )</span>
                  </p>
                </div>
                <div className="border-2 border-gray-600 hover:border-orange-600 p-8 w-[300px] rounded-xl flex flex-col gap-2 group">
                  <p className=" font-semibold">Regular</p>
                  <p className=" font-semibold text-xl">CVE 2000</p>
                  <button className="border-2 border-[#EE5128] text-[#EE5128] group-hover:border-0 group-hover:bg-[#EE5128] group-hover:text-white text-sm font-semibold px-4 py-2 rounded w-full mb-4 flex justify-center items-center">
                    <span className="group-hover:block hidden">
                      <Check />
                    </span>{" "}
                    Select
                  </button>

                  {/* {listedplans.Regular.map((r) => (
                    <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                      {r.Value}
                      <span>
                        <Info className="h-4 w-4" />
                      </span>{" "}
                    </p>
                  ))} */}

                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Cancellation fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Date Change fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Seat
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Meal
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    7 kg Cabin{" "}
                    <span className="text-black/50">( 1 Pc x 7 kg )</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2">
                    15 kg Check-in{" "}
                    <span className="text-black/50">( 1 Pc x 15 kg )</span>
                  </p>
                </div>
                <div className="border-2 border-gray-600 hover:border-orange-600 p-8 w-[300px] rounded-xl flex flex-col gap-2 group">
                  <p className=" font-semibold">Regular</p>
                  <p className=" font-semibold text-xl">CVE 2000</p>
                  <button className="border-2 border-[#EE5128] text-[#EE5128] group-hover:border-0 group-hover:bg-[#EE5128] group-hover:text-white text-sm font-semibold px-4 py-2 rounded w-full mb-4 flex justify-center items-center">
                    <span className="group-hover:block hidden">
                      <Check />
                    </span>{" "}
                    Select
                  </button>

                  {/* {listedplans.Regular.map((r) => (
                    <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                      {r.Value}
                      <span>
                        <Info className="h-4 w-4" />
                      </span>{" "}
                    </p>
                  ))} */}

                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Cancellation fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Date Change fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Seat
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Meal
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    7 kg Cabin{" "}
                    <span className="text-black/50">( 1 Pc x 7 kg )</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2">
                    15 kg Check-in{" "}
                    <span className="text-black/50">( 1 Pc x 15 kg )</span>
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="w-full inline-flex gap-4 overflow-x-scroll text-nowrap
			  "
              >
                <div className="border-2 border-gray-600 hover:border-orange-600 p-8 w-[300px] rounded-xl flex flex-col gap-2 group">
                  <p className=" font-semibold">Value</p>
                  <p className=" font-semibold text-xl">CVE 2000</p>
                  <button className="border-2 border-[#EE5128] text-[#EE5128] group-hover:border-0 group-hover:bg-[#EE5128] group-hover:text-white text-sm font-semibold px-4 py-2 rounded w-full mb-4 flex justify-center items-center">
                    <span className="group-hover:block hidden">
                      <Check />
                    </span>{" "}
                    Select
                  </button>

                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Cancellation fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Date Change fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Seat
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Meal
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    7 kg Cabin{" "}
                    <span className="text-black/50">( 1 Pc x 7 kg )</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2">
                    15 kg Check-in{" "}
                    <span className="text-black/50">( 1 Pc x 15 kg )</span>
                  </p>
                  {/* <div className="bg-green-100 text-green-600 flex items-center gap-2 p-4 mt-4 font-bold text-xs">
                    <PercentCircleIcon />{" "}
                    <p>Additional Benefits worth CVE 1000</p>
                  </div> */}
                </div>
                <div className="border-2 border-gray-600 hover:border-orange-600 p-8 w-[300px] rounded-xl flex flex-col gap-2 group">
                  <p className=" font-semibold">Value</p>
                  <p className=" font-semibold text-xl">CVE 2000</p>
                  <button className="border-2 border-[#EE5128] text-[#EE5128] group-hover:border-0 group-hover:bg-[#EE5128] group-hover:text-white text-sm font-semibold px-4 py-2 rounded w-full mb-4 flex justify-center items-center">
                    <span className="group-hover:block hidden">
                      <Check />
                    </span>{" "}
                    Select
                  </button>

                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Cancellation fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Date Change fee from CVE 500{" "}
                    <span>
                      <Info className="h-4 w-4" />
                    </span>{" "}
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Seat
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    Paid Meal
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2 border-b-2 border-gray-300 border-dashed">
                    7 kg Cabin{" "}
                    <span className="text-black/50">( 1 Pc x 7 kg )</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm py-2">
                    15 kg Check-in{" "}
                    <span className="text-black/50">( 1 Pc x 15 kg )</span>
                  </p>
                  {/* <div className="bg-green-100 text-green-600 flex items-center gap-2 p-4 mt-4 font-bold text-xs">
                    <PercentCircleIcon />{" "}
                    <p>Additional Benefits worth CVE 1000</p>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center gap-6">
          <h2 className="text-lg font-jakarta font-bold">CVE 2000</h2>
          <button
            className="bg-[#EE5128] text-white text-sm font-semibold px-4 py-2 rounded"
            onClick={() => setSelectedTab("return")}
          >
            {selectedTab.includes("outward") ? (
              " Select MAD - LHR"
            ) : (
              <p className="" onClick={() => handleNavigate()}>
                Continue
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
