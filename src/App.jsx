import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import Aos from "aos";
import "./hook/I18n";

import RootLayout from "./RootLayout";
import WebsiteLayout from "./Layouts/WebsiteLayout";

import Home from "./pages/Home/Home";
import FlightList from "./pages/FlightsList/FlightList";
import FlightBooking from "./pages/FlightBooking/FlightBooking";

// Authentication Pages
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import LoginWithMobile from "./Authentication/LoginWithMobile";
import OTP_VerificationPage from "./Authentication/OTP_VerificationPage";
import ForgotPassword from "./Authentication/ForgotPassword";
import AgentKYCVerification from "./Authentication/AgentKYCVerification";
import KYCwaiting from "./Authentication/KYCwaiting";
// Booking sections
import ReviewYourBooking from "./pages/FlightBooking/ReviewYourBooking";
import TravelersDetails from "./pages/FlightBooking/TravelersDetails";
import SeatSelectionPage from "./pages/FlightBooking/SeatSelectionPage";
import PaymentPage from "./pages/FlightBooking/PaymentPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ScrollToHash from "./components/ScrollToHash";

import Dashboard from "./pages/Dashboard/Dashboard";
import AgentDashboardLayout from "./Layouts/AgentDashboardLayout";
import AgentFlightBooking from "./pages/AgentDashboard/FlightBooking/AgentFlightBooking";
import AgentPaymentPage from "./pages/AgentDashboard/FlightBooking/AgentPaymentPage";
import AgentReviewYourBooking from "./pages/AgentDashboard/FlightBooking/AgentReviewYourBooking";
import AgentTravelersDetails from "./pages/AgentDashboard/FlightBooking/AgentTravelersDetails";
import AgentSeatSelection from "./pages/AgentDashboard/FlightBooking/AgentSeatSelectionPage";
import AgentFlightList from "./pages/AgentDashboard/FlightsList/AgentFlightList";
import Agentsettings from "./pages/AgentDashboard/Agentsettings";
import AgentDashboard from "./pages/AgentDashboard/AgentDashboard";
import DestinationForm from "./pages/AgentDashboard/PackagePage/DestinationForm";
import AddPackageForm from "./pages/AgentDashboard/PackagePage/AddPackageForm";
import PackageSection from "./pages/AgentDashboard/PackagePage/PackageSection";
import AgentCRMpage from "./pages/AgentDashboard/AgentCRMpage";

import SupportTicket from "./pages/AgentDashboard/supportTicket/SupportTicket";
import TicketConfirm from "./pages/FlightBooking/TicketConfirm";
import TicketNotConfirm from "./pages/FlightBooking/TicketNotConfirm";
import ErrorPage from "./pages/ErrorPage";
import ExternalError from "./pages/FlightBooking/ExternalError";
import InternalError from "./pages/FlightBooking/InternalError";
import UserCancel from "./pages/FlightBooking/UserCancel";
import TicketPendingConfirmation from "./pages/FlightBooking/TicketPendingConfirmation";
import SupplierError from "./pages/FlightBooking/SupplierError";
import TermsofService from "./pages/Home/TermsofService";
import PrivacyPolicy from "./pages/Home/PrivacyPolicy";
import RefundPolicy from "./pages/Home/RefundPolicy";
import cookies from "js-cookie";
const App = () => {
  useEffect(() => {
    Aos.init({
      // once: true,
    });
  }, []);
  const [location, setLocation] = useState("Fetching location...");
  /* const cardApiUrl = import.meta.env.VITE_TRANSACTION_URL;
  const setToken = async () => {
    try {
      const res = await fetch(`${cardApiUrl}/injecttoken`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        console.log("Token Set!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!cookies.get("token")) {
    setToken();
  } */

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          // Reverse geocoding API
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          const data = await response.json();
          setLocation(data.countryCode);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Unable to fetch location");
        }
      );
    } else {
      setLocation("");
    }
  }, []);

  return (
    <>
      <ScrollToHash />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Website Route */}
          <Route path="" element={<WebsiteLayout />}>
            <Route index element={<Home country={location} />} />
            <Route path="/List" element={<FlightList country={location} />} />
            <Route path="/TermsofService" element={<TermsofService />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/RefundPolicy" element={<RefundPolicy />} />
            <Route path="/Booking" element={<FlightBooking />}>
              <Route path="ReviewYourBooking" element={<ReviewYourBooking />} />
              <Route
                path="TravelersDetails"
                element={<TravelersDetails country={location} />}
              />
              <Route path="SeatSelection" element={<SeatSelectionPage />} />
              <Route path="Payment" element={<PaymentPage />} />
            </Route>
            <Route path="ticketconfirm/:id" element={<TicketConfirm />} />
            <Route path="ticketnotconfirm" element={<TicketNotConfirm />} />
            <Route path="usercancelled" element={<UserCancel />} />
            <Route path="externalerror" element={<ExternalError />} />
            <Route path="internalerror" element={<InternalError />} />
            <Route
              path="ticketwaiting"
              element={<TicketPendingConfirmation />}
            />
            <Route path="UnconfirmedSupplier" element={<SupplierError />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="/Contact" element={<ContactUsPage />} />
          </Route>
          {/* Authentication Route */}
          <Route path="SignUp" element={<SignupPage />} />
          <Route path="Login" element={<LoginPage />} />
          <Route path="Login-with-mobile" element={<LoginWithMobile />} />
          <Route path="OTP-Verification" element={<OTP_VerificationPage />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route
            path="Agent-KYC-Verification"
            element={<AgentKYCVerification />}
          />
          <Route path="KYC-waiting" element={<KYCwaiting />} />
        </Route>

        {/*  Admin dashboard */}
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboardLayout />}>
          <Route path="agentsettings" element={<Agentsettings />} />
          <Route path="analytics" element={<AgentDashboard />} />
          <Route path="crm" element={<AgentCRMpage />} />

          <Route path="List" element={<FlightList />} />
          <Route index element={<AgentFlightList />} />
          <Route path="Booking" element={<AgentFlightBooking />}>
            <Route
              path="ReviewYourBooking"
              element={<AgentReviewYourBooking />}
            />
            <Route
              path="TravelersDetails"
              element={<AgentTravelersDetails />}
            />
            <Route path="SeatSelection" element={<AgentSeatSelection />} />
            <Route path="Payment" element={<AgentPaymentPage />} />
          </Route>
          {/* Agent Packages */}
          <Route path="agentPackages" element={<PackageSection />} />
          <Route
            path="agentPackages/AddDestination"
            element={<DestinationForm />}
          />
          <Route path="agentPackages/AddPackage" element={<AddPackageForm />} />
          <Route path="supportTicket" element={<SupportTicket />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
