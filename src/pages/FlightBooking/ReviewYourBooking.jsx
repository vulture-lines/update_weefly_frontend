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

import LoadingScreen from "../../components/LoadingScreen";
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
  console.log("flow", location.state.outwordTicketId);

  const [loading, setLoading] = useState(false);

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
  const [cardCharge, setcardCharge] = useState([]);
  const [listOutwardLuggages, setListOutwardLuggages] = useState([]);
  const [listReturnLuggages, setListReturnLuggages] = useState([]);
  const [PerPassengerPrice, setPerPassengerPrice] = useState([]);
  const [tfpay, settfpay] = useState(false);
  const [SupportedCardList, setSupportedCardList] = useState([]);
  const [CardCharges, setCardCharges] = useState([]);

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

  useEffect(() => {
    getcommission();
  }, []);

  const handleProcessDetails = async () => {
    const flightTickets = [];
    console.log("td", TicketData);
    const routeid = TicketData.routingId;
    let outwardid = TicketData.outwordTicketId.id;
    let returnid;

    console.log("Routing Id", routeid);

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

    console.log("outwordTicketId", TicketData.outwordTicketId);

    if (!routeid || !outwardid) {
      console.warn("Missing routeid or outwardid");
      return;
    }
    setLoading(true);
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
    setLoading(false);

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      // Initialize default values
      let seatOptions = [];
      let luggageOptions = [];
      let features = [];
      let alternativeFares = [];
      let supportedCardlist = [];
      let mealType = [];
      let outwardLuggage = [];
      let returnLuggage = [];
      let ReturnHandLuggageOptions = [];
      let outwardHandLuggageOptions = [];
      let cardCharge = [];
      let perPassengerPrice = [];
      let TFPay;
      // Safely extract data with proper error checking
      try {
        // Check if requiredParameterList exists and has the expected structure
        if (
          res.requiredParameterList &&
          Array.isArray(res.requiredParameterList) &&
          res.requiredParameterList.length > 0 &&
          res.requiredParameterList[0].RequiredParameter &&
          Array.isArray(res.requiredParameterList[0].RequiredParameter)
        ) {
          const requiredParams = res.requiredParameterList[0].RequiredParameter;

          const getParamByName = (targetName) => {
            return requiredParams.find((param) => {
              const paramName = Array.isArray(param.Name) ? param.Name[0] : "";
              return paramName.toLowerCase() === targetName.toLowerCase();
            });
          };

          const seat = getParamByName("SeatOptions");
          const meal = getParamByName("MealType");
          const luggage = getParamByName("LuggageOptions");
          const outwardLg = getParamByName("OutwardLuggageOptions"); // optional/hypothetical
          const returnLg = getParamByName("ReturnLuggageOptions"); // optional/hypothetical
          const outwardLgh = getParamByName("OutwardHandLuggageOptions");
          const returnLgh = getParamByName("ReturnHandLuggageOptions");
          TFPay = getParamByName("UseTFPrepay");
          
          seatOptions = seat.DisplayText[0];
          if (seat) {
            seatOptions = seat.DisplayText?.[0] || "";
          }

          if (meal) {
            mealType = meal.DisplayText?.[0] || "";
          }

          if (luggage) {
            luggageOptions = luggage.DisplayText?.[0] || "";
          }

          if (outwardLg) {
            outwardLuggage = outwardLg.DisplayText?.[0] || "";
          }

          if (returnLg) {
            returnLuggage = returnLg.DisplayText?.[0] || "";
          }
          if (outwardLgh) {
            outwardHandLuggageOptions = outwardLgh.DisplayText?.[0] || "";
          }
          if (returnLgh) {
            ReturnHandLuggageOptions = returnLgh.DisplayText?.[0] || "";
          }
          // return;
        } else {
          console.warn(
            "requiredParameterList not found or has unexpected structure"
          );
        }

        // Safely extract features
        if (res.Features && res.Features.Feature) {
          features = res.Features.Feature;
        } else {
          console.warn("Features not found in response");
        }

        // Safely extract alternative fares
        if (res.AlternativeFares) {
          alternativeFares = res.AlternativeFares;
        }

        // Safely extract supported cards
        if (res.supportedCardlist) {
          supportedCardlist = res.supportedCardlist;
          cardCharge = res.supportedCardlist.CardCharge[0].Charge[0];
          setSupportedCardList(supportedCardlist);
          setCardCharges(cardCharge);
        }
        if (res.groupList) {
          perPassengerPrice =
            res.groupList?.[0].Group?.[0].Price?.[0].PassengerPriceList?.[0];
          setPerPassengerPrice(perPassengerPrice);
        }
      } catch (parseError) {
        console.error("Error parsing response data:", parseError);
        // setError("Error processing booking details");
        return;
      }

      const getCommissionDetail = async (tfPrice) => {
        try {
          if (!commissionDetails) {
            return console.log("Error");
          } else {
            const Commission = commissionDetails.Commission;
            if (Commission) {
              if (
                commissionDetails.CommissionType.toLowerCase() === "percentage"
              ) {
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
      console.log("Seat Options:", seatOptions);
      console.log("Luggage Options:", luggageOptions);
      console.log("Features:", features);
      console.log("Alternative Fares:", alternativeFares);
      console.log("Supported Card List:", supportedCardlist);
      console.log("Meal Type:", mealType);
      console.log("Outward Luggage:", outwardLuggage);
      console.log("Return Luggage:", returnLuggage);
      console.log("Return Hand Luggage Options:", ReturnHandLuggageOptions);
      console.log("Outward Hand Luggage Options:", outwardHandLuggageOptions);
      console.log("Card Charge:", cardCharge);
      console.log("Per Passenger Price:", perPassengerPrice);
      const sf = await convertAllPricesToCVE(features);
      console.log("converted", sf);
      // console.log(result);
      setseatOptions(seatOptions);
      setluggageOptions(luggageOptions);
      setAlternativeFares(res.AlternativeFares);
      // setstructuredFeatures(sf);
      setstructuredFeatures(sf);
      setTickets(flightTickets);
      setIsPopupOpen(true);
      setcardCharge(cardCharge);
      setsupportedCards(supportedCardlist);
      setListReturnLuggages(returnLuggage);
      setListOutwardLuggages(outwardLuggage);
      if (TFPay) {
        settfpay(true);
      }

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
        outwardLuggage: listOutwardLuggages,
        returnLuggage: listReturnLuggages,
        cardCharge: cardCharge,
        CardCharges: CardCharges,
        SupportedCardList: SupportedCardList,
        TFPay: tfpay ? true : false,
      },
    });
  };

  if (loading) return <LoadingScreen />;

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
              PerPassengerPrice={PerPassengerPrice}
            />
          </div>
        ) : TicketData.tripType === "Round Trip" ? (
          <div className="hidden xl:block w-full">
            <FlightDetailCard
              title={`${t("booking-card.leaving-from")}`}
              flight={TicketData.outwordTicketId}
              PerPassengerPrice={PerPassengerPrice}
            />
            <FlightDetailCard
              title={`${t("booking-card.returning-from")}`}
              flight={TicketData.returnTicketId}
              PerPassengerPrice={PerPassengerPrice}
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
              PerPassengerPrice={PerPassengerPrice}
            />
          </div>
        ) : TicketData.tripType === "Round Trip" ? (
          <div className="xl:hidden w-full">
            <FlightPriceCard
              title={`${t("booking-card.leaving-from")}`}
              flight={TicketData.outwordTicketId}
              PerPassengerPrice={PerPassengerPrice}
            />
            <FlightPriceCard
              title={`${t("booking-card.returning-from")}`}
              flight={TicketData.returnTicketId}
              PerPassengerPrice={PerPassengerPrice}
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

        <div className="mt-6 rounded-2xl px-4 bg-white w-full">
          <FeatureSelection structuredFeatures={structuredFeatures} />
        </div>

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

function FlightDetailCard({ title, flight, PerPassengerPrice }) {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div className="rounded-[17px] bg-white px-[44px] py-[38px] mt-6">
      <h4 className="text-[20px] font-semibold flex gap-2 items-center mb-4">
        {title} <img src={TakeOffPlane} alt="plane" />
      </h4>

      <div className="max-w-[636px] font-semibold text-base text-white bg-[#EE5128] rounded-[7px] flex flex-col sm:flex-row items-center justify-between px-[22px] py-[14px] mb-[24px]">
        <p>
          {flight?.segments[0].departureCity} -{" "}
          {flight?.segments[1]
            ? flight?.segments[1].arrivalCity
            : flight?.segments[0].arrivalCity}{" "}
          | {flight?.segments[0].stops} {t("booking-card.stops")}
        </p>
        <p>
          {t("booking-card.duration")} :{" "}
          {parseInt(flight?.segments[0].duration) +
            parseInt(flight?.segments[1]?.duration || 0) +
            "hr"}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6 px-[44px]">
        {/* Left: Airline */}
        <div className="flex flex-col items-start gap-2 min-w-[100px]">
          <img
            src={flight?.segments[0].logo}
            alt={`${flight?.segments[0].airline} logo`}
            className="h-[30px] object-contain"
          />
          {/* <p className="text-gray-500 text-sm">{flight?.segments[0].flightNumber}</p> */}
          <p className="bg-[#008905] text-white text-xs px-2 py-1 rounded">
            {flight?.segments[0].class}
          </p>
        </div>

        {/* Center: Times and Plane */}
        <div className="flex-1 flex justify-between items-center">
          <div className="text-center min-w-[80px]">
            <p className="text-[32px] font-bold">
              {flight?.segments[0].departureTime}
            </p>
            <p className="text-sm text-gray-500">
              {flight?.segments[0].departureCity}
            </p>
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
            <p className="text-sm text-gray-500">
              {parseInt(flight?.segments[0].duration) +
                parseInt(flight?.segments[1]?.duration || 0) +
                "hr"}
            </p>
            <p className="bg-[#008905] text-white text-xs px-2 py-1 rounded">
              Refundable
            </p>
          </div>

          <div className="text-center min-w-[80px]">
            <p className="text-[32px] font-bold">
              {" "}
              {flight?.segments[1]
                ? flight?.segments[1].arrivalTime
                : flight?.segments[0].arrivalTime}
            </p>
            <p className="text-sm text-gray-500">
              {flight?.segments[1]
                ? flight?.segments[1].arrivalCity
                : flight?.segments[0].arrivalCity}
            </p>
          </div>

          <div className="">
            {/* {location.state.travalers === 30
              ? location.state.travalers.length + "Adult"
              : location.state.travalers === 7
              ? location.state.travalers.length + "Child"
              : ""}{" "}
            x{PerPassengerPrice.Amount} */}

            {location.state.travalers &&
              (() => {
                const adults = location.state.travalers.filter(
                  (t) => t === 30
                ).length;
                const children = location.state.travalers.filter(
                  (t) => t === 7
                ).length;

                return (
                  <>
                    {adults > 0 && `${adults} Adult`}
                    {children > 0 &&
                      `${adults > 0 ? " + " : ""}${children} Child`}{" "}
                    x {PerPassengerPrice?.PassengerPrice?.[0].Amount}
                  </>
                );
              })()}

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

function FlightPriceCard({ title, flight, PerPassengerPrice }) {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden w-full p-4">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <img src={TakeOffPlane} alt="plane" className="w-4 h-4" />
      </div>

      <div className="bg-[#EE5128] text-white text-xs font-medium rounded-lg px-4 py-2">
        <p>
          {flight?.segments[0].departureCity} -{" "}
          {flight?.segments[1]
            ? flight?.segments[1].arrivalCity
            : flight?.segments[0].arrivalCity}{" "}
          | {flight?.stops} {t("booking-card.stops")}
        </p>
        <span className="ml-2">
          {t("booking-card.duration")} : {flight?.duration}
        </span>
      </div>

      <div className="flex flex-col items-center mt-4 gap-1">
        <img
          src={flight?.segments[0].logo}
          alt={`${flight?.segments[0].airline} logo`}
          className="h-[30px] object-contain"
        />
        {/* <p className="text-[11px] text-gray-500">{flight?.flightNumber}</p> */}
        <span className="text-[11px] bg-[#008905] text-white px-2 py-1 rounded">
          {flight?.segments[0].class}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-center">
          <p className="text-xl font-bold">
            {flight?.segments[0].departureTime}
          </p>
          <p className="text-[11px] text-gray-500">
            {flight?.segments[0].departureCity}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center mx-2">
          <div className="w-full border-t border-dashed border-gray-300 relative">
            <img
              src={FlightLogo}
              alt="flight"
              className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white"
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            {parseInt(flight?.segments[0].duration) +
              parseInt(flight?.segments[1]?.duration || 0) +
              "hr"}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold">
            {flight?.segments[1]
              ? flight?.segments[1].arrivalTime
              : flight?.segments[0].arrivalTime}
          </p>
          <p className="text-[11px] text-gray-500">
            {flight?.segments[1]
              ? flight?.segments[1].arrivalCity
              : flight?.segments[0].arrivalCity}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        {location.state.travalers &&
          (() => {
            const adults = location.state.travalers.filter(
              (t) => t === 30
            ).length;
            const children = location.state.travalers.filter(
              (t) => t === 7
            ).length;

            return (
              <>
                {adults > 0 && `${adults} Adult`}
                {children > 0 &&
                  `${adults > 0 ? " + " : ""}${children} Child`}{" "}
                x {PerPassengerPrice?.PassengerPrice?.[0].Amount}
              </>
            );
          })()}
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

import { ChevronDown, ChevronRight } from "lucide-react";

const FeatureSelection = ({ structuredFeatures }) => {
  const [openFeature, setOpenFeature] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Mock data for demonstration - updated with shipping-like features
  const mockStructuredFeatures = structuredFeatures;

  // Filter out features that have options with value 0, empty, or null
  const filteredFeatures = mockStructuredFeatures.filter(
    (feature) =>
      !feature?.Option?.some((option) => {
        const value = option.$.Value;
        return (
          value === 0 ||
          value === "0.00" ||
          value === "" ||
          value === null ||
          value === undefined
        );
      })
  );

  const toggleFeature = (index) => {
    setOpenFeature(openFeature === index ? null : index);
  };

  const handleOptionChange = (featureIndex, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [featureIndex]: optionIndex,
    }));
  };

  const getSelectedOption = (feature, featureIndex) => {
    const selectedIndex = selectedOptions[featureIndex];
    return selectedIndex !== undefined ? feature.Option[selectedIndex] : null;
  };

  // Helper function to format option display text
  const formatOptionText = (option, optionIndex) => {
    const conditions = option.Condition || [];
    const displayParts = [];

    // Look for specific condition types
    const maxQuantity = conditions.find((c) => c.$.Type === "MaxQuantity");
    const maxWeight = conditions.find((c) => c.$.Type === "MaxWeight");
    const minTime = conditions.find(
      (c) => c.$.Type === "MinTimeBeforeDeparture"
    );

    if (maxQuantity) {
      displayParts.push(`Max Qty: ${maxQuantity.$.Value}`);
    }

    if (maxWeight) {
      displayParts.push(`Max Weight: ${maxWeight.$.Value}`);
    }

    if (minTime) {
      const hours = Math.round(parseInt(minTime.$.Value) / 60);
      displayParts.push(`${hours}h before departure`);
    }

    // If none of the specific conditions are found, use generic display
    if (displayParts.length === 0) {
      displayParts.push(`Option ${optionIndex + 1}`);
    }

    return `${option.$.Currency}${option.$.Value} - ${displayParts.join(", ")}`;
  };

  return (
    <div className="my-10 px-6 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Select Features</h2>
      <div className="space-x-4 flex items-start">
        <div className="space-y-4 w-full">
          {filteredFeatures.map((feature, featureIndex) => {
            const featureType = feature.$.Type;
            const isOpen = openFeature === featureIndex;
            const selectedOption = getSelectedOption(feature, featureIndex);

            return (
              <div
                key={featureIndex}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                {/* Feature Header - Clickable */}
                <div
                  className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                  onClick={() => toggleFeature(featureIndex)}
                >
                  <div className="flex items-center space-x-3">
                    {isOpen ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {featureType}
                    </h3>
                  </div>

                  {/* Show selected price in header */}
                  {selectedOption && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedOption?.$.Currency}
                      {selectedOption?.$.Value}
                    </div>
                  )}
                </div>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="p-6 bg-white">
                    {/* Select Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choose an option:
                      </label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={selectedOptions[featureIndex] ?? ""}
                        onChange={(e) =>
                          handleOptionChange(
                            featureIndex,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        <option value="">Select an option...</option>
                        {feature?.Option?.map((option, optionIndex) => (
                          <option key={optionIndex} value={optionIndex}>
                            {formatOptionText(option, optionIndex)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Show Conditions for Selected Option */}
                    {selectedOption && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-800 mb-3">
                          Selected Option Details:
                        </h4>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-gray-800">
                              Price:
                            </span>
                            <span className="text-2xl font-bold text-blue-600">
                              {selectedOption.$.Currency}
                              {selectedOption.$.Value}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">
                              Specifications:
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {selectedOption.Condition.map(
                                (condition, conditionIndex) => {
                                  let displayValue = condition.$.Value;
                                  let displayType = condition.$.Type;

                                  // Format specific condition types
                                  if (
                                    condition.$.Type ===
                                    "MinTimeBeforeDeparture"
                                  ) {
                                    const hours = Math.round(
                                      parseInt(condition.$.Value) / 60
                                    );
                                    displayValue = `${hours} hours`;
                                    displayType = "Min Time Before Departure";
                                  } else if (condition.$.Type === "MaxWeight") {
                                    displayValue = `${condition.$.Value}kg`;
                                    displayType = "Max Weight";
                                  } else if (
                                    condition.$.Type === "MaxQuantity"
                                  ) {
                                    displayType = "Max Quantity";
                                  }

                                  return (
                                    <div
                                      key={conditionIndex}
                                      className="bg-white rounded-md p-3 border border-gray-200"
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-600">
                                          {displayType}:
                                        </span>
                                        <span className="text-sm font-semibold text-gray-800">
                                          {displayValue}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="">
          {Object.keys(selectedOptions).length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Selection Summary
              </h3>
              <div className="space-y-3">
                {Object.entries(selectedOptions).map(
                  ([featureIndex, optionIndex]) => {
                    const feature = filteredFeatures[featureIndex];
                    const option = feature.Option[optionIndex];
                    return (
                      <div
                        key={featureIndex}
                        className="flex justify-between items-center py-2 gap-2"
                      >
                        <span className="font-medium text-gray-700">
                          {feature.$.Type}:
                        </span>
                        <span className="font-bold text-blue-600 text-nowrap">
                          {option.$.Value} {option.$.Currency}
                        </span>
                      </div>
                    );
                  }
                )}
                <div className="pt-3 mt-3 border-t-2 border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {Object.entries(selectedOptions).reduce(
                        (total, [featureIndex, optionIndex]) => {
                          const feature = filteredFeatures[featureIndex];
                          const option = feature.Option[optionIndex];
                          return (total + parseFloat(option.$.Value)).toFixed(
                            2
                          );
                        },
                        0
                      )}{" "}
                      CVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
