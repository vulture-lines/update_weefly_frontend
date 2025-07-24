// // import { ArrowLeftRightIcon, MapPin, Minus, Plus } from "lucide-react";
// // import { useState, useEffect } from "react";
// // import PaperDesktop from "../../assets/images/paper.svg";
// // import PaperMobile from "../../assets/images/paper-mobile.png";
// // import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
// // import LandingPlane from "../../assets/images/LandingPlane.svg";
// // import DateFrom from "../../assets/images/DateFrom.svg";
// // import DateTo from "../../assets/images/DateTo.svg";
// // import TravelerIcon from "../../assets/images/TravelerIcon.svg";
// // import BannerBottom from "../../assets/images/banner-bottom.png";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { useNavigate } from "react-router";
// // import LoadingScreen from "../../components/LoadingScreen";
// // import { useTranslation } from "react-i18next";

// // const HeroSection = () => {
// //   const { t } = useTranslation();
// //   const navigate = useNavigate();
// //   const [from, setFrom] = useState("");
// //   const [to, setTo] = useState("");
// //   const [travelers, setTravelers] = useState(1);
// //   const [travelClass, setTravelClass] = useState("Economy");
// //   const [travelType, setTravelType] = useState("Adult");
// //   const [flightDepatureDate, setflightDepatureDate] = useState(null);
// //   const [flightReturnDate, setflightReturnDate] = useState(null);
// //   const [searchCount, setSearchCount] = useState(0);
// //   const [flightsData, setFlightsData] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const handleDate = (newDate) => {
// //     if (!newDate) {
// //       return;
// //     } // Handle null or invalid date
// //     else {
// //       // Ensure newDate is a Date object
// //       const selectedDate = new Date(newDate);
// //       const year = selectedDate.getFullYear();
// //       const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
// //       const day = String(selectedDate.getDate()).padStart(2, "0");

// //       const formattedDate = `${year}-${month}-${day}`;
// //       return formattedDate;
// //     }
// //   };

// //   const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL ;

// //   // Fetch flights based on the search parameters
// //   useEffect(() => {
// //     const fetchFlights = async () => {
// //       const formattedDepartureDate = handleDate(flightDepatureDate);
// //       const formattedReturnDate = handleDate(flightReturnDate);
// //       console.log("Search API Call");
// //       setLoading(true);
// //       try {
// //         const response = await fetch(`${backendUrl}/search`, {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             from,
// //             to,
// //             flightDepatureDate: formattedDepartureDate,
// //             flightReturnDate: formattedReturnDate,
// //             travelClass,
// //           }),
// //         });

// //         if (!response.ok) {
// //           throw new Error("Failed to fetch flight data");
// //         }

// //         const data = await response.json();
// //         console.log(data);
// //         setFlightsData(data);
// //         setLoading(false);
// //         navigate("/list", {
// //           state: {
// //             flightsData: data, // use freshly fetched data here
// //             searchData: {
// //               from,
// //               to,
// //               flightDepatureDate: formattedDepartureDate,
// //               flightReturnDate: formattedReturnDate,
// //               travelClass,
// //               travelers,
// //               travelType,
// //             },
// //           },
// //         });
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false); // Stop loading
// //       }
// //     };

// //     if (searchCount > 0) {
// //       fetchFlights();
// //     }
// //   }, [searchCount]);

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     const formattedDepartureDate = handleDate(flightDepatureDate);
// //     const formattedReturnDate = handleDate(flightReturnDate);

// //     console.log({
// //       from,
// //       to,
// //       flightDepatureDate: formattedDepartureDate,
// //       flightReturnDate: formattedReturnDate,
// //       travelClass,
// //       travelers,
// //       travelType,
// //     });

// //     setSearchCount((prev) => prev + 1);
// //   };

// //   if (loading) {
// //     return <LoadingScreen />;
// //   }

// //   return (
// //     <>
// //       <div
// //         className={`min-h-screen relative bg-white/10 bg-[url('/banner-img.png')]
// //         bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 lg:px-10 xl:px-40 overflow-hidden`}
// //       >
// //         <div className="h-full w-full flex flex-col justify-center items-center">
// //           <div className="mt-10 h-full w-full flex flex-col justify-center items-center gap-2">
// //             <h1
// //               data-aos="fade-up"
// //               className="text-4xl xl:text-5xl font-semibold text-center font-jakarta text-white"
// //             >
// //               {/* Transforming <br className="sm:hidden" /> African Travel */}
// //               {t("hero.title")}
// //             </h1>
// //             <div data-aos="fade-up" className="relative pl-20 hidden lg:block">
// //               <img
// //                 src={PaperDesktop}
// //                 alt="banner-2"
// //                 height={171}
// //                 width={662}
// //                 className="relative h-20 mix-blend-screen"
// //               />
// //               <p className="absolute top-7 left-36 z-[1px] text-black font-semibold text-base font-sans">
// //                 {/* Hassle Free Local Payment Options with Lowest Prices! */}
// //                 {t("hero.description")}
// //               </p>
// //             </div>
// //             <div
// //               data-aos="fade-up"
// //               className="relative block lg:hidden mt-4 mb-4"
// //             >
// //               <img
// //                 src={PaperMobile}
// //                 alt="banner-2"
// //                 height={100}
// //                 width={443}
// //                 className="relative h-20 -mb-10"
// //               />
// //               <p className="absolute top-5 left-13 leading-5 z-[1px] text-black font-semibold text-sm sm:text-base font-sans text-center">
// //                 {/* Hassle Free Local Payment Options{" "}
// //                 <br className="block lg:hidden" /> with Lowest Prices! */}
// //                 {t("hero.description")}
// //               </p>
// //             </div>

// //             <div className="w-full -mb-30 mt-10 font-sans block z-10">
// //               <p
// //                 data-aos="fade-left"
// //                 className="text-[18px] tracking-wider text-white font-bold mb-6 font-sans"
// //               >
// //                 {/* Book your Trip now! */}
// //                 {t("hero.bookNow")}
// //               </p>

// //               <form
// //                 data-aos="fade-down"
// //                 onSubmit={handleSearch}
// //                 className="bg-white rounded-lg shadow-lg"
// //               >
// //                 {/* Desktop Layout */}
// //                 <div className="hidden md:flex md:flex-row">
// //                   <div className="flex flex-row flex-1">
// //                     {/* From Location */}
// //                     <div className="flex items-center p-4 border-b-0 border-gray-200 flex-1">
// //                       <div className="flex flex-col">
// //                         <label className="block text-xs text-gray-500">
// //                           <img
// //                             src={TakeOffPlane}
// //                             alt="TakeOffPlane"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex gap-2 items-center mt-3.5">
// //                           <MapPin className="h-4 w-4 text-gray-500" />
// //                           <input
// //                             type="text"
// //                             name="Leaving From"
// //                             id="LeavingFrom"
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none appearance-none"
// //                             value={from}
// //                             onChange={(e) => setFrom(e.target.value)}
// //                             placeholder={`${t("hero.leaving")}`}
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Swap Icon */}
// //                     <div className="flex items-center justify-center p-2 my-auto mr-8">
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           const temp = from;
// //                           setFrom(to);
// //                           setTo(temp);
// //                         }}
// //                         className="bg-[#EE5128] rounded-full p-2"
// //                       >
// //                         <ArrowLeftRightIcon className="h-5 w-5 text-white" />
// //                       </button>
// //                     </div>

