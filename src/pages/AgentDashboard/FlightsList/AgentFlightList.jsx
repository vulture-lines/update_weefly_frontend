import { useEffect, useMemo, useRef, useState } from 'react'

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
} from 'lucide-react'

import TakeOffPlane from '../../../assets/images/TakeOffPlane.svg'
import LandingPlane from '../../../assets/images/LandingPlane.svg'
import DateFrom from '../../../assets/images/DateFrom.svg'
import DateTo from '../../../assets/images/DateTo.svg'
import TravelerIcon from '../../../assets/images/TravelerIcon.svg'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// import flightsData from "../../assets/data/flights.json";

import TicketIcon from '../../../assets/images/TicketIcon.svg'
import DepartureFlightIcon from '../../../assets/images/WhiteFlightTakeoff.svg'
import NavFlightIcon from '../../../assets/images/FlightIcon.svg'

import SunRiseIcon from '../../../assets/images/SunRiseIcon.svg'
import SunSetIcon from '../../../assets/images/SunSetIcon.svg'
import MoonRiseIcon from '../../../assets/images/MoonRiseIcon.svg'
import MoonSetIcon from '../../../assets/images/MoonSetIcon.svg'
import { useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

function AgentFlightList() {
	const { t } = useTranslation()

	const location = useLocation()
	const [flightsData, setFlightsData] = useState([])
	const [origin, setOrigin] = useState('')
	const [destination, setDestination] = useState('')

	const [searchData, setSearchdata] = useState({
		from: '',
		to: '',
		flightDepatureDate: null,
		flightReturnDate: null,
		travelClass: '',
	})
	const [SearchProps, setSearchProps] = useState({})
	useEffect(() => {
		if (location.state) {
			const { flightsData: flights, searchData: search } = location.state
			if (flights) setFlightsData(flights)
			if (search) {
				console.log(search)

				setSearchProps(search)
				setOrigin(search.from)
				setDestination(search.to)
			}
		}
	}, [location, SearchProps])

	return (
		<div className='relative '>
			<SearchBox
				setFlightsData={setFlightsData}
				setOrigin={setOrigin}
				setDestination={setDestination}
				setSearchdata={setSearchdata}
				SearchProps={SearchProps}
			/>
			<div
				className={`min-h-screen px-4 ${
					location.pathname === '/list' ? 'lg:px-20 xl:px-40' : ''
				}  bg-neutral-100 flex relative py-[66px] gap-[43px] flex-col xl:flex-row`}>
				<div className='sticky top-0 flex-col gap-[29px] hidden xl:flex '>
					<RecentlyBookedTickets t={t} />
					<FilterFlight
						searchData={searchData}
						setFlightsData={setFlightsData}
						flights={flightsData}
						t={t}
					/>
				</div>
				<div className='flex-1 flex flex-col gap-[50px]'>
					<div className='hidden xl:block'>
						<FlightDatePicker flights={flightsData} t={t} />
					</div>
					<FlightResults
						t={t}
						flights={flightsData}
						origin={origin}
						destination={destination}
					/>
				</div>
			</div>
		</div>
	)
}

export default AgentFlightList

// /////////////////////////////////////////////////
//
//  Flight Search Box
//
// ////////////////////////////////////////////////

// const SearchBox = ({
//   setFlightsData,
//   setOrigin,
//   setDestination,
//   setSearchdata,
//   SearchProps,
// }) => {
//   const { t } = useTranslation();
//   // const [flightDepatureDate, setflightDepatureDate] = useState(null);
//   const [flightDepatureDate, setflightDepatureDate] = useState(null);
//   // const [flightReturnDate, setflightReturnDate] = useState(null);
//   const [flightReturnDate, setflightReturnDate] = useState(null);
//   // const [from, setFrom] = useState("");
//   const [from, setFrom] = useState("");
//   // const [to, setTo] = useState("");
//   const [to, setTo] = useState("");
//   // const [travelers, setTravelers] = useState(1);
//   const [travelClass, setTravelClass] = useState("Economy");
//   const [travelType, setTravelType] = useState("Adult");
//   const [travelers, setTravelers] = useState(1);

//   const [searchCount, setSearchCount] = useState(0);

//   useEffect(() => {
//     if (SearchProps) {
//       setFrom(SearchProps.from || "");
//       setTo(SearchProps.to || "");
//       setflightDepatureDate(SearchProps.flightDepatureDate || null);
//       setflightReturnDate(SearchProps.flightReturnDate || null);
//       setTravelers(SearchProps.travelers || 1);
//       setTravelType(SearchProps.travelType || "");
//     }
//   }, [SearchProps]);

//   const handleDate = (newDate) => {
//     if (!newDate) {
//       return;
//     } // Handle null or invalid date
//     else {
//       // Ensure newDate is a Date object
//       const selectedDate = new Date(newDate);

//       const year = selectedDate.getFullYear();
//       const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//       const day = String(selectedDate.getDate()).padStart(2, "0");

//       const formattedDate = `${year}-${month}-${day}`;
//       return formattedDate;
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const formattedFlightDepatureDate = handleDate(flightDepatureDate);
//     const formattedFlightReturnDate = handleDate(flightReturnDate);

//     console.log({
//       from,
//       to,
//       flightDepatureDate,
//       flightReturnDate,
//       travelClass,
//     });
//     setSearchdata({
//       from: from,
//       to: to,
//       flightDepatureDate: formattedFlightDepatureDate,
//       flightReturnDate: formattedFlightReturnDate,
//       travelClass: travelClass,
//     });

//     setOrigin(from);
//     setDestination(to);
//     setSearchCount((prev) => prev + 1);
//   };
//   const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL ;
//   // Fetch flights based on the search parameters
//   useEffect(() => {
//     const fetchFlights = async () => {
//       console.log("Search API Call");
//       try {
//         const response = await fetch(`${backendUrl}/search`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             from,
//             to,
//             flightDepatureDate: handleDate(flightDepatureDate),
//             flightReturnDate: handleDate(flightReturnDate),
//             travelClass,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch flight data");
//         }

//         const data = await response.json();
//         console.log(data);
//         setFlightsData(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchFlights();
//   }, [searchCount]);
//   return (
//     <div
//       className={`   px-4 ${
//         location.pathname === "/list" ? "lg:px-20 xl:px-40" : ""
//       } border-gray-200 `}
//     >
//       <form onSubmit={handleSearch} className="bg-white rounded-lg">
//         <div className="flex flex-col md:flex-row items-center">
//           <div className="flex flex-row flex-1 border-b border-gray-100">
//             {/* From Location */}
//             <div className="flex items-center p-4 border-b md:border-b-0  border-gray-200 flex-1">
//               <div className="mr-3"></div>
//               <div>
//                 <label className="block text-xs text-gray-500">
//                   <img
//                     src={TakeOffPlane}
//                     alt="TakeOffPlane"
//                     height={32}
//                     width={32}
//                   />
//                 </label>
//                 <div className="flex items-center gap-2 mt-3.5">
//                   <MapPin className="h-4 w-4 text-gray-500" />
//                   <input
//                     type="text"
//                     name="leavingFrom"
//                     id="leavingFrom"
//                     placeholder={`${t("From")}`}
//                     className="block w-full placeholder:text-gray-400 text-nowrap text-black focus:outline-none appearance-none"
//                     value={from}
//                     onChange={(e) => setFrom(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Swap Icon */}
//             <div className="md:flex items-center justify-center p-2 my-auto ">
//               <button
//                 type="button"
//                 onClick={() => {
//                   const temp = from;
//                   setFrom(to);
//                   setTo(temp);
//                 }}
//                 className="bg-[#EE5128] rounded-full p-2"
//               >
//                 <ArrowLeftRightIcon className="h-5 w-5 text-white" />
//               </button>
//             </div>

//             {/* To Location */}
//             <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
//               <div className="mr-3"></div>
//               <div>
//                 <label className="block text-xs text-black">
//                   <img
//                     src={LandingPlane}
//                     alt="LandingPlane"
//                     height={32}
//                     width={32}
//                   />
//                 </label>
//                 <div className="flex gap-2 items-center mt-3.5">
//                   <MapPin className="h-4 w-4 text-gray-500" />
//                   <input
//                     type="text"
//                     name="to"
//                     id="to"
//                     className="block w-full placeholder:text-gray-400 text-black focus:outline-none appearance-none"
//                     value={to}
//                     onChange={(e) => setTo(e.target.value)}
//                     placeholder={`${t("To")}`}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-1">
//             {/* Departure Date */}
//             <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
//               <div className="mr-3"></div>
//               <div className="relative">
//                 <label className="block text-xs text-gray-500">
//                   <img src={DateFrom} alt="DateFrom" height={32} width={32} />
//                 </label>
//                 <div className="flex items-center mt-3.5">
//                   <DatePicker
//                     selected={flightDepatureDate}
//                     onChange={(date) => setflightDepatureDate(date)}
//                     placeholderText={`${t("search.dateForm")}`}
//                     className="block w-full placeholder:text-gray-400 text-black z-20 focus:outline-none"
//                     dateFormat="MMM d, yyyy"
//                     popperClassName="z-[50px]"
//                     popperProps={{
//                       positionFixed: true,
//                     }}
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 text-gray-400 absolute left-[65%] sm:left-[53%]  pointer-events-none ml-10"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Return Date */}
//             <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
//               {/* <div className="mr-3"></div> */}
//               <div className="relative w-full">
//                 <label className="block text-xs text-gray-500">
//                   <img src={DateTo} alt="DateTo" height={32} width={32} />
//                 </label>
//                 <div className="flex items-center mt-3.5">
//                   <DatePicker
//                     selected={flightReturnDate}
//                     onChange={(date) => setflightReturnDate(date)}
//                     placeholderText={`${t("search.dateReturn")}`}
//                     className="block w-full placeholder:text-gray-400 text-black focus:outline-none"
//                     dateFormat="MMM d, yyyy"
//                     minDate={flightDepatureDate}
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 text-gray-400 absolute left-[65%] sm:left-[55%] pointer-events-none ml-8"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Travelers and Class section - Modified for better mobile alignment */}
//           <div className="flex flex-col sm:flex-1 w-full">
//             <div className="flex flex-row w-full">
//               {/* Travel Class */}
//               <div className="flex items-center relative p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 ">
//                 <div className="flex  relative w-full flex-col ml-4 ">
//                   <label className="block text-xs text-gray-500">
//                     <img
//                       src={TravelerIcon}
//                       alt="TravelerIcon"
//                       height={32}
//                       width={32}
//                     />
//                   </label>
//                   <div className="flex items-center mt-3.5 relative">
//                     <select
//                       className="placeholder:text-gray-400 text-black focus:outline-none appearance-none bg-transparent"
//                       value={travelClass}
//                       onChange={(e) => setTravelClass(e.target.value)}
//                     >
//                       <option value="" className="text-gray-400">
//                         Select
//                       </option>
//                       <option value="Economy">
//                         {t("search.class.class1")}
//                       </option>
//                       <option value="Premium Economy">
//                         {t("search.class.class2")}
//                       </option>
//                       <option value="Business">
//                         {t("search.class.class3")}
//                       </option>
//                       <option value="First">{t("search.class.class4")}</option>
//                     </select>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-gray-400 absolute right-0 pointer-events-none"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Travelers count */}
//               <div className="flex items-center relative p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
//                 <div className="flex  relative w-full flex-col ">
//                   <label className="block  text-gray-500">
//                     <div className="flex items-center justify-between gap-8">
//                       <img
//                         src={TravelerIcon}
//                         alt="TravelerIcon"
//                         height={32}
//                         width={32}
//                       />
//                       <div className="flex items-center relative">
//                         <select
//                           className="placeholder:text-grey-100 appearance-none w-[100px] text-gray-500 focus:outline-none bg-transparent"
//                           value={travelType}
//                           onChange={(e) => setTravelType(e.target.value)}
//                         >
//                           <option value="" className="text-gray-400">
//                             Select
//                           </option>
//                           <option value="Adult" className="text-black">
//                             {t("search.travaler-type.type1")}
//                           </option>
//                           <option value="Child" className="text-black">
//                             {t("search.travaler-type.type2")}
//                           </option>
//                         </select>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 text-gray-400 absolute left-1/2 pointer-events-none"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M19 9l-7 7-7-7"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </label>
//                   <div className="flex items-center mt-3.5 gap-2 relative font-jakarta">
//                     <div
//                       className="p-2 flex justify-center items-center rounded-md  transition-colors duration-200 cursor-pointer"
//                       onClick={() =>
//                         setTravelers((prev) => Math.max(1, prev - 1))
//                       }
//                     >
//                       <Minus className="h-[16px]" />
//                     </div>
//                     <p className="p-2">{travelers}</p>
//                     <div
//                       className="p-2 flex justify-center items-center rounded-md  transition-colors duration-200 cursor-pointer"
//                       onClick={() => setTravelers(travelers + 1)}
//                     >
//                       <Plus className="h-[16px]" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Search Button - Repositioned for mobile */}
//             <div className="p-4 flex justify-center md:justify-end items-center w-full md:hidden">
//               <button
//                 type="submit"
//                 className="w-full text-[14px] font-jakarta bg-[#FFE2DA] hover:bg-orange-600 text-black hover:text-white font-medium py-2 px-8 rounded-md flex items-center justify-center gap-2"
//               >
//                 <Search />
//                 Search Flights
//               </button>
//             </div>
//           </div>

//           {/* Search Button for desktop - hidden on mobile */}
//           <div className="p-4 hidden md:flex md:justify-center items-center">
//             <button
//               type="submit"
//               className="text-[14px] font-jakarta sm:min-w-[120px] max-w-[200px] bg-[#FFE2DA] hover:bg-orange-600 text-black hover:text-white font-medium py-2  px-8 rounded-md md:rounded-r-md flex items-center gap-2"
//             >
//               <Search />
//               Search Flights
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };
const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL 

