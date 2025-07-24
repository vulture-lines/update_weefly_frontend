// // import React, { useState } from "react";
// // import {
// //   Search,
// //   SlidersHorizontal,
// //   ChevronLeft,
// //   ChevronRight,
// // } from "lucide-react";

// // const tickets = [
// //   {
// //     id: 1,
// //     from: "JFK",
// //     to: "LAX",
// //     airline: "SkyHigh Airlines",
// //     departure: "New York – 10:00 AM",
// //     arrival: "Los Angeles – 1:00 PM",
// //     date: "July 1, 2025",
// //     status: "Download Invoice",
// //   },
// //   {
// //     id: 2,
// //     from: "LHR",
// //     to: "JFK",
// //     airline: "FlyFast Airways",
// //     departure: "London – 8:00 AM",
// //     arrival: "New York – 11:00 AM",
// //     date: "July 1, 2025",
// //     status: "Download Invoice",
// //   },
// //   {
// //     id: 3,
// //     from: "HND",
// //     to: "SFO",
// //     airline: "AeroJet",
// //     departure: "Tokyo – 2:00 PM",
// //     arrival: "SanFrancisco – 8:00 AM",
// //     date: "July 1, 2025",
// //     status: "Download Invoice",
// //   },
// //   {
// //     id: 4,
// //     from: "SYD",
// //     to: "SIN",
// //     airline: "Nimbus Airlines",
// //     departure: "Sydney – 8:00 PM",
// //     arrival: "Singapore – 12:00 AM",
// //     date: "July 1, 2025",
// //     status: "Download Invoice",
// //   },
// // ];

// // const CustomCalendar = ({ value, onChange }) => {
// //   const [currentDate, setCurrentDate] = useState(
// //     value || new Date(2023, 4, 18)
// //   );
// //   const [selectedDate, setSelectedDate] = useState(18);

// //   const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
// //   const months = [
// //     "January",
// //     "February",
// //     "March",
// //     "April",
// //     "May",
// //     "June",
// //     "July",
// //     "August",
// //     "September",
// //     "October",
// //     "November",
// //     "December",
// //   ];

// //   const goToPreviousMonth = () => {
// //     const newDate = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth() - 1,
// //       1
// //     );
// //     setCurrentDate(newDate);
// //     if (onChange) onChange(newDate);
// //   };

// //   const goToNextMonth = () => {
// //     const newDate = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth() + 1,
// //       1
// //     );
// //     setCurrentDate(newDate);
// //     if (onChange) onChange(newDate);
// //   };

// //   const generateCalendarDays = () => {
// //     const year = currentDate.getFullYear();
// //     const month = currentDate.getMonth();
// //     const firstDay = new Date(year, month, 1);
// //     const lastDay = new Date(year, month + 1, 0);
// //     const daysInMonth = lastDay.getDate();
// //     let startingDay = (firstDay.getDay() + 6) % 7;

// //     const days = [];
// //     const prevMonth = new Date(year, month - 1, 0);
// //     const prevMonthDays = prevMonth.getDate();

// //     for (let i = startingDay - 1; i >= 0; i--) {
// //       days.push({
// //         day: prevMonthDays - i,
// //         isCurrentMonth: false,
// //         isSelected: false,
// //       });
// //     }

// //     for (let day = 1; day <= daysInMonth; day++) {
// //       days.push({
// //         day,
// //         isCurrentMonth: true,
// //         isSelected:
// //           selectedDate === day &&
// //           currentDate.getMonth() === 4 &&
// //           currentDate.getFullYear() === 2023,
// //       });
// //     }

// //     const totalCells = 42;
// //     const remainingCells = totalCells - days.length;

// //     for (let day = 1; day <= remainingCells; day++) {
// //       days.push({ day, isCurrentMonth: false, isSelected: false });
// //     }

// //     return days.slice(0, 35);
// //   };

// //   const handleDateClick = (day, isCurrentMonth) => {
// //     if (isCurrentMonth) {
// //       setSelectedDate(day);
// //       const newDate = new Date(
// //         currentDate.getFullYear(),
// //         currentDate.getMonth(),
// //         day
// //       );
// //       if (onChange) onChange(newDate);
// //     }
// //   };

// //   const calendarDays = generateCalendarDays();