// //                     {/* To Location */}
// //                     <div className="flex items-center p-4 border-b-0 border-r border-gray-200 flex-1">
// //                       <div>
// //                         <label className="block text-xs text-black">
// //                           <img
// //                             src={LandingPlane}
// //                             alt="LandingPlane"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex items-center mt-3.5">
// //                           <MapPin className="h-4 w-4 text-gray-500 mr-1" />
// //                           <input
// //                             type="text"
// //                             name="going To"
// //                             id="going To"
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black font-normal focus:outline-none appearance-none"
// //                             value={to}
// //                             onChange={(e) => setTo(e.target.value)}
// //                             placeholder={`${t("hero.going")}`}
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-1">
// //                     {/* Departure Date */}
// //                     <div className="flex items-center p-4 border-b-0 border-r border-gray-200 flex-1">
// //                       <div className="relative">
// //                         <label className="block text-xs text-gray-500">
// //                           <img
// //                             src={DateFrom}
// //                             alt="DateFrom"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex items-center mt-3.5 relative">
// //                           <DatePicker
// //                             selected={flightDepatureDate}
// //                             onChange={(date) => setflightDepatureDate(date)}
// //                             placeholderText={`${t("hero.dateForm")}`}
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black z-20 focus:outline-none"
// //                             dateFormat="MMM d, yyyy"
// //                             popperClassName="z-[50px]"
// //                             popperProps={{
// //                               positionFixed: true,
// //                             }}
// //                           />
// //                           <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-nones "
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth="2"
// //                               d="M19 9l-7 7-7-7"
// //                             />
// //                           </svg>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Return Date */}
// //                     <div className="flex items-center p-4 border-b-0 border-r border-gray-200 flex-1">
// //                       <div className="relative">
// //                         <label className="block text-xs text-gray-500">
// //                           <img
// //                             src={DateTo}
// //                             alt="DateTo"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex items-center mt-3.5 relative">
// //                           <DatePicker
// //                             selected={flightReturnDate}
// //                             onChange={(date) => setflightReturnDate(date)}
// //                             placeholderText={`${t("hero.dateReturn")}`}
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none"
// //                             dateFormat="MMM d, yyyy"
// //                             minDate={flightDepatureDate}
// //                           />
// //                           <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-none"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth="2"
// //                               d="M19 9l-7 7-7-7"
// //                             />
// //                           </svg>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="flex flex-1">
// //                     {/* Travelers */}
// //                     <div className="flex flex-1 w-full">
// //                       <div className="flex items-center relative p-4 border-b-0 border-r border-gray-200 flex-1 w-full">
// //                         <div className="flex flex-col w-full">
// //                           <label className="relative flex text-gray-500 w-full justify-between gap-4 ">
// //                             <img
// //                               src={TravelerIcon}
// //                               alt="TravelerIcon"
// //                               height={32}
// //                               width={32}
// //                               className="top-5 relative"
// //                             />
// //                             <div className="relative flex justify-between">
// //                               <select
// //                                 className="placeholder:text-gray-100 appearance-none w-[100px] text-grey-400 focus:outline-none bg-transparent"
// //                                 value={travelClass}
// //                                 onChange={(e) => setTravelClass(e.target.value)}
// //                               >
// //                                 <option value="" className="text-gray-400">
// //                                   Select
// //                                 </option>
// //                                 <option value="Economy" className="text-black">
// //                                   {t("hero.class.class1")}
// //                                 </option>
// //                                 <option
// //                                   value="Premium Economy"
// //                                   className="text-black"
// //                                 >
// //                                   {t("hero.class.class2")}
// //                                 </option>
// //                                 <option value="Business" className="text-black">
// //                                   {t("hero.class.class3")}
// //                                 </option>
// //                                 <option value="First" className="text-black">
// //                                   {t("hero.class.class4")}
// //                                 </option>
// //                               </select>
// //                               <svg
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 className="h-4 w-4 text-gray-400 absolute top-[30%] right-[10%] pointer-events-none"
// //                                 fill="none"
// //                                 viewBox="0 0 24 24"
// //                                 stroke="currentColor"
// //                               >
// //                                 <path
// //                                   strokeLinecap="round"
// //                                   strokeLinejoin="round"
// //                                   strokeWidth="2"
// //                                   d="M19 9l-7 7-7-7"
// //                                 />
// //                               </svg>
// //                             </div>
// //                           </label>

// //                           <div className="flex flex-col items-end gap-2">
// //                             <div className="flex items-center relative">
// //                               <select
// //                                 className="placeholder:text-grey-100 appearance-none w-[100px] text-gray-500 focus:outline-none bg-transparent"
// //                                 value={travelType}
// //                                 onChange={(e) => setTravelType(e.target.value)}
// //                               >
// //                                 <option value="" className="text-gray-400">
// //                                   Select
// //                                 </option>
// //                                 <option value="Adult" className="text-black">
// //                                   {t("hero.travaler-type.type1")}
// //                                 </option>
// //                                 <option value="Child" className="text-black">
// //                                   {t("hero.travaler-type.type2")}
// //                                 </option>
// //                               </select>
// //                               <svg
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 className="h-4 w-4 text-gray-400 absolute left-1/2 pointer-events-none"
// //                                 fill="none"
// //                                 viewBox="0 0 24 24"
// //                                 stroke="currentColor"
// //                               >
// //                                 <path
// //                                   strokeLinecap="round"
// //                                   strokeLinejoin="round"
// //                                   strokeWidth="2"
// //                                   d="M19 9l-7 7-7-7"
// //                                 />
// //                               </svg>
// //                             </div>
// //                             <div className="flex items-center gap-2 w-[100px] relative font-jakarta">
// //                               <div
// //                                 className="flex justify-center items-center rounded-md text-black transition-colors duration-200 cursor-pointer"
// //                                 onClick={() =>
// //                                   setTravelers((prev) => Math.max(1, prev - 1))
// //                                 }
// //                               >
// //                                 <Minus className="h-[16px]" />
// //                               </div>
// //                               <p className="size-4 flex justify-center items-center">
// //                                 {travelers}
// //                               </p>
// //                               <div
// //                                 className="flex justify-center items-center rounded-md text-black transition-colors duration-200 cursor-pointer"
// //                                 onClick={() => setTravelers(travelers + 1)}
// //                               >
// //                                 <Plus className="h-[16px]" />
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Search Button */}
// //                     <div className="p-0">
// //                       <button
// //                         type="submit"
// //                         className="w-full text-2xl font-jakarta sm:min-w-[200px] max-w-[200px] h-full bg-[#EE5128] text-white font-semibold py-2 px-8 md:px-12 rounded-none rounded-r-md hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
// //                       >
// //                         {t("hero.search")}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Mobile Layout */}
// //                 <div className="flex flex-col md:hidden w-full">
// //                   {/* Locations (From & To) */}
// //                   <div className="flex flex-row w-full border-b  border-gray-200">
// //                     <div className="flex items-center p-4 border-b  border-gray-200 flex-1">
// //                       <div className="flex flex-col">
// //                         <label className="block text-xs text-gray-500">
// //                           <img
// //                             src={TakeOffPlane}
// //                             alt="TakeOffPlane"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex gap-2 items-center mt-3.5">
// //                           <MapPin className="h-4 w-4 text-gray-500" />
// //                           <input
// //                             type="text"
// //                             name="leavingFrom"
// //                             id="leavingFromMobile"
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none appearance-none"
// //                             value={from}
// //                             onChange={(e) => setFrom(e.target.value)}
// //                             placeholder={`${t("hero.leaving")}`}
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Swap Icon */}
// //                     <div className="flex items-center justify-center p-2 my-auto mr-4">
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           const temp = from;
// //                           setFrom(to);
// //                           setTo(temp);
// //                         }}
// //                         className="bg-[#EE5128] rounded-full p-2"
// //                       >
// //                         <ArrowLeftRightIcon className="h-5 w-5 text-white" />
// //                       </button>
// //                     </div>

// //                     <div className="flex items-center p-4 border-b border-gray-200 flex-1">
// //                       <div>
// //                         <label className="block text-xs text-black">
// //                           <img
// //                             src={LandingPlane}
// //                             alt="LandingPlane"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex items-center mt-3.5 gap-2">
// //                           <MapPin className="h-4 w-4 text-gray-500 " />
// //                           <input
// //                             type="text"
// //                             name="goingTo"
// //                             id="goingToMobile"
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black font-normal focus:outline-none appearance-none"
// //                             value={to}
// //                             onChange={(e) => setTo(e.target.value)}
// //                             placeholder={`${t("hero.going")}`}
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Dates */}
// //                   <div className="flex flex-row w-full">
// //                     <div className="flex items-center p-4 border-b border-r border-gray-200 flex-1 ">
// //                       <div className="relative w-full flex-col ml-5 mr-4 ">
// //                         <label className="block text-xs text-gray-500">
// //                           <img
// //                             src={DateFrom}
// //                             alt="DateFrom"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex items-center mt-3.5 relative">
// //                           <DatePicker
// //                             selected={flightDepatureDate}
// //                             onChange={(date) => setflightDepatureDate(date)}
// //                             placeholderText={`${t("hero.dateForm")}`}
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black z-20 focus:outline-none"
// //                             dateFormat="MMM d, yyyy"
// //                             popperClassName="z-[50px]"
// //                             popperProps={{
// //                               positionFixed: true,
// //                             }}
// //                           />
// //                           <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-nones "
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth="2"
// //                               d="M19 9l-7 7-7-7"
// //                             />
// //                           </svg>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="flex items-center p-4 border-b border-gray-200 flex-1">
// //                       <div className="relative">
// //                         <label className="block text-xs text-gray-500">
// //                           <img
// //                             src={DateTo}
// //                             alt="DateTo"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex items-center mt-3.5 relative">
// //                           <DatePicker
// //                             selected={flightReturnDate}
// //                             onChange={(date) => setflightReturnDate(date)}
// //                             placeholderText={`${t("hero.dateReturn")}`}
// //                             className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none"
// //                             dateFormat="MMM d, yyyy"
// //                             minDate={flightDepatureDate}
// //                           />
// //                           <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-none"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth="2"
// //                               d="M19 9l-7 7-7-7"
// //                             />
// //                           </svg>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Travel Options */}
// //                   <div className="flex flex-row w-full">
// //                     <div className="flex items-center p-4 border-b border-r border-gray-200 flex-1">
// //                       <div className="flex  relative w-full flex-col ml-4 ">
// //                         <label className="block text-xs text-gray-500">
// //                           <img
// //                             src={TravelerIcon}
// //                             alt="TravelerIcon"
// //                             height={32}
// //                             width={32}
// //                           />
// //                         </label>
// //                         <div className="flex items-center mt-3.5 relative">
// //                           <select
// //                             className="placeholder:text-gray-400 text-black focus:outline-none appearance-none bg-transparent"
// //                             value={travelClass}
// //                             onChange={(e) => setTravelClass(e.target.value)}
// //                           >
// //                             <option value="" className="text-gray-400">
// //                               Select
// //                             </option>
// //                             <option value="Economy">
// //                               {t("hero.class.class1")}
// //                             </option>
// //                             <option value="Premium Economy">
// //                               {t("hero.class.class2")}
// //                             </option>
// //                             <option value="Business">
// //                               {t("hero.class.class3")}
// //                             </option>
// //                             <option value="First">
// //                               {t("hero.class.class4")}
// //                             </option>
// //                           </select>
// //                           <svg
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             className="h-4 w-4 text-gray-400 absolute right-0 pointer-events-none"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth="2"
// //                               d="M19 9l-7 7-7-7"
// //                             />
// //                           </svg>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="flex items-center p-4 border-b border-gray-200 flex-1">
// //                       <div className="flex  relative w-full flex-col ">
// //                         <label className="block  text-gray-500">
// //                           <div className="flex items-center justify-between gap-8">
// //                             <img
// //                               src={TravelerIcon}
// //                               alt="TravelerIcon"
// //                               height={32}
// //                               width={32}
// //                             />
// //                             <div className="flex items-center relative">
// //                               <select
// //                                 className="placeholder:text-grey-100 appearance-none w-[100px] text-gray-500 focus:outline-none bg-transparent"
// //                                 value={travelType}
// //                                 onChange={(e) => setTravelType(e.target.value)}
// //                               >
// //                                 <option value="" className="text-gray-400">
// //                                   Select
// //                                 </option>
// //                                 <option value="Adult" className="text-black">
// //                                   {t("hero.travaler-type.type1")}
// //                                 </option>
// //                                 <option value="Child" className="text-black">
// //                                   {t("hero.travaler-type.type2")}
// //                                 </option>
// //                               </select>
// //                               <svg
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 className="h-4 w-4 text-gray-400 absolute left-1/2 pointer-events-none"
// //                                 fill="none"
// //                                 viewBox="0 0 24 24"
// //                                 stroke="currentColor"
// //                               >
// //                                 <path
// //                                   strokeLinecap="round"
// //                                   strokeLinejoin="round"
// //                                   strokeWidth="2"
// //                                   d="M19 9l-7 7-7-7"
// //                                 />
// //                               </svg>
// //                             </div>
// //                           </div>
// //                         </label>
// //                         <div className="flex items-center mt-3.5 gap-2 relative font-jakarta">
// //                           <div
// //                             className="p-2 flex justify-center items-center rounded-md   transition-colors duration-200 cursor-pointer"
// //                             onClick={() =>
// //                               setTravelers((prev) => Math.max(1, prev - 1))
// //                             }
// //                           >
// //                             <Minus className="h-[16px]" />
// //                           </div>
// //                           <p className="p-2">{travelers}</p>
// //                           <div
// //                             className="p-2 flex justify-center items-center rounded-md  transition-colors duration-200 cursor-pointer"
// //                             onClick={() => setTravelers(travelers + 1)}
// //                           >
// //                             <Plus className="h-[16px]" />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Search Button - Mobile */}
// //                   <div className="w-full">
// //                     <button
// //                       type="submit"
// //                       className="w-full text-xl font-jakarta bg-[#EE5128] text-white font-semibold py-3 rounded-b-md hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
// //                     >
// //                       {t("hero.search")}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //         <img
// //           src={BannerBottom}
// //           alt="banner-bottom"
// //           height={40}
// //           width={662}
// //           className="w-full absolute -bottom-[26px] md:-bottom-[40px] object-cover h-20"
// //         />
// //       </div>
// //     </>
// //   );
// // };

