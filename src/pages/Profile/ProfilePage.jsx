import React, { useEffect, useState } from "react";

import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
import LandingPlane from "../../assets/images/LandingPlane.svg";
import DateFrom from "../../assets/images/DateFrom.svg";
import DateTo from "../../assets/images/DateTo.svg";
import TravelerIcon from "../../assets/images/TravelerIcon.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { ArrowLeftRightIcon, MapPin, Minus, Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router";
const LoggedIn = JSON.parse(localStorage.getItem("loggedIn") || "false");
const LoginDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
export default function ProfilePage() {
  const { t } = useTranslation();
  // const location = useLocation();
  const profile = {
    name: "John Brevis",
    email: "johnbrevis@gmail.com",
    dob: "6/6/2000",
    gender: "Male",
    passport: "PWI909274",
    address: "1162 Marconi St · Meadowlands · Gauteng ",
    pincode: "620102",
    profileImg: "/assets/profile.jpg",
  };
  const [userDetails, setUserDetails] = useState([]);

  // useEffect(() => {
  //   if (LoggedIn && loginData) {
  //     setUserDetails(loginData);
  //   }
  // }, []);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginUserDetail"));
    const loggedIn = localStorage.getItem("loggedIn") || "false";

    if (loggedIn && loginData) {
      setUserDetails(loginData);
    }
  }, []);

  return (
    <>
      <div className="w-full">
        <SearchBox t={t} />
      </div>
      <div className="min-h-screen w-full flex flex-col md:flex-row font-poppins max-w-7xl mx-auto ">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/2 px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={
                userDetails.photoURL ? userDetails.photoURL : profile.profileImg
              }
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold uppercase flex gap-1">
                <div className="capitalize">Hi,</div>
                {userDetails.name ? userDetails.name : profile.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {userDetails.email ? userDetails.email : profile.email}
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
            <NavItem icon={<FaSignOutAlt />} label={`${t("options.logout")}`} />
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
              <button className="text-xl">✏️</button>
            </div>

            {/* Profile Details with Dividers */}
            <div className="divide-y divide-gray-200">
              <Detail
                label={`${t("profile.fullname")}`}
                value={userDetails.name ? userDetails.name : profile.name}
              />
              <Detail label={`${t("profile.dob")}`} value={profile.dob} />
              <Detail label={`${t("profile.gender")}`} value={profile.gender} />
              <Detail
                label={`${t("profile.passportNo")}`}
                value={profile.passport}
              />
              <Detail
                label={`${t("profile.fullAddress")}`}
                value={profile.address}
              />
              <Detail
                label={`${t("profile.pinCode")}`}
                value={profile.pincode}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-md ${
        active
          ? "text-[#ff5a3c] font-medium border border-[#ff5a3c]"
          : "text-gray-400 bg-[#f5f5f5]"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <span>›</span>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="px-6 py-5">
      <p className="text-sm text-gray-500 font-jakarta">{label}</p>
      <p className="text-base font-lato font-semibold">{value}</p>
    </div>
  );
}

const SearchBox = ({
  setFlightsData,
  setOrigin,
  setDestination,
  setSearchdata,
  SearchProps,
  t,
}) => {
  // const [flightDepatureDate, setflightDepatureDate] = useState(null);
  const [flightDepatureDate, setflightDepatureDate] = useState(null);
  // const [flightReturnDate, setflightReturnDate] = useState(null);
  const [flightReturnDate, setflightReturnDate] = useState(null);
  // const [from, setFrom] = useState("");
  const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
  const [to, setTo] = useState("");
  // const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [travelType, setTravelType] = useState("Adult");
  const [travelers, setTravelers] = useState(1);

  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (SearchProps) {
      setFrom(SearchProps.from || "");
      setTo(SearchProps.to || "");
      setflightDepatureDate(SearchProps.flightDepatureDate || null);
      setflightReturnDate(SearchProps.flightReturnDate || null);
      setTravelers(SearchProps.travelers || 1);
      setTravelType(SearchProps.travelType || "");
    }
  }, [SearchProps]);

  const handleDate = (newDate) => {
    if (!newDate) {
      return;
    } // Handle null or invalid date
    else {
      // Ensure newDate is a Date object
      const selectedDate = new Date(newDate);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formattedFlightDepatureDate = handleDate(flightDepatureDate);
    const formattedFlightReturnDate = handleDate(flightReturnDate);

    console.log({
      from,
      to,
      flightDepatureDate,
      flightReturnDate,
      travelClass,
    });
    setSearchdata({
      from: from,
      to: to,
      flightDepatureDate: formattedFlightDepatureDate,
      flightReturnDate: formattedFlightReturnDate,
      travelClass: travelClass,
    });

    setOrigin(from);
    setDestination(to);
    setSearchCount((prev) => prev + 1);
  };
  const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL ;
  // Fetch flights based on the search parameters
  useEffect(() => {
    const fetchFlights = async () => {
      console.log("Search API Call");
      try {
        const response = await fetch(`${backendUrl}/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
            flightDepatureDate: handleDate(flightDepatureDate),
            flightReturnDate: handleDate(flightReturnDate),
            travelClass,
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

    fetchFlights();
  }, [searchCount]);
  return (
    <div className="border-t-2 border-b-2 px-4 xl:px-40 border-gray-200">
      <form onSubmit={handleSearch} className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-row flex-1 border-b border-gray-100">
            {/* From Location */}
            <div className="flex items-center p-4 border-b md:border-b-0  border-gray-200 flex-1">
              <div className="mr-3"></div>
              <div>
                <label className="block text-xs text-gray-500">
                  <img
                    src={TakeOffPlane}
                    alt="TakeOffPlane"
                    height={32}
                    width={32}
                  />
                </label>
                <div className="flex items-center gap-2 mt-3.5">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    name="leavingFrom"
                    id="leavingFrom"
                    placeholder={`${t("search.leaving")}`}
                    className="block w-full placeholder:text-gray-400 text-black focus:outline-none appearance-none"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="md:flex items-center justify-center p-2 my-auto mr-8">
              <button
                type="button"
                onClick={() => {
                  const temp = from;
                  setFrom(to);
                  setTo(temp);
                }}
                className="bg-[#EE5128] rounded-full p-2"
              >
                <ArrowLeftRightIcon className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* To Location */}
            <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
              <div className="mr-3"></div>
              <div>
                <label className="block text-xs text-black">
                  <img
                    src={LandingPlane}
                    alt="LandingPlane"
                    height={32}
                    width={32}
                  />
                </label>
                <div className="flex gap-2 items-center mt-3.5">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    name="to"
                    id="to"
                    className="block w-full placeholder:text-gray-400 text-black focus:outline-none appearance-none"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={`${t("search.going")}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1">
            {/* Departure Date */}
            <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
              <div className="mr-3"></div>
              <div className="relative">
                <label className="block text-xs text-gray-500">
                  <img src={DateFrom} alt="DateFrom" height={32} width={32} />
                </label>
                <div className="flex items-center mt-3.5">
                  <DatePicker
                    selected={flightDepatureDate}
                    onChange={(date) => setflightDepatureDate(date)}
                    placeholderText={`${t("search.dateForm")}`}
                    className="block w-full placeholder:text-gray-400 text-black z-20 focus:outline-none"
                    dateFormat="MMM d, yyyy"
                    popperClassName="z-[50px]"
                    popperProps={{
                      positionFixed: true,
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 absolute left-[65%] sm:left-[53%]  pointer-events-none ml-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Return Date */}
            <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
              {/* <div className="mr-3"></div> */}
              <div className="relative w-full">
                <label className="block text-xs text-gray-500">
                  <img src={DateTo} alt="DateTo" height={32} width={32} />
                </label>
                <div className="flex items-center mt-3.5">
                  <DatePicker
                    selected={flightReturnDate}
                    onChange={(date) => setflightReturnDate(date)}
                    placeholderText={`${t("search.dateReturn")}`}
                    className="block w-full placeholder:text-gray-400 text-black focus:outline-none"
                    dateFormat="MMM d, yyyy"
                    minDate={flightDepatureDate}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 absolute left-[65%] sm:left-[55%] pointer-events-none ml-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Travelers and Class section - Modified for better mobile alignment */}
          <div className="flex flex-col sm:flex-1 w-full">
            <div className="flex flex-row w-full">
              {/* Travel Class */}
              <div className="flex items-center relative p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 ">
                <div className="flex  relative w-full flex-col ml-4 ">
                  <label className="block text-xs text-gray-500">
                    <img
                      src={TravelerIcon}
                      alt="TravelerIcon"
                      height={32}
                      width={32}
                    />
                  </label>
                  <div className="flex items-center mt-3.5 relative">
                    <select
                      className="placeholder:text-gray-400 text-black focus:outline-none appearance-none bg-transparent"
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value)}
                    >
                      <option value="" className="text-gray-400">
                        Select
                      </option>
                      <option value="Economy">{`${t(
                        "search.class.class1"
                      )}`}</option>
                      <option value="Premium Economy">{`${t(
                        "search.class.class2"
                      )}`}</option>
                      <option value="Business">{`${t(
                        "search.class.class3"
                      )}`}</option>
                      <option value="First">{`${t(
                        "search.class.class4"
                      )}`}</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400 absolute right-0 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Travelers count */}
              <div className="flex items-center relative p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
                <div className="flex  relative w-full flex-col ">
                  <label className="block  text-gray-500">
                    <div className="flex items-center justify-between gap-8">
                      <img
                        src={TravelerIcon}
                        alt="TravelerIcon"
                        height={32}
                        width={32}
                      />
                      <div className="flex items-center relative">
                        <select
                          className="placeholder:text-grey-100 appearance-none w-[100px] text-gray-500 focus:outline-none bg-transparent"
                          value={travelType}
                          onChange={(e) => setTravelType(e.target.value)}
                        >
                          <option value="" className="text-gray-400">
                            Select
                          </option>
                          <option value="Adult" className="text-black">
                            {`${t("search.travaler-type.type1")}`}
                          </option>
                          <option value="Child" className="text-black">
                            {`${t("search.travaler-type.type2")}`}
                          </option>
                        </select>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400 absolute left-1/2 pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </label>
                  <div className="flex items-center mt-3.5 gap-2 relative font-jakarta">
                    <div
                      className="p-2 flex justify-center items-center rounded-md  transition-colors duration-200 cursor-pointer"
                      onClick={() =>
                        setTravelers((prev) => Math.max(1, prev - 1))
                      }
                    >
                      <Minus className="h-[16px]" />
                    </div>
                    <p className="p-2">{travelers}</p>
                    <div
                      className="p-2 flex justify-center items-center rounded-md  transition-colors duration-200 cursor-pointer"
                      onClick={() => setTravelers(travelers + 1)}
                    >
                      <Plus className="h-[16px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button - Repositioned for mobile */}
            <div className="p-4 flex justify-center md:justify-end items-center w-full md:hidden">
              <button
                type="submit"
                className="w-full text-[14px] font-jakarta bg-[#FFE2DA] hover:bg-orange-600 text-black hover:text-white font-medium py-2 px-8 rounded-md flex items-center justify-center gap-2"
              >
                <Search />
                {`${t("search.search")}`} Flights
              </button>
            </div>
          </div>

          {/* Search Button for desktop - hidden on mobile */}
          <div className="p-4 hidden md:flex md:justify-center items-center">
            <button
              type="submit"
              className="text-[14px] font-jakarta sm:min-w-[120px] max-w-[200px] bg-[#FFE2DA] hover:bg-orange-600 text-black hover:text-white font-medium py-2 ml-8 px-8 rounded-md md:rounded-r-md flex items-center gap-2"
            >
              <Search />
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
