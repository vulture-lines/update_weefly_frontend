import { ArrowLeftRightIcon, MapPin, Minus, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PaperDesktop from "../../assets/images/paper.svg";
import PaperMobile from "../../assets/images/paper-mobile.png";
import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
import LandingPlane from "../../assets/images/LandingPlane.svg";
import DateFrom from "../../assets/images/DateFrom.svg";
import DateTo from "../../assets/images/DateTo.svg";
import TravelerIcon from "../../assets/images/TravelerIcon.svg";
import BannerBottom from "../../assets/images/banner-bottom.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";
import { useTranslation } from "react-i18next";
import {
  fetchExchangeRates,
  convertToRequestedCurrency,
} from "../../utils/Currencyconverter";
import airportsData from "../../constants/airports.json";
import axios from "axios";

const HeroSection = ({ country }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Pre-filled values - Fixed data
  const [from, setFrom] = useState("LGW");
  const [to, setTo] = useState("MAD");
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [travelType, setTravelType] = useState("Adult");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [flightReturnDate, setflightReturnDate] = useState(
    new Date(2025, 8, 28)
  ); // Sept 28, 2025
  const [searchCount, setSearchCount] = useState(0);
  const [flightsData, setFlightsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("Round Trip");
  const [flightTypeFilter, setFlightTypeFilter] = useState("Domestic");
  const [isDirectFlight, setIsDirectFlight] = useState(false);
  const [flightDepatureDate, setflightDepatureDate] = useState(
    new Date(2025, 7, 18)
  );
  const [routingId, setRoutingId] = useState("");
  const [searchData, setSearchdata] = useState({
    from: "LGW",
    to: "MAD",
    flightDepatureDate: new Date(2025, 7, 18),
    flightReturnDate: new Date(2025, 8, 28),
    travelClass: "Economy",
  });
  const [travellers, setTravellers] = useState([30]);
  const [airposts, setAirposts] = useState([]);

  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState(
    "[LGW] London Gatwick Airport"
  );
  const [toSearchTerm, setToSearchTerm] = useState(
    "[MAD] Adolfo Suárez Madrid–Barajas Airport"
  );
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);
  const [fromDropdownSearchTerm, setFromDropdownSearchTerm] = useState("");
  const [toDropdownSearchTerm, setToDropdownSearchTerm] = useState("");
  const [commissionDetails, setcommissionDetails] = useState([]);
  console.log(searchData);
  const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;

  useEffect(() => {
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
    getcommission();
  }, []);

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

  const handleTravelFusionDate = (newDate) => {
    if (!newDate) {
      return;
    } else {
      const selectedDate = new Date(newDate);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
  };

  const travelFusionBackendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;

  useEffect(() => {
    const adult = Array(adults).fill(30);
    const child = Array(children).fill(7);
    setTravellers([...adult, ...child]);
  }, [adults, children]);

  const handleTravelfusionSearch = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    let PlainSearchData;

    const formattedFlightDepatureDate =
      handleTravelFusionDate(flightDepatureDate) + "-00:01";

    console.log({
      from,
      to,
      flightDepatureDate,
      flightReturnDate,
      travelClass,
    });

    if (flightReturnDate !== null && tripType == "Round Trip") {
      const formattedFlightReturnDate =
        handleTravelFusionDate(flightReturnDate) + "-23:59";
      setSearchdata({
        from: from,
        to: to,
        flightDepatureDate: formattedFlightDepatureDate,
        flightReturnDate: formattedFlightReturnDate,
        travelClass: travelClass,
      });
    } else {
      setSearchdata({
        from: from,
        to: to,
        flightDepatureDate: formattedFlightDepatureDate,
        travelClass: travelClass,
      });
      setflightReturnDate(null);
    }

    console.log(adults);
    setOrigin(from);
    setDestination(to);
    setSearchCount((prev) => prev + 1);

    console.log("country hero", country);
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
        ...(flightReturnDate && {
          returnDateOfSearch:
            handleTravelFusionDate(flightReturnDate) + "-23:59",
        }),
        countryCode: country,
      };

      PlainSearchData = requestBody;
      const response = await fetch(`${travelFusionBackendUrl}/start-routing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }

      const data = await response.json();
      console.log(data);
      let routeID = data.routingId;
      setRoutingId(data.routingId);

      const getCommissionDetail = async (tfPrice) => {
        console.log("tfPrice", tfPrice);

        try {
          if (!commissionDetails) {
            return console.log("Error");
          } else {
            const Commission = commissionDetails.Commission;
            if (Commission) {
              console.log(Commission);
              if (
                commissionDetails.CommissionType.toLowerCase() === "percentage"
              ) {
                const commissionAmount = (tfPrice * Commission) / 100;
                const totalAmount = tfPrice + commissionAmount;
                console.log("if totalAmount", totalAmount);
                return totalAmount.toFixed(2);
              } else if (
                commissionDetails.CommissionType.toLowerCase() === "amount"
              ) {
                const totalAmount = tfPrice + Commission;
                console.log("else totalAmount", totalAmount);
                return totalAmount.toFixed(2);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      if (routeID || routingId) {
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
                routingId: routeID || routingId,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch flight data");
          }

          const data = await response.json();

          const routerList = data.flightList[0].Router;
          const rates = await fetchExchangeRates("CVE");

          // [Flight processing logic - keeping all the same logic from original code]
          const allFlightPromises = [];

          for (const supplier of routerList) {
            if (!supplier?.GroupList || !Array.isArray(supplier.GroupList))
              continue;

            for (const groupContainer of supplier.GroupList) {
              if (
                !groupContainer?.Group ||
                !Array.isArray(groupContainer.Group)
              )
                continue;

              for (const group of groupContainer.Group) {
                if (
                  !group?.OutwardList ||
                  !Array.isArray(group.OutwardList) ||
                  group.OutwardList.length === 0
                )
                  continue;

                const outwardList = group.OutwardList[0]?.Outward || [];

                for (const flight of outwardList) {
                  allFlightPromises.push(
                    (async () => {
                      try {
                        if (!flight?.SegmentList?.[0]?.Segment?.[0])
                          return null;

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

          const currencyMap = {};
          const priceCommissionMap = {};

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
                  rawFlightDataPromises.push(
                    extractFlightInfo(flight, "return")
                  );
                }
              }
            }
          }

          const rawFlightData = (
            await Promise.all(rawFlightDataPromises)
          ).filter(Boolean);

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
          navigate("/list", {
            state: {
              FightSearchData: PlainSearchData,
              oneWay: simplifiedFlights,
              roundTrip: simplifiedFlightsGroup,
              tripType: tripType,
              routingId: routingId || routeID,
              fromDisplayText: fromSearchTerm,
              toDisplayText: toSearchTerm,
            },
          });
          // Don't stop loading here - let it continue until navigation completes
        } catch (error) {
          console.error(error);
          setLoading(false); // Only stop loading on error
        }
      } else {
        setLoading(false); // Stop loading if no routing ID
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Stop loading on error
    }
    // Removed finally block - loading will continue until page navigation
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  if (loading) return <LoadingScreen />;

  return (
    <>
      <div
        className={`py-52 relative overflow-visible bg-white/10 bg-[url('/banner-img.png')]
        bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 lg:px-10 xl:px-40 overflow-hidden`}
      >
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="mt-8 h-full w-full flex flex-col justify-center items-center gap-2">
            <h1
              data-aos="fade-up"
              className="text-4xl xl:text-5xl font-semibold text-center font-jakarta text-white"
            >
              {t("hero.title")}
            </h1>
            <div data-aos="fade-up" className="relative pl-20 hidden lg:block">
              <img
                src={PaperDesktop}
                alt="banner-2"
                height={171}
                width={662}
                className="relative h-20 mix-blend-screen"
              />
              <p className="absolute top-7 left-36 z-[1px] text-black font-semibold text-base font-sans">
                {t("hero.description")}
              </p>
            </div>
            <div
              data-aos="fade-up"
              className="relative block lg:hidden mt-4 mb-4"
            >
              <img
                src={PaperMobile}
                alt="banner-2"
                height={100}
                width={443}
                className="relative h-20 -mb-10"
              />
              <p className="absolute top-5 left-1/2 -translate-x-1/2 leading-5 z-[1px] text-black font-semibold text-sm sm:text-base font-sans text-center">
                {t("hero.description")}
              </p>
            </div>
            <div className="w-full -mb-30 mt-10 font-sans block z-50">
              <p
                data-aos="fade-left"
                className="text-[18px] tracking-wider text-white font-bold mb-6 font-sans"
              >
                {t("hero.bookNow")}
              </p>
              <form
                onSubmit={handleTravelfusionSearch}
                className="w-full max-w-6xl overflow-visible bg-white rounded-xl shadow-lg px-4 py-1 z-50 min-h-[168px] mt-5 relative"
              >
                {/* Filters Row */}
                <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {["One Way", "Round Trip"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 translate-x-4 ${
                            tripType === type
                              ? "bg-[#EE5128] border-[#EE5128] text-white"
                              : "bg-gray-300 border-gray-300"
                          }`}
                        >
                          {tripType === type && (
                            <span className="text-[10px] font-bold">✓</span>
                          )}
                        </div>
                        <span
                          className={`text-sm translate-y-4 translate-x-4 ${
                            tripType === type
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
                          checked={tripType === type}
                          onChange={() => setTripType(type)}
                          disabled
                        />
                      </label>
                    ))}
                  </div>

                  <label className="flex items-center gap-2 ml-auto cursor-pointer">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 -translate-x-18  ${
                        isDirectFlight
                          ? "bg-[#EE5128] border-[#EE5128] text-white"
                          : "bg-gray-300 border-gray-300"
                      }`}
                    >
                      {isDirectFlight && (
                        <span className="text-[10px] font-bold">✓</span>
                      )}
                    </div>
                    <span
                      className={`text-sm translate-y-4 -translate-x-18   ${
                        isDirectFlight
                          ? "font-semibold text-black"
                          : "text-gray-500"
                      }`}
                    >
                      Direct flight only
                    </span>
                  </label>
                </div>

                {/* Main Inputs Row */}
                <div className="flex flex-col md:flex-row gap-1">
                  {/* From-To Section - DISABLED with pre-filled values */}
                  <div className="flex items-center w-full md:w-[660px] min-h-[90px] rounded-xl border border-gray-200 relative overflow-visible z-50 bg-gray-50">
                    {/* FROM */}
                    <div className="flex-1 px-4 py-3 relative">
                      <label className="text-xs text-gray-500">From</label>
                      <div className="text-[18px] font-semibold text-gray-700 w-full bg-transparent">
                        [LGW] Gatwick Airport
                      </div>
                    </div>

                    {/* Center Divider */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200 -translate-x-1/2" />

                    {/* SWAP BUTTON - Disabled */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="w-8 h-8 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center opacity-50">
                        <ArrowLeftRightIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    {/* TO */}
                    <div className="flex-1 pl-40 pr-4 py-3 ml-[1px] relative">
                      <label className="text-xs text-gray-500">To</label>
                      <div className="text-[18px] font-semibold text-gray-700 w-full bg-transparent">
                        [MAD] Barajas
                      </div>
                    </div>
                  </div>

                  {/* Departure Date - DISABLED with pre-filled value */}
                  <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                      Departure Date
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400"
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
                    <div className="text-[16px] font-semibold text-gray-700">
                      18 Aug 2025
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Friday</p>
                  </div>

                  {/* Return Date - DISABLED with pre-filled value */}
                  <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                      Return Date
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400"
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
                    <div className="text-[16px] font-semibold text-gray-700">
                      28 Sep 2025
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Thursday</p>
                  </div>

                  {/* Traveller & Class - DISABLED with pre-filled value */}
                  <div className="w-full md:w-[220px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">
                      Travellers & Class
                    </p>
                    <div className="flex justify-between items-center font-semibold text-[16px] text-gray-700">
                      <span>
                        1{" "}
                        <span className="font-normal text-sm">Travellers</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Economy</p>
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full flex justify-center translate-y-2.5 cursor-pointer">
                  <button
                    type="submit"
                    className="bg-orange-600 cursor-pointer  hover:bg-orange-700 text-white text-[18px] font-semibold px-18 py-2 rounded-full transition"
                  >
                    {t("hero.search")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <img
          src={BannerBottom}
          alt="banner-bottom"
          height={40}
          width={662}
          className="w-full absolute -bottom-[26px] md:-bottom-[40px] object-cover h-20"
        />
      </div>
    </>
  );
};

export default HeroSection;