// // export default HeroSection;
// import { ArrowLeftRightIcon, MapPin, Minus, Plus } from 'lucide-react'
// import { useState, useEffect, useRef } from 'react'
// import PaperDesktop from '../../assets/images/paper.svg'
// import PaperMobile from '../../assets/images/paper-mobile.png'
// import TakeOffPlane from '../../assets/images/TakeOffPlane.svg'
// import LandingPlane from '../../assets/images/LandingPlane.svg'
// import DateFrom from '../../assets/images/DateFrom.svg'
// import DateTo from '../../assets/images/DateTo.svg'
// import TravelerIcon from '../../assets/images/TravelerIcon.svg'
// import BannerBottom from '../../assets/images/banner-bottom.png'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { useNavigate } from 'react-router'
// import LoadingScreen from '../../components/LoadingScreen'
// import { useTranslation } from 'react-i18next'
// import {
// 	fetchExchangeRates,
// 	convertToRequestedCurrency,
// } from '../../utils/Currencyconverter'
// import airportsData from '../../constants/airports.json'
// import axios from 'axios'

// const HeroSection = () => {
// 	const { t } = useTranslation()
// 	const navigate = useNavigate()
// 	const [from, setFrom] = useState('')
// 	const [to, setTo] = useState('')
// 	const [travelers, setTravelers] = useState(1)
// 	const [travelClass, setTravelClass] = useState('Economy')
// 	const [showDropdown, setShowDropdown] = useState(false)
// 	const dropdownRef = useRef(null)
// 	const [travelType, setTravelType] = useState('Adult')
// 	const [adults, setAdults] = useState(1)
// 	const [children, setChildren] = useState(0)
// 	const [origin, setOrigin] = useState('')
// 	const [destination, setDestination] = useState('')
// 	const [flightReturnDate, setflightReturnDate] = useState(null)
// 	const [searchCount, setSearchCount] = useState(0)
// 	const [flightsData, setFlightsData] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [tripType, setTripType] = useState('Round Trip')
// 	const [flightTypeFilter, setFlightTypeFilter] = useState('Domestic')
// 	const [isDirectFlight, setIsDirectFlight] = useState(false)
// 	const [flightDepatureDate, setflightDepatureDate] = useState(new Date())
// 	const [routingId, setRoutingId] = useState('')
// 	const [searchData, setSearchdata] = useState({
// 		from: '',
// 		to: '',
// 		flightDepatureDate: null,
// 		flightReturnDate: null,
// 		travelClass: '',
// 	})
// 	const [travellers, setTravellers] = useState([30])
// 	const [airposts, setAirposts] = useState([])
// 	const [searchNewData, setSearchNewData] = useState([])

// 	const [isOpen, setIsOpen] = useState('')

// 	/* const handleDate = (newDate) => {
//     if (!newDate) return null;
//     const selectedDate = new Date(newDate);
//     const year = selectedDate.getFullYear();
//     const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//     const day = String(selectedDate.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL ;

//   useEffect(() => {
//     const fetchFlights = async () => {
//       const formattedDepartureDate = handleDate(flightDepatureDate);
//       const formattedReturnDate = handleDate(flightReturnDate);
//       console.log("Search API Call");
//       setLoading(true);
//       try {
//         const response = await fetch(`${backendUrl}/search`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             from,
//             to,
//             flightDepatureDate: formattedDepartureDate,
//             flightReturnDate: formattedReturnDate,
//             travelClass,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch flight data");
//         }

//         const data = await response.json();
//         console.log(data);
//         setFlightsData(data);
//         navigate("/list", {
//           state: {
//             flightsData: data,
//             searchData: {
//               from,
//               to,
//               flightDepatureDate: formattedDepartureDate,
//               flightReturnDate: formattedReturnDate,
//               travelClass,
//               travelers,
//               travelType,
//             },
//           },
//         });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (searchCount > 0) {
//       fetchFlights();
//     }
//   }, [searchCount]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const formattedDepartureDate = handleDate(flightDepatureDate);
//     const formattedReturnDate = handleDate(flightReturnDate);

//     console.log({
//       from,
//       to,
//       flightDepatureDate: formattedDepartureDate,
//       flightReturnDate: formattedReturnDate,
//       travelClass,
//       travelers,
//       travelType,
//     });

//     setSearchCount((prev) => prev + 1);
//   }; */
// 	const listSupplierRoute = async () => {
// 		try {
// 			const response = await fetch(
// 				`${travelFusionBackendUrl}/get-supplierroute`
// 			)

// 			if (!response.ok) {
// 				throw new Error(`HTTP error! Status: ${response.status}`)
// 			}

// 			const data = await response.json() // Convert the response body to JSON
// 			const iata = data.suppliers[0].airportRoutes
// 			console.log('Supplier route data:', iata) // Log the parsed data
// 		} catch (error) {
// 			console.error('Failed to fetch supplier route:', error)
// 		}
// 	}

// 	useEffect(() => {
// 		listSupplierRoute()
// 	}, [])
// 	const handleTravelFusionDate = newDate => {
// 		if (!newDate) {
// 			return
// 		} // Handle null or invalid date
// 		else {
// 			// Ensure newDate is a Date object
// 			const selectedDate = new Date(newDate)

// 			const year = selectedDate.getFullYear()
// 			const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
// 			const day = String(selectedDate.getDate()).padStart(2, '0')

// 			const formattedDate = `${day}/${month}/${year}`
// 			return formattedDate
// 		}
// 	}

// 	const handleTravelfusionSearch = e => {
// 		e.preventDefault()

// 		const formattedFlightDepatureDate =
// 			handleTravelFusionDate(flightDepatureDate) + '-00:01'

// 		console.log({
// 			from,
// 			to,
// 			flightDepatureDate,
// 			flightReturnDate,
// 			travelClass,
// 		})
// 		if (flightReturnDate !== null && tripType == 'Round Trip') {
// 			const formattedFlightReturnDate =
// 				handleTravelFusionDate(flightReturnDate) + '-23:59'
// 			setSearchdata({
// 				from: from,
// 				to: to,
// 				flightDepatureDate: formattedFlightDepatureDate,
// 				flightReturnDate: formattedFlightReturnDate,
// 				travelClass: travelClass,
// 			})
// 		} else {
// 			setSearchdata({
// 				from: from,
// 				to: to,
// 				flightDepatureDate: formattedFlightDepatureDate,
// 				travelClass: travelClass,
// 			})
// 			setflightReturnDate(null)
// 		}
// 		console.log(adults)
// 		setOrigin(from)
// 		setDestination(to)
// 		setSearchCount(prev => prev + 1)
// 	}