// //   return (
// //     <div className="w-full">
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-lg font-semibold text-gray-800">
// //           {months[currentDate.getMonth()]} {currentDate.getFullYear()}
// //         </h2>
// //         <div className="flex items-center space-x-2">
// //           <button
// //             onClick={goToPreviousMonth}
// //             className="p-1 hover:bg-gray-100 rounded"
// //           >
// //             <ChevronLeft size={18} className="text-gray-600" />
// //           </button>
// //           <button
// //             onClick={goToNextMonth}
// //             className="p-1 hover:bg-gray-100 rounded"
// //           >
// //             <ChevronRight size={18} className="text-gray-600" />
// //           </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-7 border border-gray-200">
// //         {daysOfWeek.map((day) => (
// //           <div
// //             key={day}
// //             className="text-center text-xs font-medium text-gray-600 py-2 border-r border-gray-200 last:border-r-0 bg-gray-50"
// //           >
// //             {day}
// //           </div>
// //         ))}
// //       </div>

// //       <div className="grid grid-cols-7 border-l border-r border-b border-gray-200 bg-white">
// //         {calendarDays.map((date, index) => (
// //           <div
// //             key={index}
// //             onClick={() => handleDateClick(date.day, date.isCurrentMonth)}
// //             className={`h-8 flex items-center justify-center text-xs cursor-pointer border-r border-b border-gray-200 last:border-r-0 transition-colors
// //               ${
// //                 date.isSelected
// //                   ? "bg-[#F05A28] text-white font-semibold"
// //                   : date.isCurrentMonth
// //                   ? "text-gray-800 hover:bg-gray-100 bg-white"
// //                   : "text-gray-400 hover:bg-gray-50 bg-gray-50"
// //               }`}
// //           >
// //             {date.day}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default function RightSidebar() {
// //   const [date, setDate] = useState(new Date());

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm p-4 w-full md:w-[300px] space-y-6 font-[Lato]">
// //       {/* Calendar */}
// //       <div>
// //         <CustomCalendar value={date} onChange={setDate} />
// //       </div>

// //       {/* Booked Tickets */}
// //       <div className="rounded-xl bg-white p-4 h-[650px] flex flex-col">
// //         <h2 className="text-[16px] font-semibold mb-3">Booked Tickets</h2>

// //         <div className="flex items-center bg-[#f3f3f3] rounded-lg overflow-hidden mb-4 px-2">
// //           <Search size={16} className="text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="search flight"
// //             className="w-full bg-transparent outline-none text-sm px-2 py-1"
// //           />
// //           <SlidersHorizontal size={16} className="text-gray-500 mr-2" />
// //           <button className="bg-[#F05A28] text-white text-sm w-6 h-6 rounded-md flex items-center justify-center font-bold">
// //             +
// //           </button>
// //         </div>

