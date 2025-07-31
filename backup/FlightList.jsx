import { useEffect, useMemo, useRef, useState } from "react";

import {
  ArrowLeftRightIcon,
  MapPin,
  Search,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";

import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
import LandingPlane from "../../assets/images/LandingPlane.svg";
import DateFrom from "../../assets/images/DateFrom.svg";
import DateTo from "../../assets/images/DateTo.svg";
import TravelerIcon from "../../assets/images/TravelerIcon.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TicketIcon from "../../assets/images/TicketIcon.svg";
import Noflight from "../../assets/images/noflight.jpg";
import DepartureFlightIcon from "../../assets/images/WhiteFlightTakeoff.svg";
import NavFlightIcon from "../../assets/images/FlightIcon.svg";

import SunRiseIcon from "../../assets/images/SunRiseIcon.svg";
import SunSetIcon from "../../assets/images/SunSetIcon.svg";
import MoonRiseIcon from "../../assets/images/MoonRiseIcon.svg";
import MoonSetIcon from "../../assets/images/MoonSetIcon.svg";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import {
  fetchExchangeRates,
  convertToRequestedCurrency,
} from "../../utils/Currencyconverter";
import axios from "axios";

function FlightList({ country }) {
  const { t } = useTranslation();
  const location = useLocation();

  const {
    routingId,
    tripType,
    oneWay,
    roundTrip,
    FightSearchData,
    flightsData: initialFlights,
  } = location?.state || {};
  console.log(routingId);
  console.log(tripType);
  const [flightsData, setFlightsData] = useState(initialFlights);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [searchData, setSearchdata] = useState({
    from: "",
    to: "",
    flightDepatureDate: null,
    flightReturnDate: null,
    travelClass: "",
  });
  const [SearchProps, setSearchProps] = useState({});
  const [TripType, setTripType] = useState("");

  const [travalers, setTravalers] = useState(FightSearchData?.travellers || []);

  console.log("travalers", FightSearchData?.travellers);

  // useEffect
  console.log("Search", FightSearchData);
  console.log("Fd", flightsData);
  useEffect(() => {
    console.log("FlightList useEffect - location.state:", location.state);

    if (location.state) {
      const {
        routingId: stateRoutingId,
        tripType: stateTripType,
        oneWay: stateOneWay,
        roundTrip: stateRoundTrip,
        FightSearchData: stateFightSearchData,
        flightsData: stateFlightsData,
      } = location.state;

      // Set trip type first
      if (stateTripType) {
        setTripType(stateTripType);
      }

      // Set flights data based on trip type
      if (stateTripType === "One Way" && stateOneWay) {
        console.log("Setting One Way flights:", stateOneWay);
        setFlightsData(stateOneWay);
      } else if (stateTripType === "Round Trip" && stateRoundTrip) {
        console.log("Setting Round Trip flights:", stateRoundTrip);
        setFlightsData(stateRoundTrip);
      } else if (stateFlightsData) {
        console.log("Setting flights from flightsData:", stateFlightsData);
        setFlightsData(stateFlightsData);
      }

      // Set search data and origin/destination
      if (stateFightSearchData) {
        console.log("Setting search data:", stateFightSearchData);
        setSearchProps(stateFightSearchData);
        setTravalers(stateFightSearchData.travellers || []);

        // Extract origin and destination with better fallback logic
        const originValue =
          stateFightSearchData.origin?.descriptor ||
          stateFightSearchData.from ||
          "";

        const destinationValue =
          stateFightSearchData.destination?.descriptor ||
          stateFightSearchData.to ||
          "";

        console.log(
          "Setting origin:",
          originValue,
          "destination:",
          destinationValue
        );
        setOrigin(originValue);
        setDestination(destinationValue);

        // Set searchData for the filter component
        setSearchdata({
          from: originValue,
          to: destinationValue,
          flightDepatureDate: stateFightSearchData.dateOfSearch || null,
          flightReturnDate: stateFightSearchData.returnDateOfSearch || null,
          travelClass: stateFightSearchData.travelClass || "Economy",
        });
      }
    } else {
      console.log("No location.state found - this might be a direct page load");
    }
  }, [location.state]); // Make sure to include location.state as dependency

  return (
    <div className="relative">
      {/* Fixed: Pass the correct props to SearchBox */}
      <SearchBox
        setFlightsData={setFlightsData}
        TripType={TripType}
        setTripType={setTripType}
        From={origin}
        To={destination}
        SearchProps={FightSearchData} // Pass the complete search data
        country={country}
      />
      <div
        className={`min-h-screen px-4 ${
          location.pathname === "/list" ? "lg:px-20 xl:px-40" : ""
        } bg-neutral-100 flex relative py-[66px] gap-[43px] flex-col xl:flex-row`}
      >
        <div className="sticky top-0 flex-col gap-[29px] hidden xl:flex">
          {/* <RecentlyBookedTickets t={t} /> */}
          {/* Restored FilterFlight component */}
          <FilterFlight
            searchData={searchData}
            setFlightsData={setFlightsData}
            flights={flightsData}
            t={t}
            routingId={routingId}
          />
        </div>

        <div className="flex-1 flex flex-col gap-[50px]">
          <div className="hidden xl:block">
            <FlightDatePicker flights={flightsData} t={t} />
          </div>

          {TripType === "One Way" && (
            <FlightResults
              t={t}
              flights={flightsData}
              origin={origin}
              destination={destination}
              routingId={routingId}
              TripType={TripType}
              travalers={travalers}
              searchData={searchData}
              SearchProps={SearchProps} // ✅ Make sure this line exists
              // selectOutWard={selectOutWard}
            />
          )}

          {TripType === "Round Trip" && (
            <RoundTrip
              t={t}
              flights={flightsData}
              origin={origin}
              destination={destination}
              routingId={routingId}
              TripType={TripType}
              travalers={travalers}
              SearchProps={SearchProps} // ✅ Make sure this line exists
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightList;

// /////////////////////////////////////////////////
//
//  Flight Search Box
//
// ////////////////////////////////////////////////

// const SearchBox = ({
//   setFlightsData,
//   TripType,
//   setTripType,
//   From,
//   To,
//   SearchProps,
//   country,
// }) => {
//   const { t } = useTranslation();
//   const [isDirectFlight, setIsDirectFlight] = useState(false);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [flightDepatureDate, setflightDepatureDate] = useState(new Date());
//   const [flightReturnDate, setflightReturnDate] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [travelClass, setTravelClass] = useState("Economy");
//   const [travellers, setTravellers] = useState([30]);
//   const [routeId, setRouteId] = useState("");
//   const [searchCount, setSearchCount] = useState(0);
//   const [commissionDetails, setcommissionDetails] = useState([]);
//   const travelFusionBackendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;
//   /*const listSupplierRoute = async () => {
//     try {
//       const response = await fetch(
//         `${travelFusionBackendUrl}/get-supplierroute`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json(); // Convert the response body to JSON
//       const iata = data.suppliers[0].airportRoutes;
//       console.log("Supplier route data:", iata); // Log the parsed data
//     } catch (error) {
//       console.error("Failed to fetch supplier route:", error);
//     }
//   };*/
//   const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;
//   const getcommission = async () => {
//     try {
//       const res = await fetch(`${transactionUrl}/getcommissiondetails`);
//       const result = await res.json();
//       console.log(result.commissionDetail);
//       const commission = result.commissionDetail;
//       setcommissionDetails(commission);
//     } catch (error) {
//       console.error("Failed to fetch supplier route:", error);
//     }
//   };

//   useEffect(() => {
//     getcommission();
//     // listSupplierRoute();
//   }, []);
//   // Fix: Properly set initial values from previous search
//   useEffect(() => {
//     if (SearchProps) {
//       // Set values from SearchProps if available
//       setFrom(SearchProps.origin?.descriptor || SearchProps.from || "");
//       setTo(SearchProps.destination?.descriptor || SearchProps.to || "");

//       // Set dates if available
//       if (SearchProps.dateOfSearch) {
//         // Parse the date string back to Date object
//         const depDate = SearchProps.dateOfSearch.split("-")[0]; // Get date part before time
//         const [day, month, year] = depDate.split("/");
//         setflightDepatureDate(new Date(year, month - 1, day));
//       }

//       if (SearchProps.returnDateOfSearch) {
//         const retDate = SearchProps.returnDateOfSearch.split("-")[0];
//         const [day, month, year] = retDate.split("/");
//         setflightReturnDate(new Date(year, month - 1, day));
//       }

//       // Set travelers if available
//       if (SearchProps.travellers && SearchProps.travellers.length > 0) {
//         const adultCount = SearchProps.travellers.filter(
//           (age) => age >= 18
//         ).length;
//         const childCount = SearchProps.travellers.filter(
//           (age) => age < 18
//         ).length;
//         setAdults(adultCount || 1);
//         setChildren(childCount || 0);
//       }
//     } else {
//       // Fallback to From/To props
//       setFrom(From || "");
//       setTo(To || "");
//     }
//   }, [SearchProps, From, To]); // Add proper dependencies

//   const handleTravelFusionDate = (newDate) => {
//     if (!newDate) {
//       return;
//     } // Handle null or invalid date
//     else {
//       // Ensure newDate is a Date object
//       const selectedDate = new Date(newDate);

//       const year = selectedDate.getFullYear();
//       const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//       const day = String(selectedDate.getDate()).padStart(2, "0");

//       const formattedDate = `${day}/${month}/${year}`;
//       return formattedDate;
//     }
//   };

//   const handleTravelfusionSearch = (e) => {
//     console.log(from);
//     e.preventDefault();

//     const formattedFlightDepatureDate =
//       handleTravelFusionDate(flightDepatureDate) + "-00:01";

//     console.log({
//       from,
//       to,
//       flightDepatureDate,
//       flightReturnDate,
//       travelClass,
//     });
//     if (flightReturnDate !== null && TripType == "Round Trip") {
//       const formattedFlightReturnDate =
//         handleTravelFusionDate(flightReturnDate) + "-23:59";
//     } else {
//       setflightReturnDate(null);
//     }
//     console.log(adults);
//     setFrom(from);
//     setTo(to);
//     setSearchCount((prev) => prev + 1);
//   };

//   useEffect(() => {
//     // make an array of N adults
//     const adult = Array(adults).fill(30);
//     // make an array of N children
//     const child = Array(children).fill(7);
//     // combine them
//     setTravellers([...adult, ...child]);
//   }, [adults, children]);

//   // Fetch flights based on the search parameters
//   useEffect(() => {
//     const fetchFlights = async () => {
//       console.log("Travelfusion routing API Call");
//       console.log("country flightlist", country);
//       try {
//         const requestBody = {
//           mode: "plane",
//           origin: {
//             descriptor: from,
//           },
//           destination: {
//             descriptor: to,
//           },
//           dateOfSearch: handleTravelFusionDate(flightDepatureDate) + "-00:01",
//           travellers: travellers,
//           incrementalResults: true,
//           // this will **conditionally add** returnDateOfSearch if flightReturnDate exists
//           ...(flightReturnDate && {
//             returnDateOfSearch:
//               handleTravelFusionDate(flightReturnDate) + "-23:59",
//           }),
//           countryCode: country,
//         };

//         console.log(requestBody);

//         const response = await fetch(
//           `${travelFusionBackendUrl}/start-routing`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(requestBody),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch flight data");
//         }

//         const data = await response.json();
//         console.log(data);
//         setRouteId(data.routingId);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (searchCount > 0) {
//       fetchFlights();
//     }
//   }, [searchCount]);

//   const getCommissionDetail = async (tfPrice) => {
//     try {
//       if (!commissionDetails) {
//         return console.log("Error");
//       } else {
//         const Commission = commissionDetails.Commission;
//         if (Commission) {
//           console.log(Commission);
//           if (commissionDetails.CommissionType.toLowerCase() === "percentage") {
//             const commissionAmount = (tfPrice * Commission) / 100;
//             const totalAmount = tfPrice + commissionAmount;
//             return totalAmount.toFixed(2);
//           } else if (
//             commissionDetails.CommissionType.toLowerCase() === "amount"
//           ) {
//             const totalAmount = tfPrice + Commission;
//             return totalAmount.toFixed(2);
//           }
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const fetchFlights = async () => {
//       console.log("Travelfusion Search API Call");
//       try {
//         const response = await fetch(
//           `${travelFusionBackendUrl}/check-routing`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               routingId: routeId,
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch flight data");
//         }

//         const data = await response.json();
//         console.log("API Response:", data);

//         // Add defensive checks for data structure
//         if (
//           !data ||
//           !data.flightList ||
//           !Array.isArray(data.flightList) ||
//           data.flightList.length === 0
//         ) {
//           console.log("No flight data available");
//           setFlightsData([]);
//           return;
//         }

//         const firstFlight = data.flightList[0];
//         if (
//           !firstFlight ||
//           !firstFlight.Router ||
//           !Array.isArray(firstFlight.Router)
//         ) {
//           console.log("No router data available");
//           setFlightsData([]);
//           return;
//         }

//         // *** CURRENCY CONVERSION: Fetch exchange rates ***
//         const rates = await fetchExchangeRates("CVE"); // CVE as base currency
//         const routerList = firstFlight.Router;

//         // Step 1: Collect all raw flight data
//         const allFlightPromises = [];

//         for (const supplier of routerList) {
//           if (!supplier?.GroupList || !Array.isArray(supplier.GroupList))
//             continue;

//           for (const groupContainer of supplier.GroupList) {
//             if (!groupContainer?.Group || !Array.isArray(groupContainer.Group))
//               continue;

//             for (const group of groupContainer.Group) {
//               if (
//                 !group?.OutwardList ||
//                 !Array.isArray(group.OutwardList) ||
//                 group.OutwardList.length === 0
//               )
//                 continue;

//               const outwardList = group.OutwardList[0]?.Outward || [];
//               console.log(outwardList);
//               for (const flight of outwardList) {
//                 allFlightPromises.push(
//                   (async () => {
//                     try {
//                       if (!flight?.SegmentList?.[0]?.Segment?.[0]) return null;

//                       const segment = flight.SegmentList[0].Segment[0];
//                       const origin = Array.isArray(segment.Origin)
//                         ? segment.Origin[0]
//                         : null;
//                       const destination = Array.isArray(segment.Destination)
//                         ? segment.Destination[0]
//                         : null;

//                       const operatorName =
//                         segment.Operator?.[0]?.Name?.[0] || "Unknown Airline";

//                       const logo = operatorName.toLowerCase();
//                       const flightId =
//                         segment.FlightId?.[0]?.Code?.[0] || "N/A";
//                       const travelClass =
//                         segment.TravelClass?.[0]?.TfClass?.[0] || "Economy";
//                       const departureTime =
//                         segment.DepartDate?.[0]?.split("-")[1] || "N/A";
//                       const arrivalTime =
//                         segment.ArriveDate?.[0]?.split("-")[1] || "N/A";
//                       const departureDate = segment.DepartDate?.[0];
//                       const arrivalDate = segment.ArriveDate?.[0];
//                       const duration = segment.Duration?.[0]
//                         ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
//                         : "N/A";

//                       const originalPrice = parseFloat(
//                         flight.Price?.[0]?.Amount?.[0] || "0"
//                       );
//                       const originalCurrency =
//                         flight.Price?.[0]?.Currency?.[0] || "N/A";

//                       return {
//                         id: flight.Id?.[0] || "N/A",
//                         airline: operatorName,
//                         logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
//                         flightNumber: flightId,
//                         class: travelClass,
//                         departureDate,
//                         departureTime,
//                         departureCity: origin?.Code?.[0] || "N/A",
//                         arrivalDate,
//                         arrivalTime,
//                         arrivalCity: destination?.Code?.[0] || "N/A",
//                         duration,
//                         originalPrice,
//                         originalCurrency,
//                       };
//                     } catch (e) {
//                       console.error("Flight parse error:", e);
//                       return null;
//                     }
//                   })()
//                 );
//               }
//             }
//           }
//         }

//         const rawFlights = (await Promise.all(allFlightPromises)).filter(
//           Boolean
//         );

//         // Step 2: Convert and cache unique prices
//         const currencyMap = {}; // key = currency, value = rate to CVE
//         const priceCommissionMap = {}; // key = original converted price, value = with commission

//         for (const flight of rawFlights) {
//           const key = `${flight.originalPrice}_${flight.originalCurrency}`;

//           if (!(key in priceCommissionMap)) {
//             try {
//               if (!(flight.originalCurrency in currencyMap)) {
//                 currencyMap[flight.originalCurrency] =
//                   convertToRequestedCurrency(
//                     1,
//                     flight.originalCurrency,
//                     "CVE",
//                     rates
//                   );
//               }

//               const rate = currencyMap[flight.originalCurrency];
//               const convertedPrice = parseFloat(
//                 (flight.originalPrice * rate).toFixed(2)
//               );
//               const finalPrice = await getCommissionDetail(convertedPrice);
//               priceCommissionMap[key] = {
//                 convertedPrice: finalPrice,
//                 convertedFrom: flight.originalPrice,
//                 fromCurrency: flight.originalCurrency,
//               };
//             } catch (e) {
//               console.error("Conversion/commission error:", e);
//             }
//           }
//         }

//         // Step 3: Build final simplified flights
//         const simplifiedFlights = rawFlights.map((flight) => {
//           const key = `${flight.originalPrice}_${flight.originalCurrency}`;
//           const priceInfo = priceCommissionMap[key];

//           return {
//             ...flight,
//             price: priceInfo?.convertedPrice || 0,
//             originalPrice: priceInfo?.convertedPrice || 0,
//             convertedcurrencyfrom: priceInfo?.fromCurrency || "N/A",
//             convertedPricefrom: priceInfo?.convertedFrom || 0,
//             currency: "CVE",
//           };
//         });

//         // Step 1: Collect all flight details (without conversion)
//         const rawFlightDataPromises = [];

//         for (const supplier of routerList) {
//           if (!Array.isArray(supplier?.GroupList)) continue;

//           for (const groupContainer of supplier.GroupList) {
//             if (!Array.isArray(groupContainer?.Group)) continue;

//             for (const group of groupContainer.Group) {
//               const outwardList = group?.OutwardList?.[0]?.Outward ?? [];
//               const returnList = group?.ReturnList?.[0]?.Return ?? [];

//               const extractFlightInfo = async (flight, type) => {
//                 try {
//                   const segment = flight?.SegmentList?.[0]?.Segment?.[0];
//                   if (!segment) return null;

//                   const origin = segment.Origin?.[0] ?? {};
//                   const destination = segment.Destination?.[0] ?? {};
//                   const operatorName =
//                     segment.Operator?.[0]?.Name?.[0] ?? "Unknown Airline";
//                   const logo = operatorName.toLowerCase();
//                   const flightId = segment.FlightId?.[0]?.Code?.[0] ?? "N/A";
//                   const travelClass =
//                     segment.TravelClass?.[0]?.SupplierClass?.[0] ?? "Economy";

//                   const departureTime =
//                     segment.DepartDate?.[0]?.split("-")[1] ?? "N/A";
//                   const arrivalTime =
//                     segment.ArriveDate?.[0]?.split("-")[1] ?? "N/A";
//                   const duration = segment.Duration?.[0]
//                     ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
//                     : "N/A";

//                   const originalPrice = parseFloat(
//                     flight?.Price?.[0]?.Amount?.[0] ?? "0"
//                   );
//                   const originalCurrency =
//                     flight?.Price?.[0]?.Currency?.[0] ?? "N/A";
//                   const departureDate = segment.DepartDate?.[0];
//                   const arrivalDate = segment.ArriveDate?.[0];
//                   return {
//                     id: flight.Id?.[0] ?? "N/A",
//                     airline: operatorName,
//                     logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
//                     flightNumber: flightId,
//                     class: travelClass,
//                     departureDate,
//                     departureTime,
//                     departureCity: origin.Code?.[0] ?? "N/A",
//                     arrivalDate,
//                     arrivalTime,
//                     arrivalCity: destination.Code?.[0] ?? "N/A",
//                     duration,
//                     originalPrice,
//                     originalCurrency,
//                     type,
//                   };
//                 } catch (err) {
//                   console.error(`Error parsing ${type} flight:`, err);
//                   return null;
//                 }
//               };

//               for (const flight of outwardList) {
//                 rawFlightDataPromises.push(
//                   extractFlightInfo(flight, "outward")
//                 );
//               }

//               for (const flight of returnList) {
//                 rawFlightDataPromises.push(extractFlightInfo(flight, "return"));
//               }
//             }
//           }
//         }

//         const rawFlightData = (await Promise.all(rawFlightDataPromises)).filter(
//           Boolean
//         );

//         // Step 2: Convert/calculate commission only once per unique price+currency
//         const currencyRateCache = {};
//         const commissionCache = {};

//         for (const flight of rawFlightData) {
//           const key = `${flight.originalPrice}_${flight.originalCurrency}`;
//           if (!commissionCache[key]) {
//             try {
//               if (!currencyRateCache[flight.originalCurrency]) {
//                 currencyRateCache[flight.originalCurrency] =
//                   convertToRequestedCurrency(
//                     1,
//                     flight.originalCurrency,
//                     "CVE",
//                     rates
//                   );
//               }

//               const rate = currencyRateCache[flight.originalCurrency];
//               const converted = parseFloat(
//                 (flight.originalPrice * rate).toFixed(2)
//               );
//               const finalPrice = await getCommissionDetail(converted);

//               commissionCache[key] = {
//                 convertedPrice: finalPrice,
//                 convertedFrom: flight.originalPrice,
//                 fromCurrency: flight.originalCurrency,
//               };
//             } catch (e) {
//               console.error("Conversion or commission failed:", e);
//               commissionCache[key] = null;
//             }
//           }
//         }

//         // Step 3: Final flight object with price info attached
//         const simplifiedFlightsGroup = rawFlightData
//           .map((flight) => {
//             const key = `${flight.originalPrice}_${flight.originalCurrency}`;
//             const priceInfo = commissionCache[key];

//             if (!priceInfo) return null;

//             return {
//               ...flight,
//               price: priceInfo.convertedPrice,
//               originalPrice: priceInfo.convertedPrice,
//               convertedcurrencyfrom: priceInfo.fromCurrency,
//               convertedPricefrom: priceInfo.convertedFrom,
//               currency: "CVE",
//             };
//           })
//           .filter(Boolean);

//         console.log("simplifiedflightgroup", simplifiedFlightsGroup);
//         console.log(TripType);
//         if (TripType === "One Way") {
//           setFlightsData(simplifiedFlights);
//         } else if (TripType === "Round Trip") {
//           setFlightsData(simplifiedFlightsGroup);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (routeId) {
//       fetchFlights();
//     }
//   }, [routeId]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex justify-center items-center">
//       <form className="w-full max-w-6xl bg-white rounded-xl px-4 py-1 z-10 min-h-[168px] mt-5">
//         {/* Main Inputs Row */}
//         <div className="w-full flex flex-col md:flex-row gap-1">
//           {/* From-To Section */}
//           <div className="flex items-center w-full md:w-[660px] min-h-[90px] rounded-xl border border-gray-200 overflow-hidden relative">
//             {/* FROM */}
//             <div className="flex-1 px-4 py-3">
//               <label className="text-xs text-gray-500">From</label>
//               <input
//                 type="text"
//                 value={from}
//                 onChange={(e) => setFrom(e.target.value)}
//                 placeholder="[HYD] Rajiv Gandhi International Airport"
//                 className={`text-[18px] font-semibold outline-none w-full bg-transparent ${
//                   from ? "text-black" : "text-[#64748B]"
//                 }`}
//               />
//             </div>

//             {/* Center Divider */}
//             <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200 -translate-x-1/2" />

//             {/* SWAP BUTTON */}
//             <div className="absolute left-1/2 -translate-x-1/2 z-10">
//               <button
//                 type="button"
//                 onClick={() => {
//                   const temp = from;
//                   setFrom(to);
//                   setTo(temp);
//                 }}
//                 className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center"
//               >
//                 <ArrowLeftRightIcon className="h-4 w-4 text-gray-600" />
//               </button>
//             </div>

//             {/* TO */}
//             <div className="flex-1 pl-12 pr-4 py-3 ml-[1px]">
//               <label className="text-xs text-gray-500">To</label>
//               <input
//                 type="text"
//                 value={to}
//                 onChange={(e) => setTo(e.target.value)}
//                 placeholder="[BOM] Chhatrapati Shivaji International Airport"
//                 className={`text-[18px] font-semibold outline-none w-full bg-transparent ${
//                   to ? "text-black" : "text-[#64748B]"
//                 }`}
//               />
//             </div>
//           </div>
//           {/* Departure Date */}
//           <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200">
//             <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
//               Departure Date
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4 text-[#0F172A]"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                 />
//               </svg>
//             </p>
//             <DatePicker
//               selected={flightDepatureDate}
//               onChange={setflightDepatureDate}
//               dateFormat="dd MMM yyyy"
//               placeholderText="Select Date"
//               className="text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent "
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {flightDepatureDate &&
//                 flightDepatureDate.toLocaleDateString("en-US", {
//                   weekday: "long",
//                 })}
//             </p>
//           </div>

//           {/* Return Date (Round Trip only) */}
//           {TripType === "Round Trip" && (
//             <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200">
//               <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
//                 Return Date
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4 text-[#0F172A]"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </p>
//               <DatePicker
//                 selected={flightReturnDate}
//                 onChange={setflightReturnDate}
//                 dateFormat="dd MMM yyyy"
//                 placeholderText="Select Date"
//                 minDate={flightDepatureDate}
//                 className="text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent"
//               />
//               <p className="text-xs text-gray-500 mt-1">Book a round trip</p>
//             </div>
//           )}

//           {/* Traveller & Class */}
//           <div
//             className="w-full md:w-[220px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 relative cursor-pointer"
//             ref={dropdownRef}
//             onClick={() => setShowDropdown(!showDropdown)}
//           >
//             {/* Dropdown content */}
//             {showDropdown && (
//               <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl z-50 shadow-md p-3">
//                 {/* Adult */}
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Adults</span>
//                   <div className="flex items-center gap-3">
//                     <Minus
//                       className={`w-4 h-4 cursor-pointer ${
//                         adults > 1 ? "text-black" : "text-gray-300"
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (adults > 1) setAdults(adults - 1);
//                       }}
//                     />
//                     <span className="text-sm font-semibold">{adults}</span>
//                     <Plus
//                       className="w-4 h-4 cursor-pointer text-black"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setAdults(adults + 1);
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Children */}
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-sm text-gray-600">Children</span>
//                   <div className="flex items-center gap-3">
//                     <Minus
//                       className={`w-4 h-4 cursor-pointer ${
//                         children > 0 ? "text-black" : "text-gray-300"
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (children > 0) setChildren(children - 1);
//                       }}
//                     />
//                     <span className="text-sm font-semibold">{children}</span>
//                     <Plus
//                       className="w-4 h-4 cursor-pointer text-black"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setChildren(children + 1);
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Class list */}
//                 {["Economy", "Premium Economy", "Business", "First Class"].map(
//                   (cls) => (
//                     <div
//                       key={cls}
//                       className={`py-1 px-2 rounded text-sm cursor-pointer hover:bg-gray-100 ${
//                         travelClass === cls ? "bg-gray-100 font-semibold" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setTravelClass(cls);
//                         setShowDropdown(false);
//                       }}
//                     >
//                       {cls}
//                     </div>
//                   )
//                 )}
//               </div>
//             )}

//             {/* Static label + selected value */}
//             <p className="text-xs text-gray-500 mb-1">Travellers & Class</p>
//             <div className="flex justify-between items-center font-semibold text-[16px] text-[#0F172A]">
//               <span>
//                 {adults + children}{" "}
//                 <span className="font-normal text-sm">Travellers</span>
//               </span>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">{travelClass}</p>
//           </div>
//         </div>
//         <div className="mt-4 w-full flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex gap-6">
//             {["One Way", "Round Trip"].map((type) => (
//               <label
//                 key={type}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <div
//                   className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${
//                     TripType === type
//                       ? "bg-[#EE5128] border-[#EE5128] text-white"
//                       : "bg-gray-300 border-gray-300"
//                   }`}
//                 >
//                   {TripType === type && (
//                     <span className="text-[10px] font-bold">✓</span>
//                   )}
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     TripType === type
//                       ? "font-semibold text-black"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {type}
//                 </span>
//                 <input
//                   type="radio"
//                   name="tripType"
//                   className="hidden"
//                   value={type}
//                   checked={TripType === type}
//                   onChange={() => setTripType(type)}
//                 />
//               </label>
//             ))}
//             <label className="flex items-center gap-2 ml-auto cursor-pointer">
//               <div
//                 className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${
//                   isDirectFlight
//                     ? "bg-[#EE5128] border-[#EE5128] text-white"
//                     : "bg-gray-300 border-gray-300"
//                 }`}
//                 onClick={() => setIsDirectFlight(!isDirectFlight)}
//               >
//                 {isDirectFlight && (
//                   <span className="text-[10px] font-bold">✓</span>
//                 )}
//               </div>
//               <span
//                 className={`text-sm   ${
//                   isDirectFlight ? "font-semibold text-black" : "text-gray-500"
//                 }`}
//                 onClick={() => setIsDirectFlight(!isDirectFlight)}
//               >
//                 Direct flight only
//               </span>
//             </label>
//           </div>
//           {/* Search Button */}
//           <div className=" flex justify-center">
//             <button
//               className="bg-[#EE5128] hover:bg-[#d64520] text-white text-[18px] font-semibold px-18 py-2 rounded-full transition "
//               onClick={(e) => handleTravelfusionSearch(e)}
//             >
//               {t("hero.search")}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

const SearchBox = ({
  setFlightsData,
  TripType,
  setTripType,
  From,
  To,
  FromDisplayText,
  ToDisplayText,
  SearchProps,
  country,
}) => {
  const { t } = useTranslation();
  const [isDirectFlight, setIsDirectFlight] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [flightDepatureDate, setflightDepatureDate] = useState(new Date());
  const [flightReturnDate, setflightReturnDate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");
  const [travellers, setTravellers] = useState([30]);
  const [routeId, setRouteId] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [commissionDetails, setcommissionDetails] = useState([]);
  const [airposts, setAirposts] = useState([]);

  // Dropdown states
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);
  const [fromDropdownSearchTerm, setFromDropdownSearchTerm] = useState("");
  const [toDropdownSearchTerm, setToDropdownSearchTerm] = useState("");

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  const travelFusionBackendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;
  const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;

  const getcommission = async () => {
    try {
      const res = await fetch(`${transactionUrl}/getcommissiondetails`);
      const result = await res.json();
      console.log(result.commissionDetail);
      const commission = result.commissionDetail;
      setcommissionDetails(commission);
    } catch (error) {
      console.error("Failed to fetch supplier route:", error);
    }
  };

  useEffect(() => {
    getcommission();
  }, []);

  // Load airports data
  useEffect(() => {
    let AirportList = [];
    const fetchAirport = async () => {
      try {
        const res = await axios.get(
          `${travelFusionBackendUrl}/get-airportlist`
        );
        AirportList = res.data.Airportdata || [];
        setAirposts(res.data.Airportdata);
      } catch (error) {
        console.error(error);
      }
      AirportList.length === 0 ? fetchAirport() : setAirposts(AirportList);
    };
    fetchAirport();
  }, []);

  // Handle dropdown filtering
  useEffect(() => {
    if (fromDropdownOpen) {
      if (fromDropdownSearchTerm.length > 0) {
        const filtered = airposts
          .filter(
            (airport) =>
              airport.Cityname.toLowerCase().includes(
                fromDropdownSearchTerm.toLowerCase()
              ) ||
              airport.Countryname.toLowerCase().includes(
                fromDropdownSearchTerm.toLowerCase()
              ) ||
              airport.Iata.toLowerCase().includes(
                fromDropdownSearchTerm.toLowerCase()
              ) ||
              airport.Airportname.toLowerCase().includes(
                fromDropdownSearchTerm.toLowerCase()
              )
          )
          .slice(0, 10);
        setFilteredFromAirports(filtered);
      } else {
        setFilteredFromAirports(airposts.slice(0, 6));
      }
    }
  }, [fromDropdownSearchTerm, airposts, fromDropdownOpen]);

  useEffect(() => {
    if (toDropdownOpen) {
      if (toDropdownSearchTerm.length > 0) {
        const filtered = airposts
          .filter(
            (airport) =>
              airport.Cityname.toLowerCase().includes(
                toDropdownSearchTerm.toLowerCase()
              ) ||
              airport.Countryname.toLowerCase().includes(
                toDropdownSearchTerm.toLowerCase()
              ) ||
              airport.Iata.toLowerCase().includes(
                toDropdownSearchTerm.toLowerCase()
              ) ||
              airport.Airportname.toLowerCase().includes(
                toDropdownSearchTerm.toLowerCase()
              )
          )
          .slice(0, 10);
        setFilteredToAirports(filtered);
      } else {
        setFilteredToAirports(airposts.slice(0, 6));
      }
    }
  }, [toDropdownSearchTerm, airposts, toDropdownOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target)
      ) {
        setFromDropdownOpen(false);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target)
      ) {
        setToDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fix: Properly set initial values from previous search
  useEffect(() => {
    if (SearchProps) {
      // Set values from SearchProps if available
      setFrom(SearchProps.origin?.descriptor || SearchProps.from || "");
      setTo(SearchProps.destination?.descriptor || SearchProps.to || "");

      // Set dates if available
      if (SearchProps.dateOfSearch) {
        // Parse the date string back to Date object
        const depDate = SearchProps.dateOfSearch.split("-")[0]; // Get date part before time
        const [day, month, year] = depDate.split("/");
        setflightDepatureDate(new Date(year, month - 1, day));
      }

      if (SearchProps.returnDateOfSearch) {
        const retDate = SearchProps.returnDateOfSearch.split("-")[0];
        const [day, month, year] = retDate.split("/");
        setflightReturnDate(new Date(year, month - 1, day));
      }

      // Set travelers if available
      if (SearchProps.travellers && SearchProps.travellers.length > 0) {
        const adultCount = SearchProps.travellers.filter(
          (age) => age >= 18
        ).length;
        const childCount = SearchProps.travellers.filter(
          (age) => age < 18
        ).length;
        setAdults(adultCount || 1);
        setChildren(childCount || 0);
      }
    } else {
      // Fallback to From/To props
      setFrom(From || "");
      setTo(To || "");
    }

    // FIXED: Set display text from props with proper priority
    if (FromDisplayText) {
      console.log("Setting FROM display text:", FromDisplayText);
      setFromSearchTerm(FromDisplayText);
    } else if (From) {
      // Fallback: generate display text from IATA code
      const airport = airposts.find(
        (airport) =>
          airport.Iata && airport.Iata.toLowerCase() === From.toLowerCase()
      );
      if (airport) {
        const displayText = `[${airport.Iata}] ${airport.Airportname}`;
        setFromSearchTerm(displayText);
      } else {
        setFromSearchTerm(From);
      }
    }

    if (ToDisplayText) {
      console.log("Setting TO display text:", ToDisplayText);
      setToSearchTerm(ToDisplayText);
    } else if (To) {
      // Fallback: generate display text from IATA code
      const airport = airposts.find(
        (airport) =>
          airport.Iata && airport.Iata.toLowerCase() === To.toLowerCase()
      );
      if (airport) {
        const displayText = `[${airport.Iata}] ${airport.Airportname}`;
        setToSearchTerm(displayText);
      } else {
        setToSearchTerm(To);
      }
    }
  }, [SearchProps, From, To, FromDisplayText, ToDisplayText, airposts]); // Add airposts as dependency

  const handleTravelFusionDate = (newDate) => {
    if (!newDate) {
      return;
    } // Handle null or invalid date
    else {
      // Ensure newDate is a Date object
      const selectedDate = new Date(newDate);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
  };

  const handleTravelfusionSearch = (e) => {
    console.log(from);
    e.preventDefault();

    const formattedFlightDepatureDate =
      handleTravelFusionDate(flightDepatureDate) + "-00:01";

    console.log({
      from,
      to,
      flightDepatureDate,
      flightReturnDate,
      travelClass,
    });
    if (flightReturnDate !== null && TripType == "Round Trip") {
      const formattedFlightReturnDate =
        handleTravelFusionDate(flightReturnDate) + "-23:59";
    } else {
      setflightReturnDate(null);
    }
    console.log(adults);
    setFrom(from);
    setTo(to);
    setSearchCount((prev) => prev + 1);
  };

  useEffect(() => {
    // make an array of N adults
    const adult = Array(adults).fill(30);
    // make an array of N children
    const child = Array(children).fill(7);
    // combine them
    setTravellers([...adult, ...child]);
  }, [adults, children]);

  // Fetch flights based on the search parameters
  useEffect(() => {
    const fetchFlights = async () => {
      console.log("Travelfusion routing API Call");
      console.log("country flightlist", country);
      try {
        const requestBody = {
          mode: "plane",
          origin: {
            descriptor: from,
          },
          destination: {
            descriptor: to,
          },
          dateOfSearch: handleTravelFusionDate(flightDepatureDate) + "-00:01",
          travellers: travellers,
          incrementalResults: true,
          // this will **conditionally add** returnDateOfSearch if flightReturnDate exists
          ...(flightReturnDate && {
            returnDateOfSearch:
              handleTravelFusionDate(flightReturnDate) + "-23:59",
          }),
          countryCode: country,
        };

        console.log(requestBody);

        const response = await fetch(
          `${travelFusionBackendUrl}/start-routing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }

        const data = await response.json();
        console.log(data);
        setRouteId(data.routingId);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchCount > 0) {
      fetchFlights();
    }
  }, [searchCount]);

  const getCommissionDetail = async (tfPrice) => {
    try {
      if (!commissionDetails) {
        return console.log("Error");
      } else {
        const Commission = commissionDetails.Commission;
        if (Commission) {
          console.log(Commission);
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

  useEffect(() => {
    const fetchFlights = async () => {
      console.log("Travelfusion Search API Call");
      try {
        const response = await fetch(
          `${travelFusionBackendUrl}/check-routing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              routingId: routeId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Add defensive checks for data structure
        if (
          !data ||
          !data.flightList ||
          !Array.isArray(data.flightList) ||
          data.flightList.length === 0
        ) {
          console.log("No flight data available");
          setFlightsData([]);
          return;
        }

        const firstFlight = data.flightList[0];
        if (
          !firstFlight ||
          !firstFlight.Router ||
          !Array.isArray(firstFlight.Router)
        ) {
          console.log("No router data available");
          setFlightsData([]);
          return;
        }

        // *** CURRENCY CONVERSION: Fetch exchange rates ***
        const rates = await fetchExchangeRates("CVE"); // CVE as base currency
        const routerList = firstFlight.Router;

        // Step 1: Collect all raw flight data
        const allFlightPromises = [];

        for (const supplier of routerList) {
          if (!supplier?.GroupList || !Array.isArray(supplier.GroupList))
            continue;

          for (const groupContainer of supplier.GroupList) {
            if (!groupContainer?.Group || !Array.isArray(groupContainer.Group))
              continue;

            for (const group of groupContainer.Group) {
              if (
                !group?.OutwardList ||
                !Array.isArray(group.OutwardList) ||
                group.OutwardList.length === 0
              )
                continue;

              const outwardList = group.OutwardList[0]?.Outward || [];
              console.log(outwardList);
              for (const flight of outwardList) {
                allFlightPromises.push(
                  (async () => {
                    try {
                      if (!flight?.SegmentList?.[0]?.Segment?.[0]) return null;

                      const segment = flight.SegmentList[0].Segment[0];
                      const origin = Array.isArray(segment.Origin)
                        ? segment.Origin[0]
                        : null;
                      const destination = Array.isArray(segment.Destination)
                        ? segment.Destination[0]
                        : null;

                      const operatorName =
                        segment.Operator?.[0]?.Name?.[0] || "Unknown Airline";

                      const logo = operatorName.toLowerCase();
                      const flightId =
                        segment.FlightId?.[0]?.Code?.[0] || "N/A";
                      const travelClass =
                        segment.TravelClass?.[0]?.TfClass?.[0] || "Economy";
                      const departureTime =
                        segment.DepartDate?.[0]?.split("-")[1] || "N/A";
                      const arrivalTime =
                        segment.ArriveDate?.[0]?.split("-")[1] || "N/A";
                      const departureDate = segment.DepartDate?.[0];
                      const arrivalDate = segment.ArriveDate?.[0];
                      const duration = segment.Duration?.[0]
                        ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
                        : "N/A";

                      const originalPrice = parseFloat(
                        flight.Price?.[0]?.Amount?.[0] || "0"
                      );
                      const originalCurrency =
                        flight.Price?.[0]?.Currency?.[0] || "N/A";

                      return {
                        id: flight.Id?.[0] || "N/A",
                        airline: operatorName,
                        logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
                        flightNumber: flightId,
                        class: travelClass,
                        departureDate,
                        departureTime,
                        departureCity: origin?.Code?.[0] || "N/A",
                        arrivalDate,
                        arrivalTime,
                        arrivalCity: destination?.Code?.[0] || "N/A",
                        duration,
                        originalPrice,
                        originalCurrency,
                      };
                    } catch (e) {
                      console.error("Flight parse error:", e);
                      return null;
                    }
                  })()
                );
              }
            }
          }
        }

        const rawFlights = (await Promise.all(allFlightPromises)).filter(
          Boolean
        );

        // Step 2: Convert and cache unique prices
        const currencyMap = {}; // key = currency, value = rate to CVE
        const priceCommissionMap = {}; // key = original converted price, value = with commission

        for (const flight of rawFlights) {
          const key = `${flight.originalPrice}_${flight.originalCurrency}`;

          if (!(key in priceCommissionMap)) {
            try {
              if (!(flight.originalCurrency in currencyMap)) {
                currencyMap[flight.originalCurrency] =
                  convertToRequestedCurrency(
                    1,
                    flight.originalCurrency,
                    "CVE",
                    rates
                  );
              }

              const rate = currencyMap[flight.originalCurrency];
              const convertedPrice = parseFloat(
                (flight.originalPrice * rate).toFixed(2)
              );
              const finalPrice = await getCommissionDetail(convertedPrice);
              priceCommissionMap[key] = {
                convertedPrice: finalPrice,
                convertedFrom: flight.originalPrice,
                fromCurrency: flight.originalCurrency,
              };
            } catch (e) {
              console.error("Conversion/commission error:", e);
            }
          }
        }

        // Step 3: Build final simplified flights
        const simplifiedFlights = rawFlights.map((flight) => {
          const key = `${flight.originalPrice}_${flight.originalCurrency}`;
          const priceInfo = priceCommissionMap[key];

          return {
            ...flight,
            price: priceInfo?.convertedPrice || 0,
            originalPrice: priceInfo?.convertedPrice || 0,
            convertedcurrencyfrom: priceInfo?.fromCurrency || "N/A",
            convertedPricefrom: priceInfo?.convertedFrom || 0,
            currency: "CVE",
          };
        });

        // Step 1: Collect all flight details (without conversion)
        const rawFlightDataPromises = [];

        for (const supplier of routerList) {
          if (!Array.isArray(supplier?.GroupList)) continue;

          for (const groupContainer of supplier.GroupList) {
            if (!Array.isArray(groupContainer?.Group)) continue;

            for (const group of groupContainer.Group) {
              const outwardList = group?.OutwardList?.[0]?.Outward ?? [];
              const returnList = group?.ReturnList?.[0]?.Return ?? [];

              const extractFlightInfo = async (flight, type) => {
                try {
                  const segment = flight?.SegmentList?.[0]?.Segment?.[0];
                  if (!segment) return null;

                  const origin = segment.Origin?.[0] ?? {};
                  const destination = segment.Destination?.[0] ?? {};
                  const operatorName =
                    segment.Operator?.[0]?.Name?.[0] ?? "Unknown Airline";
                  const logo = operatorName.toLowerCase();
                  const flightId = segment.FlightId?.[0]?.Code?.[0] ?? "N/A";
                  const travelClass =
                    segment.TravelClass?.[0]?.SupplierClass?.[0] ?? "Economy";

                  const departureTime =
                    segment.DepartDate?.[0]?.split("-")[1] ?? "N/A";
                  const arrivalTime =
                    segment.ArriveDate?.[0]?.split("-")[1] ?? "N/A";
                  const duration = segment.Duration?.[0]
                    ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
                    : "N/A";

                  const originalPrice = parseFloat(
                    flight?.Price?.[0]?.Amount?.[0] ?? "0"
                  );
                  const originalCurrency =
                    flight?.Price?.[0]?.Currency?.[0] ?? "N/A";
                  const departureDate = segment.DepartDate?.[0];
                  const arrivalDate = segment.ArriveDate?.[0];
                  return {
                    id: flight.Id?.[0] ?? "N/A",
                    airline: operatorName,
                    logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
                    flightNumber: flightId,
                    class: travelClass,
                    departureDate,
                    departureTime,
                    departureCity: origin.Code?.[0] ?? "N/A",
                    arrivalDate,
                    arrivalTime,
                    arrivalCity: destination.Code?.[0] ?? "N/A",
                    duration,
                    originalPrice,
                    originalCurrency,
                    type,
                  };
                } catch (err) {
                  console.error(`Error parsing ${type} flight:`, err);
                  return null;
                }
              };

              for (const flight of outwardList) {
                rawFlightDataPromises.push(
                  extractFlightInfo(flight, "outward")
                );
              }

              for (const flight of returnList) {
                rawFlightDataPromises.push(extractFlightInfo(flight, "return"));
              }
            }
          }
        }

        const rawFlightData = (await Promise.all(rawFlightDataPromises)).filter(
          Boolean
        );

        // Step 2: Convert/calculate commission only once per unique price+currency
        const currencyRateCache = {};
        const commissionCache = {};

        for (const flight of rawFlightData) {
          const key = `${flight.originalPrice}_${flight.originalCurrency}`;
          if (!commissionCache[key]) {
            try {
              if (!currencyRateCache[flight.originalCurrency]) {
                currencyRateCache[flight.originalCurrency] =
                  convertToRequestedCurrency(
                    1,
                    flight.originalCurrency,
                    "CVE",
                    rates
                  );
              }

              const rate = currencyRateCache[flight.originalCurrency];
              const converted = parseFloat(
                (flight.originalPrice * rate).toFixed(2)
              );
              const finalPrice = await getCommissionDetail(converted);

              commissionCache[key] = {
                convertedPrice: finalPrice,
                convertedFrom: flight.originalPrice,
                fromCurrency: flight.originalCurrency,
              };
            } catch (e) {
              console.error("Conversion or commission failed:", e);
              commissionCache[key] = null;
            }
          }
        }

        // Step 3: Final flight object with price info attached
        const simplifiedFlightsGroup = rawFlightData
          .map((flight) => {
            const key = `${flight.originalPrice}_${flight.originalCurrency}`;
            const priceInfo = commissionCache[key];

            if (!priceInfo) return null;

            return {
              ...flight,
              price: priceInfo.convertedPrice,
              originalPrice: priceInfo.convertedPrice,
              convertedcurrencyfrom: priceInfo.fromCurrency,
              convertedPricefrom: priceInfo.convertedFrom,
              currency: "CVE",
            };
          })
          .filter(Boolean);

        console.log("simplifiedflightgroup", simplifiedFlightsGroup);
        console.log(TripType);
        if (TripType === "One Way") {
          setFlightsData(simplifiedFlights);
        } else if (TripType === "Round Trip") {
          setFlightsData(simplifiedFlightsGroup);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (routeId) {
      fetchFlights();
    }
  }, [routeId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <form className="w-full max-w-6xl bg-white rounded-xl px-4 py-1 z-10 min-h-[168px] mt-5">
        {/* Main Inputs Row */}
        <div className="w-full flex flex-col md:flex-row gap-1">
          {/* From-To Section */}
          <div className="flex items-center w-full md:w-[660px] min-h-[90px] rounded-xl border border-gray-200 relative overflow-visible z-50">
            {/* FROM */}
            <div className="flex-1 px-4 py-3 relative" ref={fromDropdownRef}>
              <label className="text-xs text-gray-500">From</label>
              <input
                type="text"
                value={fromSearchTerm}
                readOnly
                onFocus={() => {
                  console.log("FROM input focused");
                  setFromDropdownOpen(true);
                  setToDropdownOpen(false);
                  setFromDropdownSearchTerm("");
                }}
                placeholder="[HYD] Rajiv Gandhi International Airport"
                className="text-[18px] font-semibold outline-none w-full bg-transparent cursor-pointer text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Center Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200 -translate-x-1/2" />

            {/* SWAP BUTTON */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <button
                type="button"
                onClick={() => {
                  console.log("Swapping values");
                  const tempIata = from;
                  const tempSearchTerm = fromSearchTerm;

                  setFrom(to);
                  setTo(tempIata);
                  setFromSearchTerm(toSearchTerm);
                  setToSearchTerm(tempSearchTerm);
                }}
                className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center"
              >
                <ArrowLeftRightIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* TO */}
            <div
              className="flex-1 pl-40 pr-4 py-3 ml-[1px] relative"
              ref={toDropdownRef}
            >
              <label className="text-xs text-gray-500">To</label>
              <input
                type="text"
                value={toSearchTerm}
                readOnly
                onFocus={() => {
                  console.log("TO input focused");
                  setToDropdownOpen(true);
                  setFromDropdownOpen(false);
                  setToDropdownSearchTerm("");
                }}
                placeholder="[BOM] Chhatrapati Shivaji International Airport"
                className="text-[18px] font-semibold outline-none w-full bg-transparent cursor-pointer text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* FROM Dropdown - Positioned on LEFT side */}
            {fromDropdownOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:left-2 lg:translate-x-0 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-hidden mt-1">
                {/* Search Input Inside Dropdown */}
                <div className="p-3 border-b border-gray-200 bg-blue-50">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <input
                      type="text"
                      value={fromDropdownSearchTerm}
                      onChange={(e) => {
                        console.log("FROM dropdown search:", e.target.value);
                        setFromDropdownSearchTerm(e.target.value);
                      }}
                      placeholder="From"
                      className="text-sm outline-none w-full bg-transparent text-gray-900 placeholder-gray-500"
                      autoFocus
                    />
                  </div>
                </div>
                {/* Scrollable Results */}
                <div className="max-h-64 overflow-y-auto">
                  {fromDropdownSearchTerm.length === 0 && (
                    <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Popular Cities
                      </span>
                    </div>
                  )}

                  {filteredFromAirports.length > 0 ? (
                    filteredFromAirports.map((airport, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("FROM airport clicked:", airport);

                          if (
                            !airport ||
                            !airport.Iata ||
                            !airport.Airportname
                          ) {
                            console.error("Invalid airport object:", airport);
                            return;
                          }

                          setFrom(airport.Iata);
                          const displayText = `[${airport.Iata}] ${airport.Airportname}`;
                          setFromSearchTerm(displayText);
                          setFromDropdownOpen(false);
                          setFromDropdownSearchTerm("");

                          console.log(
                            "FROM updated - IATA:",
                            airport.Iata,
                            "Display:",
                            displayText
                          );
                        }}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {airport.Cityname}, {airport.Countryname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {airport.Airportname}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gray-600 ml-4">
                          {airport.Iata}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-center">
                      <div className="text-sm">No airports found</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TO Dropdown - Positioned on RIGHT side */}
            {toDropdownOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:-right-12 lg:left-auto lg:translate-x-0 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-hidden mt-1">
                {/* Search Input Inside Dropdown */}
                <div className="p-3 border-b border-gray-200 bg-blue-50">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <input
                      type="text"
                      value={toDropdownSearchTerm}
                      onChange={(e) => {
                        console.log("TO dropdown search:", e.target.value);
                        setToDropdownSearchTerm(e.target.value);
                      }}
                      placeholder="To"
                      className="text-sm outline-none w-full bg-transparent text-gray-900 placeholder-gray-500"
                      autoFocus
                    />
                  </div>
                </div>
                {/* Scrollable Results */}
                <div className="max-h-64 overflow-y-auto">
                  {toDropdownSearchTerm.length === 0 && (
                    <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Popular Cities
                      </span>
                    </div>
                  )}

                  {filteredToAirports.length > 0 ? (
                    filteredToAirports.map((airport, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("TO airport clicked:", airport);

                          if (
                            !airport ||
                            !airport.Iata ||
                            !airport.Airportname
                          ) {
                            console.error("Invalid airport object:", airport);
                            return;
                          }

                          setTo(airport.Iata);
                          const displayText = `[${airport.Iata}] ${airport.Airportname}`;
                          setToSearchTerm(displayText);
                          setToDropdownOpen(false);
                          setToDropdownSearchTerm("");

                          console.log(
                            "TO updated - IATA:",
                            airport.Iata,
                            "Display:",
                            displayText
                          );
                        }}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {airport.Cityname}, {airport.Countryname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {airport.Airportname}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gray-600 ml-4">
                          {airport.Iata}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-center">
                      <div className="text-sm">No airports found</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Departure Date */}
          <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
              Departure Date
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-[#0F172A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </p>
            <DatePicker
              selected={flightDepatureDate}
              onChange={setflightDepatureDate}
              dateFormat="dd MMM yyyy"
              placeholderText="Select Date"
              className="text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent "
            />
            <p className="text-xs text-gray-500 mt-1">
              {flightDepatureDate &&
                flightDepatureDate.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
            </p>
          </div>

          {/* Return Date (Round Trip only) */}
          {TripType === "Round Trip" && (
            <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                Return Date
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-[#0F172A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </p>
              <DatePicker
                selected={flightReturnDate}
                onChange={setflightReturnDate}
                dateFormat="dd MMM yyyy"
                placeholderText="Select Date"
                minDate={flightDepatureDate}
                className="text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Book a round trip</p>
            </div>
          )}

          {/* Traveller & Class */}
          <div
            className="w-full md:w-[220px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 relative cursor-pointer"
            ref={dropdownRef}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {/* Dropdown content */}
            {showDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl z-50 shadow-md p-3">
                {/* Adult */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Adults</span>
                  <div className="flex items-center gap-3">
                    <Minus
                      className={`w-4 h-4 cursor-pointer ${
                        adults > 1 ? "text-black" : "text-gray-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (adults > 1) setAdults(adults - 1);
                      }}
                    />
                    <span className="text-sm font-semibold">{adults}</span>
                    <Plus
                      className="w-4 h-4 cursor-pointer text-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdults(adults + 1);
                      }}
                    />
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Children</span>
                  <div className="flex items-center gap-3">
                    <Minus
                      className={`w-4 h-4 cursor-pointer ${
                        children > 0 ? "text-black" : "text-gray-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (children > 0) setChildren(children - 1);
                      }}
                    />
                    <span className="text-sm font-semibold">{children}</span>
                    <Plus
                      className="w-4 h-4 cursor-pointer text-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChildren(children + 1);
                      }}
                    />
                  </div>
                </div>

                {/* Class list */}
                {["Economy", "Premium Economy", "Business", "First Class"].map(
                  (cls) => (
                    <div
                      key={cls}
                      className={`py-1 px-2 rounded text-sm cursor-pointer hover:bg-gray-100 ${
                        travelClass === cls ? "bg-gray-100 font-semibold" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTravelClass(cls);
                        setShowDropdown(false);
                      }}
                    >
                      {cls}
                    </div>
                  )
                )}
              </div>
            )}

            {/* Static label + selected value */}
            <p className="text-xs text-gray-500 mb-1">Travellers & Class</p>
            <div className="flex justify-between items-center font-semibold text-[16px] text-[#0F172A]">
              <span>
                {adults + children}{" "}
                <span className="font-normal text-sm">Travellers</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{travelClass}</p>
          </div>
        </div>
        <div className="mt-4 w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            {["One Way", "Round Trip"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${
                    TripType === type
                      ? "bg-[#EE5128] border-[#EE5128] text-white"
                      : "bg-gray-300 border-gray-300"
                  }`}
                >
                  {TripType === type && (
                    <span className="text-[10px] font-bold">✓</span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    TripType === type
                      ? "font-semibold text-black"
                      : "text-gray-500"
                  }`}
                >
                  {type}
                </span>
                <input
                  type="radio"
                  name="tripType"
                  className="hidden"
                  value={type}
                  checked={TripType === type}
                  onChange={() => setTripType(type)}
                />
              </label>
            ))}
            <label className="flex items-center gap-2 ml-auto cursor-pointer">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center  ${
                  isDirectFlight
                    ? "bg-[#EE5128] border-[#EE5128] text-white"
                    : "bg-gray-300 border-gray-300"
                }`}
                onClick={() => setIsDirectFlight(!isDirectFlight)}
              >
                {isDirectFlight && (
                  <span className="text-[10px] font-bold">✓</span>
                )}
              </div>
              <span
                className={`text-sm   ${
                  isDirectFlight ? "font-semibold text-black" : "text-gray-500"
                }`}
                onClick={() => setIsDirectFlight(!isDirectFlight)}
              >
                Direct flight only
              </span>
            </label>
          </div>
          {/* Search Button */}
          <div className=" flex justify-center">
            <button
              className="bg-[#EE5128] hover:bg-[#d64520] text-white text-[18px] font-semibold px-18 py-2 rounded-full transition "
              onClick={(e) => handleTravelfusionSearch(e)}
            >
              {t("hero.search")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const FlightResults = ({
  flights,
  origin,
  destination,
  t,
  TripType,
  routingId,
  travalers,
  searchData,
  SearchProps,
  selectOutWard,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const flightsPerPage = 7;
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;

  console.log("flights", flights);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelectedOption(option);
    setCurrentPage(1); // Reset to first page on sort
    setIsOpen(false);
  };

  const sortedFlights = useMemo(() => {
    if (!flights || flights.length === 0) return [];
    const sorted = [...flights];
    if (selectedOption === "Highest to Lowest") {
      return sorted.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "Lowest to Highest") {
      return sorted.sort((a, b) => a.price - b.price);
    }
    return sorted;
  }, [flights, selectedOption]);

  const currentFlights = useMemo(() => {
    return sortedFlights.slice(indexOfFirstFlight, indexOfLastFlight);
  }, [sortedFlights, indexOfFirstFlight, indexOfLastFlight]);

  const totalPages = Math.ceil(sortedFlights.length / flightsPerPage);

  const handleSelectFlight = (id) => {
    setSelectedFlightId((prevId) => (prevId === id ? null : id));
  };

  const handleProcessDetails = async (OutwardFlight) => {
    try {
      // setLoading(true);
      // setError(null);

      const flightTickets = [];
      const routeid = routingId;
      let outwardid = OutwardFlight.id;
      // let returnid;

      flightTickets.push(selectOutWard);
      // returnid = selectReturn.id;

      console.log("Routing Id", routeid || routingId);

      if (!routeid || !outwardid) {
        console.warn("Missing routeid or outwardid");
        // setError("Missing required booking information");
        return;
      }
      const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;
      const response = await fetch(`${backendUrl}/process-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routingId: routeid,
          outwardId: outwardid,
          // ...(returnid && { returnId: returnid }),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("API Response:", res);

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
          seatOptions = seat.DisplayText[0];
          if (seat) {
            seatOptions = seat.DisplayText?.[0] || "";
            console.log("Seat Options:", seatOptions);
          }

          if (meal) {
            mealType = meal.DisplayText?.[0] || "";
            console.log("Meal Type:", mealType);
          }

          if (luggage) {
            luggageOptions = luggage.DisplayText?.[0] || "";
            console.log("Luggage:", luggageOptions);
          }

          if (outwardLg) {
            outwardLuggage = outwardLg.DisplayText?.[0] || "";
            console.log("Outward Luggage:", outwardLuggage);
          }

          if (returnLg) {
            returnLuggage = returnLg.DisplayText?.[0] || "";
            console.log("Return Luggage:", returnLuggage);
          }
          if (outwardLgh) {
            returnLuggage = outwardLgh.DisplayText?.[0] || "";
            console.log("Return Luggage:", returnLuggage);
          }
          if (returnLgh) {
            returnLuggage = returnLgh.DisplayText?.[0] || "";
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
        }
        if (res.groupList) {
          perPassengerPrice =
            res.groupList[0].Group[0].Price[0].PassengerPriceList[0];
        }
      } catch (parseError) {
        console.error("Error parsing response data:", parseError);
        // setError("Error processing booking details");
        return;
      }

      console.log("Passed Data:", {
        seatOptions,
        luggageOptions,
        features,
        alternativeFares,
        supportedCardlist,
        mealType,
        outwardLuggage,
        returnLuggage,
        ReturnHandLuggageOptions,
        outwardHandLuggageOptions,
        cardCharge,
        perPassengerPrice,
      });

      navigate("/booking/ReviewYourBooking", {
        state: {
          outwordTicketId: OutwardFlight,
          // returnTicketId: selectReturn,
          routingId: routingId,
          tripType: TripType,
          travalers: travalers,
          seatOptions,
          outwardLuggage,
          returnLuggage,
          ReturnHandLuggageOptions,
          outwardHandLuggageOptions,
          luggageOptions,
          mealType,
          alternativeFares,
          features,
          supportedCardlist,
          flightTickets,
          cardCharge,
          perPassengerPrice,
          // Add back navigation data
          origin: origin,
          destination: destination,
          flightsData: flights,
          TripType: TripType,
          ...(SearchProps && { FightSearchData: SearchProps }),
        },
      });
    } catch (error) {
      console.error("Error in handleProcessDetails:", error);
      // setError(`Failed to process booking details: ${error.message}`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-6 font-sans relative">
        <div className="w-full flex items-center justify-between">
          {/* Heading */}
          <h1 className="text-[25.44px] font-[600] leading-[100%] font-jakarta">
            Flights from {origin} to {destination}
          </h1>

          {/* Dropdown Sort */}
          <div
            className="relative font-jakarta text-[14px] font-semibold text-black cursor-pointer"
            ref={dropdownRef}
          >
            <div
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              <span className="text-sm font-medium">
                {selectedOption || "Sort"}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>

            {isOpen && (
              <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <ul className="py-1">
                  <li
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      selectedOption === "Highest to Lowest"
                        ? "bg-gray-50 font-medium"
                        : ""
                    }`}
                    onClick={() => selectOption("Highest to Lowest")}
                  >
                    Highest to Lowest
                  </li>
                  <li
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      selectedOption === "Lowest to Highest"
                        ? "bg-gray-50 font-medium"
                        : ""
                    }`}
                    onClick={() => selectOption("Lowest to Highest")}
                  >
                    Lowest to Highest
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {currentFlights.length === 0 ? (
          <NoFlightsAvailable
            origin={origin}
            destination={destination}
            searchDate={
              searchData?.flightDepatureDate
                ? new Date(searchData.flightDepatureDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : null
            }
            onNewSearch={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : (
          currentFlights.map((flight) => {
            const isSelected = selectedFlightId === flight.id;
            return (
              <div
                key={flight.id}
                className={`w-full min-h-[150.13px] rounded-md cursor-pointer transition duration-300 flex flex-col justify-between  ${
                  isSelected
                    ? "border border-[#EE5128] bg-white shadow-sm"
                    : "border border-gray-200 bg-white"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectFlight(flight.id);
                }}
              >
                {/* Top Row */}
                <div className="flex items-center flex-col md:flex-row justify-between px-4 min-h-[60px] pt-6 pb-6 xl:pb-0 gap-[30px]">
                  <div className="flex flex-col justify-start items-center xl:items-start min-w-[170px] relative pb-10 lg:pb-0">
                    <img
                      src={flight.logo}
                      alt={flight.airline}
                      className="h-[40px] object-contain xl:mb-[45px] ml-2"
                    />
                    <div className="absolute top-[48px] left-[18px] flex items-center space-x-2">
                      <span className="text-[13px] text-gray-500 leading-none">
                        {flight.flightNumber}
                      </span>
                      <span className="text-[12px] text-nowrap bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold leading-[19px]">
                        {flight.class}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[40px] ml-4">
                    <div className="text-center">
                      <p className="text-[22px] font-bold text-black leading-tight">
                        {flight.departureTime}
                      </p>
                      <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
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
                      <p className="text-[22px] font-bold text-black leading-tight">
                        {flight.arrivalTime}
                      </p>
                      <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
                        {flight.arrivalCity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col gap-2 items-center lg:items-end space-y-[2px] w-[152px] min-h-[31px]">
                    <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                      <span className="text-[20px] pr-2">
                        {flight.currency}
                      </span>
                      {flight.price}
                      <span className="text-[12px] text-black font-normal">
                        /pax
                      </span>
                    </p>
                    <p className="text-[13px] text-gray-400 line-through font-normal leading-none font-sans">
                      {flight.currency}
                      {flight.originalPrice}
                    </p>
                    <div className="mb-4">
                      {isSelected ? (
                        <button
                          onClick={() => {
                            // console.log("Navigating with data:", {
                            //   flight: flight,
                            //   routingId: routingId,
                            //   TripType: TripType,
                            //   origin: origin,
                            //   destination: destination,
                            // });

                            // navigate("/booking/ReviewYourBooking", {
                            //   state: {
                            //     outwordTicketId: flight,
                            //     routingId: routingId,
                            //     tripType: TripType,
                            //     travalers: travalers,

                            //     // Add back navigation data safely
                            //     origin: origin,
                            //     destination: destination,
                            //     flightsData: flights,
                            //     TripType: TripType,
                            //   },
                            // });

                            // navigate("/booking/ReviewYourBooking", {
                            //   state: {
                            //     outwordTicketId: flight,
                            //     // returnTicketId: id || selectReturn,
                            //     routingId: routingId,
                            //     tripType: TripType,
                            //     travalers: travalers,
                            //     // Add back navigation data
                            //     origin: origin,
                            //     destination: destination,
                            //     flightsData: flights,
                            //     TripType: TripType,
                            //     ...(SearchProps && {
                            //       FightSearchData: SearchProps,
                            //     }),
                            //   },
                            // });

                            handleProcessDetails(flight);
                          }}
                          className="bg-[#EE5128] text-white px-4 py-1.5 rounded font-jakarta font-semibold hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200 "
                        >
                          {t("booking-card.book-now")}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="bg-gray-300 text-white px-4 py-1.5 rounded font-jakarta font-semibold cursor-not-allowed"
                          disabled
                        >
                          {t("booking-card.book-now")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                {/* <div
                  className={`border-t px-4 py-[30px] xl:py-[20px] flex items-center justify-between text-sm font-medium ${
                    isSelected ? "border-[#EE5128]" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`flex space-x-14 ${
                      isSelected ? "text-[#EE5128]" : "text-bold"
                    } font-sans`}
                  >
                    <div className="flex items-center space-x-1 ml-2">
                      <span>{t("booking-card.Flight-details")}</span>
                      <ChevronDown size={14} />
                    </div>
                    <div className="hidden lg:flex items-center space-x-1">
                      <span>{t("booking-card.price-details")}</span>
                      <ChevronDown size={14} />
                    </div>
                    <span className="hidden lg:flex">
                      {t("booking-card.policy")}
                    </span>
                    <span className="hidden lg:flex">
                      {t("booking-card.refund")}
                    </span>
                    <span className="hidden lg:flex">
                      {t("booking-card.reschedule")}
                    </span>
                  </div>
                </div> */}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const getPagination = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Prev */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EE5128] text-white disabled:opacity-50 hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
      >
        <ChevronLeft className="h-[24px] w-[14px]" />
      </button>

      {getPagination().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="mx-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === page
                ? "bg-[#EE5128] text-white"
                : "bg-transparent text-black"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EE5128] text-white disabled:opacity-50 hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
      >
        <ChevronRight className="h-[24px] w-[14px]" />
      </button>
    </div>
  );
};

const RoundTrip = ({
  flights,
  t,
  routingId,
  destination,
  origin,
  TripType,
  travalers,
  SearchProps, // ✅ Add this line
}) => {
  const navigate = useNavigate();

  const [isOnWard, setOnWard] = useState(false);
  const [selectOutWard, setselectOutWard] = useState({});
  const [selectReturn, setselectReturn] = useState({});
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const [showReturnBox, setShowReturnBox] = useState(false);

  const OutWordFlights = flights?.filter((flight) => flight.type === "outward");
  const ReturnFlights = flights?.filter((flight) => flight.type === "return");

  console.log("selectOutWard", selectOutWard);
  console.log("selectReturn", selectReturn);

  const handleSelectFlight = (id) => {
    setSelectedFlightId((prevId) => (prevId === id ? null : id));
  };

  const handleSelectOnward = ({ id }) => {
    setselectOutWard(id);
  };

  const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;
  const handleProcessDetails = async () => {
    try {
      // setLoading(true);
      // setError(null);

      const flightTickets = [];
      const routeid = routingId;
      let outwardid = selectOutWard.id;
      let returnid;

      flightTickets.push(selectOutWard, selectReturn);
      returnid = selectReturn.id;

      console.log("Routing Id", routeid || routingId);

      if (!routeid || !outwardid) {
        console.warn("Missing routeid or outwardid");
        // setError("Missing required booking information");
        return;
      }

      const response = await fetch(`${backendUrl}/process-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routingId: routeid,
          outwardId: outwardid,
          ...(returnid && { returnId: returnid }),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("API Response:", res);

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
          seatOptions = seat.DisplayText[0];
          if (seat) {
            seatOptions = seat.DisplayText?.[0] || "";
            console.log("Seat Options:", seatOptions);
          }

          if (meal) {
            mealType = meal.DisplayText?.[0] || "";
            console.log("Meal Type:", mealType);
          }

          if (luggage) {
            luggageOptions = luggage.DisplayText?.[0] || "";
            console.log("Luggage:", luggageOptions);
          }

          if (outwardLg) {
            outwardLuggage = outwardLg.DisplayText?.[0] || "";
            console.log("Outward Luggage:", outwardLuggage);
          }

          if (outwardLgh) {
            returnLuggage = outwardLgh.DisplayText?.[0] || "";
            console.log("Return Luggage:", returnLuggage);
          }
          if (returnLgh) {
            returnLuggage = returnLgh.DisplayText?.[0] || "";
            console.log("Return hand Luggage:", returnLuggage);
          }
          if (returnLg) {
            returnLuggage = returnLg.DisplayText?.[0] || "";
            console.log("Outward hand Luggage:", returnLuggage);
          }
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
        if (res.groupList) {
          perPassengerPrice =
            res.groupList[0].Group[0].Price[0].PassengerPriceList[0];
        }
        // Safely extract supported cards
        if (res.supportedCardlist) {
          supportedCardlist = res.supportedCardlist.CardType;
          cardCharge = res.supportedCardlist.CardCharge[0].Charge[0];
        }
      } catch (parseError) {
        console.error("Error parsing response data:", parseError);
        // setError("Error processing booking details");
        return;
      }

      console.log("Passed Data:", {
        seatOptions,
        luggageOptions,
        features,
        alternativeFares,
        supportedCardlist,
        mealType,
        outwardLuggage,
        returnLuggage,
        ReturnHandLuggageOptions,
        outwardHandLuggageOptions,
        cardCharge,
        perPassengerPrice,
      });

      navigate("/booking/ReviewYourBooking", {
        state: {
          outwordTicketId: selectOutWard,
          returnTicketId: selectReturn,
          routingId: routingId,
          tripType: TripType,
          travalers: travalers,
          seatOptions,
          luggageOptions,
          outwardLuggage,
          returnLuggage,
          ReturnHandLuggageOptions,
          outwardHandLuggageOptions,
          mealType,
          alternativeFares,
          features,
          supportedCardlist,
          flightTickets,
          cardCharge,
          perPassengerPrice,
          // Add back navigation data
          origin: origin,
          destination: destination,
          flightsData: flights,
          TripType: TripType,
          ...(SearchProps && { FightSearchData: SearchProps }),
        },
      });
    } catch (error) {
      console.error("Error in handleProcessDetails:", error);
      // setError(`Failed to process booking details: ${error.message}`);
    }
  };

  return (
    <div className="">
      {showReturnBox && (
        <RoundTripBox
          selectOutWard={selectOutWard}
          selectReturn={selectReturn}
          handleConfirmSelect={handleProcessDetails}
          setOnWard={setOnWard}
        />
      )}

      {!isOnWard ? (
        <div className="flex flex-col items-center space-y-6 font-sans relative">
          <div className="w-full flex items-center justify-between">
            {/* Heading */}
            <h1 className="text-[25.44px] font-[600] leading-[100%] font-jakarta">
              Departure Flights from {origin} to {destination}
            </h1>
          </div>

          {/* Check if no outward flights available */}
          {!OutWordFlights || OutWordFlights.length === 0 ? (
            <NoFlightsAvailable
              origin={origin}
              destination={destination}
              searchDate={null}
              onNewSearch={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ) : (
            OutWordFlights.map((flight) => {
              const isSelected =
                selectedFlightId === flight.id ||
                selectOutWard.id === flight.id;
              console.log("outward flight", flight);

              return (
                <div
                  key={flight.id}
                  className={`w-full min-h-[150.13px] rounded-md cursor-pointer transition duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border border-[#EE5128] bg-white shadow-sm"
                      : "border border-gray-200 bg-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectFlight(flight.id);
                  }}
                >
                  <div className="flex items-center flex-col md:flex-row justify-between px-4 min-h-[60px] pt-6 pb-6 xl:pb-0 gap-[30px]">
                    <div className="flex flex-col justify-start items-center xl:items-start min-w-[170px] relative pb-10 lg:pb-0">
                      <img
                        src={flight.logo}
                        alt={flight.airline}
                        className="h-[40px] object-contain xl:mb-[45px] ml-2"
                      />
                      <div className="absolute top-[48px] left-[18px] flex items-center space-x-2">
                        <span className="text-[13px] text-gray-500 leading-none">
                          {flight.flightNumber}
                        </span>
                        <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold leading-[19px]">
                          {flight.class}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-[40px] ml-4">
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black leading-tight">
                          {flight.departureTime}
                        </p>
                        <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
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
                        <p className="text-[22px] font-bold text-black leading-tight">
                          {flight.arrivalTime}
                        </p>
                        <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
                          {flight.arrivalCity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col gap-2 items-center lg:items-end space-y-[2px] w-[152px] min-h-[31px]">
                      <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                        <span className="text-[20px] pr-2">
                          {flight.currency}
                        </span>
                        {flight.price}
                        <span className="text-[12px] text-black font-normal">
                          /pax
                        </span>
                      </p>
                      {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none font-sans">
                        {flight.currency}
                        {flight.originalPrice}
                      </p> */}

                      <div className="mb-4">
                        {isSelected ? (
                          <button
                            onClick={() => {
                              handleSelectOnward({
                                id: flight,
                              });
                              setOnWard(true);
                              setShowReturnBox(true);
                            }}
                            className="bg-[#EE5128] text-white px-4 py-1.5 rounded font-jakarta font-semibold hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                          >
                            Selected
                            {/* {t("booking-card.book-now")} */}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-300 text-white px-4 py-1.5 rounded font-jakarta font-semibold cursor-not-allowed"
                            disabled
                          >
                            {/* {t("booking-card.book-now")} */}
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div
                    className={`border-t px-4 py-[30px] xl:py-[20px] flex items-center justify-between text-sm font-medium ${
                      isSelected ? "border-[#EE5128]" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`flex space-x-14 ${
                        isSelected ? "text-[#EE5128]" : "text-bold"
                      } font-sans`}
                    >
                      <div className="flex items-center space-x-1 ml-2">
                        <span>{t("booking-card.Flight-details")}</span>
                        <ChevronDown size={14} />
                      </div>
                      <div className="hidden lg:flex items-center space-x-1">
                        <span>{t("booking-card.price-details")}</span>
                        <ChevronDown size={14} />
                      </div>
                      <span className="hidden lg:flex">
                        {t("booking-card.policy")}
                      </span>
                      <span className="hidden lg:flex">
                        {t("booking-card.refund")}
                      </span>
                      <span className="hidden lg:flex">
                        {t("booking-card.reschedule")}
                      </span>
                    </div>                   
                  </div> */}
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6 font-sans relative">
          <div className="w-full flex items-center justify-between">
            {/* Heading */}
            <h1 className="text-[25.44px] font-[600] leading-[100%] font-jakarta">
              Return Flights from {destination} to {origin}
            </h1>
          </div>

          {/* Check if no return flights available */}
          {!ReturnFlights || ReturnFlights.length === 0 ? (
            <NoFlightsAvailable
              origin={destination}
              destination={origin}
              searchDate={null}
              onNewSearch={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ) : (
            ReturnFlights.map((flight) => {
              const isSelected =
                selectedFlightId === flight.id || selectReturn.id === flight.id;
              console.log("return flight", flight);

              return (
                <div
                  key={flight.id}
                  className={`w-full min-h-[150.13px] rounded-md cursor-pointer transition duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border border-[#EE5128] bg-white shadow-sm"
                      : "border border-gray-200 bg-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectFlight(flight.id);
                  }}
                >
                  <div className="flex items-center flex-col md:flex-row justify-between px-4 min-h-[60px] pt-6 pb-6 xl:pb-0 gap-[30px]">
                    <div className="flex flex-col justify-start items-center xl:items-start min-w-[170px] relative pb-10 lg:pb-0">
                      <img
                        src={flight.logo}
                        alt={flight.airline}
                        className="h-[40px] object-contain xl:mb-[45px] ml-2"
                      />
                      <div className="absolute top-[48px] left-[18px] flex items-center space-x-2">
                        <span className="text-[13px] text-gray-500 leading-none">
                          {flight.flightNumber}
                        </span>
                        <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold leading-[19px]">
                          {flight.class}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-[40px] ml-4">
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black leading-tight">
                          {flight.departureTime}
                        </p>
                        <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
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
                        <p className="text-[22px] font-bold text-black leading-tight">
                          {flight.arrivalTime}
                        </p>
                        <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
                          {flight.arrivalCity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col gap-2 items-center lg:items-end space-y-[2px] w-[152px] min-h-[31px]">
                      <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                        <span className="text-[20px] pr-2">
                          {flight.currency}
                        </span>
                        {flight.price}
                        <span className="text-[12px] text-black font-normal">
                          /pax
                        </span>
                      </p>
                      {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none font-sans">
                        {flight.currency}
                        {flight.originalPrice}
                      </p> */}
                      <p className="mb-4">
                        {isSelected ? (
                          <button
                            onClick={() => {
                              // handleConfirmSelect({
                              //   id: flight,
                              // });
                              setselectReturn(flight);
                            }}
                            className="bg-[#EE5128] text-white px-4 py-1.5 rounded font-jakarta font-semibold hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                          >
                            Selected
                            {/* {t("booking-card.book-now")} */}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-300 text-white px-4 py-1.5 rounded font-jakarta font-semibold cursor-not-allowed"
                            disabled
                          >
                            select
                            {/* {t("booking-card.book-now")} */}
                          </button>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* <div
                    className={`border-t px-4 py-[30px] xl:py-[20px] flex items-center justify-between text-sm font-medium ${
                      isSelected ? "border-[#EE5128]" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`flex space-x-14 ${
                        isSelected ? "text-[#EE5128]" : "text-bold"
                      } font-sans`}
                    >
                      <div className="flex items-center space-x-1 ml-2">
                        <span>{t("booking-card.Flight-details")}</span>
                        <ChevronDown size={14} />
                      </div>
                      <div className="hidden lg:flex items-center space-x-1">
                        <span>{t("booking-card.price-details")}</span>
                        <ChevronDown size={14} />
                      </div>
                      <span className="hidden lg:flex">
                        {t("booking-card.policy")}
                      </span>
                      <span className="hidden lg:flex">
                        {t("booking-card.refund")}
                      </span>
                      <span className="hidden lg:flex">
                        {t("booking-card.reschedule")}
                      </span>
                    </div>

                    
                  </div> */}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

const RoundTripBox = ({
  selectOutWard,
  selectReturn,
  handleConfirmSelect,
  setOnWard,
}) => {
  const [selectedBoth, setSelectedBoth] = useState(false);

  // ✅ Automatically enable button when both selections are available
  useEffect(() => {
    if (selectOutWard && selectReturn) {
      setSelectedBoth(true);
    } else {
      setSelectedBoth(false);
    }
  }, [selectOutWard, selectReturn]);

  return (
    <>
      <div className=" flex bg-white p-6 items-center mb-10 gap-6">
        <div className="flex flex-col md:flex-row w-full items-center">
          <div className="w-full">
            <div
              className="flex items-center flex-col md:flex-row justify-between h-[60px] xl:pb-0 cursor-pointer"
              onClick={() => setOnWard(false)}
            >
              <div className="flex flex-col justify-start items-center xl:items-start max-w-[170px] relative pb-10 lg:pb-0">
                <img
                  src={selectOutWard.logo}
                  alt={selectOutWard.airline}
                  className="size-[40px] object-contain ml-2"
                />
                {/* <div className="absolute top-[48px] left-[18px] flex items-center space-x-2">
                <span className="text-[13px] text-gray-500 leading-none">
                  {selectOutWard.flightNumber}
                </span>
                <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold leading-[19px]">
                  {selectOutWard.class}
                </span>
              </div> */}
              </div>

              <div className="flex items-center justify-center gap-[40px]">
                <div className="text-center">
                  <p className="text-[22px] font-bold text-black leading-tight">
                    {selectOutWard.departureTime}
                  </p>
                  <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
                    {selectOutWard.departureCity}
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
                    {selectOutWard.duration}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-[22px] font-bold text-black leading-tight">
                    {selectOutWard.arrivalTime}
                  </p>
                  <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
                    {selectOutWard.arrivalCity}
                  </p>
                </div>
              </div>

              {/* <div className="text-right flex flex-col gap-2 items-center lg:items-end space-y-[2px] w-[152px] min-h-[31px]">
              <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                <span className="text-[20px] pr-2">
                  {selectOutWard.currency}
                </span>
                {selectOutWard.price}
                <span className="text-[12px] text-black font-normal">/pax</span>
              </p>
           
            </div> */}
            </div>
          </div>
          <div className="w-full">
            <div
              className="flex items-center flex-col md:flex-row justify-between h-[60px] xl:pb-0 cursor-pointer"
              onClick={() => setOnWard(true)}
            >
              <div className="flex flex-col justify-start items-center xl:items-start max-w-[170px] relative pb-10 lg:pb-0">
                <img
                  src={selectReturn.logo}
                  alt={selectReturn.airline}
                  className="size-[40px] object-contain ml-2"
                />
                {/* <div className="absolute top-[48px] left-[18px] flex items-center space-x-2">
                <span className="text-[13px] text-gray-500 leading-none">
                  {selectReturn.flightNumber}
                </span>
                <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold leading-[19px]">
                  {selectReturn.class}
                </span>
              </div> */}
              </div>

              <div className="flex items-center justify-center gap-[40px]">
                <div className="text-center">
                  <p className="text-[22px] font-bold text-black leading-tight">
                    {selectReturn.departureTime}
                  </p>
                  <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
                    {selectReturn.departureCity}
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
                    {selectReturn.duration}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-[22px] font-bold text-black leading-tight">
                    {selectReturn.arrivalTime}
                  </p>
                  <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
                    {selectReturn.arrivalCity}
                  </p>
                </div>
              </div>

              {/* <div className="text-right flex flex-col gap-2 items-center lg:items-end space-y-[2px] w-[152px] min-h-[31px]">
              <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                <span className="text-[20px] pr-2">
                  {selectReturn.currency}
                </span>
                {selectReturn.price}
                <span className="text-[12px] text-black font-normal">/pax</span>
              </p>
            </div> */}
            </div>
          </div>
        </div>
        <div className="">
          {selectedBoth ? (
            <button
              className="bg-[#EE5128] text-white px-4 py-1.5 rounded font-jakarta font-semibold hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
              onClick={() => handleConfirmSelect()}
            >
              Book
            </button>
          ) : (
            <button
              // onClick={(e) => e.stopPropagation()}
              className="bg-gray-300 text-white px-4 py-1.5 rounded font-jakarta font-semibold cursor-not-allowed"
              disabled
            >
              {/* {t("booking-card.book-now")} */}
              Book
            </button>
          )}
        </div>
      </div>
    </>
  );
};

// Add this new component after your imports
const NoFlightsAvailable = ({
  origin,
  destination,
  searchDate,
  onNewSearch,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-8 text-center bg-white rounded-lg">
      {/* Local Image */}
      <div className="mb-8">
        <img
          src={Noflight}
          alt="No flights available"
          className="w-64 h-64 object-contain mx-auto"
        />
      </div>

      {/* Simple Message */}
      <div className="space-y-6 max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
          Flights not available for this date and Destinations.
        </h2>

        <div className="relative">
          {/* <p className="text-xl text-gray-600 font-medium relative z-10 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
        Try different dates and Destinations.
      </p> */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg transform rotate-1"></div>
        </div>
      </div>
    </div>
  );
};

// /////////////////////////////////////////////////
//
//  Recently Flight Booking Tickets
//
// ////////////////////////////////////////////////

const RecentlyBookedTickets = ({ t }) => {
  return (
    <div className=" w-full bg-white rounded-lg p-4">
      {/* Recently booked header */}
      <div className="flex items-center mb-4 gap-[20px]">
        <div className="mr-2">
          <img src={TicketIcon} alt="TicketIcon" />
        </div>
        <h2 className="text-[18px] font-semibold text-gray-800 font-jakarta">
          {t("recently.title")}
        </h2>
      </div>

      {/* Flight info section */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="flex items-center justify-center w-[53px] h-[53px] bg-orange-500 rounded-lg mr-3">
            <img src={DepartureFlightIcon} alt="DepartureFlightIcon" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[15px] font-medium font-jakarta text-gray-800">
              {t("recently.departure")}
            </h3>
            <p className="text-[14px] font-jakarta text-gray-500">
              Thu, 06 Jul, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* Airline details */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded mr-4">
          <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">
            <span className="text-white text-xs font-bold">Emirates</span>
          </div>
        </div>
        <div>
          <h3 className="font-jakarta font-medium text-[15px] text-gray-800">
            Emirates
          </h3>
          <p className="text-base font-normal font-jakarta text-gray-500">
            1244595
          </p>
        </div>
      </div>

      {/* Flight times */}
      <div className="flex items-center justify-between mb-6">
        {/* Departure */}
        <div className="text-center">
          <p className="text-[19px] font-sans font-bold text-gray-800">06:00</p>
          <p className="font-sans text-[14px] font-base text-gray-500">
            Algeries
          </p>
        </div>

        {/* Flight duration */}
        <div className="flex flex-col items-center px-4">
          <div className="flex items-center w-24">
            <div className="h-px border-gray-300 border flex-grow border-dashed"></div>
            <div className="mx-1">
              <img src={NavFlightIcon} alt="Navigation Flight icon" />
            </div>
            <div className="h-px border border-gray-300 flex-grow border-dashed"></div>
          </div>
          <p className="text-sm text-gray-500 mt-3">12hr</p>
        </div>

        {/* Arrival */}
        <div className="text-center">
          <p className="text-[19px] font-sans font-bold text-gray-800">19:00</p>
          <p className="font-sans text-[14px] font-base text-gray-600">
            Launda
          </p>
        </div>
      </div>

      {/* Reschedule button */}
      <button className="w-full py-3 font-jakarta bg-red-100 text-gray-800 font-medium rounded-lg hover:bg-red-200 transition-colors">
        {t("recently.reschedule")}
      </button>
    </div>
  );
};

// /////////////////////////////////////////////////
//
//  Flight Filter results
//
// ////////////////////////////////////////////////

const FilterFlight = ({
  searchData,
  setFlightsData,
  flights,
  t,
  routingId,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState(7000);
  const [travelClassFilters, setTravelClassFilters] = useState([]);
  const [stops, setStops] = useState([]);
  const [airlineFilters, setAirlineFilters] = useState([]);
  const [departureTimeSlot, setDepartureTimeSlot] = useState(null);
  const [arrivalTimeSlot, setArrivalTimeSlot] = useState(null);
  const [slotType, setSlotType] = useState("");

  const from = searchData.from;
  const to = searchData.to;
  const flightDepatureDate = searchData.flightDepatureDate;
  const flightReturnDate = searchData.flightReturnDate;

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setTravelClassFilters((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleCheckboxChangeStops = (e) => {
    const { value, checked } = e.target;
    setStops((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleCheckboxChangeAirlines = (e) => {
    const { value, checked } = e.target;
    setAirlineFilters((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;

  useEffect(() => {
    const fetchFlights = async () => {
      console.log("Filter API Call");
      try {
        const response = await fetch(`${backendUrl}/filter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: from,
            to: to,
            flightDepatureDate: flightDepatureDate,
            flightReturnDate: flightReturnDate,
            travelClass:
              travelClassFilters.length > 0
                ? travelClassFilters
                : searchData.travelClass,
            maxPrice: priceRange,
            stops: stops,
            airlineFilter: airlineFilters,
            departureSlot: departureTimeSlot,
            arrivalSlot: arrivalTimeSlot,
            slotType: slotType,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }

        const data = await response.json();
        console.log(data);
        setFlightsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (from && to) {
      fetchFlights();
    }
  }, [
    stops,
    travelClassFilters,
    airlineFilters,
    departureTimeSlot,
    arrivalTimeSlot,
  ]);

  const uniqueAirlines = [
    ...new Set((flights || []).map((flight) => flight.airline)),
  ];

  const timeSlotMap = {
    "Before 6AM": "00:00-05:59",
    "6AM - 12PM": "06:00-11:59",
    "12PM - 6PM": "12:00-17:59",
    "6PM - 12AM": "18:00-23:59",
  };

  return (
    <div className="w-full bg-white rounded-lg font-jakarta">
      {/* Filter Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer "
        onClick={toggleFilter}
      >
        <h2 className="font-medium text-gray-800">{t("filter.filter")}</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className="h-px bg-gray-300 mx-4 "></div>

      {/* Filter Content */}
      {isOpen && (
        <div className="px-4 pb-4 mt-[18px]">
          {/* Preferred Class */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t("filter.class.title")}
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-600"
                  value="Business"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <span className="ml-2 text-sm">{t("filter.class.class1")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-600"
                  value="Economy"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <span className="ml-2 text-sm text-gray-500">
                  {t("filter.class.class2")}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-600"
                  value="Firstclass"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <span className="ml-2 text-sm text-gray-500">
                  {t("filter.class.class3")}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-600"
                  value="Firstclass"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <span className="ml-2 text-sm text-gray-500">
                  {t("filter.class.class4")}
                </span>
              </label>
            </div>
          </div>
          <div className="h-px bg-gray-300 px-4 my-[18px]"></div>

          {/* Airlines */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t("filter.airlines")}
            </h3>
            <div className="space-y-2">
              {uniqueAirlines.map((airline, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-orange-600"
                    value={airline}
                    onChange={(e) => handleCheckboxChangeAirlines(e)}
                  />
                  <span className="ml-2 text-sm text-gray-500">{airline}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-300 px-4 my-[18px]"></div>

          {/* Leaving at */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t("filter.leaving-at")}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              Departure to {searchData.from}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(timeSlotMap).map((label, idx) => (
                <div
                  key={`dep-${idx}`}
                  className={`bg-gray-100 rounded p-2 flex flex-col items-center cursor-pointer ${
                    departureTimeSlot?.from === timeSlotMap[label].from
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onClick={() => {
                    setDepartureTimeSlot(timeSlotMap[label]);
                    setSlotType("Departure");
                  }}
                >
                  <img
                    src={
                      [SunRiseIcon, SunSetIcon, MoonRiseIcon, MoonSetIcon][idx]
                    }
                    alt={label}
                    className="h-5 w-5"
                  />
                  <span className="text-xs text-gray-400 mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrival */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t("filter.arrival-to")} {searchData.to}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(timeSlotMap).map((label, idx) => (
                <div
                  key={`arr-${idx}`}
                  className={`bg-gray-100 rounded p-2 flex flex-col items-center cursor-pointer ${
                    arrivalTimeSlot?.from === timeSlotMap[label].from
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onClick={() => {
                    setArrivalTimeSlot(timeSlotMap[label]);
                    setSlotType("Arrival");
                  }}
                >
                  <img
                    src={
                      [SunRiseIcon, SunSetIcon, MoonRiseIcon, MoonSetIcon][idx]
                    }
                    alt={label}
                    className="h-5 w-5"
                  />
                  <span className="text-xs text-gray-400 mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-300 px-4 my-[18px]"></div>

          {/* Stops */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t("filter.stop-title")}
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-600"
                  value="Nonstop"
                  onChange={(e) => handleCheckboxChangeStops(e)}
                />
                <span className="ml-2 text-sm">
                  {t("filter.stop.non-stop")}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-600"
                  value="1Stop"
                  onChange={(e) => handleCheckboxChangeStops(e)}
                />
                <span className="ml-2 text-sm text-gray-500">
                  1 {t("filter.stop.stop")}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-600"
                  value="2stop"
                  onChange={(e) => handleCheckboxChangeStops(e)}
                />
                <span className="ml-2 text-sm text-gray-500">
                  2+ {t("filter.stop.stop")}
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// /////////////////////////////////////////////////
//
//  Flight Date picker
//
// ////////////////////////////////////////////////

const FlightDatePicker = ({ flights }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [lowestPrice, setLowestPrice] = useState(0);

  const formatToKey = (date) => date.toISOString().split("T")[0];

  // Calculate lowest price once on flights update
  useEffect(() => {
    if (!flights || flights.length === 0) {
      setLowestPrice(0);
      return;
    }

    const prices = flights.map((flight) => parseFloat(flight.price));
    const minPrice = Math.min(...prices);
    setLowestPrice(minPrice);
  }, [flights]);

  // Generate week on component mount and update selectedDate
  useEffect(() => {
    const generateDates = (start) => {
      const allDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        allDates.push(date);
      }
      return allDates;
    };

    const today = new Date();
    const allDates = generateDates(today);
    setCurrentWeek(allDates);

    if (!selectedDate && allDates.length > 0) {
      setSelectedDate(formatToKey(allDates[0]));
    }
  }, [selectedDate]);

  const navigatePrevious = () => {
    const prevStartDate = new Date(currentWeek[0]);
    prevStartDate.setDate(prevStartDate.getDate() - 7);
    const prevDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(prevStartDate);
      date.setDate(prevStartDate.getDate() + i);
      prevDates.push(date);
    }
    setCurrentWeek(prevDates);
    setSelectedDate(formatToKey(prevDates[0]));
  };

  const navigateNext = () => {
    const nextStartDate = new Date(currentWeek[0]);
    nextStartDate.setDate(nextStartDate.getDate() + 7);
    const nextDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(nextStartDate);
      date.setDate(nextStartDate.getDate() + i);
      nextDates.push(date);
    }
    setCurrentWeek(nextDates);
    setSelectedDate(formatToKey(nextDates[0]));
  };

  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return {
      dayOfWeek: days[date.getDay()],
      month: months[date.getMonth()],
      day: date.getDate(),
      year: date.getFullYear(),
    };
  };

  return (
    <div className="w-full flex items-center font-sans overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.12)] bg-white rounded-[12px]">
      <button
        onClick={navigatePrevious}
        className="flex items-center justify-center w-[35px] h-[84.794px] bg-[#EE5128] rounded-l-[12px] focus:outline-none hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
        style={{ border: "none" }}
      >
        <ChevronLeft size={20} color="white" />
      </button>

      <div className="flex w-full items-center overflow-hidden bg-transparent">
        {currentWeek.map((date, index) => {
          const formattedDate = formatDate(date);
          const dateKey = formatToKey(date);
          const isSelected = selectedDate === dateKey;

          return (
            <div
              key={index}
              onClick={() => setSelectedDate(dateKey)}
              className="w-full relative cursor-pointer hover:bg-gray-100 transition-all duration-150"
              style={{
                height: "84.794px",
                borderRight:
                  index === currentWeek.length - 1
                    ? "none"
                    : "0.85px solid #CCCCCC",
              }}
            >
              <div
                className="absolute w-full h-full flex flex-col items-center justify-center text-center px-2"
                style={{
                  top: 0,
                  left: 0,
                }}
              >
                {/* Date text - fixed positioning */}
                <p className="text-[14px] font-normal text-black leading-tight mb-1">
                  {formattedDate.dayOfWeek}, {formattedDate.month}{" "}
                  {String(formattedDate.day).padStart(2, "0")}
                </p>

                {/* Price/emoji section - improved alignment */}
                <div className="flex flex-col items-center justify-center min-h-[24px]">
                  {lowestPrice > 0 ? (
                    <p
                      className={`text-[13px] font-bold leading-tight ${
                        isSelected ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {lowestPrice.toLocaleString()}
                    </p>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[16px] leading-none">😔</span>
                      <span className="text-[10px] text-gray-400 leading-tight mt-1">
                        No flights
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Selected indicator dot */}
              {isSelected && (
                <div className="absolute w-2 h-2 bg-[#EE5128] rounded-full left-1/2 -translate-x-1/2 bottom-2"></div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={navigateNext}
        className="flex items-center justify-center w-[35px] h-[84.794px] bg-[#EE5128] rounded-r-[12px] focus:outline-none hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
        style={{ border: "none" }}
      >
        <ChevronRight size={20} color="white" />
      </button>
    </div>
  );
};