// 	const travelFusionBackendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL 
// 	useEffect(() => {
// 		// make an array of N adults
// 		const adult = Array(adults).fill(30)
// 		// make an array of N children
// 		const child = Array(children).fill(7)
// 		// combine them
// 		setTravellers([...adult, ...child])
// 	}, [adults, children])

// 	// Fetch flights based on the search parameters
// 	useEffect(() => {
// 		const fetchFlights = async () => {
// 			console.log('Travelfusion routing API Call')
// 			try {
// 				const requestBody = {
// 					mode: 'plane',
// 					origin: {
// 						descriptor: from,
// 					},
// 					destination: {
// 						descriptor: to,
// 					},
// 					dateOfSearch:
// 						handleTravelFusionDate(flightDepatureDate) + '-00:01',
// 					travellers: travellers,
// 					incrementalResults: true,
// 					// this will **conditionally add** returnDateOfSearch if flightReturnDate exists
// 					...(flightReturnDate && {
// 						returnDateOfSearch:
// 							handleTravelFusionDate(flightReturnDate) + '-23:59',
// 					}),
// 				}
// 				setSearchNewData(requestBody)
// 				console.log(requestBody)

// 				const response = await fetch(
// 					`${travelFusionBackendUrl}/start-routing`,
// 					{
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json',
// 						},
// 						body: JSON.stringify(requestBody),
// 					}
// 				)

// 				if (!response.ok) {
// 					throw new Error('Failed to fetch flight data')
// 				}

// 				const data = await response.json()
// 				console.log(data)
// 				setRoutingId(data.routingId)
// 			} catch (error) {
// 				console.error(error)
// 			}
// 		}

// 		fetchFlights()
// 	}, [searchCount])

// 	useEffect(() => {
// 		const fetchFlights = async () => {
// 			console.log('Travelfusion Search API Call')
// 			try {
// 				const response = await fetch(
// 					`${travelFusionBackendUrl}/check-routing`,
// 					{
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json',
// 						},
// 						body: JSON.stringify({
// 							routingId: routingId,
// 						}),
// 					}
// 				)

// 				if (!response.ok) {
// 					throw new Error('Failed to fetch flight data')
// 				}

// 				const data = await response.json()

// 				const routerList = data.flightList[0].Router
// 				const rates = await fetchExchangeRates('CVE')
// 				const simplifiedFlights = routerList.flatMap(supplier => {
// 					const groups = supplier.GroupList || []
// 					return groups.flatMap(groupContainer => {
// 						const groupItems = groupContainer.Group || []

// 						return groupItems.flatMap(group => {
// 							const outwardList =
// 								group.OutwardList?.[0]?.Outward || []
// 							const allFlights = [...outwardList]

// 							return allFlights
// 								.map(flight => {
// 									const segment =
// 										flight.SegmentList?.[0]?.Segment?.[0]
// 									if (!segment) return null // guard

// 									const origin = segment?.Origin?.[0]
// 									const destination =
// 										segment?.Destination?.[0]
// 									const logo =
// 										segment?.Operator?.[0]?.Name?.[0].toLowerCase()
// 									const originalPrice = parseFloat(
// 										flight.Price?.[0]?.Amount?.[0] || '0'
// 									)
// 									const originalCurrency =
// 										flight.Price?.[0]?.Currency?.[0] ||
// 										'N/A'
// 									let convertedPrice = originalPrice

// 									try {
// 										convertedPrice = parseFloat(
// 											convertToRequestedCurrency(
// 												originalPrice,
// 												originalCurrency,
// 												'CVE',
// 												rates
// 											).toFixed(2)
// 										)
// 									} catch (err) {
// 										console.error(
// 											'Currency conversion failed',
// 											err.message
// 										)
// 										convertedPrice = originalPrice // fallback
// 									}
// 									return {
// 										id: flight.Id?.[0] || 'N/A',
// 										airline:
// 											segment?.Operator?.[0]?.Name?.[0] ||
// 											'Unknown Airline',
// 										logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
// 										flightNumber:
// 											segment?.FlightId?.[0]?.Code?.[0] ||
// 											'N/A',
// 										class:
// 											segment?.TravelClass?.[0]
// 												?.TfClass?.[0] || 'Wrong',
// 										departureTime:
// 											segment?.DepartDate?.[0]?.split(
// 												'-'
// 											)[1] || 'N/A',
// 										departureCity:
// 											origin?.Code?.[0] || 'N/A',
// 										arrivalTime:
// 											segment?.ArriveDate?.[0]?.split(
// 												'-'
// 											)[1] || 'N/A',
// 										arrivalCity:
// 											destination?.Code?.[0] || 'N/A',
// 										duration:
// 											Math.round(
// 												(Number(
// 													segment?.Duration?.[0]
// 												) || 0) / 60
// 											) + 'hr',
// 										originalPrice: convertedPrice,
// 										price: convertedPrice,
// 										convertedcurrencyfrom: originalCurrency,
// 										convertedPricefrom: originalPrice,
// 										currency: 'CVE',
// 									}
// 								})
// 								.filter(Boolean)
// 						})
// 					})
// 				})

// 				console.log('simplifiedFlights', simplifiedFlights)
// 				setFlightsData(simplifiedFlights)
// 				/* const simplifiedFlightsGroup = routerList.flatMap((supplier) => {
//           const groups = supplier.GroupList || [];
//           return groups.flatMap((groupContainer) => {
//             const groupItems = groupContainer.Group || [];
//             return groupItems.map((group) => {
//               const outwardList = group.OutwardList?.[0]?.Outward || [];
//               const returnList = group.ReturnList?.[0]?.Return || [];
//               const groupId = group.Id?.[0] || "N/A";

//               // map outward
//               const outwardDetails = outwardList
//                 .map((flight) => {
//                   const segment = flight.SegmentList?.[0]?.Segment?.[0];
//                   if (!segment) return null;

//                   const origin = segment?.Origin?.[0];
//                   const destination = segment?.Destination?.[0];
//                   const logo = segment?.Operator?.[0]?.Name?.[0].toLowerCase();

//                   return {
//                     id: flight.Id?.[0] || "N/A",
//                     airline:
//                       segment?.Operator?.[0]?.Name?.[0] || "Unknown Airline",
//                     logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
//                     flightNumber: segment?.FlightId?.[0]?.Code?.[0] || "N/A",
//                     class:
//                       segment?.TravelClass?.[0]?.SupplierClass?.[0] ||
//                       "Economy",
//                     departureTime:
//                       segment?.DepartDate?.[0]?.split("-")[1] || "N/A",
//                     departureCity: origin?.Code?.[0] || "N/A",
//                     arrivalTime:
//                       segment?.ArriveDate?.[0]?.split("-")[1] || "N/A",
//                     arrivalCity: destination?.Code?.[0] || "N/A",
//                     duration:
//                       Math.round((Number(segment?.Duration?.[0]) || 0) / 60) +
//                       "hr",
//                     price: parseFloat(flight.Price?.[0]?.Amount?.[0] || "0"),
//                     originalPrice:
//                       parseFloat(flight.Price?.[0]?.Amount?.[0] || "0") + 50,
//                     currency: flight.Price?.[0]?.Currency?.[0] || "GBP",
//                   };
//                 })
//                 .filter(Boolean);

//               // map return
//               const returnDetails = returnList
//                 .map((flight) => {
//                   const segment = flight.SegmentList?.[0]?.Segment?.[0];
//                   if (!segment) return null;

//                   const origin = segment?.Origin?.[0];
//                   const destination = segment?.Destination?.[0];
//                   const logo = segment?.Operator?.[0]?.Name?.[0].toLowerCase();

//                   return {
//                     id: flight.Id?.[0] || "N/A",
//                     airline:
//                       segment?.Operator?.[0]?.Name?.[0] || "Unknown Airline",
//                     logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
//                     flightNumber: segment?.FlightId?.[0]?.Code?.[0] || "N/A",
//                     class:
//                       segment?.TravelClass?.[0]?.SupplierClass?.[0] ||
//                       "Economy",
//                     departureTime:
//                       segment?.DepartDate?.[0]?.split("-")[1] || "N/A",
//                     departureCity: origin?.Code?.[0] || "N/A",
//                     arrivalTime:
//                       segment?.ArriveDate?.[0]?.split("-")[1] || "N/A",
//                     arrivalCity: destination?.Code?.[0] || "N/A",
//                     duration:
//                       Math.round((Number(segment?.Duration?.[0]) || 0) / 60) +
//                       "hr",
//                     price: parseFloat(flight.Price?.[0]?.Amount?.[0] || "0"),
//                     originalPrice:
//                       parseFloat(flight.Price?.[0]?.Amount?.[0] || "0") + 50,
//                     currency: flight.Price?.[0]?.Currency?.[0] || "GBP",
//                   };
//                 })
//                 .filter(Boolean);

//               return {
//                 groupId,
//                 outward: outwardDetails,
//                 return: returnDetails,
//               };
//             });
//           });
//         }); */

// 				const simplifiedFlightsGroup = routerList.flatMap(supplier => {
// 					const groups = supplier.GroupList || []
// 					return groups.flatMap(groupContainer => {
// 						const groupItems = groupContainer.Group || []
// 						return groupItems.flatMap(group => {
// 							const outwardList =
// 								group.OutwardList?.[0]?.Outward || []
// 							const returnList =
// 								group.ReturnList?.[0]?.Return || []
// 							const outwardFlights = outwardList
// 								.map(flight => {
// 									const segment =
// 										flight.SegmentList?.[0]?.Segment?.[0]
// 									if (!segment) return null

