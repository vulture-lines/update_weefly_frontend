import {
  LucideLuggage,
  LucideMessageCircleWarning,
  LuggageIcon,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import KidsMeal from "../../assets/images/meals/KidsMeal.jpg";
import NonVegMeal from "../../assets/images/meals/NonVegMeal.jpg";
import SpecialMeal from "../../assets/images/meals/SpecialMeal.jpg";
import VegMeal from "../../assets/images/meals/VegMeal.jpg";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { parseLuggageOptions } from "../../utils/parseLuggageOptions";
import { parseSeatMap } from "../../utils/parseSeatMap";
import {
  fetchExchangeRates,
  convertToRequestedCurrency,
} from "../../utils/Currencyconverter";

export default function SeatSelection() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeTab, setActiveTab] = useState("Seats");
  const [mealCounts, setMealCounts] = useState({});
  const [outwardLuggageList, setOutwardLuggageList] = useState([]);
  const [returnLuggageList, setReturnLuggageList] = useState([]);
  const [selectOutwardSeats, setSelectOutwardSeats] = useState([]);
  const [selectReturnSeats, setSelectReturnSeats] = useState([]);

  // FIXED: Separate luggage selection for outward and return flights
  const [selectedOutwardLuggage, setSelectedOutwardLuggage] = useState([]);
  const [selectedReturnLuggage, setSelectedReturnLuggage] = useState([]);

  const [isOutwardSeat, setisOutwardSeat] = useState(false);
  const [seats, setSeats] = useState([]);
  const [userId, setuserId] = useState("");
  const USER_API_URL =
    import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:3000/userapi";
  let rate = 0;
  useEffect(() => {
    const fetchRate = async () => {
      rate = await fetchExchangeRates();
    };
    fetchRate();
  }, []);
  // Fetch user profile data from backend
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${USER_API_URL}/getuserprofile`, {
        method: "GET",
        credentials: "include", // send JWT cookie
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch profile: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      setuserId(data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const userjwt = Cookies.get("userjwt");
  if (userjwt) {
    fetchUserProfile();
  }

  const OutwardTicket = location.state.flights[0];
  const returnTicket = location.state.flights[1];

  console.log(location.state.flights);
  console.log(returnTicket);
  console.log("outwardLuggage", location.state.outwardLuggage);
  console.log("returnLuggage", location.state.returnLuggage);
  console.log("luggageOptions", location.state.luggageOptions);

  // Get traveler count helper function
  const getTravelerCount = () => {
    return (
      location.state?.travalers?.length ||
      location.state?.travellerDetails?.TravellerList?.Traveller?.length ||
      0
    );
  };
  const LuggageOptions = parseLuggageOptions(location.state.luggageOptions);
  const [convertedLuggageOptions, setconvertedLuggageOptions] = useState({});

  console.log("LuggageOptions", LuggageOptions);

  const convertLuggageOption = async () => {
    const LuggageOptions = parseLuggageOptions(location.state.luggageOptions);
    const ConvertedOutwardLuggages = parseLuggageOptions(
      location.state.outwardLuggage
    );
    const ConvertedRetuenLuggages = parseLuggageOptions(
      location.state.returnLuggage
    );
    const rates = await fetchExchangeRates("CVE");
    const Luggages = LuggageOptions.map((option) => {
      const originalPrice = option.price;
      const originalCurrency = option.currency;

      const convertedPrice = parseFloat(
        convertToRequestedCurrency(
          originalPrice,
          originalCurrency,
          "CVE",
          rates
        ).toFixed(2)
      );

      return {
        ...option,
        price: convertedPrice,
        currency: "CVE",
      };
    });

    const outwardLuggage = ConvertedOutwardLuggages.map((option) => {
      const originalPrice = option.price;
      const originalCurrency = option.currency;

      const convertedPrice = parseFloat(
        convertToRequestedCurrency(
          originalPrice,
          originalCurrency,
          "CVE",
          rates
        ).toFixed(2)
      );

      return {
        ...option,
        price: convertedPrice,
        currency: "CVE",
      };
    });

    const returnLuggage = ConvertedRetuenLuggages.map((option) => {
      const originalPrice = option.price;
      const originalCurrency = option.currency;

      const convertedPrice = parseFloat(
        convertToRequestedCurrency(
          originalPrice,
          originalCurrency,
          "CVE",
          rates
        ).toFixed(2)
      );

      return {
        ...option,
        price: convertedPrice,
        currency: "CVE",
      };
    });

    console.log(outwardLuggage);
    console.log(returnLuggage);
    setOutwardLuggageList(outwardLuggage);
    setReturnLuggageList(returnLuggage);
    setconvertedLuggageOptions(Luggages);
  };

  useEffect(() => {
    convertLuggageOption();
  }, []);

  // function flightSplitNumber(input) {
  //   const match = input.match(/\d{4}$/);
  //   return match ? match[0] : null;
  // }

  function flightSplitNumber(input) {
    // Match one or more digits, optionally after letters/spaces/hyphen
    const match = input.match(/(\d{3,4})$/);
    return match ? match[1] : null;

    // const match = input.match(/^([A-Z]{1,3})(\d{2,5})$/i);
    // if (!match) return null;

    // return {
    //   airline: match[1],
    //   flightNumber: match[2]
    // };
    // return match[2];

    // const match = input.match(/[A-Z]{1,3}[- ]?(\d{2,5})$/i);
    // return match ? match[1] : null;

    // const match = input.match(/(\d{4,5})$/);
    // return match ? match[1] : null;
  }

  console.log(LuggageOptions);
  const OutWardFlightNumber = flightSplitNumber(
    OutwardTicket.segments[0].flightNumber
  );
  let ReturnFlightNumber;
  if (location.state.tripType === "Round Trip") {
    ReturnFlightNumber = flightSplitNumber(
      returnTicket.segments[0].flightNumber
    );
  }

  console.log(OutWardFlightNumber);

  const routingId = location.state.routingId;
  const outwardId = OutwardTicket.id;
  let returnId;
  if (returnTicket) {
    returnId = returnTicket.id;
  }

  // FIXED: Separate luggage handlers for outward and return flights
  const handleSelectOutwardLuggage = (luggageId) => {
    if (selectedOutwardLuggage.includes(luggageId)) {
      setSelectedOutwardLuggage(
        selectedOutwardLuggage.filter((s) => s !== luggageId)
      );
    } else {
      setSelectedOutwardLuggage([...selectedOutwardLuggage, luggageId]);
    }
  };

  const handleSelectReturnLuggage = (luggageId) => {
    if (selectedReturnLuggage.includes(luggageId)) {
      setSelectedReturnLuggage(
        selectedReturnLuggage.filter((s) => s !== luggageId)
      );
    } else {
      setSelectedReturnLuggage([...selectedReturnLuggage, luggageId]);
    }
  };

  const removeOutwardLuggage = (luggageId) => {
    setSelectedOutwardLuggage((prevLuggage) =>
      prevLuggage.filter((s) => s.index !== luggageId.index)
    );
  };

  const removeReturnLuggage = (luggageId) => {
    setSelectedReturnLuggage((prevLuggage) =>
      prevLuggage.filter((s) => s.index !== luggageId.index)
    );
  };

  console.log(location.state.travellerDetails);
  const travellerDetails = location.state.travellerDetails;
  travellerDetails.TravellerList.Traveller.forEach((traveller) => {
    const customParams =
      traveller.CustomSupplierParameterList.CustomSupplierParameter;

    customParams.forEach((param) => {
      if (param.Name === "DateOfBirth" && param.Value) {
        const parts = param.Value.split("-");
        if (parts.length === 3) {
          const [yyyy, mm, dd] = parts;
          param.Value = `${dd}/${mm}/${yyyy}`;
        }
      }
    });
  });

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

  useEffect(() => {
    if (location.state && location.state.flights) {
      setFlight(location.state.flights);
    }
  }, [location]);

  const handleOutwardSeatSelect = (seat) => {
    if (selectOutwardSeats.includes(seat)) {
      setSelectOutwardSeats(selectOutwardSeats.filter((s) => s !== seat));
    } else {
      // Get traveler count from the original travelers data or travellerDetails
      const travelerCount =
        location.state?.travalers?.length ||
        location.state?.travellerDetails?.TravellerList?.Traveller?.length ||
        0;
      if (selectOutwardSeats.length < travelerCount) {
        setSelectOutwardSeats([...selectOutwardSeats, seat]);
      }
    }
  };

  const removeOutwardSeat = (seat) => {
    setSelectOutwardSeats((prevSeats) =>
      prevSeats.filter((s) => s.seat !== seat.seat)
    );
  };

  const handleReturnSeatSelect = (seat) => {
    if (selectReturnSeats.includes(seat)) {
      setSelectReturnSeats(selectReturnSeats.filter((s) => s !== seat));
    } else {
      // Get traveler count from the original travelers data or travellerDetails
      const travelerCount =
        location.state?.travalers?.length ||
        location.state?.travellerDetails?.TravellerList?.Traveller?.length ||
        0;
      if (selectReturnSeats.length < travelerCount) {
        setSelectReturnSeats([...selectReturnSeats, seat]);
      }
    }
  };

  const removeReturnSeat = (seat) => {
    setSelectReturnSeats((prevSeats) =>
      prevSeats.filter((s) => s.seat !== seat.seat)
    );
  };

  console.log("selectOutwardSeats", selectOutwardSeats);

  const handleMealCountChange = (mealName, delta) => {
    setMealCounts((prev) => {
      const newCount = (prev[mealName] || 0) + delta;
      return {
        ...prev,
        [mealName]: newCount < 0 ? 0 : newCount,
      };
    });
  };

  console.log(selectedSeats);

  const displayText = location.state.seatOption;

  console.log(displayText);

  const seatData = parseSeatMap(displayText);

  console.log("seatData", seatData);

  const OutwardFlightSeats = seatData.filter(
    (outwardseat) => outwardseat.flightNumber === OutWardFlightNumber
  );
  console.log(OutwardFlightSeats);

  const ReturnFlightSeats = seatData.filter(
    (returnseat) => returnseat.flightNumber === ReturnFlightNumber
  );

  const Outwardrows = OutwardFlightSeats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  console.log(Outwardrows);

  const Returnrows = ReturnFlightSeats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const OutwardSortedRows = Object.entries(Outwardrows).sort(
    (a, b) => a[0] - b[0]
  );

  console.log(OutwardSortedRows);

  const ReturnSortedRows = Object.entries(Returnrows).sort(
    (a, b) => a[0] - b[0]
  );

  const getSeatColor = (type) => {
    switch (type) {
      case "Unavailable":
        return "bg-gray-300 hover:bg-gray-400 pointer-events-none";
      case "extra_legroom":
        return "bg-purple-300 hover:bg-purple-400";
      default:
        return "bg-white border-[0.2px] border-gray-300 hover:bg-gray-400 hover:bg-orange-500 ";
    }
  };

  let requestBody;
  const cleanTravellerDetails = (data) => {
    const shouldKeepEmptyKey = (key) =>
      key === "AreaCode" || key === "Extension";

    const cleanObject = (obj) => {
      if (Array.isArray(obj)) {
        return obj
          .map(cleanObject)
          .filter((item) =>
            typeof item === "object"
              ? Object.keys(item).length > 0
              : item !== ""
          );
      } else if (typeof obj === "object" && obj !== null) {
        const newObj = {};
        for (const key in obj) {
          const value = obj[key];

          if (value === "" && !shouldKeepEmptyKey(key)) {
            continue;
          }

          const cleanedValue = cleanObject(value);
          if (
            cleanedValue !== undefined &&
            (typeof cleanedValue !== "object" ||
              (Array.isArray(cleanedValue) && cleanedValue.length > 0) ||
              Object.keys(cleanedValue).length > 0)
          ) {
            newObj[key] = cleanedValue;
          }
        }
        return newObj;
      }
      return obj;
    };

    return cleanObject(data);
  };

  const handleNext = () => {
    setisOutwardSeat(true);
    // FIXED: Reset tab to "Seats" when switching to return flight
    setActiveTab("Seats");
  };

  const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;
  /*
  const handleProcessTerm = async (e) => {
    e.preventDefault();
    const seatsCombined = [...selectOutwardSeats, ...selectReturnSeats];
    const formattedSeats = seatsCombined.map(
      (seat) => `${seat.flightNumber}-${seat.seat}`
    );

    console.log(formattedSeats);

    // FIXED: Combine both outward and return luggage
    const luggageCombined = [
      ...selectedOutwardLuggage,
      ...selectedReturnLuggage,
    ];
    const formattedLuggageOption = luggageCombined.map(
      (luggage) => `${luggage.option}`
    );

    console.log("SL Outward", selectedOutwardLuggage);
    console.log("SL Return", selectedReturnLuggage);
    console.log(formattedSeats);
    console.log(formattedLuggageOption);
    console.log(travellerDetails);

    const travellerprofile = cleanTravellerDetails(travellerDetails);
    console.log("td", travellerDetails);
    console.log("tp", travellerprofile);

    requestBody = JSON.stringify({
      mode: "plane",
      routingId: routingId,
      outwardId: outwardId,
      ...(returnId && { returnId: returnId }),
      bookingProfile: travellerprofile,
      seatOptions: formattedSeats,
      luggageOptions: formattedLuggageOption,
      countryOfUser: travellerDetails.BillingDetails.Address.CountryCode,
    });

    console.log(requestBody);

    const response = await fetch(`${backendUrl}/process-terms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "plane",
        routingId: routingId,
        outwardId: outwardId,
        ...(returnId && { returnId: returnId }),
        bookingProfile: travellerprofile,
        seatOptions: formattedSeats,
        luggageOptions: formattedLuggageOption,
      }),
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      let res;

      if (contentType && contentType.includes("application/json")) {
        try {
          res = await response.json();
        } catch (error) {
          console.error("JSON parse error:", error);
          alert("Invalid JSON received from server.");
          return;
        }

        try {
          const priceList = res.data.Router[0].GroupList[0].Group[0].Price;
          const originalCurrency = priceList[0].Currency[0];
          const originalPrice = priceList[0].Amount[0];
          const TFBookingReference = res.data.TFBookingReference[0];

          if (
            priceList &&
            originalCurrency &&
            originalPrice &&
            TFBookingReference
          ) {
            const rates = await fetchExchangeRates("CVE");
            const convertedPrice = parseFloat(
              convertToRequestedCurrency(
                originalPrice,
                originalCurrency,
                "CVE",
                rates
              ).toFixed(2)
            );

            console.log(priceList);
            console.log(convertedPrice);
            const Taxitemlist = priceList[0].TaxItemList[0];
            console.log(Taxitemlist);
            let seatCharge = 0;
            let luggageSurcharge = 0;

            const taxlist = Taxitemlist.TaxItem;
            console.log(taxlist);
            taxlist.forEach((item) => {
              const originalPrice = parseFloat(item.Amount[0]);
              const originalCurrency = item.Currency[0];
              const name = item.Name[0];

              const convertedPrice = parseFloat(
                convertToRequestedCurrency(
                  originalPrice,
                  originalCurrency,
                  "CVE",
                  rates
                ).toFixed(2)
              );

              if (name === "Seat Charge") {
                seatCharge = convertedPrice;
              } else if (name === "Luggage surcharge") {
                luggageSurcharge = convertedPrice;
              }
            });

            console.log(seatCharge);
            console.log(TFBookingReference);
            navigate("/booking/payment", {
              state: {
                flights: location.state.flights,
                tripType: location.state.tripType,
                convertedPrice,
                originalPrice,
                originalCurrency,
                seatCharge: seatCharge,
                luggageSurcharge: luggageSurcharge,
                Address: travellerDetails.BillingDetails.Address,
                Email: travellerDetails.ContactDetails.Email,
                TFBookingReference,
              },
            });
          } else {
            console.table(res);
          }
        } catch (error) {
          console.error("Error using JSON data:", error);
        }
      } else if (contentType && contentType.includes("text/xml")) {
        const textResponse = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textResponse, "text/xml");

        const processTerms = xmlDoc.querySelector("ProcessTerms");
        if (processTerms) {
          const ecode = processTerms.getAttribute("ecode");
          const etext = processTerms.getAttribute("etext");
          const edetail = processTerms.getAttribute("edetail");
          const edate = processTerms.getAttribute("edate");

          console.error(
            `XML error received: code=${ecode}, text=${etext}, details=${edetail}, date=${edate}`
          );

          alert(`Seat selection failed:\n${edetail}`);
        } else {
          alert("Received unexpected XML data.");
        }
      } else {
        const textResponse = await response.text();
        console.error("Unexpected content-type response:", textResponse);
        alert("Server returned data in an unsupported format.");
      }
    } else {
      console.error(`Server returned status: ${response.status}`);
      alert("Could not fetch booking details.");
    }
  }; */
  console.log("gi", location.state.guestId);

  console.log(location.state.luggageOptions);

  console.log("uiout", userId);
  const handleProcessTerm = async (e) => {
    e.preventDefault();
    console.log(location.state.TFPay);

    const seatsCombined = [...selectOutwardSeats, ...selectReturnSeats];
    let formattedSeats = seatsCombined.map(
      (seat) => `${seat.flightNumber}-${seat.seat}`
    );

    const luggageCombined = [
      ...selectedOutwardLuggage,
      ...selectedReturnLuggage,
    ];
    const formattedLuggageOption = luggageCombined.map(
      (luggage) => `${luggage.option}`
    );

    const formattedOutwardLuggageOption = selectedOutwardLuggage.map(
      (luggage) => `${luggage.option}`
    );
    const formattedReturnLuggageOption = selectedReturnLuggage.map(
      (luggage) => `${luggage.option}`
    );
    console.log("flo", formattedLuggageOption);
    console.log("fowl", formattedOutwardLuggageOption);

    const travellerprofile = cleanTravellerDetails(travellerDetails);

    let maxRetries = 5;
    let attempt = 0;
    let success = false;
    let lastResponse = null;
    let luggageOptions = formattedLuggageOption;
    while (!success && attempt < maxRetries) {
      const response = await fetch(`${backendUrl}/process-terms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "plane",
          routingId: routingId,
          outwardId: outwardId,
          useTFPay: location.state.TFPay === true ? "yes" : "no",
          ...(returnId && { returnId }), // Include returnId only if it exists
          bookingProfile: travellerprofile,
          seatOptions: [...formattedSeats],
          // ...(location.state.luggageOptions
          //   ? { luggageOptions: luggageOptions }
          //   : {
          //     outwardLuggageOptions: formattedOutwardLuggageOption,
          //     ...(location.state.tripType === "Round Trip" && {
          //       returnLuggageOptions: formattedReturnLuggageOption,
          //     }),
          //   }),
          ...(location.state.luggageOptions > 0
            ? { luggageOptions: luggageOptions }
            : ""),
          ...(location.state.outwardLuggage > 0
            ? { outwardLuggageOptions: formattedOutwardLuggageOption }
            : ""),
          ...(location.state.returnLuggage > 0
            ? { returnLuggageOptions: formattedReturnLuggageOption }
            : ""),
        }),
      });

      if (response.ok) {
        success = true;
        lastResponse = response;
        break;
      } else if (response.status === 422) {
        formattedSeats = formattedSeats.map((seat) => seat + ";"); // update
        console.log(formattedSeats);
        attempt++;
        console.warn(`Retry attempt for seat ${attempt} due to 422 error`);
      } else {
        console.error(`Failed with status: ${response.status}`);
        alert("Could not fetch booking details.");
        return;
      }
    }

    if (!success) {
      alert("Failed to resolve seat selection issue after multiple attempts.");
      return;
    }

    // Now handle the successful response:
    const contentType = lastResponse.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        const res = await lastResponse.json();
        try {
          const priceList = res.data.Router[0].GroupList[0].Group[0].Price;
          const originalCurrency = priceList[0].Currency[0];
          const originalPrice = priceList[0].Amount[0];
          const TFBookingReference = res.data.TFBookingReference[0];

          if (
            priceList &&
            originalCurrency &&
            originalPrice &&
            TFBookingReference
          ) {
            const rates = await fetchExchangeRates("CVE");
            const convertedPrice = parseFloat(
              convertToRequestedCurrency(
                originalPrice,
                originalCurrency,
                "CVE",
                rates
              ).toFixed(2)
            );

            console.log(priceList);
            console.log(convertedPrice);
            const Taxitemlist = priceList[0].TaxItemList[0];
            console.log(Taxitemlist);
            let seatCharge = 0;
            let luggageSurcharge = 0;

            const taxlist = Taxitemlist.TaxItem;
            console.log(taxlist);
            taxlist.forEach((item) => {
              const originalPrice = parseFloat(item.Amount[0]);
              const originalCurrency = item.Currency[0];
              const name = item.Name[0];

              const convertedPrice = parseFloat(
                convertToRequestedCurrency(
                  originalPrice,
                  originalCurrency,
                  "CVE",
                  rates
                ).toFixed(2)
              );

              if (name === "Seat Charge") {
                seatCharge = convertedPrice;
              } else if (name === "Luggage surcharge") {
                luggageSurcharge = convertedPrice;
              }
            });

            console.log(seatCharge);
            console.log(TFBookingReference);
            console.log("ui", userId);
            navigate("/booking/payment", {
              state: {
                flights: location.state.flights,
                tripType: location.state.tripType,
                convertedPrice,
                originalPrice,
                originalCurrency,
                seatCharge: seatCharge,
                luggageSurcharge: luggageSurcharge,
                Address: travellerDetails.BillingDetails.Address,
                Email: travellerDetails.ContactDetails.Email,
                TFBookingReference,
                CardCharges: location.state.CardCharges,
                Seatoption: [...formattedSeats],
                TravellerList: location.state.travellerDetails,
                Guestid:
                  location.state.guestId !== "undefined"
                    ? location.state.guestId
                    : userId,
              },
            });
          } else {
            console.table(res);
          }
        } catch (error) {
          console.error("Error using JSON data:", error);
        }
      } catch (err) {
        console.error("Failed to parse JSON after success:", err);
      }
    } else {
      const textResponse = await lastResponse.text();
      console.error("Unsupported content type:", contentType, textResponse);
      alert("Received unsupported response format.");
    }
  };

  if (!flight)
    return <div className="text-center mt-20 font-['Lato']">Loading...</div>;

  console.log(OutwardSortedRows);

  const convertCurrency = (amount, rate) => {
    if (typeof amount !== "number" || typeof rate !== "number") {
      throw new Error("Amount and rate must be numbers");
    }
    return parseFloat((amount * rate).toFixed(2));
  };

  // const currentLuggageList = LuggageOptions;
  // const currentLuggageList = !isOutwardSeat
  //   ? LuggageOptions.length > 0
  //     ? outwardLuggageList
  //     : LuggageOptions
  //   : returnLuggageList || LuggageOptions;

  const currentLuggageList = !isOutwardSeat
    ? outwardLuggageList?.length > 0
      ? outwardLuggageList
      : LuggageOptions
    : returnLuggageList?.length > 0
    ? returnLuggageList
    : LuggageOptions;

  console.log(typeof LuggageOptions);

  console.log(currentLuggageList);

  const selectedLuggage = !isOutwardSeat
    ? selectedOutwardLuggage
    : selectedReturnLuggage;

  const handleLuggageClick = (Luggage, isSelected) => {
    if (!isOutwardSeat) {
      isSelected
        ? removeOutwardLuggage(Luggage)
        : handleSelectOutwardLuggage(Luggage);
    } else {
      isSelected
        ? removeReturnLuggage(Luggage)
        : handleSelectReturnLuggage(Luggage);
    }
  };

  return (
    <div className="font-sans flex justify-center">
      <div className="w-full max-w-[1140px] px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Section: Dynamic Content Based on Active Tab */}
          <div className="w-full lg:max-w-[680px] order-2 lg:order-1">
            <h2 className="mb-4 text-2xl font-semibold">
              {!isOutwardSeat ? "OutWard" : "Return"} Flight - Seat
            </h2>
            <div className="w-full h-auto lg:h-[550px] rounded-md shadow-sm overflow-hidden bg-white">
              {/* Tabs */}
              <div className="flex items-center px-6 bg-[#EE5128] py-3 space-x-8 font-['Plus Jakarta Sans'] text-[16px]">
                {["Seats", "Extra luggages"].map((tab) => (
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
                <div className="w-full md:w-[260px] flex-shrink-0 font-jakarta">
                  {activeTab === "Seats" && (
                    <>
                      {!isOutwardSeat ? (
                        <>
                          <div className="text-[14px] font-semibold flex justify-between">
                            <span>
                              {OutwardTicket?.segments[0].departureTime}
                            </span>
                            <span>
                              {OutwardTicket?.segments[1]
                                ? OutwardTicket?.segments[1].arrivalTime
                                : OutwardTicket?.segments[0].arrivalTime}
                            </span>
                          </div>
                          <div className="text-[12px] text-gray-500 flex justify-between mb-1">
                            <span>
                              {OutwardTicket.segments[0].departureCity}
                            </span>
                            <span>
                              {" "}
                              {OutwardTicket?.segments[1]
                                ? OutwardTicket.segments[1].arrivalCity
                                : OutwardTicket?.segments[0].arrivalCity}
                            </span>
                          </div>
                          <div className="text-center text-[12px] text-gray-500 bottom-9 relative">
                            {parseInt(OutwardTicket.segments[0].duration) +
                              parseInt(
                                OutwardTicket?.segments[1]?.duration || 0
                              ) +
                              "hr"}{" "}
                            ✈
                          </div>
                          <img
                            src={OutwardTicket.segments[0].logo}
                            alt="logo"
                            className="h-[40px] object-contain mt-1 mb-1 relative"
                          />
                          {/* <p className="text-[13px] text-gray-400 relative left-[8px]">
                            {OutwardTicket.segments[0].flightNumber}
                          </p> */}
                          <p className="bg-green-600 text-white text-[12px] px-2 py-[2px] rounded w-fit bottom-6 left-[65px] relative mt-1">
                            {OutwardTicket.segments[0].class}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="text-[14px] font-semibold flex justify-between">
                            <span>
                              {returnTicket.segments[0]?.departureTime}
                            </span>
                            <span>
                              {returnTicket.segments[1]
                                ? returnTicket?.segments[1].arrivalTime
                                : returnTicket?.segments[0].arrivalTime}
                            </span>
                          </div>
                          <div className="text-[12px] text-gray-500 flex justify-between mb-1">
                            <span>
                              {returnTicket.segments[0].departureCity}
                            </span>
                            <span>
                              {returnTicket.segments[1]
                                ? returnTicket.segments[1].arrivalCity
                                : returnTicket.segments[0].arrivalCity}
                            </span>
                          </div>
                          <div className="text-center text-[12px] text-gray-500 bottom-9 relative">
                            {parseInt(returnTicket.segments[0].duration) +
                              parseInt(
                                returnTicket?.segments[1]?.duration || 0
                              ) +
                              "hr"}{" "}
                            ✈
                          </div>
                          <img
                            src={returnTicket.segments[0].logo}
                            alt="logo"
                            className="h-[40px] object-contain mt-1 mb-1 relative"
                          />
                          {/* <p className="text-[13px] text-gray-400 relative left-[8px]">
                            {returnTicket.flightNumber}
                          </p> */}
                          <p className="bg-green-600 text-white text-[12px] px-2 py-[2px] rounded w-fit bottom-6 left-[65px] relative mt-1">
                            {returnTicket.segments[0].class}
                          </p>
                        </>
                      )}

                      {!isOutwardSeat ? (
                        <div className="mt-5 w-full min-h-[100px]">
                          <div className="rounded-md bg-white px-3 py-4 text-sm h-full flex flex-col justify-between">
                            <div className="flex flex-col">
                              <span className="font-medium mb-2">
                                Outward Selected seat: (
                                {selectOutwardSeats.length}/{getTravelerCount()}
                                )
                              </span>
                              <div
                                className={`flex flex-col ${
                                  selectOutwardSeats.length > 3
                                    ? "max-h-[120px] overflow-y-auto"
                                    : ""
                                }`}
                              >
                                {selectOutwardSeats.map((s, i) => (
                                  <li
                                    key={i}
                                    className="flex mb-1 justify-between items-start"
                                  >
                                    <div className="flex justify-between items-center text-sm font-medium w-full">
                                      <span className="flex-1 pr-2 text-xs leading-relaxed break-words">
                                        {s.seat +
                                          " " +
                                          s.description.join(", ")}
                                      </span>
                                      <span className="flex-shrink-0 text-xs">
                                        <span className="text-xs">CVE</span>{" "}
                                        {convertToRequestedCurrency(
                                          s.price,
                                          s.currency,
                                          "CVE",
                                          rate
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between font-bold mt-2">
                              <span>{t("seats.totalFare")} :</span>
                              <span>
                                CVE{" "}
                                {convertToRequestedCurrency(
                                  selectOutwardSeats.reduce(
                                    (amt, acc) => amt + acc.price,
                                    0
                                  ),
                                  selectOutwardSeats.reduce(
                                    (amt, acc) => amt + acc.currency,
                                    0
                                  ),
                                  "CVE",
                                  rate
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 w-full min-h-[100px]">
                          <div className="rounded-md bg-white px-3 py-4 text-sm h-full flex flex-col justify-between">
                            <div className="flex flex-col">
                              <span className="font-medium mb-2">
                                Return Selected seat: (
                                {selectReturnSeats.length}/
                                {location.state?.travellerDetails?.TravellerList
                                  ?.Traveller?.length || 0}
                                )
                              </span>
                              <div
                                className={`flex flex-col ${
                                  selectReturnSeats.length > 3
                                    ? "max-h-[120px] overflow-y-auto"
                                    : ""
                                }`}
                              >
                                {selectReturnSeats.map((s, i) => (
                                  <li
                                    key={i}
                                    className="flex mb-1 justify-between items-start"
                                  >
                                    <div className="flex justify-between items-center text-sm font-medium w-full">
                                      <span className="flex-1 pr-2 text-xs leading-relaxed break-words">
                                        {s.seat +
                                          " " +
                                          s.description.join(", ")}
                                      </span>
                                      <span className="flex-shrink-0 text-xs">
                                        <span className="text-xs">CVE</span>{" "}
                                        {convertToRequestedCurrency(
                                          s.price,
                                          s.currency,
                                          "CVE",
                                          rate
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between font-bold mt-2">
                              <span>{t("seats.totalFare")} :</span>
                              <span>
                                CVE{" "}
                                {convertToRequestedCurrency(
                                  selectReturnSeats.reduce(
                                    (amt, acc) => amt + acc.price,
                                    0
                                  ),
                                  selectReturnSeats.reduce(
                                    (amt, acc) => amt + acc.currency,
                                    0
                                  ),
                                  "CVE",
                                  rate
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <p className="font-semibold text-[14px] mb-2">
                          {t("seats.type.title")} :
                        </p>
                        <div className="grid grid-cols-2 text-[12px] gap-y-2 gap-x-4">
                          <span className="flex items-center">
                            <span className="inline-block w-6 h-4 border border-gray-400 mr-2" />
                            Available
                          </span>
                          <span className="flex items-center">
                            <span className="inline-block w-6 h-4 bg-purple-300 mr-2" />
                            Extra Legroom
                          </span>
                          <span className="flex items-center">
                            <span className="inline-block w-6 h-4 bg-orange-600 mr-2" />
                            Your booking
                          </span>
                          <span className="flex items-center">
                            <span className="inline-flex w-6 h-4 bg-gray-300 mr-2 justify-center items-center">
                              <X className="w-4 text-red-400" />
                            </span>
                            Booked
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

                  {/* FIXED: Updated Extra luggages section with separate handling */}
                  {activeTab === "Extra luggages" && (
                    <>
                      <div className="w-full">
                        <p className="font-semibold text-[16px] mb-4">
                          Select {!isOutwardSeat ? "Outward" : "Return"}{" "}
                          {t("luggages.title")}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full overflow-y-auto h-[400px] no-scrollbar">
                          {currentLuggageList.map((Luggage, index) => {
                            console.log(Luggage);

                            // const isSelected = selectedLuggage.some(
                            //   (l) => l === Luggage
                            // );

                            const isSelected = selectedLuggage.some(
                              (l) => l.option === Luggage.option
                            );

                            return (
                              <div
                                key={index}
                                className={`rounded-md w-full flex flex-col gap-1 justify-between p-4 shadow-sm hover:bg-orange-500 hover:text-white ${
                                  isSelected
                                    ? "bg-orange-600 text-white"
                                    : "bg-white"
                                }`}
                                onClick={() =>
                                  handleLuggageClick(Luggage, isSelected)
                                }
                              >
                                <div className="flex flex-col gap-1">
                                  <div className="flex gap-2">
                                    <LucideLuggage />
                                    {/* {Luggage.weights.includes("15Kg") && (
                                      <div className="flex items-end">
                                        <ShoppingBag className="size-5" />
                                        {
                                          Luggage.weights.filter(
                                            (item) => item === "15Kg"
                                          ).length
                                        }
                                      </div>
                                    )}
                                    {Luggage.weights.includes("23Kg") && (
                                      <div className="flex">
                                        <LucideLuggage />
                                        {
                                          Luggage.weights.filter(
                                            (item) => item === "23Kg"
                                          ).length
                                        }
                                      </div>
                                    )} */}
                                  </div>
                                  <div className="text-xs text-nowrap">
                                    {Luggage.weights.map((w) => w + " , ")}
                                  </div>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex flex-col justify-between items-center">
                                    <span className="font-base text-base whitespace-nowrap overflow-hidden text-ellipsis">
                                      {Luggage.name}
                                    </span>
                                  </div>
                                  <div className="flex text-sm">
                                    <span className="font-bold text-center text-nowrap">
                                      {Luggage.price} CVE
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Seat Capsule */}
                <div className="relative w-full md:w-[300px] md:ml-12 md:bottom-6 mx-auto">
                  <div className="relative h-[500px] md:h-[540px] bg-orange-600 bg-[url('/assets/seat-11.png')] bg-cover bg-center overflow-hidden">
                    <div className="h-full w-full overflow-x-hidden overflow-y-auto md:pr-1 no-scrollbar">
                      <div className="w-[240px] min-h-[900px] bg-white rounded-t-[140px] rounded-b-[40px] mt-15 shadow-inner flex flex-col py-4 px-6 mx-auto mb-20">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="text-sm font-semibold mb-3">
                            Front
                          </div>
                        </div>
                        <div className=" mx-auto flex pl-3.5 gap-2 items-center">
                          {["A", "B", "C", "D", "E", "F"].map((f) => (
                            <p className="pr-2.5">{f}</p>
                          ))}
                        </div>
                        {!isOutwardSeat
                          ? OutwardSortedRows.map(([rowNum, seats]) => (
                              <div
                                key={rowNum}
                                className="seat-row flex gap-2 items-center"
                              >
                                <div className="w-8 text-right font-semibold">
                                  {rowNum}
                                </div>
                                {seats
                                  .sort((a, b) =>
                                    a.column.localeCompare(b.column)
                                  )
                                  .map((seat) => {
                                    const isSelected = selectOutwardSeats.some(
                                      (s) => s.seat === seat.seat
                                    );

                                    return (
                                      <div
                                        key={seat.seat}
                                        className={`seat size-6 m-0.5 my-1 rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:text-white
										${getSeatColor(seat.type)} ${
                                          seat.type !== "Unavailable" &&
                                          !isSelected &&
                                          selectOutwardSeats.length >=
                                            getTravelerCount()
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                        }`}
                                        title={
                                          seat.seat +
                                          " " +
                                          seat.description.join(", ") +
                                          "|" +
                                          " " +
                                          convertToRequestedCurrency(
                                            seat.price,
                                            seat.currency,
                                            "CVE",
                                            rate
                                          ).toFixed(2) +
                                          " " +
                                          "CVE"
                                        }
                                        onClick={() => {
                                          if (seat.type === "Unavailable")
                                            return;
                                          if (
                                            !isSelected &&
                                            selectOutwardSeats.length >=
                                              getTravelerCount()
                                          )
                                            return;
                                          !isSelected
                                            ? handleOutwardSeatSelect(seat)
                                            : removeOutwardSeat(seat);
                                        }}
                                      >
                                        {seat.type === "Unavailable" ? (
                                          <div>
                                            <X className="w-4 text-red-400" />
                                          </div>
                                        ) : isSelected ? (
                                          <div className="w-full h-full bg-orange-600" />
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    );
                                  })}
                              </div>
                            ))
                          : ReturnSortedRows.map(([rowNum, seats]) => (
                              <div
                                key={rowNum}
                                className="seat-row flex gap-2 items-center"
                              >
                                <div className="w-8 text-right font-semibold">
                                  {rowNum}
                                </div>
                                {seats
                                  .sort((a, b) =>
                                    a.column.localeCompare(b.column)
                                  )
                                  .map((seat) => {
                                    const isSelected = selectReturnSeats.some(
                                      (s) => s.seat === seat.seat
                                    );

                                    return (
                                      <div
                                        key={seat.seat}
                                        className={`seat size-6 m-0.5 my-1 rounded flex items-center justify-center text-xs font-medium cursor-pointer   hover:text-white
${getSeatColor(seat.type)} ${
                                          seat.type !== "Unavailable" &&
                                          !isSelected &&
                                          selectReturnSeats.length >=
                                            getTravelerCount()
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                        }`}
                                        title={
                                          seat.seat +
                                          " " +
                                          seat.description.join(", ") +
                                          "|" +
                                          " " +
                                          convertToRequestedCurrency(
                                            seat.price,
                                            seat.currency,
                                            "CVE",
                                            rate
                                          ).toFixed(2) +
                                          " " +
                                          "CVE"
                                        }
                                        onClick={() => {
                                          if (seat.type === "Unavailable")
                                            return;
                                          if (
                                            !isSelected &&
                                            selectReturnSeats.length >=
                                              getTravelerCount()
                                          )
                                            return;
                                          !isSelected
                                            ? handleReturnSeatSelect(seat)
                                            : removeReturnSeat(seat);
                                        }}
                                      >
                                        {seat.type === "Unavailable" ? (
                                          <div>
                                            <X className="w-4 text-red-400" />
                                          </div>
                                        ) : isSelected ? (
                                          <div className="w-full h-full bg-orange-600" />
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    );
                                  })}
                              </div>
                            ))}
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
            {location.state.tripType === "One Way" ? (
              <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                  <h2 className="font-semibold text-[18px] font-jakarta">
                    {t("booking-details.title")}
                  </h2>
                </div>

                <div className="flex justify-between items-center px-6 mt-[20px]">
                  <div className="text-center">
                    <p className="text-[20px] font-bold font-jakarta">
                      {OutwardTicket.segments[0].departureTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {OutwardTicket.segments[0].departureCity}
                    </p>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <p className="text-xs text-gray-500 mb-[2px]">
                      {parseInt(OutwardTicket.segments[0].duration) +
                        parseInt(OutwardTicket?.segments[1]?.duration || 0) +
                        "hr"}
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="text-black text-sm">✈</span>
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                    </div>
                    <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                      {OutwardTicket.segments[0].class}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-bold font-jakarta">
                      {OutwardTicket?.segments[1]
                        ? OutwardTicket?.segments[1].arrivalTime
                        : OutwardTicket?.segments[0].arrivalTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {OutwardTicket?.segments[1]
                        ? OutwardTicket.segments[1].arrivalCity
                        : OutwardTicket?.segments[0].arrivalCity}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between px-6 mt-6">
                  <div className="text-left w-1/2 border-r pr-4">
                    <p className="text-sm font-semibold text-black font-jakarta m">
                      {t("booking-details.departure")}
                    </p>
                    <p className="text-xs text-gray-500 mt-[2px]">
                      {
                        (
                          OutwardTicket?.segments?.[1]?.departureDate ??
                          OutwardTicket?.segments?.[0]?.departureDate
                        )?.split("-")[0]
                      }
                    </p>
                  </div>
                  <div className="text-left w-1/2 pl-4">
                    <p className="text-sm font-semibold text-black font-jakarta ml-5">
                      {t("booking-details.landing")}
                    </p>
                    <p className="text-xs text-gray-500 mt-[2px] ml-5">
                      {
                        (
                          OutwardTicket?.segments?.[1]?.arrivalDate ??
                          OutwardTicket?.segments?.[0]?.arrivalDate
                        )?.split("-")[0]
                      }
                    </p>
                  </div>
                </div>

                <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
                  <span>{t("booking-details.policy")}</span>
                  <span className="ml-10">{t("booking-details.refund")}</span>
                  <span>{t("booking-details.reschedule")}</span>
                </div>
              </div>
            ) : location.state.tripType === "Round Trip" ? (
              <div className="flex flex-col gap-6">
                <div className="max-w-[377px] w-full min-h-[280px] bg-white rounded-[12px] pb-4">
                  <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                    <h2 className="font-semibold text-[18px] font-jakarta">
                      {t("booking-details.title")}
                    </h2>
                  </div>

                  <div className="flex justify-between items-center px-6 mt-[20px]">
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.departureTime} */}
                        {OutwardTicket?.segments[0].departureTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {OutwardTicket.segments[0].departureCity}
                      </p>
                    </div>
                    <div className="flex flex-col items-center relative">
                      <p className="text-xs text-gray-500 mb-[2px]">
                        {parseInt(OutwardTicket.segments[0].duration) +
                          parseInt(OutwardTicket?.segments[1]?.duration || 0) +
                          "hr"}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="text-black text-sm">✈</span>
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      </div>
                      <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                        {OutwardTicket.segments[0].class}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.arrivalTime} */}
                        {OutwardTicket?.segments[1]
                          ? OutwardTicket?.segments[1].arrivalTime
                          : OutwardTicket?.segments[0].arrivalTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {OutwardTicket?.segments[1]
                          ? OutwardTicket.segments[1].arrivalCity
                          : OutwardTicket?.segments[0].arrivalCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between px-6 mt-6">
                    <div className="text-left w-1/2 border-r pr-4">
                      <p className="text-sm font-semibold text-black font-jakarta m">
                        {t("booking-details.departure")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px]">
                        {
                          (
                            OutwardTicket?.segments?.[1]?.departureDate ??
                            OutwardTicket?.segments?.[0]?.departureDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                    <div className="text-left w-1/2 pl-4">
                      <p className="text-sm font-semibold text-black font-jakarta ml-5">
                        {t("booking-details.landing")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px] ml-5">
                        {
                          (
                            OutwardTicket?.segments?.[1]?.arrivalDate ??
                            OutwardTicket?.segments?.[0]?.arrivalDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-6 mt-[20px]">
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.departureTime} */}
                        {returnTicket?.segments[0].departureTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {returnTicket.segments[0].departureCity}
                      </p>
                    </div>
                    <div className="flex flex-col items-center relative">
                      <p className="text-xs text-gray-500 mb-[2px]">
                        {parseInt(returnTicket.segments[0].duration) +
                          parseInt(returnTicket?.segments[1]?.duration || 0) +
                          "hr"}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="text-black text-sm">✈</span>
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      </div>
                      <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                        {returnTicket.segments[0].class}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.arrivalTime} */}
                        {returnTicket.segments[1]
                          ? returnTicket?.segments[1].arrivalTime
                          : returnTicket?.segments[0].arrivalTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {returnTicket.segments[1]
                          ? returnTicket.segments[1].arrivalCity
                          : returnTicket.segments[0].arrivalCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between px-6 mt-6">
                    <div className="text-left w-1/2 border-r pr-4">
                      <p className="text-sm font-semibold text-black font-jakarta m">
                        {t("booking-details.departure")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px]">
                        {
                          (
                            returnTicket?.segments?.[1]?.departureDate ??
                            returnTicket?.segments?.[0]?.departureDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                    <div className="text-left w-1/2 pl-4">
                      <p className="text-sm font-semibold text-black font-jakarta ml-5">
                        {t("booking-details.landing")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px] ml-5">
                        {
                          (
                            returnTicket?.segments?.[1]?.arrivalDate ??
                            returnTicket?.segments?.[0]?.arrivalDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                  <h2 className="font-semibold text-[18px] font-jakarta">
                    {t("booking-details.title")}
                  </h2>
                </div>
                <div className="flex justify-between items-center px-6 mt-[20px]">
                  Something error
                </div>
              </div>
            )}

            {/* FIXED: Updated Price Summary with separate luggage totals */}
            <div className="bg-white rounded-md shadow-sm">
              <div className="bg-[#FFE4DB] p-4 font-semibold font-['Plus Jakarta Sans']">
                {t("summary.title")}
              </div>
              <div className="p-4 space-y-3 text-[14px] text-black font-['Lato']">
                <div className="flex justify-between">
                  <span>Outward Flight Ticket</span>
                  <span className="font-semibold flex gap-1">
                    <span>CVE</span>
                    <span>{OutwardTicket.price}</span>
                  </span>
                </div>
                {returnTicket && (
                  <div className="flex justify-between">
                    <span>Return Flight Ticket</span>
                    <span className="font-semibold flex gap-1">
                      <span>CVE</span>
                      <span>{returnTicket.price}</span>
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Outward seat x {selectOutwardSeats.length}</span>
                  <span className="font-semibold flex gap-1">
                    <span>CVE</span>
                    <span>
                      {convertToRequestedCurrency(
                        selectOutwardSeats.reduce(
                          (amt, acc) => amt + acc.price,
                          0
                        ),
                        selectOutwardSeats.reduce(
                          (amt, acc) => amt + acc.currency,
                          0
                        ),
                        "CVE",
                        rate
                      ).toFixed(2)}
                    </span>
                  </span>
                </div>
                {returnTicket && (
                  <div className="flex justify-between">
                    <span>Return seat x {selectReturnSeats.length}</span>
                    <span className="font-semibold flex gap-1">
                      <span>CVE</span>
                      <span>
                        {convertToRequestedCurrency(
                          selectReturnSeats.reduce(
                            (amt, acc) => amt + acc.price,
                            0
                          ),
                          selectReturnSeats.reduce(
                            (amt, acc) => amt + acc.currency,
                            0
                          ),
                          "CVE",
                          rate
                        ).toFixed(2)}
                      </span>
                    </span>
                  </div>
                )}
                {/* FIXED: Add outward luggage to summary */}
                {selectedOutwardLuggage.length > 0 && (
                  <div className="flex justify-between">
                    <span>
                      Outward luggage x {selectedOutwardLuggage.length}
                    </span>
                    <span className="font-semibold flex gap-1">
                      <span>CVE</span>
                      <span>
                        {selectedOutwardLuggage.reduce(
                          (total, luggage) => total + luggage.price,
                          0
                        )}
                      </span>
                    </span>
                  </div>
                )}
                {/* FIXED: Add return luggage to summary */}
                {selectedReturnLuggage.length > 0 && (
                  <div className="flex justify-between">
                    <span>Return luggage x {selectedReturnLuggage.length}</span>
                    <span className="font-semibold flex gap-1">
                      <span>CVE</span>
                      <span>
                        {selectedReturnLuggage.reduce(
                          (total, luggage) => total + luggage.price,
                          0
                        )}
                      </span>
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-3 text-[#EE5128] font-semibold">
                  <span>{t("summary.total")}</span>
                  <span>
                    <span>CVE</span>{" "}
                    <span>
                      {(
                        Number(OutwardTicket.price) +
                        Number(returnTicket ? returnTicket?.price : 0) +
                        Number(
                          convertToRequestedCurrency(
                            selectOutwardSeats.reduce(
                              (amt, acc) => amt + acc.price,
                              0
                            ),
                            selectOutwardSeats.reduce(
                              (amt, acc) => amt + acc.currency,
                              0
                            ),
                            "CVE",
                            rate
                          ).toFixed(2)
                        ) +
                        Number(
                          convertToRequestedCurrency(
                            selectReturnSeats.reduce(
                              (amt, acc) => amt + acc.price,
                              0
                            ),
                            selectReturnSeats.reduce(
                              (amt, acc) => amt + acc.currency,
                              0
                            ),
                            "CVE",
                            rate
                          ).toFixed(2)
                        ) +
                        Number(
                          convertToRequestedCurrency(
                            selectedOutwardLuggage.reduce(
                              (amt, acc) => amt + acc.price,
                              0
                            ),
                            selectedOutwardLuggage.reduce(
                              (amt, acc) => amt + acc.currency,
                              0
                            ),
                            "CVE",
                            rate
                          ).toFixed(2)
                        ) +
                        Number(
                          convertToRequestedCurrency(
                            selectedReturnLuggage.reduce(
                              (amt, acc) => amt + acc.price,
                              0
                            ),
                            selectedReturnLuggage.reduce(
                              (amt, acc) => amt + acc.currency,
                              0
                            ),
                            "CVE",
                            rate
                          ).toFixed(2)
                        )
                      ).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full mx-auto text-center  flex flex-col md:flex-row justify-start items-center gap-4">
              <button
                onClick={(e) => {
                  location.state.tripType === "One Way"
                    ? handleProcessTerm(e)
                    : location.state.tripType === "Round Trip"
                    ? !isOutwardSeat
                      ? handleNext()
                      : handleProcessTerm(e)
                    : null;
                }}
                className="bg-[#EE5128] text-white px-6 py-2 lg:relative lg:left-5 rounded font-semibold font-['Plus Jakarta Sans'] w-full md:w-auto hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
              >
                {location.state.tripType === "One Way"
                  ? t("continue-booking")
                  : location.state.tripType === "Round Trip"
                  ? !isOutwardSeat
                    ? "Next"
                    : t("continue-booking")
                  : null}
              </button>
              {/* <button className="text-[#EE5128] font-semibold text-sm lg:relative mt-2 md:mt-0 hover:underline px-10">
                Skip Extra
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
