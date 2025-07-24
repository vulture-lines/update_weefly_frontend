import DashboardCards from "./DashboardCards";
import DashboardInsights from "./DashboardInsights";
import RecentlyBookedFlights from "./RecentlyBookedFlights";
import RightSidebar from "./RightSidebar";

export default function AgentDashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen p-6">
      {/* Left Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        <DashboardCards />
        <DashboardInsights />
        <RecentlyBookedFlights />
      </div>

      {/* Right Sidebar with white background */}
      <div className="w-[300px] ">
        <RightSidebar />
      </div>
    </div>
  );
}