// 									const origin = segment?.Origin?.[0]
// 									const destination =
// 										segment?.Destination?.[0]
// 									const logo =
// 										segment?.Operator?.[0]?.Name?.[0].toLowerCase()
// 									const originalPrice = parseFloat(
// 										flight.Price?.[0]?.Amount?.[0] || '0'
// 									)
// 									const originalCurrency =
// 										flight.Price?.[0]?.Currency?.[0] ||
// 										'N/A'
// 									let convertedPrice = originalPrice

// 									try {
// 										convertedPrice = parseFloat(
// 											convertToRequestedCurrency(
// 												originalPrice,
// 												originalCurrency,
// 												'CVE',
// 												rates
// 											).toFixed(2)
// 										)
// 									} catch (err) {
// 										console.error(
// 											'Currency conversion failed',
// 											err.message
// 										)
// 										convertedPrice = originalPrice // fallback
// 									}

// 									return {
// 										id: flight.Id?.[0] || 'N/A',
// 										airline:
// 											segment?.Operator?.[0]?.Name?.[0] ||
// 											'Unknown Airline',
// 										logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
// 										flightNumber:
// 											segment?.FlightId?.[0]?.Code?.[0] ||
// 											'N/A',
// 										class:
// 											segment?.TravelClass?.[0]
// 												?.SupplierClass?.[0] ||
// 											'Economy',
// 										departureTime:
// 											segment?.DepartDate?.[0]?.split(
// 												'-'
// 											)[1] || 'N/A',
// 										departureCity:
// 											origin?.Code?.[0] || 'N/A',
// 										arrivalTime:
// 											segment?.ArriveDate?.[0]?.split(
// 												'-'
// 											)[1] || 'N/A',
// 										arrivalCity:
// 											destination?.Code?.[0] || 'N/A',
// 										duration:
// 											Math.round(
// 												(Number(
// 													segment?.Duration?.[0]
// 												) || 0) / 60
// 											) + 'hr',
// 										originalPrice: convertedPrice,
// 										price: convertedPrice,
// 										convertedcurrencyfrom: originalCurrency,
// 										convertedPricefrom: originalPrice,
// 										currency: 'CVE',
// 										type: 'outward',
// 									}
// 								})
// 								.filter(Boolean)
// 							const returnFlights = returnList
// 								.map(flight => {
// 									const segment =
// 										flight.SegmentList?.[0]?.Segment?.[0]
// 									if (!segment) return null

// 									const origin = segment?.Origin?.[0]
// 									const destination =
// 										segment?.Destination?.[0]
// 									const logo =
// 										segment?.Operator?.[0]?.Name?.[0].toLowerCase()
// 									const originalPrice = parseFloat(
// 										flight.Price?.[0]?.Amount?.[0] || '0'
// 									)
// 									const originalCurrency =
// 										flight.Price?.[0]?.Currency?.[0] ||
// 										'N/A'
// 									let convertedPrice = originalPrice

// 									try {
// 										convertedPrice = parseFloat(
// 											convertToRequestedCurrency(
// 												originalPrice,
// 												originalCurrency,
// 												'CVE',
// 												rates
// 											).toFixed(2)
// 										)
// 									} catch (err) {
// 										console.error(
// 											'Currency conversion failed',
// 											err.message
// 										)
// 										convertedPrice = originalPrice // fallback
// 									}

// 									return {
// 										id: flight.Id?.[0] || 'N/A',
// 										airline:
// 											segment?.Operator?.[0]?.Name?.[0] ||
// 											'Unknown Airline',
// 										logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
// 										flightNumber:
// 											segment?.FlightId?.[0]?.Code?.[0] ||
// 											'N/A',
// 										class:
// 											segment?.TravelClass?.[0]
// 												?.SupplierClass?.[0] ||
// 											'Economy',
// 										departureTime:
// 											segment?.DepartDate?.[0]?.split(
// 												'-'
// 											)[1] || 'N/A',
// 										departureCity:
// 											origin?.Code?.[0] || 'N/A',
// 										arrivalTime:
// 											segment?.ArriveDate?.[0]?.split(
// 												'-'
// 											)[1] || 'N/A',
// 										arrivalCity:
// 											destination?.Code?.[0] || 'N/A',
// 										duration:
// 											Math.round(
// 												(Number(
// 													segment?.Duration?.[0]
// 												) || 0) / 60
// 											) + 'hr',
// 										originalPrice: convertedPrice,
// 										price: convertedPrice,
// 										convertedcurrencyfrom: originalCurrency,
// 										convertedPricefrom: originalPrice,
// 										currency: 'CVE',
// 										type: 'return',
// 									}
// 								})
// 								.filter(Boolean)
// 							return [...outwardFlights, ...returnFlights]
// 						})
// 					})
// 				})
// 				console.log('simplifiedflightgroup', simplifiedFlightsGroup)

// 				navigate('/list', {
// 					state: {
// 						FightSearchData: searchNewData,
// 						oneWay: simplifiedFlights,
// 						roundTrip: simplifiedFlightsGroup,
// 						tripType: tripType,
// 						routingId: routingId,
// 					},
// 				})
// 			} catch (error) {
// 				console.error(error)
// 			}
// 		}

// 		fetchFlights()
// 	}, [routingId])

// 	useEffect(() => {
// 		const handleClickOutside = event => {
// 			if (
// 				dropdownRef.current &&
// 				!dropdownRef.current.contains(event.target)
// 			) {
// 				setShowDropdown(false)
// 			}
// 		}
// 		document.addEventListener('mousedown', handleClickOutside)
// 		return () =>
// 			document.removeEventListener('mousedown', handleClickOutside)
// 	}, [])

// 	useEffect(() => {
// 		const fetchAirport = async () => {
// 			try {
// 				const res = await axios.get(
// 					`${travelFusionBackendUrl}/get-airportlist`
// 				)
// 				setAirposts(res.data.Airportdata)
// 			} catch (error) {
// 				console.error(error)
// 			}
// 		}
// 		fetchAirport()
// 	}, [])

// 	if (loading) return <LoadingScreen />
// 	return (
// 		<>
// 			<div
// 				className={`py-52 relative bg-white/10 bg-[url('/banner-img.png')]
//         bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 lg:px-10 xl:px-40 overflow-hidden`}>
// 				<div className='h-full w-full flex flex-col justify-center items-center'>
// 					<div className='mt-8 h-full w-full flex flex-col justify-center items-center gap-2'>
// 						<h1
// 							data-aos='fade-up'
// 							className='text-4xl xl:text-5xl font-semibold text-center font-jakarta text-white'>
// 							{t('hero.title')}
// 						</h1>
// 						<div
// 							data-aos='fade-up'
// 							className='relative pl-20 hidden lg:block'>
// 							<img
// 								src={PaperDesktop}
// 								alt='banner-2'
// 								height={171}
// 								width={662}
// 								className='relative h-20 mix-blend-screen'
// 							/>
// 							<p className='absolute top-7 left-36 z-[1px] text-black font-semibold text-base font-sans'>
// 								{t('hero.description')}
// 							</p>
// 						</div>
// 						<div
// 							data-aos='fade-up'
// 							className='relative block lg:hidden mt-4 mb-4'>
// 							<img
// 								src={PaperMobile}
// 								alt='banner-2'
// 								height={100}
// 								width={443}
// 								className='relative h-20 -mb-10'
// 							/>
// 							<p className='absolute top-5 left-1/2 -translate-x-1/2 leading-5 z-[1px] text-black font-semibold text-sm sm:text-base font-sans text-center'>
// 								{t('hero.description')}
// 							</p>
// 						</div>
// 						<div className='w-full -mb-30 mt-10 font-sans block z-10'>
// 							<p
// 								data-aos='fade-left'
// 								className='text-[18px] tracking-wider text-white font-bold mb-6 font-sans'>
// 								{t('hero.bookNow')}
// 							</p>
// 							<form
// 								onSubmit={handleTravelfusionSearch}
// 								className='w-full max-w-6xl bg-white rounded-xl shadow-lg px-4 py-1 z-10 min-h-[168px] mt-5'>
// 								{/* Filters Row */}
// 								<div className='flex items-start justify-between flex-wrap gap-4 mb-5'>
// 									<div className='flex flex-col sm:flex-row gap-6'>
// 										{['One Way', 'Round Trip'].map(type => (
// 											<label
// 												key={type}
// 												className='flex items-center gap-2 cursor-pointer'>
// 												<div
// 													className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 translate-x-4 ${
// 														tripType === type
// 															? 'bg-[#EE5128] border-[#EE5128] text-white'
// 															: 'bg-gray-300 border-gray-300'
// 													}`}>
// 													{tripType === type && (
// 														<span className='text-[10px] font-bold'>
// 															✓
// 														</span>
// 													)}
// 												</div>
// 												<span
// 													className={`text-sm translate-y-4 translate-x-4 ${
// 														tripType === type
// 															? 'font-semibold text-black'
// 															: 'text-gray-500'
// 													}`}>
// 													{type}
// 												</span>
// 												<input
// 													type='radio'
// 													name='tripType'
// 													className='hidden'
// 													value={type}
// 													checked={tripType === type}
// 													onChange={() =>
// 														setTripType(type)
// 													}
// 												/>
// 											</label>
// 										))}
// 									</div>

