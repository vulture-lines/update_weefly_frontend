// // // // import React from "react";

// // // // // Local images
// // // // import CalendarIcon from "../../assets/images/calendar-icon.png";
// // // // import PeopleIcon from "../../assets/images/people-icon.png";
// // // // import RedDottedLine from "../../assets/images/red-dotted-line.png";

// // // // // Sample booking data (replace with backend data later)
// // // // const bookings = [
// // // //   {
// // // //     airline: "CloudNine Airlines",
// // // //     logo: "/assets/airlines/cloudnine.png",
// // // //     date: "15 Jun 2025",
// // // //     people: 80,
// // // //     departureTime: "9:00 AM",
// // // //     departureCity: "Paris",
// // // //     departureCode: "CDG",
// // // //     arrivalTime: "12:00 PM",
// // // //     arrivalCity: "New York",
// // // //     arrivalCode: "JFK",
// // // //     duration: "15 Hours",
// // // //   },
// // // //   {
// // // //     airline: "RedWing Airlines",
// // // //     logo: "/assets/airlines/redwing.png",
// // // //     date: "15 Jun 2025",
// // // //     people: 102,
// // // //     departureTime: "10:00 AM",
// // // //     departureCity: "Hong Kong",
// // // //     departureCode: "KKG",
// // // //     arrivalTime: "7:00 PM",
// // // //     arrivalCity: "Los Angeles",
// // // //     arrivalCode: "LAX",
// // // //     duration: "9 Hours",
// // // //   },
// // // //   {
// // // //     airline: "SkyHigh Airlines",
// // // //     logo: "/assets/airlines/skyhigh.png",
// // // //     date: "15 Jun 2025",
// // // //     people: 56,
// // // //     departureTime: "7:00 AM",
// // // //     departureCity: "Frankfrut",
// // // //     departureCode: "FRA",
// // // //     arrivalTime: "3:00 PM",
// // // //     arrivalCity: "Bangkok",
// // // //     arrivalCode: "BKK",
// // // //     duration: "8 Hours",
// // // //   },
// // // // ];

// // // // export default function RecentlyBookedFlights() {
// // // //   return (
// // // //     <div className="p-6 bg-white rounded-xl shadow-md w-[915px] font-[Lato]">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <h2 className="text-[20px] font-semibold">Recently Booked flights</h2>
// // // //         <div className="flex items-center border px-4 py-1 rounded-lg text-[14px] font-medium">
// // // //           <img src={CalendarIcon} alt="calendar" className="w-[16px] h-[16px] mr-2" />
// // // //           1-8 July 2025
// // // //         </div>
// // // //       </div>

// // // //       <div className="space-y-4">
// // // //         {bookings.map((flight, index) => (
// // // //           <div
// // // //             key={index}
// // // //             className="flex items-center justify-between px-4 py-4 border rounded-[20px] h-[78px]"
// // // //           >
// // // //             {/* Airline Info */}
// // // //             <div className="flex items-center w-[270px]">
// // // //               <img
// // // //                 src={flight.logo}
// // // //                 alt={flight.airline}
// // // //                 className="w-[44px] h-[44px] rounded-full mr-[12px]"
// // // //               />
// // // //               <div>
// // // //                 <p className="font-semibold text-[16px] leading-[18px]">{flight.airline}</p>
// // // //                 <div className="flex text-[12px] text-gray-500 mt-[3px]">
// // // //                   <div className="flex items-center mr-4">
// // // //                     <img src={CalendarIcon} alt="calendar" className="w-[12px] h-[12px] mr-[4px]" />
// // // //                     {flight.date}
// // // //                   </div>
// // // //                   <div className="flex items-center">
// // // //                     <img src={PeopleIcon} alt="people" className="w-[12px] h-[12px] mr-[4px]" />
// // // //                     {flight.people}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Departure */}
// // // //             <div className="text-center w-[110px]">
// // // //               <p className="text-[16px] font-semibold">{flight.departureTime}</p>
// // // //               <p className="text-[14px] text-gray-500">{flight.departureCity}</p>
// // // //             </div>

