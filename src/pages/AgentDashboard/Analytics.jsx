// import React, { useEffect, useState } from "react";

// // Image Imports
// import EarningsIcon from "../../assets/images/agentdashboard/earnings.png";
// import UsersIcon from "../../assets/images/agentdashboard/users.png";
// import EarthImage from "../../assets/images/agentdashboard/earth.png";
// import CalendarIcon from "../../assets/images/agentdashboard/calendar.png";
// import SearchIcon from "../../assets/images/agentdashboard/search.png";
// import FilterIcon from "../../assets/images/agentdashboard/filter.png";
// import PlusIcon from "../../assets/images/agentdashboard/plus.png";
// import Avatar1 from "../../assets/images/agentdashboard/avatar1.png";
// import Avatar2 from "../../assets/images/agentdashboard/avatar2.png";
// import Avatar3 from "../../assets/images/agentdashboard/avatar3.png";
// import CalendarImage from "../../assets/images/agentdashboard/calendar-img.png";
// import ChartImage from "../../assets/images/agentdashboard/chart.png";

// export default function AnalyticsPage() {
//   // States for dynamic data
//   const [summaryCards, setSummaryCards] = useState([]);
//   const [regionStats, setRegionStats] = useState([]);
//   const [flights, setFlights] = useState([]);
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     // Replace below with API fetch later
//     setSummaryCards([
//       {
//         title: "Total Earnings",
//         value: "$12,000",
//         icon: EarningsIcon,
//         growth: "12%",
//       },
//       { title: "Total Users", value: "200", icon: UsersIcon, growth: "8%" },
//       {
//         title: "Recurring Users",
//         value: "20",
//         icon: EarningsIcon,
//         growth: "5%",
//       },
//     ]);

//     setRegionStats([
//       { region: "North America", color: "bg-red-400" },
//       { region: "Southern America", color: "bg-orange-300" },
//       { region: "Africa", color: "bg-pink-400" },
//       { region: "Asia", color: "bg-yellow-400" },
//       { region: "Australia", color: "bg-purple-400" },
//     ]);

//     setFlights([
//       {
//         airline: "SkyHigh Airlines",
//         date: "15 Jun 2025",
//         avatar: Avatar1,
//         passengers: 56,
//         departureTime: "7:00 AM",
//         departureCity: "Frankfurt",
//         duration: "8 Hours",
//         arrivalTime: "3:00 PM",
//         arrivalCity: "Bangkok",
//         from: "FRA",
//         to: "BKK",
//       },
//       {
//         airline: "SkyHigh Airlines",
//         date: "17 Jun 2025",
//         avatar: Avatar2,
//         passengers: 48,
//         departureTime: "9:30 AM",
//         departureCity: "Dubai",
//         duration: "6.5 Hours",
//         arrivalTime: "4:00 PM",
//         arrivalCity: "Singapore",
//         from: "DXB",
//         to: "SIN",
//       },
//       {
//         airline: "SkyHigh Airlines",
//         date: "18 Jun 2025",
//         avatar: Avatar3,
//         passengers: 32,
//         departureTime: "6:00 AM",
//         departureCity: "Delhi",
//         duration: "9 Hours",
//         arrivalTime: "3:00 PM",
//         arrivalCity: "London",
//         from: "DEL",
//         to: "LHR",
//       },
//     ]);

//     setTickets([
//       {
//         airline: "SkyHigh Airlines",
//         from: "JFK",
//         to: "LAX",
//         departure: "New York - 10:00 AM",
//         arrival: "Los Angeles - 1:00 PM",
//         date: "July 1, 2025",
//         status: "Download Invoice",
//         statusStyle: "bg-orange-100 text-orange-600",
//       },
//       {
//         airline: "SkyHigh Airlines",
//         from: "ORD",
//         to: "MIA",
//         departure: "Chicago - 11:00 AM",
//         arrival: "Miami - 2:00 PM",
//         date: "July 2, 2025",
//         status: "Delayed",
//         statusStyle: "bg-gray-300 text-gray-700",
//       },
//       {
//         airline: "SkyHigh Airlines",
//         from: "DXB",
//         to: "BOM",
//         departure: "Dubai - 8:00 AM",
//         arrival: "Mumbai - 11:00 AM",
//         date: "July 3, 2025",
//         status: "In Air",
//         statusStyle: "bg-green-300 text-green-800",
//       },
//       {
//         airline: "SkyHigh Airlines",
//         from: "CDG",
//         to: "JFK",
//         departure: "Paris - 9:00 AM",
//         arrival: "New York - 1:00 PM",
//         date: "July 4, 2025",
//         status: "Scheduled",
//         statusStyle: "bg-yellow-300 text-yellow-800",
//       },
//     ]);
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-[#FAFAFA] px-6 py-6 font-[Lato]">
//       {/* Summary Cards */}
//       <div className="flex gap-6">
//         {summaryCards.map((card, idx) => (
//           <div
//             key={idx}
//             className="w-[255px] h-[117px] bg-white shadow rounded-xl p-4 flex justify-between items-start"
//           >
//             <div>
//               <div className="text-gray-500 text-sm">{card.title}</div>
//               <div className="text-2xl font-bold mt-1">{card.value}</div>
//               <div className="text-green-600 text-xs font-semibold mt-1 bg-green-100 px-2 py-[1px] rounded-full inline-block">
//                 {card.growth} ↑
//               </div>
//             </div>
//             <img src={card.icon} className="w-10 h-10" alt="" />
//           </div>
//         ))}
//       </div>

//       {/* Chart + Region */}
//       <div className="flex gap-6 mt-6">
//         <div className="bg-white rounded-xl p-6 w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-semibold text-lg">Sales performance</h2>
//             <select className="bg-gray-100 px-3 py-1 rounded text-sm">
//               <option>Yearly</option>
//             </select>
//           </div>
//           <img
//             src={ChartImage}
//             alt="Chart"
//             className="w-full h-[200px] object-contain"
//           />
//         </div>

//         <div className="bg-white rounded-xl p-6 w-[393px] h-[288px]">
//           <h2 className="font-semibold text-lg mb-4">
//             Traveler Origins by Region
//           </h2>
//           <img src={EarthImage} className="w-28 h-28 mx-auto" alt="Earth" />
//           <ul className="mt-4 text-sm space-y-1">
//             {regionStats.map((region, i) => (
//               <li key={i} className="flex justify-between">
//                 <span>{region.region}</span>
//                 <div className={`w-24 h-[3px] ${region.color} mt-2`} />
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Recently Booked Flights */}
//       <div className="bg-white rounded-xl mt-6 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-semibold text-lg">Recently Booked flights</h2>
//           <button className="flex items-center text-sm border px-3 py-1 rounded-md bg-white">
//             <img src={CalendarIcon} className="w-4 mr-2" alt="Calendar" />
//             1–8 July 2025
//           </button>
//         </div>

