import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function FlightSchedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const flightData = [
    {
      id: "1244595",
      status: "Waiting",
      image: "/assets/flight-new.png",
      logo: "/assets/Air-india.png",
    },
    {
      id: "1244596",
      status: "Waiting",
      image: "/assets/flight-new.png",
      logo: "/assets/Air-india.png",
    },
    {
      id: "1244597",
      status: "Waiting",
      image: "/assets/flight-new.png",
      logo: "/assets/Air-india.png",
    },
  ];

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.getDate());
    setFlights(flightData);
  }, []);

  const fetchFlightsForDate = (date) => {
    setLoading(true);
    setTimeout(() => {
      setFlights(flightData);
      setLoading(false);
    }, 1000);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    const selectedFullDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    fetchFlightsForDate(selectedFullDate);
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      calendarDays.push({
        day: prevMonthLastDate - adjustedFirstDay + i + 1,
        currentMonth: false,
      });
    }
    for (let i = 1; i <= lastDate; i++) {
      calendarDays.push({ day: i, currentMonth: true });
    }
    const remainingCells = 42 - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({ day: i, currentMonth: false });
    }

    return calendarDays;
  };

  const formatMonth = () => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(currentMonth);
  };

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const calendarDays = generateCalendar();

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-start min-h-screen p-4">
      <div className="bg-white border border-gray-100 rounded-xl shadow-md w-[350px]">
        <div className="px-6 pt-5 pb-4">
          <h2 className="text-xl font-bold">Flight Schedule</h2>
        </div>

        <div className="w-full h-[360px] bg-white px-5 pt-5 pb-5 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">{formatMonth()}</div>
            <div className="flex gap-4">
              <button
                onClick={prevMonth}
                className="text-gray-400 hover:text-gray-600"
              >
                &lt;
              </button>
              <button
                onClick={nextMonth}
                className="text-gray-400 hover:text-gray-600"
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {days.map((day, index) => (
              <div
                key={index}
                className="text-center font-medium text-gray-700 py-1 text-sm"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => day.currentMonth && handleDateSelect(day.day)}
                className={`h-[42px] flex items-center justify-center border border-gray-100 cursor-pointer text-sm
                ${
                  !day.currentMonth
                    ? "bg-gray-100 text-gray-300"
                    : "text-gray-700"
                }
                ${
                  day.currentMonth && day.day === selectedDate
                    ? "bg-orange-500 text-white font-semibold"
                    : ""
                }`}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pt-6 pb-3">
          <h2 className="text-xl font-bold">Flight Details</h2>
        </div>

        <div
          className="px-4 scroll-thin overflow-y-auto"
          style={{ maxHeight: "320px" }}
        >
          <div className="space-y-4 pb-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <ClipLoader color="#EF5B25" size={35} />
              </div>
            ) : (
              flights.map((flight, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start w-full bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3"
                  style={{ height: "105px" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden border border-gray-200">
                      <img
                        src={flight.image}
                        alt="Flight"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <img
                        src={flight.logo}
                        alt="Airline"
                        className="h-8 object-contain mb-1 "
                      />
                      <div className="text-gray-500 text-sm">{flight.id}</div>
                      <div className="text-orange-500 text-sm underline font-medium whitespace-nowrap">
                        View details
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center ml-auto">
                    <span className="text-sm text-gray-500 mb-1 mr-9">
                      Status :
                    </span>
                    <div className="bg-[#008905] text-white text-sm px-4 py-1.5 rounded-lg whitespace-nowrap">
                      {flight.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