// //         <div
// //           className="space-y-3 overflow-y-auto pr-1"
// //           style={{ scrollbarWidth: "thin" }}
// //         >
// //           {tickets.map((ticket, index) => (
// //             <div
// //               key={ticket.id}
// //               className={`p-3 rounded-md ${
// //                 index === 0 ? "border border-orange-500" : "bg-[#fefafa]"
// //               }`}
// //             >
// //               <div className="flex justify-between items-center mb-1">
// //                 <p className="text-xs">
// //                   {ticket.from} → {ticket.to}
// //                 </p>
// //                 <button className="text-white bg-[#F05A28] text-[10px] px-2 py-[3px] rounded-md">
// //                   {ticket.status}
// //                 </button>
// //               </div>
// //               <p className="text-sm font-semibold mb-[6px]">{ticket.airline}</p>
// //               <div className="flex justify-between text-[11px] text-gray-700 border-t border-gray-300 pt-2">
// //                 <div>
// //                   <p className="text-gray-400 mb-1">Departure</p>
// //                   <p className="font-semibold">{ticket.departure}</p>
// //                   <p className="text-gray-500">{ticket.date}</p>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="text-gray-400 mb-1">Arrival</p>
// //                   <p className="font-semibold">{ticket.arrival}</p>
// //                   <p className="text-gray-500">{ticket.date}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <style>
// //         {`
// //           .overflow-y-auto::-webkit-scrollbar {
// //             width: 6px;
// //           }
// //           .overflow-y-auto::-webkit-scrollbar-thumb {
// //             background-color: #ccc;
// //             border-radius: 10px;
// //           }
// //           .overflow-y-auto::-webkit-scrollbar-track {
// //             background-color: transparent;
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import {
//   Search,
//   SlidersHorizontal,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const tickets = [
//   {
//     id: 1,
//     from: "JFK",
//     to: "LAX",
//     airline: "SkyHigh Airlines",
//     departure: "New York – 10:00 AM",
//     arrival: "Los Angeles – 1:00 PM",
//     date: "July 1, 2025",
//     status: "Download Invoice",
//   },
//   {
//     id: 2,
//     from: "LHR",
//     to: "JFK",
//     airline: "FlyFast Airways",
//     departure: "London – 8:00 AM",
//     arrival: "New York – 11:00 AM",
//     date: "July 1, 2025",
//     status: "Download Invoice",
//   },
//   {
//     id: 3,
//     from: "HND",
//     to: "SFO",
//     airline: "AeroJet",
//     departure: "Tokyo – 2:00 PM",
//     arrival: "SanFrancisco – 8:00 AM",
//     date: "July 1, 2025",
//     status: "Download Invoice",
//   },
//   {
//     id: 4,
//     from: "SYD",
//     to: "SIN",
//     airline: "Nimbus Airlines",
//     departure: "Sydney – 8:00 PM",
//     arrival: "Singapore – 12:00 AM",
//     date: "July 1, 2025",
//     status: "Download Invoice",
//   },
// ];

// const CustomCalendar = ({ value, onChange }) => {
//   const [currentDate, setCurrentDate] = useState(
//     value || new Date(2023, 4, 18)
//   );
//   const [selectedDate, setSelectedDate] = useState(18);

//   const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const goToPreviousMonth = () => {
//     const newDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() - 1,
//       1
//     );
//     setCurrentDate(newDate);
//     if (onChange) onChange(newDate);
//   };

//   const goToNextMonth = () => {
//     const newDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       1
//     );
//     setCurrentDate(newDate);
//     if (onChange) onChange(newDate);
//   };

//   const generateCalendarDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     let startingDay = (firstDay.getDay() + 6) % 7;

//     const days = [];
//     const prevMonth = new Date(year, month - 1, 0);
//     const prevMonthDays = prevMonth.getDate();

//     for (let i = startingDay - 1; i >= 0; i--) {
//       days.push({
//         day: prevMonthDays - i,
//         isCurrentMonth: false,
//         isSelected: false,
//       });
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push({
//         day,
//         isCurrentMonth: true,
//         isSelected:
//           selectedDate === day &&
//           currentDate.getMonth() === 4 &&
//           currentDate.getFullYear() === 2023,
//       });
//     }

//     const totalCells = 42;
//     const remainingCells = totalCells - days.length;

//     for (let day = 1; day <= remainingCells; day++) {
//       days.push({ day, isCurrentMonth: false, isSelected: false });
//     }

//     return days.slice(0, 35);
//   };

//   const handleDateClick = (day, isCurrentMonth) => {
//     if (isCurrentMonth) {
//       setSelectedDate(day);
//       const newDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         day
//       );
//       if (onChange) onChange(newDate);
//     }
//   };

//   const calendarDays = generateCalendarDays();

//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">
//           {months[currentDate.getMonth()]} {currentDate.getFullYear()}
//         </h2>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={goToPreviousMonth}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <ChevronLeft size={18} className="text-gray-600" />
//           </button>
//           <button
//             onClick={goToNextMonth}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <ChevronRight size={18} className="text-gray-600" />
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-7 border border-gray-200">
//         {daysOfWeek.map((day) => (
//           <div
//             key={day}
//             className="text-center text-xs font-medium text-gray-600 py-2 border-r border-gray-200 last:border-r-0 bg-gray-50"
//           >
//             {day}
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 border-l border-r border-b border-gray-200 bg-white">
//         {calendarDays.map((date, index) => (
//           <div
//             key={index}
//             onClick={() => handleDateClick(date.day, date.isCurrentMonth)}
//             className={`h-8 flex items-center justify-center text-xs cursor-pointer border-r border-b border-gray-200 last:border-r-0 transition-colors
//               ${
//                 date.isSelected
//                   ? "bg-[#F05A28] text-white font-semibold"
//                   : date.isCurrentMonth
//                   ? "text-gray-800 hover:bg-gray-100 bg-white"
//                   : "text-gray-400 hover:bg-gray-50 bg-gray-50"
//               }`}
//           >
//             {date.day}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function RightSidebar() {
//   const [date, setDate] = useState(new Date());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [ticketList, setTicketList] = useState(tickets);

//   const handleDownloadInvoice = (ticket) => {
//     console.log("Downloading invoice for:", ticket);
//     // Future: connect to backend to download ticket invoice
//   };

//   const handleAddTicket = () => {
//     console.log("Add new ticket clicked");
//     // Future: open form/modal to add new ticket
//   };

//   const filteredTickets = ticketList.filter(
//     (ticket) =>
//       ticket.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ticket.to.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 w-full md:w-[300px] space-y-6 font-[Lato]">
//       {/* Calendar */}
//       <div>
//         <CustomCalendar value={date} onChange={setDate} />
//       </div>

//       {/* Booked Tickets */}
//       <div className="rounded-xl bg-white p-4 h-[650px] flex flex-col">
//         <h2 className="text-[16px] font-semibold mb-3">Booked Tickets</h2>

//         <div className="flex items-center bg-[#f3f3f3] rounded-lg overflow-hidden mb-4 px-2">
//           <Search size={16} className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="search flight"
//             className="w-full bg-transparent outline-none text-sm px-2 py-1"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <SlidersHorizontal size={16} className="text-gray-500 mr-2" />
//           <button
//             className="bg-[#F05A28] text-white text-sm w-6 h-6 rounded-md flex items-center justify-center font-bold"
//             onClick={handleAddTicket}
//           >
//             +
//           </button>
//         </div>

//         <div
//           className="space-y-3 overflow-y-auto pr-1"
//           style={{ scrollbarWidth: "thin" }}
//         >
//           {filteredTickets.map((ticket, index) => (
//             <div
//               key={ticket.id}
//               className={`p-3 rounded-md ${
//                 index === 0 ? "border border-orange-500" : "bg-[#fefafa]"
//               }`}
//             >
//               <div className="flex justify-between items-center mb-1">
//                 <p className="text-xs">
//                   {ticket.from} → {ticket.to}
//                 </p>
//                 <button
//                   className="text-white bg-[#F05A28] text-[10px] px-2 py-[3px] rounded-md"
//                   onClick={() => handleDownloadInvoice(ticket)}
//                 >
//                   {ticket.status}
//                 </button>
//               </div>
//               <p className="text-sm font-semibold mb-[6px]">{ticket.airline}</p>
//               <div className="flex justify-between text-[11px] text-gray-700 border-t border-gray-300 pt-2">
//                 <div>
//                   <p className="text-gray-400 mb-1">Departure</p>
//                   <p className="font-semibold">{ticket.departure}</p>
//                   <p className="text-gray-500">{ticket.date}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-gray-400 mb-1">Arrival</p>
//                   <p className="font-semibold">{ticket.arrival}</p>
//                   <p className="text-gray-500">{ticket.date}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>
//         {`
//           .overflow-y-auto::-webkit-scrollbar {
//             width: 6px;
//           }
//           .overflow-y-auto::-webkit-scrollbar-thumb {
//             background-color: #ccc;
//             border-radius: 10px;
//           }
//           .overflow-y-auto::-webkit-scrollbar-track {
//             background-color: transparent;
//           }
//         `}
//       </style>
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const initialTickets = [
  {
    id: 1,
    from: "JFK",
    to: "LAX",
    airline: "SkyHigh Airlines",
    departure: "New York – 10:00 AM",
    arrival: "Los Angeles – 1:00 PM",
    date: "July 1, 2025",
    status: "Download Invoice",
  },
  {
    id: 2,
    from: "LHR",
    to: "JFK",
    airline: "FlyFast Airways",
    departure: "London – 8:00 AM",
    arrival: "New York – 11:00 AM",
    date: "July 1, 2025",
    status: "Download Invoice",
  },
  {
    id: 3,
    from: "HND",
    to: "SFO",
    airline: "AeroJet",
    departure: "Tokyo – 2:00 PM",
    arrival: "SanFrancisco – 8:00 AM",
    date: "July 1, 2025",
    status: "Download Invoice",
  },
  {
    id: 4,
    from: "SYD",
    to: "SIN",
    airline: "Nimbus Airlines",
    departure: "Sydney – 8:00 PM",
    arrival: "Singapore – 12:00 AM",
    date: "July 1, 2025",
    status: "Download Invoice",
  },
];

const CustomCalendar = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(
    value || new Date(2023, 4, 18)
  );
  const [selectedDate, setSelectedDate] = useState(18);

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goToPreviousMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
    if (onChange) onChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
    if (onChange) onChange(newDate);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDay = (firstDay.getDay() + 6) % 7;

    const days = [];
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isSelected:
          selectedDate === day &&
          currentDate.getMonth() === 4 &&
          currentDate.getFullYear() === 2023,
      });
    }

    const totalCells = 42;
    const remainingCells = totalCells - days.length;

    for (let day = 1; day <= remainingCells; day++) {
      days.push({ day, isCurrentMonth: false, isSelected: false });
    }

    return days.slice(0, 35);
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(day);
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      if (onChange) onChange(newDate);
    }
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border border-gray-200">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2 border-r border-gray-200 last:border-r-0 bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-l border-r border-b border-gray-200 bg-white">
        {calendarDays.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date.day, date.isCurrentMonth)}
            className={`h-8 flex items-center justify-center text-xs cursor-pointer border-r border-b border-gray-200 last:border-r-0 transition-colors
              ${
                date.isSelected
                  ? "bg-[#F05A28] text-white font-semibold"
                  : date.isCurrentMonth
                  ? "text-gray-800 hover:bg-gray-100 bg-white"
                  : "text-gray-400 hover:bg-gray-50 bg-gray-50"
              }`}
          >
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function RightSidebar() {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketList, setTicketList] = useState(initialTickets);

  const handleDownloadInvoice = (ticket) => {
    console.log("Downloading invoice for:", ticket);
    alert(
      `Invoice downloaded for ${ticket.airline} (${ticket.from} → ${ticket.to})`
    );
  };

  const handleAddTicket = () => {
    console.log("Add new ticket clicked");
    // Later: open a modal or redirect to ticket form
  };

  const filteredTickets = ticketList.filter(
    (ticket) =>
      ticket.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full md:w-[300px] space-y-6 font-[Lato]">
      {/* Calendar */}
      <div>
        <CustomCalendar value={date} onChange={setDate} />
      </div>

      {/* Booked Tickets */}
      <div className="rounded-xl bg-white p-4 h-[650px] flex flex-col">
        <h2 className="text-[16px] font-semibold mb-3">Booked Tickets</h2>

        <div className="flex items-center bg-[#f3f3f3] rounded-lg overflow-hidden mb-4 px-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="search flight"
            className="w-full bg-transparent outline-none text-sm px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SlidersHorizontal size={16} className="text-gray-500 mr-2" />
          <button
            className="bg-[#F05A28] text-white text-sm w-6 h-6 rounded-md flex items-center justify-center font-bold"
            onClick={handleAddTicket}
          >
            +
          </button>
        </div>

        <div
          className="space-y-3 overflow-y-auto pr-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {filteredTickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className={`p-3 rounded-md ${
                index === 0 ? "border border-orange-500" : "bg-[#fefafa]"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs">
                  {ticket.from} → {ticket.to}
                </p>
                <button
                  className="text-white bg-[#F05A28] text-[10px] px-2 py-[3px] cursor-pointer rounded-md"
                  onClick={() => handleDownloadInvoice(ticket)}
                >
                  {ticket.status}
                </button>
              </div>
              <p className="text-sm font-semibold mb-[6px]">{ticket.airline}</p>
              <div className="flex justify-between text-[11px] text-gray-700 border-t border-gray-300 pt-2">
                <div>
                  <p className="text-gray-400 mb-1">Departure</p>
                  <p className="font-semibold">{ticket.departure}</p>
                  <p className="text-gray-500">{ticket.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 mb-1">Arrival</p>
                  <p className="font-semibold">{ticket.arrival}</p>
                  <p className="text-gray-500">{ticket.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 10px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background-color: transparent;
          }
        `}
      </style>
    </div>
  );
}