// // // //             {/* Route Line */}
// // // //             <div className="flex flex-col items-center w-[373px]">
// // // //               <p className="text-[14px] text-gray-600 text-center mb-1">
// // // //                 Duration: {flight.duration}
// // // //               </p>
// // // //               <div className="relative w-full flex justify-between items-center">
// // // //                 <span className="text-[12px] text-gray-500 absolute left-0 -bottom-[18px]">
// // // //                   {flight.departureCode}
// // // //                 </span>
// // // //                 <img
// // // //                   src={RedDottedLine}
// // // //                   alt="dotted-line"
// // // //                   className="w-full h-[6px] object-contain"
// // // //                 />
// // // //                 <span className="text-[12px] text-gray-500 absolute right-0 -bottom-[18px]">
// // // //                   {flight.arrivalCode}
// // // //                 </span>
// // // //               </div>
// // // //             </div>

// // // //             {/* Arrival */}
// // // //             <div className="text-center w-[110px]">
// // // //               <p className="text-[16px] font-semibold">{flight.arrivalTime}</p>
// // // //               <p className="text-[14px] text-gray-500">{flight.arrivalCity}</p>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React from "react";

// // // // Local images
// // // import CalendarIcon from "../../assets/images/agentdashboard/calendar.png";
// // // import PeopleIcon from "../../assets/images/agentdashboard/people.png";
// // // import RedDottedLine from "../../assets/images/agentdashboard/dottedline.png";

// // // // Sample booking data (replace with backend data later)
// // // const bookings = [
// // //   {
// // //     airline: "CloudNine Airlines",
// // //     logo: "../../assets/images/agentdashboard/flight1.png",
// // //     date: "15 Jun 2025",
// // //     people: 80,
// // //     departureTime: "9:00 AM",
// // //     departureCity: "Paris",
// // //     departureCode: "CDG",
// // //     arrivalTime: "12:00 PM",
// // //     arrivalCity: "New York",
// // //     arrivalCode: "JFK",
// // //     duration: "15 Hours",
// // //   },
// // //   {
// // //     airline: "RedWing Airlines",
// // //     logo: "../../assets/images/agentdashboard/flight1.png",
// // //     date: "15 Jun 2025",
// // //     people: 102,
// // //     departureTime: "10:00 AM",
// // //     departureCity: "Hong Kong",
// // //     departureCode: "KKG",
// // //     arrivalTime: "7:00 PM",
// // //     arrivalCity: "Los Angeles",
// // //     arrivalCode: "LAX",
// // //     duration: "9 Hours",
// // //   },
// // //   {
// // //     airline: "SkyHigh Airlines",
// // //     logo: "../../assets/images/agentdashboard/flight1.png",
// // //     date: "15 Jun 2025",
// // //     people: 56,
// // //     departureTime: "7:00 AM",
// // //     departureCity: "Frankfrut",
// // //     departureCode: "FRA",
// // //     arrivalTime: "3:00 PM",
// // //     arrivalCity: "Bangkok",
// // //     arrivalCode: "BKK",
// // //     duration: "8 Hours",
// // //   },
// // // ];

// // // export default function RecentlyBookedFlights() {
// // //   return (
// // //     <div className="p-6 bg-white rounded-xl shadow-md w-[915px] font-[Lato]">
// // //       <div className="flex justify-between items-center mb-6">
// // //         <h2 className="text-[20px] font-semibold">Recently Booked flights</h2>
// // //         <div className="flex items-center border px-4 py-1 rounded-lg text-[14px] font-medium">
// // //           <img
// // //             src={CalendarIcon}
// // //             alt="calendar"
// // //             className="w-[16px] h-[16px] mr-2"
// // //           />
// // //           1-8 July 2025
// // //         </div>
// // //       </div>