//         <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
//           {flights.map((flight, i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:shadow-md transition"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={flight.avatar}
//                   className="w-10 h-10 rounded-full"
//                   alt="Avatar"
//                 />
//                 <div>
//                   <div className="font-semibold">{flight.airline}</div>
//                   <div className="text-xs text-gray-400">{flight.date}</div>
//                   <div className="text-xs text-gray-400">
//                     👤 {flight.passengers}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-sm text-center">
//                 <div className="font-semibold">{flight.departureTime}</div>
//                 <div className="text-xs text-gray-500">
//                   {flight.departureCity}
//                 </div>
//               </div>
//               <div className="text-center text-sm">
//                 <div className="text-xs text-gray-500">
//                   Duration: {flight.duration}
//                 </div>
//                 <div className="flex justify-between items-center text-xs text-gray-600 mt-1">
//                   <span>{flight.from}</span>
//                   <div className="w-16 h-[1px] border-dashed border-t-2 border-red-400 mx-2 relative">
//                     <div className="w-2 h-2 bg-red-500 rounded-full absolute -left-1 -top-1" />
//                     <div className="w-2 h-2 bg-red-500 rounded-full absolute -right-1 -top-1" />
//                   </div>
//                   <span>{flight.to}</span>
//                 </div>
//               </div>
//               <div className="text-sm text-center">
//                 <div className="font-semibold">{flight.arrivalTime}</div>
//                 <div className="text-xs text-gray-500">
//                   {flight.arrivalCity}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Calendar and Tickets */}
//       <div className="flex mt-6 gap-4">
//         <div className="w-[263px] h-[240px] bg-white p-4 rounded-xl shadow">
//           <h2 className="text-sm font-bold mb-3">May 2023</h2>
//           <img
//             src={CalendarImage}
//             className="w-full h-full object-contain"
//             alt="Calendar"
//           />
//         </div>

//         <div className="w-[255px] bg-white rounded-xl shadow p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-sm font-bold">Booked Tickets</h2>
//             <div className="flex gap-2">
//               <img src={SearchIcon} className="w-4" alt="Search" />
//               <img src={FilterIcon} className="w-4" alt="Filter" />
//               <img src={PlusIcon} className="w-4" alt="Add" />
//             </div>
//           </div>

//           {tickets.map((ticket, i) => (
//             <div
//               key={i}
//               className={`rounded-lg border p-3 mb-3 ${ticket.statusStyle}`}
//             >
//               <div className="text-sm font-semibold">{ticket.airline}</div>
//               <div className="text-xs text-gray-500 mt-1">
//                 {ticket.from} → {ticket.to}
//               </div>
//               <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
//                 <span>{ticket.departure}</span>
//                 <span>{ticket.arrival}</span>
//               </div>
//               <div className="text-[10px] mt-1 text-gray-400">
//                 {ticket.date}
//               </div>
//               <div className="mt-2">
//                 <span
//                   className={`text-[10px] px-2 py-[2px] rounded-full ${ticket.statusStyle}`}
//                 >
//                   {ticket.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import WalletIcon from "../../assets/images/agentdashboard/earnings.png";
import UsersIcon from "../../assets/images/agentdashboard/earnings.png";
import RecurringIcon from "../../assets/images/agentdashboard/earnings.png";

const cardData = [
  {
    title: "Total Earnings",
    value: "$12,000",
    icon: WalletIcon,
    change: "12%",
  },
  {
    title: "Total Users",
    value: "200",
    icon: UsersIcon,
    change: "12%",
  },
  {
    title: "Recurring Users",
    value: "20",
    icon: RecurringIcon,
    change: "12%",
  },
];

export default function DashboardCards() {
  return (
    <div className="flex flex-wrap gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm px-6 py-5 flex items-center justify-between w-full max-w-xs"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <img src={card.icon} alt={card.title} className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
          </div>
          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
            {card.change} 🔼
          </span>
        </div>
      ))}
    </div>
  );
}