// 									<label className='flex items-center gap-2 ml-auto cursor-pointer'>
// 										<div
// 											className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 -translate-x-18  ${
// 												isDirectFlight
// 													? 'bg-[#EE5128] border-[#EE5128] text-white'
// 													: 'bg-gray-300 border-gray-300'
// 											}`}
// 											onClick={() =>
// 												setIsDirectFlight(
// 													!isDirectFlight
// 												)
// 											}>
// 											{isDirectFlight && (
// 												<span className='text-[10px] font-bold'>
// 													✓
// 												</span>
// 											)}
// 										</div>
// 										<span
// 											className={`text-sm translate-y-4 -translate-x-18   ${
// 												isDirectFlight
// 													? 'font-semibold text-black'
// 													: 'text-gray-500'
// 											}`}
// 											onClick={() =>
// 												setIsDirectFlight(
// 													!isDirectFlight
// 												)
// 											}>
// 											Direct flight only
// 										</span>
// 									</label>
// 								</div>

// 								{/* Main Inputs Row */}
// 								<div className='flex flex-col md:flex-row gap-1'>
// 									{/* From-To Section */}
// 									<div className='flex items-center w-full md:w-[660px] min-h-[90px] rounded-xl border border-gray-200 overflow-hidden relative'>
// 										{/* FROM */}
// 										{/* FROM */}
// 										<div className='flex-1 px-4 py-3'>
// 											<label className='text-xs text-gray-500'>
// 												From
// 											</label>
// 											<input
// 												type='text'
// 												value={from}
// 												onChange={e =>
// 													setFrom(e.target.value)
// 												}
// 												placeholder='[HYD] Rajiv Gandhi International Airport'
// 												className={`text-[18px] font-semibold outline-none w-full bg-transparent ${
// 													from
// 														? 'text-black'
// 														: 'text-[#64748B]'
// 												}`}
// 											/>

// 											{/* <select
// 												value={from}
// 												onChange={e =>
// 													setFrom(e.target.value)
// 												}
// 												className={`text-[18px] font-semibold outline-none w-full bg-transparent ${
// 													from
// 														? 'text-black'
// 														: 'text-[#64748B]'
// 												}`}>
// 												<option value=''>Select</option>
// 												{airposts.map(
// 													(airport, idx) => (
// 														<option
// 															value={airport.Iata}
// 															key={idx}>
// 															{airport.Cityname +
// 																',' +
// 																airport.Countryname}
// 														</option>
// 													)
// 												)}
// 											</select> */}

// 											{/* <div className='relative w-full'>
// 												<span className='w-full'>
// 													[HYD]
// 												</span>
// 												<div className='w-full z-20 bg-white absolute top-4'>
// 													<input
// 														type='text'
// 														placeholder='Search'
// 														className='p-1 border-2 w-full px-4 rounded-lg'
// 													/>
// 													<div className='w-full  left-0 mt-4 h-[150px] overflow-y-scroll'>
// 														{[
// 															1, 2, 3, 4, 5, 6, 7,
// 															8, 9, 0,
// 														].map(l => (
// 															<div className='hover:bg-gray-100 p-1 w-full px-4 rounded-lg'>
// 																{l}
// 															</div>
// 														))}
// 													</div>
// 												</div>
// 											</div> */}
// 										</div>

// 										{/* Center Divider */}
// 										<div className='absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200 -translate-x-1/2' />

// 										{/* SWAP BUTTON */}
// 										<div className='absolute left-1/2 -translate-x-1/2 z-10'>
// 											<button
// 												type='button'
// 												onClick={() => {
// 													const temp = from
// 													setFrom(to)
// 													setTo(temp)
// 												}}
// 												className='w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center'>
// 												<ArrowLeftRightIcon className='h-4 w-4 text-gray-600' />
// 											</button>
// 										</div>

// 										{/* TO */}
// 										<div className='flex-1 pl-40 pr-4 py-3 ml-[1px]'>
// 											<label className='text-xs text-gray-500'>
// 												To
// 											</label>
// 											<input
// 												type='text'
// 												value={to}
// 												onChange={e =>
// 													setTo(e.target.value)
// 												}
// 												placeholder='[BOM] Chhatrapati Shivaji International Airport'
// 												className={`text-[18px] font-semibold outline-none w-full bg-transparent ${
// 													to
// 														? 'text-black'
// 														: 'text-[#64748B]'
// 												}`}
// 											/>
// 										</div>
// 									</div>
// 									{/* Departure Date */}
// 									<div className='w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200'>
// 										<p className='text-xs text-gray-500 mb-1 flex items-center justify-between'>
// 											Departure Date
// 											<svg
// 												xmlns='http://www.w3.org/2000/svg'
// 												className='w-4 h-4 text-[#0F172A]'
// 												fill='none'
// 												viewBox='0 0 24 24'
// 												stroke='currentColor'>
// 												<path
// 													strokeLinecap='round'
// 													strokeLinejoin='round'
// 													strokeWidth='2'
// 													d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
// 												/>
// 											</svg>
// 										</p>
// 										<DatePicker
// 											selected={flightDepatureDate}
// 											onChange={setflightDepatureDate}
// 											dateFormat='dd MMM yyyy'
// 											placeholderText='Select Date'
// 											className='text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent '
// 										/>
// 										<p className='text-xs text-gray-500 mt-1'>
// 											{flightDepatureDate &&
// 												flightDepatureDate.toLocaleDateString(
// 													'en-US',
// 													{
// 														weekday: 'long',
// 													}
// 												)}
// 										</p>
// 									</div>

// 									{/* Return Date (Round Trip only) */}
// 									{tripType === 'Round Trip' && (
// 										<div className='w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200'>
// 											<p className='text-xs text-gray-500 mb-1 flex items-center justify-between'>
// 												Return Date
// 												<svg
// 													xmlns='http://www.w3.org/2000/svg'
// 													className='w-4 h-4 text-[#0F172A]'
// 													fill='none'
// 													viewBox='0 0 24 24'
// 													stroke='currentColor'>
// 													<path
// 														strokeLinecap='round'
// 														strokeLinejoin='round'
// 														strokeWidth='2'
// 														d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
// 													/>
// 												</svg>
// 											</p>
// 											<DatePicker
// 												selected={flightReturnDate}
// 												onChange={setflightReturnDate}
// 												dateFormat='dd MMM yyyy'
// 												placeholderText='Select Date'
// 												minDate={flightDepatureDate}
// 												className='text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent'
// 											/>
// 											<p className='text-xs text-gray-500 mt-1'>
// 												Book a round trip
// 											</p>
// 										</div>
// 									)}

// 									{/* Traveller & Class */}
// 									<div
// 										className='w-full md:w-[220px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 relative cursor-pointer'
// 										ref={dropdownRef}
// 										onClick={() =>
// 											setShowDropdown(!showDropdown)
// 										}>
// 										{/* Dropdown content */}
// 										{showDropdown && (
// 											<div className='absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl z-50 shadow-md p-3'>
// 												{/* Adult */}
// 												<div className='flex justify-between items-center mb-2'>
// 													<span className='text-sm text-gray-600'>
// 														Adults
// 													</span>
// 													<div className='flex items-center gap-3'>
// 														<Minus
// 															className={`w-4 h-4 cursor-pointer ${
// 																adults > 1
// 																	? 'text-black'
// 																	: 'text-gray-300'
// 															}`}
// 															onClick={e => {
// 																e.stopPropagation()
// 																if (adults > 1)
// 																	setAdults(
// 																		adults -
// 																			1
// 																	)
// 															}}
// 														/>
// 														<span className='text-sm font-semibold'>
// 															{adults}
// 														</span>
// 														<Plus
// 															className='w-4 h-4 cursor-pointer text-black'
// 															onClick={e => {
// 																e.stopPropagation()
// 																setAdults(
// 																	adults + 1
// 																)
// 															}}
// 														/>
// 													</div>
// 												</div>

// 												{/* Children */}
// 												<div className='flex justify-between items-center mb-4'>
// 													<span className='text-sm text-gray-600'>
// 														Children
// 													</span>
// 													<div className='flex items-center gap-3'>
// 														<Minus
// 															className={`w-4 h-4 cursor-pointer ${
// 																children > 0
// 																	? 'text-black'
// 																	: 'text-gray-300'
// 															}`}
// 															onClick={e => {
// 																e.stopPropagation()
// 																if (
// 																	children > 0
// 																)
// 																	setChildren(
// 																		children -
// 																			1
// 																	)
// 															}}
// 														/>
// 														<span className='text-sm font-semibold'>
// 															{children}
// 														</span>
// 														<Plus
// 															className='w-4 h-4 cursor-pointer text-black'
// 															onClick={e => {
// 																e.stopPropagation()
// 																setChildren(
// 																	children + 1
// 																)
// 															}}
// 														/>
// 													</div>
// 												</div>

// 												{/* Class list */}
// 												{[
// 													'Economy',
// 													'Premium Economy',
// 													'Business',
// 													'First Class',
// 												].map(cls => (
// 													<div
// 														key={cls}
// 														className={`py-1 px-2 rounded text-sm cursor-pointer hover:bg-gray-100 ${
// 															travelClass === cls
// 																? 'bg-gray-100 font-semibold'
// 																: ''
// 														}`}
// 														onClick={e => {
// 															e.stopPropagation()
// 															setTravelClass(cls)
// 															setShowDropdown(
// 																false
// 															)
// 														}}>
// 														{cls}
// 													</div>
// 												))}
// 											</div>
// 										)}