// // //       <div className="space-y-4">
// // //         {bookings.map((flight, index) => (
// // //           <div
// // //             key={index}
// // //             className="flex items-center justify-between px-4 py-4 border rounded-[20px] h-[78px]"
// // //           >
// // //             {/* Airline Info */}
// // //             <div className="flex items-center w-[270px]">
// // //               <img
// // //                 src={flight.logo}
// // //                 alt={flight.airline}
// // //                 className="w-[44px] h-[44px] rounded-full mr-[12px]"
// // //               />
// // //               <div>
// // //                 <p className="font-semibold text-[16px] leading-[18px]">
// // //                   {flight.airline}
// // //                 </p>
// // //                 <div className="flex text-[12px] text-gray-500 mt-[3px]">
// // //                   <div className="flex items-center mr-4">
// // //                     <img
// // //                       src={CalendarIcon}
// // //                       alt="calendar"
// // //                       className="w-[12px] h-[12px] mr-[4px]"
// // //                     />
// // //                     {flight.date}
// // //                   </div>
// // //                   <div className="flex items-center">
// // //                     <img
// // //                       src={PeopleIcon}
// // //                       alt="people"
// // //                       className="w-[12px] h-[12px] mr-[4px]"
// // //                     />
// // //                     {flight.people}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Departure */}
// // //             <div className="text-center w-[110px]">
// // //               <p className="text-[16px] font-semibold">
// // //                 {flight.departureTime}
// // //               </p>
// // //               <p className="text-[14px] text-gray-500">
// // //                 {flight.departureCity}
// // //               </p>
// // //             </div>

// // //             {/* Route Line */}
// // //             <div className="flex flex-col items-center w-[373px]">
// // //               <p className="text-[14px] text-gray-600 text-center mb-1">
// // //                 Duration: {flight.duration}
// // //               </p>
// // //               <div className="relative w-full flex justify-between items-center">
// // //                 <span className="text-[12px] text-gray-500 absolute left-0 -bottom-[18px]">
// // //                   {flight.departureCode}
// // //                 </span>
// // //                 <img
// // //                   src={RedDottedLine}
// // //                   alt="dotted-line"
// // //                   className="w-full h-[6px] object-contain"
// // //                 />
// // //                 <span className="text-[12px] text-gray-500 absolute right-0 -bottom-[18px]">
// // //                   {flight.arrivalCode}
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             {/* Arrival */}
// // //             <div className="text-center w-[110px]">
// // //               <p className="text-[16px] font-semibold">{flight.arrivalTime}</p>
// // //               <p className="text-[14px] text-gray-500">{flight.arrivalCity}</p>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React from "react";

// // // Local images
// // import CalendarIcon from "../../assets/images/agentdashboard/calendar.png";
// // import PeopleIcon from "../../assets/images/agentdashboard/people.png";
// // import RedDottedLine from "../../assets/images/agentdashboard/dottedline.png";
// // import CloudNineLogo from "../../assets/images/agentdashboard/flight1.png";
// // import RedWingLogo from "../../assets/images/agentdashboard/flight2.png";
// // import SkyHighLogo from "../../assets/images/agentdashboard/flight1.png";

// // const bookings = [
// //   {
// //     airline: "CloudNine Airlines",
// //     logo: CloudNineLogo,
// //     date: "15 Jun 2025",
// //     people: 80,
// //     departureTime: "9:00 AM",
// //     departureCity: "Paris",
// //     departureCode: "CDG",
// //     arrivalTime: "12:00 PM",
// //     arrivalCity: "New York",
// //     arrivalCode: "JFK",
// //     duration: "15 Hours",
// //   },
// //   {
// //     airline: "RedWing Airlines",
// //     logo: RedWingLogo,
// //     date: "15 Jun 2025",
// //     people: 102,
// //     departureTime: "10:00 AM",
// //     departureCity: "Hong Kong",
// //     departureCode: "KKG",
// //     arrivalTime: "7:00 PM",
// //     arrivalCity: "Los Angeles",
// //     arrivalCode: "LAX",
// //     duration: "9 Hours",
// //   },
// //   {
// //     airline: "SkyHigh Airlines",
// //     logo: SkyHighLogo,
// //     date: "15 Jun 2025",
// //     people: 56,
// //     departureTime: "7:00 AM",
// //     departureCity: "Frankfrut",
// //     departureCode: "FRA",
// //     arrivalTime: "3:00 PM",
// //     arrivalCity: "Bangkok",
// //     arrivalCode: "BKK",
// //     duration: "8 Hours",
// //   },
// // ];

// // export default function RecentlyBookedFlights() {
// //   return (
// //     <div className="p-6 bg-white rounded-xl shadow-md w-[830px] font-[Lato]">
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-[20px] font-semibold">Recently Booked flights</h2>
// //         <div className="flex items-center border px-4 py-1 rounded-lg text-[14px] font-medium">
// //           <img
// //             src={CalendarIcon}
// //             alt="calendar"
// //             className="w-[16px] h-[16px] mr-2"
// //           />
// //           1-8 July 2025
// //         </div>
// //       </div>

