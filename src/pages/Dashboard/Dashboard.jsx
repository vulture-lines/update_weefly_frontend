import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import BookingsList from "./BookingsList";
import FlightSchedule from "./FlightSchedule";

export default function Dashboard() {
  return (
    <div className="flex h-screen font-[Lato] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f9f9f9] p-4 overflow-y-scroll">
        {/* Top Header */}
        <Header />

        {/* Dashboard Metrics */}
        <StatsCards />
        <RevenueChart />
        {/* Charts and Booking + Schedule */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6 items-start justify-start">
          {/* Left: Chart + Bookings */}
          <div className="w-full">
            <BookingsList />
          </div>

          {/* Right: Flight Schedule */}
          <div className="w-full lg:w-1/3">
            <FlightSchedule />
          </div>
        </div>
      </div>
    </div>
  );
}