// 										{/* Static label + selected value */}
// 										<p className='text-xs text-gray-500 mb-1'>
// 											Travellers & Class
// 										</p>
// 										<div className='flex justify-between items-center font-semibold text-[16px] text-[#0F172A]'>
// 											<span>
// 												{adults + children}{' '}
// 												<span className='font-normal text-sm'>
// 													Travellers
// 												</span>
// 											</span>
// 										</div>
// 										<p className='text-xs text-gray-500 mt-1'>
// 											{travelClass}
// 										</p>
// 									</div>
// 								</div>

// 								{/* Search Button */}
// 								<div className='w-full flex justify-center translate-y-2.5 '>
// 									<button
// 										type='submit'
// 										className='bg-[#EE5128] hover:bg-[#d64520] text-white text-[18px] font-semibold px-18 py-2 rounded-full transition '>
// 										{t('hero.search')}
// 									</button>
// 								</div>
// 							</form>
// 						</div>{' '}
// 						{/* .w-full -mb-30 mt-10 */}
// 					</div>{' '}
// 					{/* .mt-10 h-full */}
// 				</div>{' '}
// 				{/* .h-full w-full */}
// 				<img
// 					src={BannerBottom}
// 					alt='banner-bottom'
// 					height={40}
// 					width={662}
// 					className='w-full absolute -bottom-[26px] md:-bottom-[40px] object-cover h-20'
// 				/>
// 			</div>{' '}
// 			{/* .min-h-screen */}
// 		</>
// 	)
// }