// //       <div className="space-y-4">
// //         {bookings.map((flight, index) => (
// //           <div
// //             key={index}
// //             className="flex items-center justify-between px-4 py-4 border rounded-[20px] h-[78px]"
// //           >
// //             {/* Airline Info */}
// //             <div className="flex items-center w-[270px]">
// //               <img
// //                 src={flight.logo}
// //                 alt={flight.airline}
// //                 className="w-[44px] h-[44px] rounded-full mr-[12px] object-cover"
// //               />
// //               <div>
// //                 <p className="font-semibold text-[16px] leading-[18px]">
// //                   {flight.airline}
// //                 </p>
// //                 <div className="flex text-[12px] text-gray-500 mt-[3px]">
// //                   <div className="flex items-center mr-4">
// //                     <img
// //                       src={CalendarIcon}
// //                       alt="calendar"
// //                       className="w-[12px] h-[12px] mr-[4px]"
// //                     />
// //                     {flight.date}
// //                   </div>
// //                   <div className="flex items-center">
// //                     <img
// //                       src={PeopleIcon}
// //                       alt="people"
// //                       className="w-[12px] h-[12px] mr-[4px]"
// //                     />
// //                     {flight.people}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Departure */}
// //             <div className="text-center w-[110px]">
// //               <p className="text-[16px] font-semibold">
// //                 {flight.departureTime}
// //               </p>
// //               <p className="text-[14px] text-gray-500">
// //                 {flight.departureCity}
// //               </p>
// //             </div>

// //             {/* Route Line */}
// //             <div className="flex flex-col items-center w-[373px]">
// //               <p className="text-[14px] text-gray-600 text-center mb-1">
// //                 Duration: {flight.duration}
// //               </p>
// //               <div className="relative w-full flex justify-between items-center">
// //                 <span className="text-[12px] text-gray-500 absolute left-0 -bottom-[18px]">
// //                   {flight.departureCode}
// //                 </span>
// //                 <img
// //                   src={RedDottedLine}
// //                   alt="dotted-line"
// //                   className="w-full h-[6px] object-contain"
// //                 />
// //                 <span className="text-[12px] text-gray-500 absolute right-0 -bottom-[18px]">
// //                   {flight.arrivalCode}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Arrival */}
// //             <div className="text-center w-[110px]">
// //               <p className="text-[16px] font-semibold">{flight.arrivalTime}</p>
// //               <p className="text-[14px] text-gray-500">{flight.arrivalCity}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import React from "react";

// // Local images
// import CalendarIcon from "../../assets/images/agentdashboard/calendar.png";
// import PeopleIcon from "../../assets/images/agentdashboard/people.png";
// import RedDottedLine from "../../assets/images/agentdashboard/dottedline.png";
// import CloudNineLogo from "../../assets/images/agentdashboard/flight1.png";
// import RedWingLogo from "../../assets/images/agentdashboard/flight2.png";
// import SkyHighLogo from "../../assets/images/agentdashboard/flight2.png";

// const bookings = [
//   {
//     airline: "CloudNine Airlines",
//     logo: CloudNineLogo,
//     date: "15 Jun 2025",
//     people: 80,
//     departureTime: "9:00 AM",
//     departureCity: "Paris",
//     departureCode: "CDG",
//     arrivalTime: "12:00 PM",
//     arrivalCity: "New York",
//     arrivalCode: "JFK",
//     duration: "15 Hours",
//   },
//   {
//     airline: "RedWing Airlines",
//     logo: RedWingLogo,
//     date: "15 Jun 2025",
//     people: 102,
//     departureTime: "10:00 AM",
//     departureCity: "Hong Kong",
//     departureCode: "KKG",
//     arrivalTime: "7:00 PM",
//     arrivalCity: "Los Angeles",
//     arrivalCode: "LAX",
//     duration: "9 Hours",
//   },
//   {
//     airline: "SkyHigh Airlines",
//     logo: SkyHighLogo,
//     date: "15 Jun 2025",
//     people: 56,
//     departureTime: "7:00 AM",
//     departureCity: "Frankfrut",
//     departureCode: "FRA",
//     arrivalTime: "3:00 PM",
//     arrivalCity: "Bangkok",
//     arrivalCode: "BKK",
//     duration: "8 Hours",
//   },
// ];