const SearchBox = () => {
	const { t } = useTranslation()
	const dropdownRef = useRef(null)
	const [showDropdown, setShowDropdown] = useState(false)

	const [searchData, setSearchdata] = useState({})
	const [flightDepatureDate, setflightDepatureDate] = useState(new Date())
	const [flightReturnDate, setflightReturnDate] = useState(null)
	const [routingId, setRoutingId] = useState('')
	const [from, setFrom] = useState('')
	const [to, setTo] = useState('')
	const [tripType, setTripType] = useState('Round Trip')
	const [isDirectFlight, setIsDirectFlight] = useState(false)
	const [travelClass, setTravelClass] = useState('Economy')
	const [adults, setAdults] = useState(1)
	const [children, setChildren] = useState(0)

	const [origin, setOrigin] = useState('')
	const [destination, setDestination] = useState('')
	const [searchCount, setSearchCount] = useState(0)

	// convert travelfuison date
	const handleTravelFusionDate = newDate => {
		if (!newDate) {
			return
		} // Handle null or invalid date
		else {
			// Ensure newDate is a Date object
			const selectedDate = new Date(newDate)

			const year = selectedDate.getFullYear()
			const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
			const day = String(selectedDate.getDate()).padStart(2, '0')

			const formattedDate = `${day}/${month}/${year}`
			return formattedDate
		}
	}
	// Handle Search function
	const handleTravelfusionSearch = e => {
		e.preventDefault()

		const formattedFlightDepatureDate =
			handleTravelFusionDate(flightDepatureDate) + '-00:01'

		console.log({
			from,
			to,
			flightDepatureDate,
			flightReturnDate,
			travelClass,
		})
		if (flightReturnDate !== null && tripType == 'Round Trip') {
			const formattedFlightReturnDate =
				handleTravelFusionDate(flightReturnDate) + '-23:59'
			setSearchdata({
				from: from,
				to: to,
				flightDepatureDate: formattedFlightDepatureDate,
				flightReturnDate: formattedFlightReturnDate,
				travelClass: travelClass,
			})
		} else {
			setSearchdata({
				from: from,
				to: to,
				flightDepatureDate: formattedFlightDepatureDate,
				travelClass: travelClass,
			})
			setflightReturnDate(null)
		}
		console.log(adults)
		setOrigin(from)
		setDestination(to)
		setSearchCount(prev => prev + 1)
	}

	return (
		<div
			className={`   px-4 ${
				location.pathname === '/list' ? 'lg:px-20 xl:px-40' : ''
			} border-gray-200 `}>
			<form
				onSubmit={handleTravelfusionSearch}
				className='w-full max-w-6xl bg-white rounded-xl shadow-lg px-4 py-1 z-10 h-[168px] mt-5'>
				{/* Filters Row */}
				<div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
					<div className='flex  flex-wrap gap-6'>
						{['One Way', 'Round Trip'].map(type => (
							<label
								key={type}
								className='flex items-center gap-2 cursor-pointer'>
								<div
									className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 translate-x-4 ${
										tripType === type
											? 'bg-[#EE5128] border-[#EE5128] text-white'
											: 'bg-gray-300 border-gray-300'
									}`}>
									{tripType === type && (
										<span className='text-[10px] font-bold'>
											✓
										</span>
									)}
								</div>
								<span
									className={`text-sm translate-y-4 translate-x-4 ${
										tripType === type
											? 'font-semibold text-black'
											: 'text-gray-500'
									}`}>
									{type}
								</span>
								<input
									type='radio'
									name='tripType'
									className='hidden'
									value={type}
									checked={tripType === type}
									onChange={() => setTripType(type)}
								/>
							</label>
						))}
					</div>

					<label className='flex items-center gap-2 ml-auto cursor-pointer'>
						<div
							className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 -translate-x-18  ${
								isDirectFlight
									? 'bg-[#EE5128] border-[#EE5128] text-white'
									: 'bg-gray-300 border-gray-300'
							}`}
							onClick={() => setIsDirectFlight(!isDirectFlight)}>
							{isDirectFlight && (
								<span className='text-[10px] font-bold'>✓</span>
							)}
						</div>
						<span
							className={`text-sm translate-y-4 -translate-x-18   ${
								isDirectFlight
									? 'font-semibold text-black'
									: 'text-gray-500'
							}`}
							onClick={() => setIsDirectFlight(!isDirectFlight)}>
							Direct flight only
						</span>
					</label>
				</div>

				{/* Main Inputs Row */}
				<div className='flex flex-col md:flex-row gap-1'>
					{/* From-To Section */}
					<div className='flex items-center w-full md:w-[660px] min-h-[90px] rounded-xl border border-gray-200 overflow-hidden relative'>
						{/* FROM */}
						{/* FROM */}
						<div className='flex-1 px-4 py-3'>
							<label className='text-xs text-gray-500'>
								From
							</label>
							<input
								type='text'
								value={from}
								onChange={e => setFrom(e.target.value)}
								placeholder='[HYD] Rajiv Gandhi International Airport'
								className={`text-[18px] font-semibold outline-none w-full bg-transparent ${
									from ? 'text-black' : 'text-[#64748B]'
								}`}
							/>
						</div>

						{/* Center Divider */}
						<div className='absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200 -translate-x-1/2' />

						{/* SWAP BUTTON */}
						<div className='absolute left-1/2 -translate-x-1/2 z-10'>
							<button
								type='button'
								onClick={() => {
									const temp = from
									setFrom(to)
									setTo(temp)
								}}
								className='w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center'>
								<ArrowLeftRightIcon className='h-4 w-4 text-gray-600' />
							</button>
						</div>

						{/* TO */}
						<div className='flex-1 pl-40 pr-4 py-3 ml-[1px]'>
							<label className='text-xs text-gray-500'>To</label>
							<input
								type='text'
								value={to}
								onChange={e => setTo(e.target.value)}
								placeholder='[BOM] Chhatrapati Shivaji International Airport'
								className={`text-[18px] font-semibold outline-none w-full bg-transparent ${
									to ? 'text-black' : 'text-[#64748B]'
								}`}
							/>
						</div>
					</div>
					{/* Departure Date */}
					<div className='w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200'>
						<p className='text-xs text-gray-500 mb-1 flex items-center justify-between'>
							Departure Date
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-4 h-4 text-[#0F172A]'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>
						</p>
						<DatePicker
							selected={flightDepatureDate}
							onChange={setflightDepatureDate}
							dateFormat='dd MMM yyyy'
							placeholderText='Select Date'
							className='text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent '
						/>
						<p className='text-xs text-gray-500 mt-1'>
							{flightDepatureDate &&
								flightDepatureDate.toLocaleDateString('en-US', {
									weekday: 'long',
								})}
						</p>
					</div>

					{/* Return Date (Round Trip only) */}
					{tripType === 'Round Trip' && (
						<div className='w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200'>
							<p className='text-xs text-gray-500 mb-1 flex items-center justify-between'>
								Return Date
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-4 h-4 text-[#0F172A]'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
									/>
								</svg>
							</p>
							<DatePicker
								selected={flightReturnDate}
								onChange={setflightReturnDate}
								dateFormat='dd MMM yyyy'
								placeholderText='Select Date'
								minDate={flightDepatureDate}
								className='text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent'
							/>
							<p className='text-xs text-gray-500 mt-1'>
								Book a round trip
							</p>
						</div>
					)}

					{/* Traveller & Class */}
					<div
						className='w-full md:w-[220px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 relative cursor-pointer'
						ref={dropdownRef}
						onClick={() => setShowDropdown(!showDropdown)}>
						{/* Dropdown content */}
						{showDropdown && (
							<div className='absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl z-50 shadow-md p-3'>
								{/* Adult */}
								<div className='flex justify-between items-center mb-2'>
									<span className='text-sm text-gray-600'>
										Adults
									</span>
									<div className='flex items-center gap-3'>
										<Minus
											className={`w-4 h-4 cursor-pointer ${
												adults > 1
													? 'text-black'
													: 'text-gray-300'
											}`}
											onClick={e => {
												e.stopPropagation()
												if (adults > 1)
													setAdults(adults - 1)
											}}
										/>
										<span className='text-sm font-semibold'>
											{adults}
										</span>
										<Plus
											className='w-4 h-4 cursor-pointer text-black'
											onClick={e => {
												e.stopPropagation()
												setAdults(adults + 1)
											}}
										/>
									</div>
								</div>

								{/* Children */}
								<div className='flex justify-between items-center mb-4'>
									<span className='text-sm text-gray-600'>
										Children
									</span>
									<div className='flex items-center gap-3'>
										<Minus
											className={`w-4 h-4 cursor-pointer ${
												children > 0
													? 'text-black'
													: 'text-gray-300'
											}`}
											onClick={e => {
												e.stopPropagation()
												if (children > 0)
													setChildren(children - 1)
											}}
										/>
										<span className='text-sm font-semibold'>
											{children}
										</span>
										<Plus
											className='w-4 h-4 cursor-pointer text-black'
											onClick={e => {
												e.stopPropagation()
												setChildren(children + 1)
											}}
										/>
									</div>
								</div>

								{/* Class list */}
								{[
									'Economy',
									'Premium Economy',
									'Business',
									'First Class',
								].map(cls => (
									<div
										key={cls}
										className={`py-1 px-2 rounded text-sm cursor-pointer hover:bg-gray-100 ${
											travelClass === cls
												? 'bg-gray-100 font-semibold'
												: ''
										}`}
										onClick={e => {
											e.stopPropagation()
											setTravelClass(cls)
											setShowDropdown(false)
										}}>
										{cls}
									</div>
								))}
							</div>
						)}

						{/* Static label + selected value */}
						<p className='text-xs text-gray-500 mb-1'>
							Travellers & Class
						</p>
						<div className='flex justify-between items-center font-semibold text-[16px] text-[#0F172A]'>
							<span>
								{adults + children}{' '}
								<span className='font-normal text-sm'>
									Travellers
								</span>
							</span>
						</div>
						<p className='text-xs text-gray-500 mt-1'>
							{travelClass}
						</p>
					</div>
				</div>

				{/* Search Button */}
				<div className='w-full flex justify-center translate-y-2.5 '>
					<button
						type='submit'
						className='bg-[#EE5128] hover:bg-[#d64520] text-white text-[18px] font-semibold px-18 py-2 rounded-full transition '>
						{t('hero.search')}
					</button>
				</div>
			</form>
		</div>
	)
}

// /////////////////////////////////////////////////
//
//  Recently Flight Booking Tickets
//
// ////////////////////////////////////////////////

const RecentlyBookedTickets = ({ t }) => {
	return (
		<div className=' w-full bg-white rounded-lg p-4'>
			{/* Recently booked header */}
			<div className='flex items-center mb-4 gap-[20px]'>
				<div className='mr-2'>
					<img src={TicketIcon} alt='TicketIcon' />
				</div>
				<h2 className='text-[18px] font-semibold text-gray-800 font-jakarta'>
					{t('recently.title')}
				</h2>
			</div>

			{/* Flight info section */}
			<div className='mb-6'>
				<div className='flex items-center mb-2'>
					<div className='flex items-center justify-center w-[53px] h-[53px] bg-orange-500 rounded-lg mr-3'>
						<img
							src={DepartureFlightIcon}
							alt='DepartureFlightIcon'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<h3 className='text-[15px] font-medium font-jakarta text-gray-800'>
							{t('recently.departure')}
						</h3>
						<p className='text-[14px] font-jakarta text-gray-500'>
							Thu, 06 Jul, 2025
						</p>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className='border-t border-gray-200 mb-6'></div>

			{/* Airline details */}
			<div className='flex items-center mb-6'>
				<div className='w-12 h-12 flex items-center justify-center border border-gray-200 rounded mr-4'>
					<div className='bg-red-600 w-10 h-10 flex items-center justify-center rounded'>
						<span className='text-white text-xs font-bold'>
							Emirates
						</span>
					</div>
				</div>
				<div>
					<h3 className='font-jakarta font-medium text-[15px] text-gray-800'>
						Emirates
					</h3>
					<p className='text-base font-normal font-jakarta text-gray-500'>
						1244595
					</p>
				</div>
			</div>

			{/* Flight times */}
			<div className='flex items-center justify-between mb-6'>
				{/* Departure */}
				<div className='text-center'>
					<p className='text-[19px] font-sans font-bold text-gray-800'>
						06:00
					</p>
					<p className='font-sans text-[14px] font-base text-gray-500'>
						Algeries
					</p>
				</div>

				{/* Flight duration */}
				<div className='flex flex-col items-center px-4'>
					<div className='flex items-center w-24'>
						<div className='h-px border-gray-300 border flex-grow border-dashed'></div>
						<div className='mx-1'>
							{/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11.43a1 1 0 01.725-.962l5-1.429a1 1 0 001.17-1.409l-7-14z" />
              </svg> */}
							<img
								src={NavFlightIcon}
								alt='Navigation Flight icon'
							/>
						</div>
						<div className='h-px border border-gray-300 flex-grow border-dashed'></div>
					</div>
					<p className='text-sm text-gray-500 mt-3'>12hr</p>
				</div>

				{/* Arrival */}
				<div className='text-center'>
					<p className='text-[19px] font-sans font-bold text-gray-800'>
						19:00
					</p>
					<p className='font-sans text-[14px] font-base text-gray-600'>
						Launda
					</p>
				</div>
			</div>

			{/* Reschedule button */}
			<button className='w-full py-3 font-jakarta bg-red-100 text-gray-800 font-medium rounded-lg hover:bg-red-200 transition-colors'>
				{t('recently.reschedule')}
			</button>
		</div>
	)
}

// /////////////////////////////////////////////////
//
//  Flight Filter results
//
// ////////////////////////////////////////////////

const FilterFlight = ({ searchData, setFlightsData, flights }) => {
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = useState(true)
	const [priceRange, setPriceRange] = useState(7000)
	const [travelClassFilters, setTravelClassFilters] = useState([])
	const [stops, setStops] = useState([])
	const [airlineFilters, setAirlineFilters] = useState([])
	const [departureTimeSlot, setDepartureTimeSlot] = useState(null)
	const [arrivalTimeSlot, setArrivalTimeSlot] = useState(null)
	// const [filterTriggered, setFilterTriggered] = useState(false);
	const [slotType, setSlotType] = useState('')
	console.log(searchData)
	const from = searchData.from
	const to = searchData.to
	const flightDepatureDate = searchData.flightDepatureDate
	const flightReturnDate = searchData.flightReturnDate

	const toggleFilter = () => {
		setIsOpen(!isOpen)
	}
	const handleCheckboxChange = e => {
		const { value, checked } = e.target

		setTravelClassFilters(prev => {
			if (checked) {
				// Add selected class
				return [...prev, value]
			} else {
				// Remove unselected class
				return prev.filter(item => item !== value)
			}
		})
	}

	const handleCheckboxChangeStops = e => {
		const { value, checked } = e.target

		setStops(prev => {
			if (checked) {
				// Add selected class
				return [...prev, value]
			} else {
				// Remove unselected class
				return prev.filter(item => item !== value)
			}
		})
	}
	const handleCheckboxChangeAirlines = e => {
		const { value, checked } = e.target

		setAirlineFilters(prev => {
			if (checked) {
				// Add selected class
				return [...prev, value]
			} else {
				// Remove unselected class
				return prev.filter(item => item !== value)
			}
		})
	}
	console.log(from)
	console.log(to)
	console.log(flightDepatureDate)
	console.log(flightReturnDate)
	console.log(priceRange)
	console.log(stops)
	console.log(travelClassFilters)
	console.log(airlineFilters)
	const backendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL 

	// // Fetch flights based on the search parameters
	useEffect(() => {
		const fetchFlights = async () => {
			console.log('Filter API Call')

			try {
				const response = await fetch(`${backendUrl}/filter`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
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
				})

				if (!response.ok) {
					throw new Error('Failed to fetch flight data')
				}

				const data = await response.json()
				console.log(data)
				setFlightsData(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchFlights()
	}, [
		stops,
		travelClassFilters,
		airlineFilters,
		departureTimeSlot,
		arrivalTimeSlot,
	])

	const uniqueAirlines = [
		...new Set((flights || []).map(flight => flight.airline)),
	]

	const timeSlotMap = {
		'Before 6AM': '00:00-05:59',
		'6AM - 12PM': '06:00-11:59',
		'12PM - 6PM': '12:00-17:59',
		'6PM - 12AM': '18:00-23:59',
	}

	return (
		<div className='w-full bg-white rounded-lg font-jakarta'>
			{/* Filter Header */}
			<div
				className='flex items-center justify-between p-4 cursor-pointer '
				onClick={toggleFilter}>
				<h2 className='font-medium text-gray-800'>
					{t('filter.filter')}
				</h2>
				{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
			</div>
			<div className='h-px bg-gray-300 mx-4 '></div>

			{/* Filter Content */}
			{isOpen && (
				<div className='px-4 pb-4 mt-[18px]'>
					{/* Preferred Class */}
					<div>
						<h3 className='text-sm font-medium text-gray-700 mb-2'>
							{t('filter.class.title')}
						</h3>
						<div className='space-y-2'>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-5 h-5 accent-orange-600'
									value='Business'
									onChange={e => handleCheckboxChange(e)}
								/>
								<span className='ml-2 text-sm'>
									{t('filter.class.class1')}
								</span>
							</label>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-5 h-5 accent-orange-600'
									value='Economy'
									onChange={e => handleCheckboxChange(e)}
								/>
								<span className='ml-2 text-sm text-gray-500'>
									{t('filter.class.class2')}
								</span>
							</label>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-5 h-5 accent-orange-600'
									value='Firstclass'
									onChange={e => handleCheckboxChange(e)}
								/>
								<span className='ml-2 text-sm text-gray-500'>
									{t('filter.class.class3')}
								</span>
							</label>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-5 h-5 accent-orange-600'
									value='Firstclass'
									onChange={e => handleCheckboxChange(e)}
								/>
								<span className='ml-2 text-sm text-gray-500'>
									{t('filter.class.class4')}
								</span>
							</label>
						</div>
					</div>
					<div className='h-px bg-gray-300 px-4 my-[18px]'></div>

					{/* Airlines */}
					<div className='mb-6'>
						<h3 className='text-sm font-medium text-gray-700 mb-2'>
							{t('filter.airlines')}
						</h3>
						<div className='space-y-2'>
							{uniqueAirlines.map((airline, index) => (
								<label
									key={index}
									className='flex items-center'>
									<input
										type='checkbox'
										className='w-5 h-5 accent-orange-600'
										value={airline}
										onChange={e =>
											handleCheckboxChangeAirlines(e)
										}
									/>
									<span className='ml-2 text-sm text-gray-500'>
										{airline}
									</span>
								</label>
							))}
						</div>
					</div>

					<div className='h-px bg-gray-300 px-4 my-[18px]'></div>

					{/* Price Range */}
					{/* <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Price range
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="10000-15000"
                  className="mr-2 w-5 h-5 accent-orange-600"
                />
                <span className="text-sm text-gray-600">
                  ₹10,000 to ₹15,000
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="15000-30000"
                  className="mr-2 w-5 h-5 accent-orange-600"
                />
                <span className="text-sm text-gray-600">
                  ₹15,000 to ₹30,000
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="30000-50000"
                  className="mr-2 w-5 h-5 accent-orange-600"
                />
                <span className="text-sm text-gray-600">
                  ₹30,000 to ₹50,000
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="50000-75000"
                  className="mr-2 w-5 h-5 accent-orange-600"
                />
                <span className="text-sm text-gray-600">
                  ₹50,000 to ₹75,000
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="75000+"
                  className="mr-2 w-5 h-5 accent-orange-600"
                />
                <span className="text-sm text-gray-600">₹75,000+</span>
              </label>
            </div>
          </div> */}

					{/* <div className="h-px bg-gray-300 px-4 my-[18px]"></div> */}

					{/*Commented out*/}
					{/* Leaving at */}
					<div className='mb-6 hidden'>
						<h3 className='text-sm font-medium text-gray-700 mb-2'>
							{t('filter.leaving-at')}
						</h3>
						<p className='text-xs text-gray-500 mb-2'>
							Departure to {searchData.from}
						</p>
						<div className='grid grid-cols-2 gap-2'>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								{/* <Sun size={16} className="text-gray-400" /> */}
								<img
									src={SunRiseIcon}
									alt='Sun Rise Icon'
									className='h-5 w-5'
								/>
								<span className='text-xs text-gray-400 mt-1'>
									Before 6AM
								</span>
							</div>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								<img
									src={SunSetIcon}
									alt='Sun Set Icon'
									className='h-5 w-5'
								/>
								{/* <Sun size={16} className="text-gray-400" /> */}
								<span className='text-xs text-gray-400 mt-1'>
									6AM - 12PM
								</span>
							</div>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								<img
									src={MoonRiseIcon}
									alt='Moon Rise Icon'
									className='h-5 w-5'
								/>
								{/* <Sun size={16} className="text-gray-400" /> */}
								<span className='text-xs text-gray-400 mt-1'>
									12PM - 6PM
								</span>
							</div>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								<img
									src={MoonSetIcon}
									alt='Moon set Icon'
									className='h-5 w-5'
								/>
								{/* <Moon size={16} className="text-gray-400" /> */}
								<span className='text-xs text-gray-400 mt-1'>
									6AM - 12PM
								</span>
							</div>
						</div>
					</div>

					{/* Arrival */}
					<div className='mb-6 hidden'>
						<h3 className='text-sm font-medium text-gray-700 mb-2'>
							{t('filter.arrival-to')} {searchData.to}
						</h3>
						<div className='grid grid-cols-2 gap-2'>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								<img
									src={SunRiseIcon}
									alt='Sun Rise Icon'
									className='h-5 w-5'
								/>
								<span className='text-xs text-gray-400 mt-1'>
									Before 6AM
								</span>
							</div>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								<img
									src={SunSetIcon}
									alt='Sun Set Icon'
									className='h-5 w-5'
								/>
								<span className='text-xs text-gray-400 mt-1'>
									6AM - 12PM
								</span>
							</div>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								<img
									src={MoonRiseIcon}
									alt='Moon Rise Icon'
									className='h-5 w-5'
								/>
								<span className='text-xs text-gray-400 mt-1'>
									12PM - 6PM
								</span>
							</div>
							<div className='bg-gray-100 rounded p-2 flex flex-col items-center'>
								<img
									src={MoonSetIcon}
									alt='Moon Set Icon'
									className='h-5 w-5'
								/>
								<span className='text-xs text-gray-400 mt-1'>
									6AM - 12PM
								</span>
							</div>
						</div>
					</div>

					{/* Leaving at */}
					<div className='mb-6'>
						<h3 className='text-sm font-medium text-gray-700 mb-2'>
							{t('filter.leaving-at')}
						</h3>
						<p className='text-xs text-gray-500 mb-2'>
							Departure to {searchData.from}
						</p>
						<div className='grid grid-cols-2 gap-2'>
							{Object.keys(timeSlotMap).map((label, idx) => (
								<div
									key={`dep-${idx}`}
									className={`bg-gray-100 rounded p-2 flex flex-col items-center cursor-pointer ${
										departureTimeSlot?.from ===
										timeSlotMap[label].from
											? 'bg-blue-200'
											: ''
									}`}
									// onClick={() => setDepatureTimeSlot(timeSlotMap[label])}
									onClick={() => {
										setDepartureTimeSlot(timeSlotMap[label])
										setSlotType('Depature')
									}}>
									<img
										src={
											[
												SunRiseIcon,
												SunSetIcon,
												MoonRiseIcon,
												MoonSetIcon,
											][idx]
										}
										alt={label}
										className='h-5 w-5'
									/>
									<span className='text-xs text-gray-400 mt-1'>
										{label}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Arrival */}
					<div className='mb-6'>
						<h3 className='text-sm font-medium text-gray-700 mb-2'>
							{t('filter.arrival-to')} {searchData.to}
						</h3>
						<div className='grid grid-cols-2 gap-2'>
							{Object.keys(timeSlotMap).map((label, idx) => (
								<div
									key={`arr-${idx}`}
									className={`bg-gray-100 rounded p-2 flex flex-col items-center cursor-pointer ${
										arrivalTimeSlot?.from ===
										timeSlotMap[label].from
											? 'bg-grey-100'
											: ''
									}`}
									// onClick={() => setArrivalTimeSlot(timeSlotMap[label])}
									onClick={() => {
										setArrivalTimeSlot(timeSlotMap[label])
										setSlotType('Arrival')
									}}>
									<img
										src={
											[
												SunRiseIcon,
												SunSetIcon,
												MoonRiseIcon,
												MoonSetIcon,
											][idx]
										}
										alt={label}
										className='h-5 w-5'
									/>
									<span className='text-xs text-gray-400 mt-1'>
										{label}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className='h-px bg-gray-300 px-4 my-[18px]'></div>

					{/* Stops */}
					<div className='mb-6'>
						<h3 className='text-sm font-medium text-gray-700 mb-2'>
							{t('filter.stop-title')}
						</h3>
						<div className='space-y-2'>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-5 h-5 accent-orange-600'
									value='Nonstop'
									onChange={e => handleCheckboxChangeStops(e)}
								/>
								<span className='ml-2 text-sm'>
									{t('filter.stop.non-stop')}
								</span>
							</label>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-5 h-5 accent-orange-600'
									value='1Stop'
									onChange={e => handleCheckboxChangeStops(e)}
								/>
								<span className='ml-2 text-sm text-gray-500'>
									1 {t('filter.stop.stop')}
								</span>
							</label>
							<label className='flex items-center'>
								<input
									type='checkbox'
									className='w-5 h-5 accent-orange-600'
									value='2stop'
									onChange={e => handleCheckboxChangeStops(e)}
								/>
								<span className='ml-2 text-sm text-gray-500'>
									2+ {t('filter.stop.stop')}
								</span>
							</label>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

// /////////////////////////////////////////////////
//
//  Flight Date picker
//
// ////////////////////////////////////////////////

const FlightDatePicker = ({ flights }) => {
	const [selectedDate, setSelectedDate] = useState(null)
	const [currentWeek, setCurrentWeek] = useState([])
	const [lowestPrice, setLowestPrice] = useState(0)

	const formatToKey = date => date.toISOString().split('T')[0]

	// Calculate lowest price once on flights update
	useEffect(() => {
		if (!flights || flights.length === 0) {
			setLowestPrice(0)
			return
		}

		const prices = flights.map(flight => parseFloat(flight.price))
		const minPrice = Math.min(...prices)
		setLowestPrice(minPrice)
	}, [flights])

	// Generate week on component mount and update selectedDate
	useEffect(() => {
		const generateDates = start => {
			const allDates = []
			for (let i = 0; i < 7; i++) {
				const date = new Date(start)
				date.setDate(start.getDate() + i)
				allDates.push(date)
			}
			return allDates
		}

		const today = new Date()
		const allDates = generateDates(today)
		setCurrentWeek(allDates)

		if (!selectedDate && allDates.length > 0) {
			setSelectedDate(formatToKey(allDates[0]))
		}
	}, [selectedDate])

	const navigatePrevious = () => {
		const prevStartDate = new Date(currentWeek[0])
		prevStartDate.setDate(prevStartDate.getDate() - 7)
		const prevDates = []
		for (let i = 0; i < 7; i++) {
			const date = new Date(prevStartDate)
			date.setDate(prevStartDate.getDate() + i)
			prevDates.push(date)
		}
		setCurrentWeek(prevDates)
		setSelectedDate(formatToKey(prevDates[0]))
	}

	const navigateNext = () => {
		const nextStartDate = new Date(currentWeek[0])
		nextStartDate.setDate(nextStartDate.getDate() + 7)
		const nextDates = []
		for (let i = 0; i < 7; i++) {
			const date = new Date(nextStartDate)
			date.setDate(nextStartDate.getDate() + i)
			nextDates.push(date)
		}
		setCurrentWeek(nextDates)
		setSelectedDate(formatToKey(nextDates[0]))
	}

	const formatDate = date => {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		]
		return {
			dayOfWeek: days[date.getDay()],
			month: months[date.getMonth()],
			day: date.getDate(),
			year: date.getFullYear(),
		}
	}

	return (
		<div className='w-full flex items-center font-sans overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.12)] bg-white rounded-[12px]'>
			<button
				onClick={navigatePrevious}
				className='flex items-center justify-center w-[35px] h-[84.794px] bg-[#EE5128] rounded-l-[12px] focus:outline-none hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'
				style={{ border: 'none' }}>
				<ChevronLeft size={20} color='white' />
			</button>

			<div className='flex w-full items-center overflow-hidden bg-transparent'>
				{currentWeek.map((date, index) => {
					const formattedDate = formatDate(date)
					const dateKey = formatToKey(date)
					const isSelected = selectedDate === dateKey

					return (
						<div
							key={index}
							onClick={() => setSelectedDate(dateKey)}
							className='w-full relative cursor-pointer hover:bg-gray-100 transition-all duration-150'
							style={{
								height: '84.794px',
								borderRight:
									index === currentWeek.length - 1
										? 'none'
										: '0.85px solid #CCCCCC',
							}}>
							<div
								className='absolute w-full flex flex-col items-center justify-center text-center'
								style={{
									height: '100%',
									top: 0,
									left: 0,
								}}>
								<p className='text-[14px] font-normal text-black leading-none'>
									{formattedDate.dayOfWeek},{' '}
									{formattedDate.month}{' '}
									{String(formattedDate.day).padStart(2, '0')}
								</p>
								<p
									className={`text-[13px] font-bold mt-[6.89px] h-[18px] flex items-center justify-center ${
										isSelected
											? 'text-green-600'
											: 'text-gray-400'
									}`}
									style={{
										width: '48px',
										lineHeight: '18px',
									}}>
									{lowestPrice > 0
										? `${lowestPrice.toLocaleString()}`
										: 'No Flights'}
								</p>
							</div>

							{isSelected && (
								<div
									className='absolute w-2 h-2 bg-[#EE5128] rounded-full left-1/2 -translate-x-1/2'
									style={{ top: '65.5px' }}></div>
							)}
						</div>
					)
				})}
			</div>

			<button
				onClick={navigateNext}
				className='flex items-center justify-center w-[35px] h-[84.794px] bg-[#EE5128] rounded-r-[12px] focus:outline-none hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'
				style={{ border: 'none' }}>
				<ChevronRight size={20} color='white' />
			</button>
		</div>
	)
}

// /////////////////////////////////////////////////
//
//  Flight Results
//
// ////////////////////////////////////////////////
// const FlightResults = ({ flights, origin, destination }) => {
//   console.log(flights);

//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const selectOption = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const flightsPerPage = 7;

//   const [selectedFlightId, setSelectedFlightId] = useState(null);
//   const navigate = useNavigate();
//   const indexOfLastFlight = currentPage * flightsPerPage;
//   const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
//   const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);
//   const totalPages = Math.ceil(flights.length / flightsPerPage);

//   const handleSelectFlight = (id) => {
//     setSelectedFlightId((prevId) => (prevId === id ? null : id));
//   };
//   return (
//     <>
//       <div className="flex flex-col items-center space-y-6 font-sans relative">
//         <div className="w-full flex items-center justify-between">
//           {/* Heading Left */}
//           <h1 className="text-[25.44px] font-[600] leading-[100%] font-jakarta">
//             Flights from {origin} to {destination}
//           </h1>

//           <div className="relative font-jakarta text-[14px] font-semibold text-black cursor-pointer">
//             {/* Dropdown button */}
//             <div
//               onClick={toggleDropdown}
//               className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-4 h-4"
//               >
//                 <line x1="3" y1="6" x2="21" y2="6" />
//                 <line x1="7" y1="12" x2="17" y2="12" />
//                 <line x1="11" y1="18" x2="13" y2="18" />
//               </svg>
//               <span className="text-sm font-medium">
//                 {selectedOption || "Sort"}
//               </span>
//               <ChevronDown
//                 size={16}
//                 className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
//               />
//             </div>

//             {/* Dropdown menu */}
//             {isOpen && (
//               <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 z-10">
//                 <ul className="py-1">
//                   <li
//                     className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
//                       selectedOption === "Highest to Lowest"
//                         ? "bg-gray-50 font-medium"
//                         : ""
//                     }`}
//                     onClick={() => selectOption("Highest to Lowest")}
//                   >
//                     Highest to Lowest
//                   </li>
//                   <li
//                     className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
//                       selectedOption === "Lowest to Highest"
//                         ? "bg-gray-50 font-medium"
//                         : ""
//                     }`}
//                     onClick={() => selectOption("Lowest to Highest")}
//                   >
//                     Lowest to Highest
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {currentFlights.map((flight) => {
//           const isSelected = selectedFlightId === flight.id;
//           const formateDepartureTime = flight.departureTime
//             .split("T")[1]
//             .slice(0, 5);
//           const formateArrivalTime = flight.arrivalTime
//             .split("T")[1]
//             .slice(0, 5);
//           return (
//             <div
//               key={flight.id}
//               className={`w-full min-h-[150.13px] rounded-md cursor-pointer transition duration-300 flex flex-col justify-between ${
//                 isSelected
//                   ? "border border-[#EE5128] bg-white shadow-sm"
//                   : "border border-gray-200 bg-white"
//               }`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleSelectFlight(flight.id);
//               }}
//             >
//               {/* Top Row */}
//               <div className="flex items-center flex-col md:flex-row justify-between px-4 min-h-[60px] pt-6 pb-6 xl:pb-0 gap-[30px]">
//                 {/* Logo + Flight Info */}
//                 <div className="flex flex-col justify-start items-center xl:items-start min-w-[170px] relative pb-10 lg:pb-0">
//                   <img
//                     src={flight.logo}
//                     alt={flight.airline}
//                     className="h-[40px] object-contain xl:mb-[45px] ml-2"
//                   />
//                   <div className="absolute top-[48px] left-[18px] flex items-center space-x-2">
//                     <span className="text-[13px] text-gray-500 leading-none">
//                       {flight.flightNumber}
//                     </span>
//                     <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold leading-[19px]">
//                       {flight.class}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Departure - Flight Path - Arrival */}
//                 <div className="flex items-center justify-center gap-[40px] ml-4">
//                   {/* Departure */}
//                   <div className="text-center">
//                     <p className="text-[22px] font-bold text-black leading-tight">
//                       {/* {flight.departureTime} */}
//                       {formateDepartureTime}
//                     </p>
//                     <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
//                       {flight.departureCity}
//                     </p>
//                   </div>

//                   {/* Path */}
//                   <div className="flex flex-col items-center">
//                     <div className="flex items-center">
//                       <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                       <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                       <span className="text-black text-sm">✈</span>
//                       <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                       <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                     </div>
//                     <span className="text-[12px] text-gray-400 mt-[4px]">
//                       {flight.duration}
//                     </span>
//                   </div>

//                   {/* Arrival */}
//                   <div className="text-center">
//                     <p className="text-[22px] font-bold text-black leading-tight">
//                       {/* {flight.arrivalTime} */}
//                       {formateArrivalTime}
//                     </p>
//                     <p className="text-[13px] text-gray-500 leading-tight mt-[2px]">
//                       {flight.arrivalCity}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="text-right flex flex-col gap-2 items-center lg:items-end space-y-[2px] w-[152px] h-[31px]">
//                   <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
//                     <span className="text-[20px] pr-2">{flight.currency}</span>
//                     {flight.price.toLocaleString()}
//                     <span className="text-[12px] text-black font-normal">
//                       /pax
//                     </span>
//                   </p>
//                   <p className="text-[13px] text-gray-400 line-through font-normal leading-none font-sans">
//                     {flight.currency}
//                     {flight.originalPrice.toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Bottom Row */}
//               <div
//                 className={`border-t px-4 py-[30px] xl:py-[20px] flex items-center justify-between text-sm font-medium ${
//                   isSelected ? "border-[#EE5128]" : "border-gray-200"
//                 }`}
//               >
//                 <div
//                   className={`flex space-x-14 ${
//                     isSelected ? "text-[#EE5128]" : "text-bold"
//                   } font-sans`}
//                 >
//                   <div className="flex items-center space-x-1 ml-2">
//                     <span>Flight Details</span>
//                     <ChevronDown size={14} />
//                   </div>
//                   <div className="hidden lg:flex items-center space-x-1">
//                     <span>Price Details</span>
//                     <ChevronDown size={14} />
//                   </div>
//                   <span className="hidden lg:flex">Policy</span>
//                   <span className="hidden lg:flex">Refund</span>
//                   <span className="hidden lg:flex">Reschedule</span>
//                 </div>

//                 {isSelected ? (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate("/booking/ReviewYourBooking", {
//                         state: { flight },
//                       });
//                     }}
//                     className="bg-[#EE5128] text-white px-4 py-1.5 rounded font-jakarta font-semibold hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
//                   >
//                     Book now
//                   </button>
//                 ) : (
//                   <button
//                     onClick={(e) => e.stopPropagation()}
//                     className="bg-gray-300 text-white px-4 py-1.5 rounded font-jakarta font-semibold cursor-not-allowed"
//                     disabled
//                   >
//                     Book now
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         setCurrentPage={setCurrentPage}
//       />
//     </>
//   );
// };

// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import Pagination from "./Pagination"; // Adjust path based on your project

const FlightResults = ({ flights, origin, destination, t }) => {
	// const { t } = useLocation();
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedFlightId, setSelectedFlightId] = useState(null)
	const dropdownRef = useRef(null)
	const navigate = useNavigate()

	const flightsPerPage = 7
	const indexOfLastFlight = currentPage * flightsPerPage
	const indexOfFirstFlight = indexOfLastFlight - flightsPerPage

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = event => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const toggleDropdown = () => setIsOpen(!isOpen)
	const selectOption = option => {
		setSelectedOption(option)
		setCurrentPage(1) // Reset to first page on sort
		setIsOpen(false)
	}

	const sortedFlights = useMemo(() => {
		const sorted = [...flights]
		if (selectedOption === 'Highest to Lowest') {
			return sorted.sort((a, b) => b.price - a.price)
		} else if (selectedOption === 'Lowest to Highest') {
			return sorted.sort((a, b) => a.price - b.price)
		}
		return sorted
	}, [flights, selectedOption])

	const currentFlights = useMemo(() => {
		return sortedFlights.slice(indexOfFirstFlight, indexOfLastFlight)
	}, [sortedFlights, indexOfFirstFlight, indexOfLastFlight])

	const totalPages = Math.ceil(sortedFlights.length / flightsPerPage)

	const handleSelectFlight = id => {
		setSelectedFlightId(prevId => (prevId === id ? null : id))
	}

	return (
		<>
			<div className='flex flex-col items-center space-y-6 font-sans relative'>
				<div className='w-full flex items-center justify-between'>
					{/* Heading */}
					<h1 className='text-[25.44px] font-[600] leading-[100%] font-jakarta'>
						Flights from {origin} to {destination}
					</h1>

					{/* Dropdown Sort */}
					<div
						className='relative font-jakarta text-[14px] font-semibold text-black cursor-pointer'
						ref={dropdownRef}>
						<div
							onClick={toggleDropdown}
							className='flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-4 h-4'>
								<line x1='3' y1='6' x2='21' y2='6' />
								<line x1='7' y1='12' x2='17' y2='12' />
								<line x1='11' y1='18' x2='13' y2='18' />
							</svg>
							<span className='text-sm font-medium'>
								{selectedOption || 'Sort'}
							</span>
							<ChevronDown
								size={16}
								className={`transition-transform ${
									isOpen ? 'rotate-180' : ''
								}`}
							/>
						</div>

						{isOpen && (
							<div className='absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 z-10'>
								<ul className='py-1'>
									<li
										className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
											selectedOption ===
											'Highest to Lowest'
												? 'bg-gray-50 font-medium'
												: ''
										}`}
										onClick={() =>
											selectOption('Highest to Lowest')
										}>
										Highest to Lowest
									</li>
									<li
										className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
											selectedOption ===
											'Lowest to Highest'
												? 'bg-gray-50 font-medium'
												: ''
										}`}
										onClick={() =>
											selectOption('Lowest to Highest')
										}>
										Lowest to Highest
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>

				{/* Flight Cards */}
				{currentFlights.length === 0 ? (
					<div className='text-gray-500 text-center mt-6'>
						No flights available.
					</div>
				) : (
					currentFlights.map(flight => {
						const isSelected = selectedFlightId === flight.id
						const formatDepartureTime = flight.departureTime
							.split('T')[1]
							.slice(0, 5)
						const formatArrivalTime = flight.arrivalTime
							.split('T')[1]
							.slice(0, 5)

						return (
							<div
								key={flight.id}
								className={`w-full min-h-[150.13px] rounded-md cursor-pointer transition duration-300 flex flex-col justify-between ${
									isSelected
										? 'border border-[#EE5128] bg-white shadow-sm'
										: 'border border-gray-200 bg-white'
								}`}
								onClick={e => {
									e.stopPropagation()
									handleSelectFlight(flight.id)
								}}>
								{/* Top Row */}
								<div className='flex items-center flex-col md:flex-row justify-between px-4 min-h-[60px] pt-6 pb-6 xl:pb-0 gap-[30px]'>
									<div className='flex flex-col justify-start items-center xl:items-start min-w-[170px] relative pb-10 lg:pb-0'>
										<img
											src={flight.logo}
											alt={flight.airline}
											className='h-[40px] object-contain xl:mb-[45px] ml-2'
										/>
										<div className='absolute top-[48px] left-[18px] flex items-center space-x-2'>
											<span className='text-[13px] text-gray-500 leading-none'>
												{flight.flightNumber}
											</span>
											<span className='text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold leading-[19px]'>
												{flight.class}
											</span>
										</div>
									</div>

									<div className='flex items-center justify-center gap-[40px] ml-4'>
										<div className='text-center'>
											<p className='text-[22px] font-bold text-black leading-tight'>
												{formatDepartureTime}
											</p>
											<p className='text-[13px] text-gray-500 leading-tight mt-[2px]'>
												{flight.departureCity}
											</p>
										</div>

										<div className='flex flex-col items-center'>
											<div className='flex items-center'>
												<span className='w-[6px] h-[6px] bg-gray-300 rounded-full' />
												<div className='border-t border-dashed w-8 border-gray-300 mx-2' />
												<span className='text-black text-sm'>
													✈
												</span>
												<div className='border-t border-dashed w-8 border-gray-300 mx-2' />
												<span className='w-[6px] h-[6px] bg-gray-300 rounded-full' />
											</div>
											<span className='text-[12px] text-gray-400 mt-[4px]'>
												{flight.duration}
											</span>
										</div>

										<div className='text-center'>
											<p className='text-[22px] font-bold text-black leading-tight'>
												{formatArrivalTime}
											</p>
											<p className='text-[13px] text-gray-500 leading-tight mt-[2px]'>
												{flight.arrivalCity}
											</p>
										</div>
									</div>

									<div className='text-right flex flex-col gap-2 items-center lg:items-end space-y-[2px] w-[152px] h-[31px]'>
										<p className='text-[#EE5128] text-[26px] font-black leading-none font-sans'>
											<span className='text-[20px] pr-2'>
												{flight.currency}
											</span>
											{flight.price.toLocaleString()}
											<span className='text-[12px] text-black font-normal'>
												/pax
											</span>
										</p>
										<p className='text-[13px] text-gray-400 line-through font-normal leading-none font-sans'>
											{flight.currency}
											{flight.originalPrice.toLocaleString()}
										</p>
									</div>
								</div>

								{/* Bottom Row */}
								<div
									className={`border-t px-4 py-[30px] xl:py-[20px] flex items-center justify-between text-sm font-medium ${
										isSelected
											? 'border-[#EE5128]'
											: 'border-gray-200'
									}`}>
									<div
										className={`flex space-x-14 ${
											isSelected
												? 'text-[#EE5128]'
												: 'text-bold'
										} font-sans`}>
										<div className='flex items-center space-x-1 ml-2'>
											<span>
												{t(
													'booking-card.Flight-details'
												)}
											</span>
											<ChevronDown size={14} />
										</div>
										<div className='hidden lg:flex items-center space-x-1'>
											<span>
												{t(
													'booking-card.price-details'
												)}
											</span>
											<ChevronDown size={14} />
										</div>
										<span className='hidden lg:flex'>
											{t('booking-card.policy')}
										</span>
										<span className='hidden lg:flex'>
											{t('booking-card.refund')}
										</span>
										<span className='hidden lg:flex'>
											{t('booking-card.reschedule')}
										</span>
									</div>

									{isSelected ? (
										<button
											onClick={e => {
												e.stopPropagation()
												navigate(
													'/agent-dashboard/booking/ReviewYourBooking',
													{
														state: { flight },
													}
												)
											}}
											className='bg-[#EE5128] text-white px-4 py-1.5 rounded font-jakarta font-semibold hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
											{t('booking-card.book-now')}
										</button>
									) : (
										<button
											onClick={e => e.stopPropagation()}
											className='bg-gray-300 text-white px-4 py-1.5 rounded font-jakarta font-semibold cursor-not-allowed'
											disabled>
											{t('booking-card.book-now')}
										</button>
									)}
								</div>
							</div>
						)
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
	)
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
	const getPagination = () => {
		const pages = []

		if (totalPages <= 6) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, '...', totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(
					1,
					'...',
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages
				)
			} else {
				pages.push(
					1,
					'...',
					currentPage - 1,
					currentPage,
					currentPage + 1,
					'...',
					totalPages
				)
			}
		}

		return pages
	}

	return (
		<div className='flex items-center justify-center gap-2 mt-6'>
			{/* Prev */}
			<button
				onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
				disabled={currentPage === 1}
				className='w-8 h-8 flex items-center justify-center rounded-full bg-[#EE5128] text-white disabled:opacity-50 hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
				<ChevronLeft className='h-[24px] w-[14px]' />
			</button>

			{getPagination().map((page, index) =>
				page === '...' ? (
					<span key={`dots-${index}`} className='mx-1 text-gray-500'>
						...
					</span>
				) : (
					<button
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`w-8 h-8 flex items-center justify-center rounded-full ${
							currentPage === page
								? 'bg-[#EE5128] text-white'
								: 'bg-transparent text-black'
						}`}>
						{page}
					</button>
				)
			)}

			{/* Next */}
			<button
				onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
				disabled={currentPage === totalPages}
				className='w-8 h-8 flex items-center justify-center rounded-full bg-[#EE5128] text-white disabled:opacity-50 hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
				<ChevronRight className='h-[24px] w-[14px]' />
			</button>
		</div>
	)
}
