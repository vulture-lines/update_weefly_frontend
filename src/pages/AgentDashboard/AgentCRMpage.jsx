import React from "react";
import DummyProfile from "../../assets/images/agentdashboard/dummyProfile.jpeg";
const AgentCRMpage = () => {
  const bookingData = [
    {
      bookingId: "#WF123456",
      customer: "John D.",
      destination: "Dubai",
      status: "Confirmed",
      date: "20-Jun-2025",
    },
    {
      bookingId: "#WF123457",
      customer: "Emily R.",
      destination: "Paris",
      status: "Pending",
      date: "22-Jun-2025",
    },
    {
      bookingId: "#WF123458",
      customer: "Michael B.",
      destination: "New York",
      status: "Cancelled",
      date: "25-Jun-2025",
    },
    {
      bookingId: "#WF123459",
      customer: "Sophia L.",
      destination: "London",
      status: "Confirmed",
      date: "18-Jun-2025",
    },
    {
      bookingId: "#WF123460",
      customer: "Chris P.",
      destination: "Tokyo",
      status: "Pending",
      date: "19-Jun-2025",
    },
    {
      bookingId: "#WF123461",
      customer: "Lisa M.",
      destination: "Sydney",
      status: "Confirmed",
      date: "24-Jun-2025",
    },
    {
      bookingId: "#WF123462",
      customer: "David K.",
      destination: "Rome",
      status: "Confirmed",
      date: "21-Jun-2025",
    },
    {
      bookingId: "#WF123463",
      customer: "Olivia N.",
      destination: "Singapore",
      status: "Pending",
      date: "23-Jun-2025",
    },
    {
      bookingId: "#WF123464",
      customer: "James T.",
      destination: "Berlin",
      status: "Cancelled",
      date: "26-Jun-2025",
    },
    {
      bookingId: "#WF123465",
      customer: "Emma W.",
      destination: "Barcelona",
      status: "Confirmed",
      date: "20-Jun-2025",
    },
    {
      bookingId: "#WF123466",
      customer: "Noah H.",
      destination: "Amsterdam",
      status: "Pending",
      date: "27-Jun-2025",
    },
    {
      bookingId: "#WF123467",
      customer: "Ava C.",
      destination: "Istanbul",
      status: "Confirmed",
      date: "28-Jun-2025",
    },
    {
      bookingId: "#WF123468",
      customer: "William G.",
      destination: "Bangkok",
      status: "Cancelled",
      date: "29-Jun-2025",
    },
    {
      bookingId: "#WF123469",
      customer: "Mia S.",
      destination: "Toronto",
      status: "Pending",
      date: "30-Jun-2025",
    },
    {
      bookingId: "#WF123470",
      customer: "Henry V.",
      destination: "Los Angeles",
      status: "Confirmed",
      date: "01-Jul-2025",
    },
  ];

  return (
    <div className="px-8 h-[90vh] overflow-auto scroll-auto bg-scroll ">
      <div className="w-full border-2 border-gray-200 rounded-2xl p-8">
        <h1 className="text-xl font-semibold mb-4">Recent Bookings</h1>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Enter ID"
            className="bg-[#F7F5F5] w-full max-w-[400px] font-semibold placeholder:text-gray-500 text-gray-500 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-[#EE5128] focus:border-transparent"
          />
          <select
            name=""
            id=""
            className=" font-semibold placeholder:text-gray-500 text-gray-500 rounded-lg px-4 py-2 w-[200px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EE5128] focus:border-transparent"
          >
            <option value="">This month</option>
          </select>
        </div>

        {/* Table */}
        <table className="table table-fixed w-full mt-6 text-left ">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="py-5">Booking ID</th>
              <th>Customer</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="overflow-y-hidden h-[80%]">
            {bookingData.map((booking, index) => (
              <tr key={index} className="">
                <td className="py-5">{booking.bookingId}</td>
                <td>
                  {" "}
                  <img
                    src={DummyProfile}
                    alt="Dummyprofile"
                    height={32}
                    width={32}
                    className="rounded-full inline-block mr-2"
                  />{" "}
                  {booking.customer}
                </td>
                <td>{booking.destination}</td>
                <td>{booking.status}</td>
                <td>{booking.date}</td>
                <td>
                  <button className="text-white bg-[#EE5128] px-8 py-1 rounded-md font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentCRMpage;
