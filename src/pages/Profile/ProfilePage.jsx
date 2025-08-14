import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
import LandingPlane from "../../assets/images/LandingPlane.svg";
import DateFrom from "../../assets/images/DateFrom.svg";
import DateTo from "../../assets/images/DateTo.svg";
import TravelerIcon from "../../assets/images/TravelerIcon.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchExchangeRates,
  convertToRequestedCurrency,
} from "../../utils/Currencyconverter";
import { FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import {
  ArrowLeftRightIcon,
  Edit,
  MapPin,
  Minus,
  Plus,
  Search,
  X,
  Camera,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { deleteCookie } from "../../utils/Cookie";
const LoggedIn = JSON.parse(localStorage.getItem("loggedIn") || "false");
const LoginDetail = JSON.parse(localStorage.getItem("loginUserDetail"));

const USER_API_URL =
  import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:3000/userapi";

export default function ProfilePage({ country }) {
  const { t } = useTranslation();

  const profile = {
    Name: "John Brevis",
    email: "johnbrevis@gmail.com",
    dob: "6/6/2000",
    gender: "Male",
    passport: "PWI909274",
    address: "1162 Marconi St · Meadowlands · Gauteng ",
    pincode: "620102",
    profileImg: "/assets/profile.jpg",
  };

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user profile data from backend
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
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
        setUserDetails(data);
        console.log(data);
      } catch (err) {
        if (LoggedIn && LoginDetail) {
          setUserDetails(LoginDetail);
        }
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 font-jakarta">
          {t("profile.loading") || "Loading profile..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-jakarta">{error}</p>
      </div>
    );
  }

  const user = userDetails || {};

  const handleLogout = async () => {
    const cookiedelete = await deleteCookie("userjwt");
    if (cookiedelete === "deleted") {
      // Optionally redirect to login page or home
      window.location.href = "/login"; // or use a navigation hook if using react-router
    }
  };

  // Components below preserved from your existing code
  function NavItem({ icon, label, active, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center justify-between px-4 py-3 rounded-md cursor-pointer hover:text-[#ff5a3c] hover:font-medium hover:border hover:border-[#ff5a3c] ${
          active ? "text-[#ff5a3c] font-medium border border-[#ff5a3c]" : ""
        }`}
      >
        <span className="flex items-center gap-2">
          {icon} {label}
        </span>
        <span>›</span>
      </div>
    );
  }

  return (
    <>
      {/* Search Box Component */}
      <div className="w-full max-w-7xl mx-auto">
        <SearchBox country={country} />
      </div>

      {/* Profile Layout */}
      <div className="min-h-screen w-full flex flex-col md:flex-row font-poppins max-w-7xl mx-auto ">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/2 lg:w-1/4 px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={user.photoURL ? user.photoURL : profile.profileImg}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold uppercase flex gap-1">
                <div className="capitalize">Hi,</div>
                {user.Name ? user.Name : profile.Name}
              </h2>
              <p className="text-gray-600 text-sm">
                {user.Emailaddress ? user.Emailaddress : profile.Emailaddress}
              </p>
            </div>
          </div>

          {/* Offer Box */}
          <div className="p-4 rounded-lg bg-[#ffe9e3] mb-6">
            <p className="text-sm font-medium mb-1">
              {t("profile-offer.title")}
            </p>
            <p className="text-xs text-gray-600">
              {t("profile-offer.description")}
            </p>
            <button className="mt-3 px-4 py-1 bg-[#ff5a3c] text-white text-sm rounded-md">
              {t("profile-offer.button")}
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-3 text-sm">
            <NavItem
              icon={<FaUser />}
              label={`${t("options.profile")}`}
              active
            />
            <NavItem
              icon={<FaCog />}
              label={`${t("options.security-settings")}`}
            />
            <NavItem
              icon={<FaQuestionCircle />}
              label={`${t("options.help-feedback")}`}
            />
            <NavItem
              icon={<FaSignOutAlt />}
              label={`${t("options.logout")}`}
              onClick={handleLogout}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full md:w-1/2 flex items-start justify-center py-10 ">
          <div className="w-full bg-white rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl bg-[#ffe9e3]">
              <h2 className="text-xl font-bold font-jakarta">
                {t("options.profile")}
              </h2>
            </div>

            {/* Profile Details */}
            {/* <form className="divide-y divide-gray-200"> */}
            {/* <Detail
                label={`${t("profile.fullname")}`}
                value={user.Name ? user.Name : profile.Name}
              /> */}
            {/* <Detail
                label={`${t("Phone Number")}`}
                value={"+91 90000 80000"}
              /> */}
            {/* <Detail label={`${t("profile.dob")}`} value={profile.dob} /> */}
            {/* <Detail label={`${t("profile.gender")}`} value={profile.gender} /> */}
            {/* <Detail
                label={`${t("profile.passportNo")}`}
                value={profile.passport}
              /> */}
            {/* <Detail
                label={`${t("profile.fullAddress")}`}
                value={user.Address}
              /> */}
            {/* <Detail
                label={`${t("profile.pinCode")}`}
                value={profile.pincode}
              /> */}

            {/* </form> */}

            <ProfileViewAndEdit />
          </div>
        </div>
      </div>
    </>
  );
}

const SearchBox = ({ country }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelClass, setTravelClass] = useState("Economy");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [flightReturnDate, setflightReturnDate] = useState(null);
  const [tripType, setTripType] = useState("Round Trip");
  const [searchCount, setSearchCount] = useState(0);
  const [isDirectFlight, setIsDirectFlight] = useState(false);
  const [flightDepatureDate, setflightDepatureDate] = useState(new Date());
  const [routingId, setRoutingId] = useState("");
  const [searchData, setSearchdata] = useState({
    from: "",
    to: "",
    flightDepatureDate: null,
    flightReturnDate: null,
    travelClass: "",
  });
  const [travellers, setTravellers] = useState([30]);
  const [airposts, setAirposts] = useState([]);

  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
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
      const searchTerm = fromDropdownSearchTerm.toLowerCase();
      if (fromDropdownSearchTerm.length > 0) {
        let filtered = [];

        if (searchTerm.length === 3) {
          // Filter only by IATA code
          filtered = airposts.filter((airport) =>
            airport.Iata.toLowerCase().includes(searchTerm)
          );
        } else if (searchTerm.length > 3) {
          // Filter by all fields
          filtered = airposts.filter(
            (airport) =>
              airport.Cityname.toLowerCase().includes(searchTerm) ||
              airport.Countryname.toLowerCase().includes(searchTerm)
            // airport.Iata.toLowerCase().includes(searchTerm) ||
            // airport.Airportname.toLowerCase().includes(searchTerm)
          );
        }
        setFilteredFromAirports(filtered);
      } else {
        setFilteredFromAirports(airposts.slice(0, 6));
      }
    }
    // getcommission();
  }, [fromDropdownSearchTerm, airposts, fromDropdownOpen]);

  // Add this useEffect right after the existing FROM dropdown useEffect
  useEffect(() => {
    if (toDropdownOpen) {
      const searchTerm = toDropdownSearchTerm.toLowerCase();

      if (searchTerm.length > 0) {
        let filtered = [];

        if (searchTerm.length === 3) {
          // Filter only by IATA code
          filtered = airposts.filter((airport) =>
            airport.Iata.toLowerCase().includes(searchTerm)
          );
        } else if (searchTerm.length > 3) {
          // Filter by all fields
          filtered = airposts.filter(
            (airport) =>
              airport.Cityname.toLowerCase().includes(searchTerm) ||
              airport.Countryname.toLowerCase().includes(searchTerm)
            // airport.Iata.toLowerCase().includes(searchTerm) ||
            // airport.Airportname.toLowerCase().includes(searchTerm)
          );
        }

        setFilteredToAirports(filtered.slice(0, 10));
      } else {
        // Default list
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

  const travelFusionBackendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;
  useEffect(() => {
    // make an array of N adults
    const adult = Array(adults).fill(30);
    // make an array of N children
    const child = Array(children).fill(7);
    // combine them
    setTravellers([...adult, ...child]);
  }, [adults, children]);
  const handleTravelfusionSearch = async (e) => {
    e.preventDefault();
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

    // trigger the search start route api
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
        // this will **conditionally add** returnDateOfSearch if flightReturnDate exists
        ...(flightReturnDate && {
          returnDateOfSearch:
            handleTravelFusionDate(flightReturnDate) + "-23:59",
        }),
        countryCode: country,
      };

      // console.log(requestBody);
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
      /*
      //  ////// checking route
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

          // Step 1: Collect all raw flight data
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
                console.log("outwardList", outwardList);

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
        } catch (error) {
          console.error(error);
        }
      } */
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

          if (!response.ok) throw new Error("Failed to fetch flight data");

          const data = await response.json();
          const routerList = data.flightList[0].Router;
          const rates = await fetchExchangeRates("CVE");

          // Step 1: Collect all raw flight data
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
                        const segments = flight.SegmentList?.[0]?.Segment || [];

                        const segmentDetails = segments.map((segment) => {
                          const origin = segment?.Origin?.[0] || {};
                          const destination = segment?.Destination?.[0] || {};
                          const operatorName =
                            segment?.Operator?.[0]?.Name?.[0] ||
                            "Unknown Airline";
                          const logo = operatorName.toLowerCase();
                          const flightId =
                            segment?.FlightId?.[0]?.Code?.[0] || "N/A";
                          const travelClass =
                            segment?.TravelClass?.[0]?.TfClass?.[0] ||
                            "Economy";
                          const departDateTime =
                            segment?.DepartDate?.[0] || "N/A";
                          const arriveDateTime =
                            segment?.ArriveDate?.[0] || "N/A";

                          return {
                            id: flight.Id?.[0] || "N/A",
                            airline: operatorName,
                            logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
                            flightNumber: flightId,
                            class: travelClass,
                            departureDate: departDateTime,
                            departureTime:
                              departDateTime.split("-")[1] || "N/A",
                            departureCity: origin.Code?.[0] || "N/A",
                            arrivalDate: arriveDateTime,
                            arrivalTime: arriveDateTime.split("-")[1] || "N/A",
                            arrivalCity: destination.Code?.[0] || "N/A",
                            duration: segment?.Duration?.[0]
                              ? Math.round(Number(segment.Duration[0]) / 60) +
                                "hr"
                              : "N/A",
                          };
                        });

                        const originalPrice = parseFloat(
                          flight.Price?.[0]?.Amount?.[0] || "0"
                        );
                        const originalCurrency =
                          flight.Price?.[0]?.Currency?.[0] || "N/A";

                        return {
                          id: flight.Id?.[0] || "N/A",
                          segments: segmentDetails,
                          type:
                            segmentDetails.length > 1 ? "connecting" : "direct",
                          stops: segmentDetails.length - 1,
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
              segments:
                flight.segments.map((s, i) => ({ leg: i + 1, ...s })) || [],
            };
          });

          // Round-trip flights
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
                    const segments = flight?.SegmentList?.[0]?.Segment || [];

                    const segmentDetails = segments.map((segment) => {
                      const origin = segment?.Origin?.[0] || {};
                      const destination = segment?.Destination?.[0] || {};
                      const operatorName =
                        segment?.Operator?.[0]?.Name?.[0] || "Unknown Airline";
                      const logo = operatorName.toLowerCase();
                      const flightId =
                        segment?.FlightId?.[0]?.Code?.[0] || "N/A";
                      const travelClass =
                        segment?.TravelClass?.[0]?.TfClass?.[0] || "Economy";
                      const departDateTime = segment?.DepartDate?.[0] || "N/A";
                      const arriveDateTime = segment?.ArriveDate?.[0] || "N/A";

                      return {
                        id: flight?.Id?.[0] || "N/A",
                        airline: operatorName,
                        logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
                        flightNumber: flightId,
                        class: travelClass,
                        departureDate: departDateTime,
                        departureTime: departDateTime.split("-")[1] || "N/A",
                        departureCity: origin.Code?.[0] || "N/A",
                        arrivalDate: arriveDateTime,
                        arrivalTime: arriveDateTime.split("-")[1] || "N/A",
                        arrivalCity: destination.Code?.[0] || "N/A",
                        duration: segment?.Duration?.[0]
                          ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
                          : "N/A",
                      };
                    });

                    const originalPrice = parseFloat(
                      flight?.Price?.[0]?.Amount?.[0] ?? "0"
                    );
                    const originalCurrency =
                      flight?.Price?.[0]?.Currency?.[0] ?? "N/A";

                    return {
                      id: flight.Id?.[0] ?? "N/A",
                      originalPrice,
                      originalCurrency,
                      segments: segmentDetails,
                      type: segmentDetails.length > 1 ? "connecting" : "direct",
                      stops: segmentDetails.length - 1,
                      flightType: type,
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
                segments:
                  flight.segments.map((s, i) => ({ leg: i + 1, ...s })) || [],
              };
            })
            .filter(Boolean);

          console.log("simplifiedflightgroup", simplifiedFlightsGroup);
          console.log("simplifiedflight", simplifiedFlights);

          // navigate("/list", {
          //   state: {
          //     FightSearchData: PlainSearchData,
          //     oneWay: simplifiedFlights,
          //     roundTrip: simplifiedFlightsGroup,
          //     tripType: tripType,
          //     routingId: routingId || routeID,
          //     fromDisplayText: fromSearchTerm,
          //     toDisplayText: toSearchTerm,
          //   },
          // });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
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

  console.log(fromSearchTerm);

  // if (loading) return <LoadingScreen />;

  return (
    <div className="flex justify-center items-center">
      <form className="w-full container bg-white rounded-xl px-4 py-1 z-10 min-h-[168px] mt-5">
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
          {tripType === "Round Trip" && (
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
                  className={`text-sm ${
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

// Move FormInput outside to prevent re-creation on each render
const FormInput = ({
  name,
  label,
  id,
  required = false,
  value,
  onChange,
  isEditing,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
          !isEditing ? "bg-gray-50 cursor-default" : "bg-white"
        }`}
      />
    </div>
  );
};

const ProfileViewAndEdit = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    fullName: "",
    phoneNumber: "",
    fullAddress: {
      company: "",
      flat: "",
      buildingName: "",
      buildingNumber: "",
      street: "",
      locality: "",
      city: "",
      province: "",
      postcode: "",
      countryCode: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            profilePicture: reader.result, // base64 string
          }));
        };
        reader.readAsDataURL(file);
      }
    } else if (name.startsWith("fullAddress.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        fullAddress: {
          ...prev.fullAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);
  useEffect(() => {
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
        setFormData((prev) => ({
          ...prev,
          fullName: data.Name || prev.fullName,
          phoneNumber: data.Mobilenumber || prev.phoneNumber,
          profilePicture: data.Profileimage || prev.profilePicture,
          fullAddress: {
            ...prev.fullAddress,
            company: data.ContactAddress?.Company || prev.fullAddress.company,
            flat: data.ContactAddress?.Flat || prev.fullAddress.flat,
            buildingName:
              data.ContactAddress?.BuildingName ||
              prev.fullAddress.buildingName,
            buildingNumber:
              data.ContactAddress?.BuildingNumber ||
              prev.fullAddress.buildingNumber,
            street: data.ContactAddress?.Street || prev.fullAddress.street,
            locality:
              data.ContactAddress?.Locality || prev.fullAddress.locality,
            city: data.ContactAddress?.City || prev.fullAddress.city,
            province:
              data.ContactAddress?.Province || prev.fullAddress.province,
            postcode:
              data.ContactAddress?.Postcode || prev.fullAddress.postcode,
            countryCode:
              data.ContactAddress?.CountryCode || prev.fullAddress.countryCode,
          },
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const payload = {
      ...formData,
      photoUrl: formData.profilePicture,
      Contactdetails: formData.fullAddress,
      Name: formData.fullName,
      Phonenumber: formData.phoneNumber,
    };
    if (formData) {
      const res = await fetch(`${USER_API_URL}/editprofile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });
      if (res.ok) {
        toast.success("Profile updated !!");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-full mx-auto p-6 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full flex justify-end items-center gap-2">
            {/* Submit Button */}
            {isEditing && (
              <div className=" flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-md font-medium ${
                isEditing
                  ? "bg-gray-500 hover:bg-gray-600 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
        <div onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setFormData((prev) => ({
                          ...prev,
                          profilePicture: e.target.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="fullName"
              label="Full Name"
              id="full-name"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              isEditing={isEditing}
            />
            <FormInput
              name="phoneNumber"
              label="Phone Number"
              id="phone-number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              isEditing={isEditing}
            />
          </div>

          {/* Address Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="fullAddress.company"
                label="Company"
                id="company"
                value={formData.fullAddress.company}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.flat"
                label="Flat/Unit"
                id="flat"
                value={formData.fullAddress.flat}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.buildingName"
                label="Building Name"
                id="building-name"
                value={formData.fullAddress.buildingName}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.buildingNumber"
                label="Building Number"
                id="building-number"
                value={formData.fullAddress.buildingNumber}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.street"
                label="Street"
                id="street"
                value={formData.fullAddress.street}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.locality"
                label="Locality"
                id="locality"
                value={formData.fullAddress.locality}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.city"
                label="City"
                id="city"
                value={formData.fullAddress.city}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.province"
                label="Province/State"
                id="province"
                value={formData.fullAddress.province}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.postcode"
                label="Postcode"
                id="postcode"
                value={formData.fullAddress.postcode}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
              <FormInput
                name="fullAddress.countryCode"
                label="Country Code"
                id="country-code"
                value={formData.fullAddress.countryCode}
                onChange={handleInputChange}
                isEditing={isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