// export default function RecentlyBookedFlights() {
//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md w-[830px] font-[Lato]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-[20px] font-semibold">Recently Booked flights</h2>
//         <div className="flex items-center border border-gray-300 px-4 py-1 rounded-lg text-[14px] font-medium">
//           <img
//             src={CalendarIcon}
//             alt="calendar"
//             className="w-[16px] h-[16px] mr-2"
//           />
//           1-8 July 2025
//         </div>
//       </div>

//       <div className="space-y-4">
//         {bookings.map((flight, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between px-4 py-4 border border-gray-300 rounded-[20px] h-[90px]"
//           >
//             {/* Airline Info */}
//             <div className="flex items-center w-[270px]">
//               <img
//                 src={flight.logo}
//                 alt={flight.airline}
//                 className="w-[44px] h-[44px] rounded-full mr-[12px] object-cover"
//               />
//               <div>
//                 <p className="font-semibold text-[16px] leading-[18px]">
//                   {flight.airline}
//                 </p>
//                 <div className="flex text-[12px] text-gray-500 mt-[3px]">
//                   <div className="flex items-center mr-4">
//                     <img
//                       src={CalendarIcon}
//                       alt="calendar"
//                       className="w-[12px] h-[12px] mr-[4px]"
//                     />
//                     {flight.date}
//                   </div>
//                   <div className="flex items-center">
//                     <img
//                       src={PeopleIcon}
//                       alt="people"
//                       className="w-[12px] h-[12px] mr-[4px]"
//                     />
//                     {flight.people}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <hr className="h-[70%] mx-4 border-l border-gray-300" />

//             {/* Departure */}
//             <div className="text-center w-[110px]">
//               <p className="text-[16px] font-semibold">
//                 {flight.departureTime}
//               </p>
//               <p className="text-[14px] text-gray-500">
//                 {flight.departureCity}
//               </p>
//             </div>

//             {/* Route Line with aligned codes */}
//             <div className="flex flex-col items-center w-[373px] relative">
//               <p className="text-[14px] text-black text-center mb-1">
//                 Duration: {flight.duration}
//               </p>
//               <div className="relative w-full">
//                 <img
//                   src={RedDottedLine}
//                   alt="dotted-line"
//                   className="w-full h-[6px] object-contain"
//                 />
//                 {/* Codes directly under dots */}
//                 <div className="absolute left-15 -bottom-[15px] text-[10px] text-gray-500">
//                   {flight.departureCode}
//                 </div>
//                 <div className="absolute right-15 -bottom-[15px] text-[10px] text-gray-500">
//                   {flight.arrivalCode}
//                 </div>
//               </div>
//             </div>

//             {/* Arrival */}
//             <div className="text-center w-[110px]">
//               <p className="text-[16px] font-semibold">{flight.arrivalTime}</p>
//               <p className="text-[14px] text-gray-500">{flight.arrivalCity}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";

// Local images
import CalendarIcon from "../../assets/images/agentdashboard/calendar.png";
import PeopleIcon from "../../assets/images/agentdashboard/people.png";
import RedDottedLine from "../../assets/images/agentdashboard/dottedline.png";
import CloudNineLogo from "../../assets/images/agentdashboard/flight1.png";
import RedWingLogo from "../../assets/images/agentdashboard/flight2.png";
import SkyHighLogo from "../../assets/images/agentdashboard/flight2.png";