// export default HeroSection

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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [travelType, setTravelType] = useState("Adult");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [flightReturnDate, setflightReturnDate] = useState(null);
  const [searchCount, setSearchCount] = useState(0);
  const [flightsData, setFlightsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("Round Trip");
  const [flightTypeFilter, setFlightTypeFilter] = useState("Domestic");
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
    // getcommission();
  }, [fromDropdownSearchTerm, airposts, fromDropdownOpen]);

  // Add this useEffect right after the existing FROM dropdown useEffect

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

  /* const handleDate = (newDate) => {
    if (!newDate) return null;
    const selectedDate = new Date(newDate);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL ;

  useEffect(() => {
    const fetchFlights = async () => {
      const formattedDepartureDate = handleDate(flightDepatureDate);
      const formattedReturnDate = handleDate(flightReturnDate);
      console.log("Search API Call");
      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
            flightDepatureDate: formattedDepartureDate,
            flightReturnDate: formattedReturnDate,
            travelClass,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }

        const data = await response.json();
        console.log(data);
        setFlightsData(data);
        navigate("/list", {
          state: {
            flightsData: data,
            searchData: {
              from,
              to,
              flightDepatureDate: formattedDepartureDate,
              flightReturnDate: formattedReturnDate,
              travelClass,
              travelers,
              travelType,
            },
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchCount > 0) {
      fetchFlights();
    }
  }, [searchCount]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formattedDepartureDate = handleDate(flightDepatureDate);
    const formattedReturnDate = handleDate(flightReturnDate);

    console.log({
      from,
      to,
      flightDepatureDate: formattedDepartureDate,
      flightReturnDate: formattedReturnDate,
      travelClass,
      travelers,
      travelType,
    });

    setSearchCount((prev) => prev + 1);
  }; */
  // const listSupplierRoute = async () => {
  //   try {
  //     const response = await fetch(
  //       `${travelFusionBackendUrl}/get-supplierroute`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json(); // Convert the response body to JSON
  //     const iata = data.suppliers[0].airportRoutes;
  //     console.log("Supplier route data:", iata); // Log the parsed data
  //   } catch (error) {
  //     console.error("Failed to fetch supplier route:", error);
  //   }
  // };

  // useEffect(() => {
  //   listSupplierRoute();
  // }, []);
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

  const travelFusionBackendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL ;
  useEffect(() => {
    // make an array of N adults
    const adult = Array(adults).fill(30);
    // make an array of N children
    const child = Array(children).fill(7);
    // combine them
    setTravellers([...adult, ...child]);
  }, [adults, children]);

  // fix the travel fusion search

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
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch flights based on the search parameters
  // useEffect(
  //   () => {
  //     const fetchFlights = async () => {
  //       console.log("Travelfusion routing API Call");
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
  //         };
  //         setSearchNewData(requestBody);
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
  //         setRoutingId(data.routingId);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchFlights();
  //   },
  //   [
  //     // searchCount
  //   ]
  // );

  // const getCommissionDetail = async (tfPrice) => {
  //   try {
  //     if (!commissionDetails) {
  //       return console.log("Error");
  //     } else {
  //       const Commission = commissionDetails.Commission;
  //       if (Commission) {
  //         console.log(Commission);
  //         if (commissionDetails.CommissionType.toLowerCase() === "percentage") {
  //           const commissionAmount = (tfPrice * Commission) / 100;
  //           const totalAmount = tfPrice + commissionAmount;
  //           return totalAmount.toFixed(2);
  //         } else if (
  //           commissionDetails.CommissionType.toLowerCase() === "amount"
  //         ) {
  //           const totalAmount = tfPrice + Commission;
  //           return totalAmount.toFixed(2);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     console.log("Travelfusion Search API Call");
  //     try {
  //       const response = await fetch(
  //         `${travelFusionBackendUrl}/check-routing`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             routingId: routingId,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch flight data");
  //       }

  //       const data = await response.json();

  //       const routerList = data.flightList[0].Router;
  //       const rates = await fetchExchangeRates("CVE");

  //       // Step 1: Collect all raw flight data
  //       const allFlightPromises = [];

  //       for (const supplier of routerList) {
  //         if (!supplier?.GroupList || !Array.isArray(supplier.GroupList))
  //           continue;

  //         for (const groupContainer of supplier.GroupList) {
  //           if (!groupContainer?.Group || !Array.isArray(groupContainer.Group))
  //             continue;

  //           for (const group of groupContainer.Group) {
  //             if (
  //               !group?.OutwardList ||
  //               !Array.isArray(group.OutwardList) ||
  //               group.OutwardList.length === 0
  //             )
  //               continue;

  //             const outwardList = group.OutwardList[0]?.Outward || [];

  //             for (const flight of outwardList) {
  //               allFlightPromises.push(
  //                 (async () => {
  //                   try {
  //                     if (!flight?.SegmentList?.[0]?.Segment?.[0]) return null;

  //                     const segment = flight.SegmentList[0].Segment[0];
  //                     const origin = Array.isArray(segment.Origin)
  //                       ? segment.Origin[0]
  //                       : null;
  //                     const destination = Array.isArray(segment.Destination)
  //                       ? segment.Destination[0]
  //                       : null;

  //                     const operatorName =
  //                       segment.Operator?.[0]?.Name?.[0] || "Unknown Airline";

  //                     const logo = operatorName.toLowerCase();
  //                     const flightId =
  //                       segment.FlightId?.[0]?.Code?.[0] || "N/A";
  //                     const travelClass =
  //                       segment.TravelClass?.[0]?.TfClass?.[0] || "Economy";
  //                     const departureTime =
  //                       segment.DepartDate?.[0]?.split("-")[1] || "N/A";
  //                     const arrivalTime =
  //                       segment.ArriveDate?.[0]?.split("-")[1] || "N/A";
  //                     const duration = segment.Duration?.[0]
  //                       ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
  //                       : "N/A";

  //                     const originalPrice = parseFloat(
  //                       flight.Price?.[0]?.Amount?.[0] || "0"
  //                     );
  //                     const originalCurrency =
  //                       flight.Price?.[0]?.Currency?.[0] || "N/A";

  //                     return {
  //                       id: flight.Id?.[0] || "N/A",
  //                       airline: operatorName,
  //                       logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
  //                       flightNumber: flightId,
  //                       class: travelClass,
  //                       departureTime,
  //                       departureCity: origin?.Code?.[0] || "N/A",
  //                       arrivalTime,
  //                       arrivalCity: destination?.Code?.[0] || "N/A",
  //                       duration,
  //                       originalPrice,
  //                       originalCurrency,
  //                     };
  //                   } catch (e) {
  //                     console.error("Flight parse error:", e);
  //                     return null;
  //                   }
  //                 })()
  //               );
  //             }
  //           }
  //         }
  //       }

  //       const rawFlights = (await Promise.all(allFlightPromises)).filter(
  //         Boolean
  //       );

  //       // Step 2: Convert and cache unique prices
  //       const currencyMap = {}; // key = currency, value = rate to CVE
  //       const priceCommissionMap = {}; // key = original converted price, value = with commission

  //       for (const flight of rawFlights) {
  //         const key = `${flight.originalPrice}_${flight.originalCurrency}`;

  //         if (!(key in priceCommissionMap)) {
  //           try {
  //             if (!(flight.originalCurrency in currencyMap)) {
  //               currencyMap[flight.originalCurrency] =
  //                 convertToRequestedCurrency(
  //                   1,
  //                   flight.originalCurrency,
  //                   "CVE",
  //                   rates
  //                 );
  //             }

  //             const rate = currencyMap[flight.originalCurrency];
  //             const convertedPrice = parseFloat(
  //               (flight.originalPrice * rate).toFixed(2)
  //             );
  //             const finalPrice = await getCommissionDetail(convertedPrice);
  //             priceCommissionMap[key] = {
  //               convertedPrice: finalPrice,
  //               convertedFrom: flight.originalPrice,
  //               fromCurrency: flight.originalCurrency,
  //             };
  //           } catch (e) {
  //             console.error("Conversion/commission error:", e);
  //           }
  //         }
  //       }

  //       // Step 3: Build final simplified flights
  //       const simplifiedFlights = rawFlights.map((flight) => {
  //         const key = `${flight.originalPrice}_${flight.originalCurrency}`;
  //         const priceInfo = priceCommissionMap[key];

  //         return {
  //           ...flight,
  //           price: priceInfo?.convertedPrice || 0,
  //           originalPrice: priceInfo?.convertedPrice || 0,
  //           convertedcurrencyfrom: priceInfo?.fromCurrency || "N/A",
  //           convertedPricefrom: priceInfo?.convertedFrom || 0,
  //           currency: "CVE",
  //         };
  //       });

  //       // Step 1: Collect all flight details (without conversion)
  //       const rawFlightDataPromises = [];

  //       for (const supplier of routerList) {
  //         if (!Array.isArray(supplier?.GroupList)) continue;

  //         for (const groupContainer of supplier.GroupList) {
  //           if (!Array.isArray(groupContainer?.Group)) continue;

  //           for (const group of groupContainer.Group) {
  //             const outwardList = group?.OutwardList?.[0]?.Outward ?? [];
  //             const returnList = group?.ReturnList?.[0]?.Return ?? [];

  //             const extractFlightInfo = async (flight, type) => {
  //               try {
  //                 const segment = flight?.SegmentList?.[0]?.Segment?.[0];
  //                 if (!segment) return null;

  //                 const origin = segment.Origin?.[0] ?? {};
  //                 const destination = segment.Destination?.[0] ?? {};
  //                 const operatorName =
  //                   segment.Operator?.[0]?.Name?.[0] ?? "Unknown Airline";
  //                 const logo = operatorName.toLowerCase();
  //                 const flightId = segment.FlightId?.[0]?.Code?.[0] ?? "N/A";
  //                 const travelClass =
  //                   segment.TravelClass?.[0]?.SupplierClass?.[0] ?? "Economy";

  //                 const departureTime =
  //                   segment.DepartDate?.[0]?.split("-")[1] ?? "N/A";
  //                 const arrivalTime =
  //                   segment.ArriveDate?.[0]?.split("-")[1] ?? "N/A";
  //                 const duration = segment.Duration?.[0]
  //                   ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
  //                   : "N/A";

  //                 const originalPrice = parseFloat(
  //                   flight?.Price?.[0]?.Amount?.[0] ?? "0"
  //                 );
  //                 const originalCurrency =
  //                   flight?.Price?.[0]?.Currency?.[0] ?? "N/A";

  //                 return {
  //                   id: flight.Id?.[0] ?? "N/A",
  //                   airline: operatorName,
  //                   logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
  //                   flightNumber: flightId,
  //                   class: travelClass,
  //                   departureTime,
  //                   departureCity: origin.Code?.[0] ?? "N/A",
  //                   arrivalTime,
  //                   arrivalCity: destination.Code?.[0] ?? "N/A",
  //                   duration,
  //                   originalPrice,
  //                   originalCurrency,
  //                   type,
  //                 };
  //               } catch (err) {
  //                 console.error(`Error parsing ${type} flight:`, err);
  //                 return null;
  //               }
  //             };

  //             for (const flight of outwardList) {
  //               rawFlightDataPromises.push(
  //                 extractFlightInfo(flight, "outward")
  //               );
  //             }

  //             for (const flight of returnList) {
  //               rawFlightDataPromises.push(extractFlightInfo(flight, "return"));
  //             }
  //           }
  //         }
  //       }

  //       const rawFlightData = (await Promise.all(rawFlightDataPromises)).filter(
  //         Boolean
  //       );

  //       // Step 2: Convert/calculate commission only once per unique price+currency
  //       const currencyRateCache = {};
  //       const commissionCache = {};

  //       for (const flight of rawFlightData) {
  //         const key = `${flight.originalPrice}_${flight.originalCurrency}`;
  //         if (!commissionCache[key]) {
  //           try {
  //             if (!currencyRateCache[flight.originalCurrency]) {
  //               currencyRateCache[flight.originalCurrency] =
  //                 convertToRequestedCurrency(
  //                   1,
  //                   flight.originalCurrency,
  //                   "CVE",
  //                   rates
  //                 );
  //             }

  //             const rate = currencyRateCache[flight.originalCurrency];
  //             const converted = parseFloat(
  //               (flight.originalPrice * rate).toFixed(2)
  //             );
  //             const finalPrice = await getCommissionDetail(converted);

  //             commissionCache[key] = {
  //               convertedPrice: finalPrice,
  //               convertedFrom: flight.originalPrice,
  //               fromCurrency: flight.originalCurrency,
  //             };
  //           } catch (e) {
  //             console.error("Conversion or commission failed:", e);
  //             commissionCache[key] = null;
  //           }
  //         }
  //       }

  //       // Step 3: Final flight object with price info attached
  //       const simplifiedFlightsGroup = rawFlightData
  //         .map((flight) => {
  //           const key = `${flight.originalPrice}_${flight.originalCurrency}`;
  //           const priceInfo = commissionCache[key];

  //           if (!priceInfo) return null;

  //           return {
  //             ...flight,
  //             price: priceInfo.convertedPrice,
  //             originalPrice: priceInfo.convertedPrice,
  //             convertedcurrencyfrom: priceInfo.fromCurrency,
  //             convertedPricefrom: priceInfo.convertedFrom,
  //             currency: "CVE",
  //           };
  //         })
  //         .filter(Boolean);

  //       console.log("simplifiedflightgroup", simplifiedFlightsGroup);
  //       navigate("/list", {
  //         state: {
  //           FightSearchData: searchNewData,
  //           oneWay: simplifiedFlights,
  //           roundTrip: simplifiedFlightsGroup,
  //           tripType: tripType,
  //           routingId: routingId,
  //         },
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchFlights();
  // }, [routingId]);

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
                className="w-full max-w-6xl overflow-visible bg-white rounded-xl shadow-lg px-4 py-1 z-50 min-h-[168px] mt-5 relative" // Added z-50 and relative
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
                      onClick={() => setIsDirectFlight(!isDirectFlight)}
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
                      onClick={() => setIsDirectFlight(!isDirectFlight)}
                    >
                      Direct flight only
                    </span>
                  </label>
                </div>
                {/* Main Inputs Row */}
                <div className="flex flex-col md:flex-row gap-1">
                  {/* From-To Section */}
                  <div className="flex items-center w-full md:w-[660px] min-h-[90px] rounded-xl border border-gray-200 relative overflow-visible z-50">
                    {/* FROM */}
                    <div
                      className="flex-1 px-4 py-3 relative"
                      ref={fromDropdownRef}
                    >
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
                      <div
                        className="absolute top-10 left-1/2 -translate-x-1/2 lg:left-2 lg:translate-x-0 w-80
 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-hidden mt-1"
                      >
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
                                console.log(
                                  "FROM dropdown search:",
                                  e.target.value
                                );
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
                                    console.error(
                                      "Invalid airport object:",
                                      airport
                                    );
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
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:-right-12 lg:left-auto lg:translate-x-0 w-80  bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-hidden mt-1">
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
                                console.log(
                                  "TO dropdown search:",
                                  e.target.value
                                );
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
                                    console.error(
                                      "Invalid airport object:",
                                      airport
                                    );
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
                      <p className="text-xs text-gray-500 mt-1">
                        Book a round trip
                      </p>
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
                      <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl z-[9999] shadow-lg p-3">
                        {" "}
                        {/* Changed to z-[9999] */}
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
                            <span className="text-sm font-semibold">
                              {adults}
                            </span>
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
                          <span className="text-sm text-gray-600">
                            Children
                          </span>
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
                            <span className="text-sm font-semibold">
                              {children}
                            </span>
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
                        {[
                          "Economy",
                          "Premium Economy",
                          "Business",
                          "First Class",
                        ].map((cls) => (
                          <div
                            key={cls}
                            className={`py-1 px-2 rounded text-sm cursor-pointer hover:bg-gray-100 ${
                              travelClass === cls
                                ? "bg-gray-100 font-semibold"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setTravelClass(cls);
                              setShowDropdown(false);
                            }}
                          >
                            {cls}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Static label + selected value */}
                    <p className="text-xs text-gray-500 mb-1">
                      Travellers & Class
                    </p>
                    <div className="flex justify-between items-center font-semibold text-[16px] text-[#0F172A]">
                      <span>
                        {adults + children}{" "}
                        <span className="font-normal text-sm">Travellers</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{travelClass}</p>
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full flex justify-center translate-y-2.5 ">
                  <button
                    type="submit"
                    className="bg-[#EE5128] hover:bg-[#d64520] text-white text-[18px] font-semibold px-18 py-2 rounded-full transition "
                  >
                    {t("hero.search")}
                  </button>
                </div>
              </form>
            </div>{" "}
            {/* .w-full -mb-30 mt-10 */}
          </div>{" "}
          {/* .mt-10 h-full */}
        </div>{" "}
        {/* .h-full w-full */}
        <img
          src={BannerBottom}
          alt="banner-bottom"
          height={40}
          width={662}
          className="w-full absolute -bottom-[26px] md:-bottom-[40px] object-cover h-20"
        />
      </div>{" "}
      {/* .min-h-screen */}
    </>
  );
};

export default HeroSection;
