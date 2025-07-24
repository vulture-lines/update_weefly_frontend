import { useEffect, useState } from "react";
import NotificationIcon from "../../assets/images/admindashboard/notification.png";
import HelpIcon from "../../assets/images/admindashboard/help-1.png";
import ProfilePic from "../../assets/images/admindashboard/profile.jpg";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      setCurrentTime(time);
      setCurrentDate(date);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 py-4 ">
      {/* Header Row */}
      <div className="flex justify-between items-start w-full relative">
        {/* Left Side */}
        <div className="flex flex-col">
          <p className="text-[20px] font-semibold">Dashboard</p>
          <div className="mt-12">
            <p className="text-[15px] font-medium">
              <span className="text-[#f9632c] font-semibold">Welcome,</span>{" "}
              john brevis
            </p>
            <p className="text-sm text-gray-400">Good morning</p>
          </div>
        </div>

        {/* Centered Search Bar */}
        <div className="absolute left-6 top-0">
          <input
            type="text"
            placeholder="🔍 Search here..."
            className="w-[484px] h-[41px] px-4 py-2 rounded-md bg-[#f1f1f1] text-sm outline-none"
          />
        </div>

        {/* Right Side: Profile, Icons, Time */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <img
              src={NotificationIcon}
              alt="Notification"
              className="w-[32px] h-[32px]"
            />
            <img src={HelpIcon} alt="Help" className="w-[32px] h-[32px]" />

            <div className="flex items-center gap-2 border px-3 py-[6px] rounded-md shadow-sm bg-white min-w-[160px]">
              <img
                src={ProfilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm leading-tight ">
                <p className="font-medium leading-none">John brevis</p>
                <p className="text-gray-400 text-xs leading-none mt-[2px]">
                  Admin
                </p>
              </div>
            </div>
          </div>

          <div className="text-right mr-8 mt-12">
            <p className="font-semibold text-sm">{currentTime}</p>
            <p className="text-xs text-gray-500">{currentDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