const bookings = [
  {
    airline: "CloudNine Airlines",
    logo: CloudNineLogo,
    date: "15 Jun 2025",
    people: 80,
    departureTime: "9:00 AM",
    departureCity: "Paris",
    departureCode: "CDG",
    arrivalTime: "12:00 PM",
    arrivalCity: "New York",
    arrivalCode: "JFK",
    duration: "15 Hours",
  },
  {
    airline: "RedWing Airlines",
    logo: RedWingLogo,
    date: "15 Jun 2025",
    people: 102,
    departureTime: "10:00 AM",
    departureCity: "Hong Kong",
    departureCode: "KKG",
    arrivalTime: "7:00 PM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    duration: "9 Hours",
  },
  {
    airline: "SkyHigh Airlines",
    logo: SkyHighLogo,
    date: "15 Jun 2025",
    people: 56,
    departureTime: "7:00 AM",
    departureCity: "Frankfrut",
    departureCode: "FRA",
    arrivalTime: "3:00 PM",
    arrivalCity: "Bangkok",
    arrivalCode: "BKK",
    duration: "8 Hours",
  },
  {
    airline: "CloudNine Airlines",
    logo: CloudNineLogo,
    date: "15 Jun 2025",
    people: 80,
    departureTime: "9:00 AM",
    departureCity: "Paris",
    departureCode: "CDG",
    arrivalTime: "12:00 PM",
    arrivalCity: "New York",
    arrivalCode: "JFK",
    duration: "15 Hours",
  },
  {
    airline: "RedWing Airlines",
    logo: RedWingLogo,
    date: "15 Jun 2025",
    people: 102,
    departureTime: "10:00 AM",
    departureCity: "Hong Kong",
    departureCode: "KKG",
    arrivalTime: "7:00 PM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    duration: "9 Hours",
  },
  {
    airline: "SkyHigh Airlines",
    logo: SkyHighLogo,
    date: "15 Jun 2025",
    people: 56,
    departureTime: "7:00 AM",
    departureCity: "Frankfrut",
    departureCode: "FRA",
    arrivalTime: "3:00 PM",
    arrivalCity: "Bangkok",
    arrivalCode: "BKK",
    duration: "8 Hours",
  },
];

export default function RecentlyBookedFlights() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-[830px] font-[Lato]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-semibold">Recently Booked flights</h2>
        <div className="flex items-center border border-gray-300 px-4 py-1 rounded-lg text-[14px] font-medium">
          <img
            src={CalendarIcon}
            alt="calendar"
            className="w-[16px] h-[16px] mr-2"
          />
          1-8 July 2025
        </div>
      </div>

      {/* Scrollable Flight Cards */}
      <div
        className="space-y-4 pr-2 overflow-y-auto max-h-[320px] custom-scroll"
        style={{ scrollbarWidth: "thin" }}
      >
        {bookings.map((flight, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-4 border border-gray-300 rounded-[20px] h-[90px]"
          >
            {/* Airline Info */}
            <div className="flex items-center w-[270px]">
              <img
                src={flight.logo}
                alt={flight.airline}
                className="w-[44px] h-[44px] rounded-full mr-[12px] object-cover"
              />
              <div>
                <p className="font-semibold text-[16px] leading-[18px]">
                  {flight.airline}
                </p>
                <div className="flex text-[12px] text-gray-500 mt-[3px]">
                  <div className="flex items-center mr-4">
                    <img
                      src={CalendarIcon}
                      alt="calendar"
                      className="w-[12px] h-[12px] mr-[4px]"
                    />
                    {flight.date}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={PeopleIcon}
                      alt="people"
                      className="w-[12px] h-[12px] mr-[4px]"
                    />
                    {flight.people}
                  </div>
                </div>
              </div>
            </div>

            <hr className="h-[70%] mx-4 border-l border-gray-300" />

            {/* Departure */}
            <div className="text-center w-[110px]">
              <p className="text-[16px] font-semibold">
                {flight.departureTime}
              </p>
              <p className="text-[14px] text-gray-500">
                {flight.departureCity}
              </p>
            </div>

            {/* Route Line with aligned codes */}
            <div className="flex flex-col items-center w-[373px] relative">
              <p className="text-[14px] text-black text-center mb-1">
                Duration: {flight.duration}
              </p>
              <div className="relative w-full">
                <img
                  src={RedDottedLine}
                  alt="dotted-line"
                  className="w-full h-[6px] object-contain"
                />
                {/* Codes aligned to start/end of line */}
                <div className="absolute left-15 -bottom-[15px] text-[10px] text-gray-500">
                  {flight.departureCode}
                </div>
                <div className="absolute right-15 -bottom-[15px] text-[10px] text-gray-500">
                  {flight.arrivalCode}
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center w-[110px]">
              <p className="text-[16px] font-semibold">{flight.arrivalTime}</p>
              <p className="text-[14px] text-gray-500">{flight.arrivalCity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Custom scrollbar tailwind class (add in globals.css if needed) */}
      <style>
        {`
        .custom-scroll::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        `}
      </style>
    </div>
  );
}
