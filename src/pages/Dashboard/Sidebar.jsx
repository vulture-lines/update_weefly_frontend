import Logo from "../../assets/images/admindashboard/logo.png"; // Your WeeFly logo

// Local PNG Icons
// import DashboardIcon from "../../assets/images/admindashboard/dashboard.png";
import FlightIcon from "../../assets/images/admindashboard/flight.png";
import BookingIcon from "../../assets/images/admindashboard/bookings.png";
import PassengerIcon from "../../assets/images/admindashboard/passengerdetails.png";
import AnalyticsIcon from "../../assets/images/admindashboard/analytics.png";
import SettingsIcon from "../../assets/images/admindashboard/settings.png";
import HelpIcon from "../../assets/images/admindashboard/help.png";
import LogoutIcon from "../../assets/images/admindashboard/logout.png";

const navItems = [
  //   { label: "Dashboard", icon: DashboardIcon, active: true },
  { label: "Flight", icon: FlightIcon },
  { label: "Bookings", icon: BookingIcon },
  { label: "Passenger details", icon: PassengerIcon },
  { label: "Analytics", icon: AnalyticsIcon },
  { label: "Settings", icon: SettingsIcon },
  { label: "Help", icon: HelpIcon },
  { label: "Logout", icon: LogoutIcon },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md px-6 py-6 flex flex-col items-start font-[Lato]">
      {/* Logo */}
      <img src={Logo} alt="WeeFly Logo" className="w-28 mb-8 ml-5" />

      {/* Menu Items */}
      {navItems.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 w-full px-4 py-2 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
            item.active
              ? "bg-[#f9632c] text-white font-semibold"
              : "text-gray-600 hover:bg-orange-100"
          }`}
        >
          <img src={item.icon} alt={`${item.label} icon`} className="w-5 h-5" />
          <span className="text-[15px]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
