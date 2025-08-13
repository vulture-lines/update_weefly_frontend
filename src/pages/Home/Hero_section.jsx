
import {
  ArrowLeftRightIcon,
  MapPin,
  Minus,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PaperDesktop from "../../assets/images/paper.svg";
import PaperMobile from "../../assets/images/paper-mobile.png";
import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
import LandingPlane from "../../assets/images/LandingPlane.svg";
import DateFrom from "../../assets/images/DateFrom.svg";
import DateTo from "../../assets/images/DateTo.svg";
import TravelerIcon from "../../assets/images/TravelerIcon.svg";
import BannerBottom from "../../assets/images/banner-bottom.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";
import { useTranslation } from "react-i18next";
import {
  fetchExchangeRates,
  convertToRequestedCurrency,
} from "../../utils/Currencyconverter";
import airportsData from "../../constants/airports.json";
import axios from "axios";
import { GridLoader } from "react-spinners";
import Noflight from "../../assets/images/noflight.jpg";

// Canvas Confetti Effect Component - Updated to start from "Join millions" text line
const CanvasConfettiEffect = ({ isActive, triggerKey }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const confettiPiecesRef = useRef([]);

  useEffect(() => {
    if (isActive && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Clear any existing confetti
      confettiPiecesRef.current = [];

      // Create confetti pieces starting from popup center
      const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
        "#54a0ff",
        "#ea580c",
        "#f97316",
        "#fb923c",
      ];
      const shapes = ["square", "circle", "triangle"];

      // Calculate position below "Join millions of happy travelers worldwide" text
      // Try to find the actual text element for precise positioning
      let textLineY = canvas.height / 2 + 20; // Default fallback position
      let popupCenterX = canvas.width / 2; // Default center

      // Try to get exact position of the text element
      const textElement = document.getElementById("confetti-source-text");
      if (textElement) {
        const rect = textElement.getBoundingClientRect();
        popupCenterX = rect.left + rect.width / 2; // Center of text horizontally
        textLineY = rect.bottom + 10; // Just below the text
      }

      for (let i = 0; i < 150; i++) {
        // Increased count for better effect
        confettiPiecesRef.current.push({
          // Start all confetti from below the "Join millions" text line
          x: popupCenterX + (Math.random() - 0.5) * 200, // Wider horizontal spread
          y: textLineY + (Math.random() - 0.5) * 30, // Start from text line area
          // Velocity radiates outward and downward from text line
          vx: (Math.random() - 0.5) * 14, // Increased horizontal spread
          vy: Math.random() * 8 + 2, // Primarily downward movement with some variation
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          size: Math.random() * 10 + 6, // Slightly larger pieces
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          gravity: 0.3,
          wind: (Math.random() - 0.5) * 0.2,
        });
      }

      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPiecesRef.current = confettiPiecesRef.current.filter(
          (piece) => {
            // Update physics
            piece.vy += piece.gravity;
            piece.vx += piece.wind;
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rotation += piece.rotationSpeed;
            piece.opacity -= 0.004; // Slower fade

            // Draw piece
            ctx.save();
            ctx.globalAlpha = piece.opacity;
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);

            if (piece.shape === "circle") {
              ctx.beginPath();
              ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
              ctx.fillStyle = piece.color;
              ctx.fill();
            } else if (piece.shape === "triangle") {
              ctx.beginPath();
              ctx.moveTo(0, -piece.size / 2);
              ctx.lineTo(-piece.size / 2, piece.size / 2);
              ctx.lineTo(piece.size / 2, piece.size / 2);
              ctx.closePath();
              ctx.fillStyle = piece.color;
              ctx.fill();
            } else {
              // Square
              ctx.fillStyle = piece.color;
              ctx.fillRect(
                -piece.size / 2,
                -piece.size / 2,
                piece.size,
                piece.size
              );
            }

            ctx.restore();

            // Keep piece if still visible and on screen
            return (
              piece.y < canvas.height + 100 &&
              piece.opacity > 0 &&
              piece.x > -100 &&
              piece.x < canvas.width + 100
            );
          }
        );

        if (confettiPiecesRef.current.length > 0) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      // Start animation
      animate();

      // Cleanup after 6 seconds
      const timeout = setTimeout(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        confettiPiecesRef.current = [];
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 6000);

      // Handle window resize
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", handleResize);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        clearTimeout(timeout);
        window.removeEventListener("resize", handleResize);
        confettiPiecesRef.current = [];
      };
    }
  }, [isActive, triggerKey]);

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      confettiPiecesRef.current = [];
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[10000]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10000,
      }}
    />
  );
};

// Validation Error Popup Component
const ValidationErrorPopup = ({ isOpen, onClose, missingFields }) => {
  if (!isOpen) return null;

  const getFieldIcon = (field) => {
    switch (field) {
      case "from":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        );
      case "to":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case "departureDate":
        return (
          <svg
            className="w-5 h-5 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
            />
          </svg>
        );
      case "returnDate":
        return (
          <svg
            className="w-5 h-5 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getFieldLabel = (field) => {
    switch (field) {
      case "from":
        return "Departure Airport";
      case "to":
        return "Destination Airport";
      case "departureDate":
        return "Departure Date";
      case "returnDate":
        return "Return Date";
      default:
        return field;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Orange Header Bar */}
        <div className="bg-orange-500 h-1.5 w-full"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-orange-50 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6 pr-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Complete Required Fields
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              The following information is needed to search for available
              flights.
            </p>
          </div>

          {/* Missing Fields List */}
          <div
            className={`grid gap-3 mb-4 sm:mb-6 ${missingFields.length === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : missingFields.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2"
              }`}
          >
            {missingFields.map((field, index) => (
              <div
                key={index}
                className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-semibold text-gray-900 text-sm">
                    {getFieldLabel(field)}
                  </span>
                  <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full whitespace-nowrap">
                    REQUIRED
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-white border-2 border-orange-500 text-orange-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-orange-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl order-1 sm:order-2"
            >
              Fill Required Fields
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchLoadingOverlay = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      // Faster show animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Keep the overlay visible longer during navigation - increased from 350ms to 600ms
      setTimeout(() => setShouldRender(false), 600);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center z-[9999] transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="text-center">
        {/* Pulsing Dots Loader */}
        <div className="flex justify-center items-center space-x-2 mb-6">
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>
          <div
            className="w-4 h-4 bg-orange-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Searching Flights
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          We're scanning hundreds of airlines to find you the perfect flight
        </p>
        {/* Progress Indicator */}
        <div className="flex justify-center items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Finding best deals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Popup Component (keeping original)
const LoginPopup = ({
  isOpen,
  onClose,
  onContinueAsGuest,
  onLoginToContinue,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  // Auto swipe images every 1 second
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1000); // Changed to 1 second

      return () => clearInterval(interval);
    }
  }, [isOpen, images.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[9999] p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative animate-scale-in overflow-hidden"
        style={{ height: "auto" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex h-full font-lato">
          {/* Right Side - Login Options (now full width) */}
          <div className="w-full bg-white p-10 flex flex-col justify-center font-lato">
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-black mb-3">
                  Welcome !
                </h3>
                <p
                  className="text-base text-gray-700"
                  id="confetti-source-text"
                >
                  Join millions of happy travelers worldwide
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-5">
                <button
                  onClick={onLoginToContinue}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-lg cursor-pointer">
                      Register to Continue
                    </span>
                  </div>
                </button>

                <button
                  onClick={onContinueAsGuest}
                  className="w-full bg-white hover:bg-orange-50 border-2 border-orange-500 hover:border-orange-600 text-orange-600 hover:text-orange-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-lg cursor-pointer">
                      Continue as Guest
                    </span>
                  </div>
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                {[
                  "Best price guarantee & exclusive deals",
                  "24/7 customer support & assistance",
                  "Instant booking & confirmation",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 text-orange-700"
                  >
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <p className="text-sm text-orange-600/70 text-center mt-6 leading-relaxed">
                By continuing, you agree to our{" "}
                <span className="text-orange-600 hover:underline cursor-pointer font-medium">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-orange-600 hover:underline cursor-pointer font-medium">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ country }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0); // Key to force confetti reset
  const [hasShownPopup, setHasShownPopup] = useState(false);
  // New states for validation and loading
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // All existing states
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [travelType, setTravelType] = useState("Adult");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [flightReturnDate, setflightReturnDate] = useState(null);
  const [searchCount, setSearchCount] = useState(0);
  const [flightsData, setFlightsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("Round Trip");
  const [flightTypeFilter, setFlightTypeFilter] = useState("Domestic");
  const [isDirectFlight, setIsDirectFlight] = useState(false);
  const [flightDepatureDate, setflightDepatureDate] = useState(new Date());
  const [routingId, setRoutingId] = useState("");
  const [searchData, setSearchdata] = useState({
    from: "",
    to: "",
    flightDepatureDate: null,
    flightReturnDate: null,
    travelClass: "",
  });
  const [travellers, setTravellers] = useState([30]);
  const [airposts, setAirposts] = useState([]);

  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);
  const [fromDropdownSearchTerm, setFromDropdownSearchTerm] = useState("");
  const [toDropdownSearchTerm, setToDropdownSearchTerm] = useState("");
  const [commissionDetails, setcommissionDetails] = useState([]);
  const [isNotFlightAvailable, setIsNotFlightAvailable] = useState(false);
  console.log(searchData);
  const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;

  // Validation function
  const validateForm = () => {
    const missing = [];

    if (!from || !fromSearchTerm) {
      missing.push("from");
    }

    if (!to || !toSearchTerm) {
      missing.push("to");
    }

    if (!flightDepatureDate) {
      missing.push("departureDate");
    }

    if (tripType === "Round Trip" && !flightReturnDate) {
      missing.push("returnDate");
    }

    return missing;
  };

  // Additional effect to handle browser back navigation
  useEffect(() => {
    const handlePopState = (event) => {
      // When user uses browser back button, mark as internal navigation
      console.log("Browser back/forward detected via popstate");
      sessionStorage.setItem("internalNavigation", "true");
      sessionStorage.setItem("hasNavigated", "true");
      sessionStorage.setItem("browserBack", "true");
      sessionStorage.setItem("justNavigatedBack", "true"); // Additional flag for immediate back detection
    };

    // Listen for browser back/forward button
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Additional effect to handle page visibility and navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Don't clear sessionStorage on page unload
      // This ensures popup won't show again when navigating back
    };

    const handleVisibilityChange = () => {
      // Handle page visibility changes
      if (document.visibilityState === "visible") {
        // Page became visible again - don't show popup
        console.log("Page became visible - popup should not show");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Updated popup trigger useEffect - only show on page refresh
  useEffect(() => {
    // Check if popup has already been shown in this browser session
    const popupShownInSession = sessionStorage.getItem("popupShown");

    // Check if this is a page refresh (not navigation from another page)
    const navigationEntries = performance.getEntriesByType("navigation");
    const isPageRefresh =
      navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    // Check if user came from external source (not from within the same site)
    const isExternalVisit =
      !document.referrer || !document.referrer.includes(window.location.origin);

    // Check if this is a direct navigation (typing URL or bookmark)
    const isDirectNavigation =
      !window.history.state || window.history.length <= 1;

    // Check if this is first time visiting the site (no session storage)
    const isFirstVisit = !sessionStorage.getItem("everVisited");

    // Check if user is coming from internal navigation (React Router)
    const hasInternalNavigation = sessionStorage.getItem("internalNavigation");

    // Check if user has navigated to other pages in this session
    const hasNavigatedInSession = sessionStorage.getItem("hasNavigated");

    // Check if this is browser back navigation
    const isBrowserBack = sessionStorage.getItem("browserBack");

    // Check if this page was reached via browser back (performance API)
    const isBackForwardNavigation =
      navigationEntries.length > 0 &&
      navigationEntries[0].type === "back_forward";

    console.log("Navigation check:", {
      popupShownInSession,
      isPageRefresh,
      isExternalVisit,
      isDirectNavigation,
      isFirstVisit,
      hasInternalNavigation,
      hasNavigatedInSession,
      isBrowserBack,
      isBackForwardNavigation,
      referrer: document.referrer,
      historyLength: window.history.length,
      historyState: window.history.state,
      navigationType: navigationEntries[0]?.type,
    });

    // Show popup in these cases:
    // 1. First time visiting the site (no everVisited flag) AND no internal navigation AND not browser back
    // 2. Page refresh (F5 or browser refresh button) - ALWAYS show on refresh regardless of navigation history
    // BUT NOT when:
    // - Coming back from flight list or other internal pages (without refresh)
    // - Browser back/forward navigation (without refresh)
    if (
      (isFirstVisit &&
        !hasInternalNavigation &&
        !isBrowserBack &&
        !isBackForwardNavigation) ||
      (isPageRefresh && !isBackForwardNavigation)
    ) {
      // Removed other conditions for refresh
      const timer = setTimeout(() => {
        // Show popup first
        setShowPopup(true);
        setHasShownPopup(true);

        // Then trigger confetti effect after a small delay to come from popup
        setTimeout(() => {
          setConfettiKey((prev) => prev + 1);
          setShowConfetti(true);
        }, 300); // 300ms delay to let popup render first

        // Mark that user has visited the site
        sessionStorage.setItem("everVisited", "true");
        // Clear the browser back flag after checking
        sessionStorage.removeItem("browserBack");
        // Clear the internal navigation flag after showing popup
        sessionStorage.removeItem("internalNavigation");
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Mark that user has visited if they're navigating within the site
      sessionStorage.setItem("everVisited", "true");
      // Clear the browser back flag if popup didn't show
      sessionStorage.removeItem("browserBack");
    }
  }, []); // Empty dependency array - only runs on component mount

  // Updated popup handlers - remove confetti from guest handler
  const handleContinueAsGuest = () => {
    setShowPopup(false);
    setShowConfetti(false); // Stop any existing confetti
    console.log("Continuing as guest");
  };

  const handleLoginToContinue = () => {
    setShowPopup(false);
    setShowConfetti(false); // Stop any existing confetti
    navigate("/login");
    console.log("Navigating to login page");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowConfetti(false); // Stop any existing confetti
  };

  useEffect(() => {
    const getcommission = async () => {
      try {
        const res = await fetch(`${transactionUrl}/getcommissiondetails`);
        const result = await res.json();
        console.log(result.commissionDetail);
        const commission = result.commissionDetail;
        setcommissionDetails(commission);
      } catch (error) {
        console.error("Failed to fetch supplier route:", error);
      }
    };
    getcommission();
  }, []);

  useEffect(() => {
    if (fromDropdownOpen) {
      const searchTerm = fromDropdownSearchTerm.toLowerCase();
      if (fromDropdownSearchTerm.length > 0) {
        let filtered = [];

        if (searchTerm.length === 3) {
          // Filter only by IATA code
          filtered = airposts.filter((airport) =>
            airport.Iata.toLowerCase().includes(searchTerm)
          );
        } else if (searchTerm.length > 3) {
          // Filter by all fields
          filtered = airposts.filter(
            (airport) =>
              airport.Cityname.toLowerCase().includes(searchTerm) ||
              airport.Countryname.toLowerCase().includes(searchTerm)
            // airport.Iata.toLowerCase().includes(searchTerm) ||
            // airport.Airportname.toLowerCase().includes(searchTerm)
          );
        }
        setFilteredFromAirports(filtered);
      } else {
        setFilteredFromAirports(airposts.slice(0, 6));
      }
    }
    // getcommission();
  }, [fromDropdownSearchTerm, airposts, fromDropdownOpen]);

  // Add this useEffect right after the existing FROM dropdown useEffect

  useEffect(() => {
    if (toDropdownOpen) {
      const searchTerm = toDropdownSearchTerm.toLowerCase();

      if (searchTerm.length > 0) {
        let filtered = [];

        if (searchTerm.length === 3) {
          // Filter only by IATA code
          filtered = airposts.filter((airport) =>
            airport.Iata.toLowerCase().includes(searchTerm)
          );
        } else if (searchTerm.length > 3) {
          // Filter by all fields
          filtered = airposts.filter(
            (airport) =>
              airport.Cityname.toLowerCase().includes(searchTerm) ||
              airport.Countryname.toLowerCase().includes(searchTerm)
            // airport.Iata.toLowerCase().includes(searchTerm) ||
            // airport.Airportname.toLowerCase().includes(searchTerm)
          );
        }

        setFilteredToAirports(filtered.slice(0, 10));
      } else {
        // Default list
        setFilteredToAirports(airposts.slice(0, 6));
      }
    }
  }, [toDropdownSearchTerm, airposts, toDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target)
      ) {
        setFromDropdownOpen(false);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target)
      ) {
        setToDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTravelFusionDate = (newDate) => {
    if (!newDate) {
      return;
    } // Handle null or invalid date
    else {
      // Ensure newDate is a Date object
      const selectedDate = new Date(newDate);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
  };

  const travelFusionBackendUrl = import.meta.env.VITE_FLIGHT_BACKEND_URL;
  useEffect(() => {
    // make an array of N adults
    const adult = Array(adults).fill(30);
    // make an array of N children
    const child = Array(children).fill(7);
    // combine them
    setTravellers([...adult, ...child]);
  }, [adults, children]);

  // fix the travel fusion search
  const handleTravelfusionSearch = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    const missing = validateForm();
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowValidationPopup(true);
      return;
    }

    // Start loading
    setSearchLoading(true);

    let PlainSearchData;

    const formattedFlightDepatureDate =
      handleTravelFusionDate(flightDepatureDate) + "-00:01";

    console.log({
      from,
      to,
      flightDepatureDate,
      flightReturnDate,
      travelClass,
    });
    if (flightReturnDate !== null && tripType == "Round Trip") {
      const formattedFlightReturnDate =
        handleTravelFusionDate(flightReturnDate) + "-23:59";
      setSearchdata({
        from: from,
        to: to,
        flightDepatureDate: formattedFlightDepatureDate,
        flightReturnDate: formattedFlightReturnDate,
        travelClass: travelClass,
      });
    } else {
      setSearchdata({
        from: from,
        to: to,
        flightDepatureDate: formattedFlightDepatureDate,
        travelClass: travelClass,
      });
      setflightReturnDate(null);
    }
    console.log(adults);
    setOrigin(from);
    setDestination(to);
    setSearchCount((prev) => prev + 1);

    // trigger the search start route api
    console.log("country hero", country);
    try {
      const requestBody = {
        mode: "plane",
        origin: {
          descriptor: from,
        },
        destination: {
          descriptor: to,
        },
        dateOfSearch: handleTravelFusionDate(flightDepatureDate) + "-00:01",
        travellers: travellers,
        incrementalResults: true,
        // this will **conditionally add** returnDateOfSearch if flightReturnDate exists
        ...(flightReturnDate && {
          returnDateOfSearch:
            handleTravelFusionDate(flightReturnDate) + "-23:59",
        }),
        countryCode: country,
      };

      // console.log(requestBody);
      PlainSearchData = requestBody;
      const response = await fetch(`${travelFusionBackendUrl}/start-routing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }

      const data = await response.json();
      console.log(data);
      let routeID = data.routingId;
      setRoutingId(data.routingId);

      const getCommissionDetail = async (tfPrice) => {
        console.log("tfPrice", tfPrice);

        try {
          if (!commissionDetails) {
            return console.log("Error");
          } else {
            const Commission = commissionDetails.Commission;
            if (Commission) {
              console.log(Commission);
              if (
                commissionDetails.CommissionType.toLowerCase() === "percentage"
              ) {
                const commissionAmount = (tfPrice * Commission) / 100;
                const totalAmount = tfPrice + commissionAmount;
                console.log("if totalAmount", totalAmount);
                return totalAmount.toFixed(2);
              } else if (
                commissionDetails.CommissionType.toLowerCase() === "amount"
              ) {
                const totalAmount = tfPrice + Commission;
                console.log("else totalAmount", totalAmount);
                return totalAmount.toFixed(2);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      if (routeID || routingId) {
        console.log("Travelfusion Search API Call");
        try {
          const response = await fetch(
            `${travelFusionBackendUrl}/check-routing`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                routingId: routeID || routingId,
              }),
            }
          );

          if (!response.ok) throw new Error("Failed to fetch flight data");

          if (response.status === 204) {
            setIsNotFlightAvailable(true);
          }

          const data = await response.json();
          const routerList = data.flightList[0].Router;
          const rates = await fetchExchangeRates("CVE");

          // Step 1: Collect all raw flight data
          const allFlightPromises = [];

          for (const supplier of routerList) {
            if (!supplier?.GroupList || !Array.isArray(supplier.GroupList))
              continue;

            for (const groupContainer of supplier.GroupList) {
              if (
                !groupContainer?.Group ||
                !Array.isArray(groupContainer.Group)
              )
                continue;

              for (const group of groupContainer.Group) {
                if (
                  !group?.OutwardList ||
                  !Array.isArray(group.OutwardList) ||
                  group.OutwardList.length === 0
                )
                  continue;

                const outwardList = group.OutwardList[0]?.Outward || [];

                for (const flight of outwardList) {
                  allFlightPromises.push(
                    (async () => {
                      try {
                        const segments = flight.SegmentList?.[0]?.Segment || [];

                        const segmentDetails = segments.map((segment) => {
                          const origin = segment?.Origin?.[0] || {};
                          const destination = segment?.Destination?.[0] || {};
                          const operatorName =
                            segment?.Operator?.[0]?.Name?.[0] ||
                            "Unknown Airline";
                          const logo = operatorName.toLowerCase();
                          const flightId =
                            segment?.FlightId?.[0]?.Code?.[0] || "N/A";
                          const travelClass =
                            segment?.TravelClass?.[0]?.TfClass?.[0] ||
                            "Economy";
                          const departDateTime =
                            segment?.DepartDate?.[0] || "N/A";
                          const arriveDateTime =
                            segment?.ArriveDate?.[0] || "N/A";

                          return {
                            id: flight.Id?.[0] || "N/A",
                            airline: operatorName,
                            logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
                            flightNumber: flightId,
                            class: travelClass,
                            departureDate: departDateTime,
                            departureTime:
                              departDateTime.split("-")[1] || "N/A",
                            departureCity: origin.Code?.[0] || "N/A",
                            arrivalDate: arriveDateTime,
                            arrivalTime: arriveDateTime.split("-")[1] || "N/A",
                            arrivalCity: destination.Code?.[0] || "N/A",
                            duration: segment?.Duration?.[0]
                              ? Math.round(Number(segment.Duration[0]) / 60) +
                              "hr"
                              : "N/A",
                          };
                        });

                        const originalPrice = parseFloat(
                          flight.Price?.[0]?.Amount?.[0] || "0"
                        );
                        const originalCurrency =
                          flight.Price?.[0]?.Currency?.[0] || "N/A";

                        return {
                          id: flight.Id?.[0] || "N/A",
                          segments: segmentDetails,
                          type:
                            segmentDetails.length > 1 ? "connecting" : "direct",
                          stops: segmentDetails.length - 1,
                          originalPrice,
                          originalCurrency,
                        };
                      } catch (e) {
                        console.error("Flight parse error:", e);
                        return null;
                      }
                    })()
                  );
                }
              }
            }
          }

          const rawFlights = (await Promise.all(allFlightPromises)).filter(
            Boolean
          );

          // Step 2: Convert and cache unique prices
          const currencyMap = {};
          const priceCommissionMap = {};

          for (const flight of rawFlights) {
            const key = `${flight.originalPrice}_${flight.originalCurrency}`;

            if (!(key in priceCommissionMap)) {
              try {
                if (!(flight.originalCurrency in currencyMap)) {
                  currencyMap[flight.originalCurrency] =
                    convertToRequestedCurrency(
                      1,
                      flight.originalCurrency,
                      "CVE",
                      rates
                    );
                }

                const rate = currencyMap[flight.originalCurrency];
                const convertedPrice = parseFloat(
                  (flight.originalPrice * rate).toFixed(2)
                );
                const finalPrice = await getCommissionDetail(convertedPrice);

                priceCommissionMap[key] = {
                  convertedPrice: finalPrice,
                  convertedFrom: flight.originalPrice,
                  fromCurrency: flight.originalCurrency,
                };
              } catch (e) {
                console.error("Conversion/commission error:", e);
              }
            }
          }

          // Step 3: Build final simplified flights
          const simplifiedFlights = rawFlights.map((flight) => {
            const key = `${flight.originalPrice}_${flight.originalCurrency}`;
            const priceInfo = priceCommissionMap[key];

            return {
              ...flight,
              price: priceInfo?.convertedPrice || 0,
              originalPrice: priceInfo?.convertedPrice || 0,
              convertedcurrencyfrom: priceInfo?.fromCurrency || "N/A",
              convertedPricefrom: priceInfo?.convertedFrom || 0,
              currency: "CVE",
              segments:
                flight.segments.map((s, i) => ({ leg: i + 1, ...s })) || [],
            };
          });

          // Round-trip flights
          const rawFlightDataPromises = [];

          for (const supplier of routerList) {
            if (!Array.isArray(supplier?.GroupList)) continue;

            for (const groupContainer of supplier.GroupList) {
              if (!Array.isArray(groupContainer?.Group)) continue;

              for (const group of groupContainer.Group) {
                const outwardList = group?.OutwardList?.[0]?.Outward ?? [];
                const returnList = group?.ReturnList?.[0]?.Return ?? [];

                const extractFlightInfo = async (flight, type) => {
                  try {
                    const segments = flight?.SegmentList?.[0]?.Segment || [];

                    const segmentDetails = segments.map((segment) => {
                      const origin = segment?.Origin?.[0] || {};
                      const destination = segment?.Destination?.[0] || {};
                      const operatorName =
                        segment?.Operator?.[0]?.Name?.[0] || "Unknown Airline";
                      const logo = operatorName.toLowerCase();
                      const flightId =
                        segment?.FlightId?.[0]?.Code?.[0] || "N/A";
                      const travelClass =
                        segment?.TravelClass?.[0]?.TfClass?.[0] || "Economy";
                      const departDateTime = segment?.DepartDate?.[0] || "N/A";
                      const arriveDateTime = segment?.ArriveDate?.[0] || "N/A";

                      return {
                        id: flight?.Id?.[0] || "N/A",
                        airline: operatorName,
                        logo: `http://www.travelfusion.com/images/logos/${logo}.gif`,
                        flightNumber: flightId,
                        class: travelClass,
                        departureDate: departDateTime,
                        departureTime: departDateTime.split("-")[1] || "N/A",
                        departureCity: origin.Code?.[0] || "N/A",
                        arrivalDate: arriveDateTime,
                        arrivalTime: arriveDateTime.split("-")[1] || "N/A",
                        arrivalCity: destination.Code?.[0] || "N/A",
                        duration: segment?.Duration?.[0]
                          ? Math.round(Number(segment.Duration[0]) / 60) + "hr"
                          : "N/A",
                      };
                    });

                    const originalPrice = parseFloat(
                      flight?.Price?.[0]?.Amount?.[0] ?? "0"
                    );
                    const originalCurrency =
                      flight?.Price?.[0]?.Currency?.[0] ?? "N/A";

                    return {
                      id: flight.Id?.[0] ?? "N/A",
                      originalPrice,
                      originalCurrency,
                      segments: segmentDetails,
                      type: segmentDetails.length > 1 ? "connecting" : "direct",
                      stops: segmentDetails.length - 1,
                      flightType: type,
                    };
                  } catch (err) {
                    console.error(`Error parsing ${type} flight:`, err);
                    return null;
                  }
                };

                for (const flight of outwardList) {
                  rawFlightDataPromises.push(
                    extractFlightInfo(flight, "outward")
                  );
                }

                for (const flight of returnList) {
                  rawFlightDataPromises.push(
                    extractFlightInfo(flight, "return")
                  );
                }
              }
            }
          }

          const rawFlightData = (
            await Promise.all(rawFlightDataPromises)
          ).filter(Boolean);

          const currencyRateCache = {};
          const commissionCache = {};

          for (const flight of rawFlightData) {
            const key = `${flight.originalPrice}_${flight.originalCurrency}`;
            if (!commissionCache[key]) {
              try {
                if (!currencyRateCache[flight.originalCurrency]) {
                  currencyRateCache[flight.originalCurrency] =
                    convertToRequestedCurrency(
                      1,
                      flight.originalCurrency,
                      "CVE",
                      rates
                    );
                }

                const rate = currencyRateCache[flight.originalCurrency];
                const converted = parseFloat(
                  (flight.originalPrice * rate).toFixed(2)
                );
                const finalPrice = await getCommissionDetail(converted);

                commissionCache[key] = {
                  convertedPrice: finalPrice,
                  convertedFrom: flight.originalPrice,
                  fromCurrency: flight.originalCurrency,
                };
              } catch (e) {
                console.error("Conversion or commission failed:", e);
                commissionCache[key] = null;
              }
            }
          }

          const simplifiedFlightsGroup = rawFlightData
            .map((flight) => {
              const key = `${flight.originalPrice}_${flight.originalCurrency}`;
              const priceInfo = commissionCache[key];
              if (!priceInfo) return null;

              return {
                ...flight,
                price: priceInfo.convertedPrice,
                originalPrice: priceInfo.convertedPrice,
                convertedcurrencyfrom: priceInfo.fromCurrency,
                convertedPricefrom: priceInfo.convertedFrom,
                currency: "CVE",
                segments:
                  flight.segments.map((s, i) => ({ leg: i + 1, ...s })) || [],
              };
            })
            .filter(Boolean);

          console.log("simplifiedflightgroup", simplifiedFlightsGroup);
          console.log("simplifiedflight", simplifiedFlights);

          setSearchLoading(false);

          // Mark that user is navigating internally before going to list page
          sessionStorage.setItem("internalNavigation", "true");
          sessionStorage.setItem("hasNavigated", "true");

          navigate("/list", {
            state: {
              FightSearchData: PlainSearchData,
              oneWay: simplifiedFlights,
              roundTrip: simplifiedFlightsGroup,
              tripType: tripType,
              routingId: routingId || routeID,
              fromDisplayText: fromSearchTerm,
              toDisplayText: toSearchTerm,
            },
          });
        } catch (error) {
          console.error(error);
          setSearchLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setSearchLoading(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let AirportList = [];
    const fetchAirport = async () => {
      try {
        const res = await axios.get(
          `${travelFusionBackendUrl}/get-airportlist`
        );
        AirportList = res.data.Airportdata || [];
        setAirposts(res.data.Airportdata);
      } catch (error) {
        console.error(error);
      }
      AirportList.length === 0 ? fetchAirport() : setAirposts(AirportList);
    };
    fetchAirport();
  }, []);

  console.log(fromSearchTerm);

  if (loading) return <LoadingScreen />;

  return (
    <>
      {/* Canvas Confetti Effect */}
      {/* <CanvasConfettiEffect isActive={showConfetti} triggerKey={confettiKey} /> */}

      {/* Search Loading Overlay with GridLoader */}
      <SearchLoadingOverlay isLoading={searchLoading} />

      {/* Validation Error Popup */}
      <ValidationErrorPopup
        isOpen={showValidationPopup}
        onClose={() => setShowValidationPopup(false)}
        missingFields={missingFields}
      />

      {/* Login Popup */}
      <LoginPopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        onContinueAsGuest={handleContinueAsGuest}
        onLoginToContinue={handleLoginToContinue}
      />

      {isNotFlightAvailable && (
        <NoSupplierFount
          setIsNotFlightAvailable={setIsNotFlightAvailable}
          origin={from}
          destination={to}
          AirportList={airposts}
        />
      )}

      <div
        className={`py-56 relative overflow-visible bg-white/10 bg-[url('/banner-img.png')]
        bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 lg:px-10 xl:px-40 overflow-hidden`}
      >
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="mt-8 h-full w-full flex flex-col justify-center items-center gap-2">
            <h1
              data-aos="fade-up"
              className="text-4xl xl:text-5xl font-semibold text-center font-jakarta text-white"
            >
              {t("hero.title")}
            </h1>
            <div data-aos="fade-up" className="relative pl-20 hidden lg:block">
              <img
                src={PaperDesktop}
                alt="banner-2"
                height={171}
                width={662}
                className="relative h-20 mix-blend-screen"
              />
              <p className="absolute top-7 left-36 z-[1px] text-black font-semibold text-base font-sans">
                {t("hero.description")}
              </p>
            </div>
            <div
              data-aos="fade-up"
              className="relative block lg:hidden mt-4 mb-4"
            >
              <img
                src={PaperMobile}
                alt="banner-2"
                height={100}
                width={443}
                className="relative h-20 -mb-10"
              />
              <p className="absolute top-5 left-1/2 -translate-x-1/2 leading-5 z-[1px] text-black font-semibold text-sm sm:text-base font-sans text-center">
                {t("hero.description")}
              </p>
            </div>
            <div className="w-full -mb-30 mt-10 font-sans block z-50">
              <p
                data-aos="fade-left"
                className="text-[18px] tracking-wider text-white font-bold mb-6 font-sans"
              >
                {t("hero.bookNow")}
              </p>
              <form
                onSubmit={handleTravelfusionSearch}
                className="w-full mx-auto overflow-visible bg-white rounded-xl shadow-lg px-4 py-1 z-50 min-h-[168px] xl:max-h-[175px] h-full mt-5 relative"
              >
                {/* Filters Row */}
                <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {["One Way", "Round Trip"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 translate-x-4 cursor-pointer ${tripType === type
                            ? "bg-[#EE5128] border-[#EE5128] text-white"
                            : "bg-gray-300 border-gray-300"
                            }`}
                        >
                          {tripType === type && (
                            <span className="text-[10px] font-bold">✓</span>
                          )}
                        </div>
                        <span
                          className={`text-sm translate-y-4 translate-x-4 cursor-pointer ${tripType === type
                            ? "font-semibold text-black"
                            : "text-gray-500"
                            }`}
                        >
                          {type}
                        </span>
                        <input
                          type="radio"
                          name="tripType"
                          className="hidden"
                          value={type}
                          checked={tripType === type}
                          onChange={() => setTripType(type)}
                        />
                      </label>
                    ))}
                  </div>

                  <label className="flex items-center gap-2 ml-auto cursor-pointer">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center translate-y-4 -translate-x-18 cursor-pointer ${isDirectFlight
                        ? "bg-[#EE5128] border-[#EE5128] text-white"
                        : "bg-gray-300 border-gray-300"
                        }`}
                      onClick={() => setIsDirectFlight(!isDirectFlight)}
                    >
                      {isDirectFlight && (
                        <span className="text-[10px] font-bold">✓</span>
                      )}
                    </div>
                    <span
                      className={`text-sm translate-y-4 -translate-x-18 cursor-pointer ${isDirectFlight
                        ? "font-semibold text-black"
                        : "text-gray-500"
                        }`}
                      onClick={() => setIsDirectFlight(!isDirectFlight)}
                    >
                      Direct flight only
                    </span>
                  </label>
                </div>

                {/* Main Inputs Row */}
                <div className="flex flex-col md:flex-row gap-1">
                  {/* From-To Section */}
                  <div className="flex items-center w-full md:w-[660px] min-h-[90px] rounded-xl border border-gray-200 relative overflow-visible z-50">
                    {/* FROM */}
                    <div
                      className="flex-1 px-4 py-3 relative cursor-pointer"
                      ref={fromDropdownRef}
                    >
                      <label className="text-xs text-gray-500">From</label>
                      <input
                        type="text"
                        value={fromSearchTerm}
                        readOnly
                        onFocus={() => {
                          console.log("FROM input focused");
                          setFromDropdownOpen(true);
                          setToDropdownOpen(false);
                          setFromDropdownSearchTerm("");
                        }}
                        placeholder="[HYD] Rajiv Gandhi International Airport"
                        className="text-[18px] font-semibold outline-none w-full bg-transparent cursor-pointer text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    {/* Center Divider */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200 -translate-x-1/2" />
                    {/* SWAP BUTTON */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Swapping values");
                          const tempIata = from;
                          const tempSearchTerm = fromSearchTerm;

                          setFrom(to);
                          setTo(tempIata);
                          setFromSearchTerm(toSearchTerm);
                          setToSearchTerm(tempSearchTerm);
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                      >
                        <ArrowLeftRightIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    {/* TO */}
                    <div
                      className="flex-1 pl-40 pr-4 py-3 ml-[1px] relative cursor-pointer"
                      ref={toDropdownRef}
                    >
                      <label className="text-xs text-gray-500">To</label>
                      <input
                        type="text"
                        value={toSearchTerm}
                        readOnly
                        onFocus={() => {
                          console.log("TO input focused");
                          setToDropdownOpen(true);
                          setFromDropdownOpen(false);
                          setToDropdownSearchTerm("");
                        }}
                        placeholder="[BOM] Chhatrapati Shivaji International Airport"
                        className="text-[18px] font-semibold outline-none w-full bg-transparent cursor-pointer text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    {/* FROM Dropdown - Positioned on LEFT side */}
                    {fromDropdownOpen && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:left-2 lg:translate-x-0 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-hidden mt-1">
                        {/* Search Input Inside Dropdown */}
                        <div className="p-3 border-b border-gray-200 bg-blue-50">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-gray-400 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                            <input
                              type="text"
                              value={fromDropdownSearchTerm}
                              onChange={(e) => {
                                console.log(
                                  "FROM dropdown search:",
                                  e.target.value
                                );
                                setFromDropdownSearchTerm(e.target.value);
                              }}
                              placeholder="From"
                              className="text-sm outline-none w-full bg-transparent text-gray-900 placeholder-gray-500 cursor-text"
                              autoFocus
                            />
                          </div>
                        </div>
                        {/* Scrollable Results */}
                        <div className="max-h-64 overflow-y-auto">
                          {fromDropdownSearchTerm.length === 0 && (
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                Popular Cities
                              </span>
                            </div>
                          )}

                          {filteredFromAirports.length > 0 ? (
                            filteredFromAirports.map((airport, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log("FROM airport clicked:", airport);

                                  if (
                                    !airport ||
                                    !airport.Iata ||
                                    !airport.Airportname
                                  ) {
                                    console.error(
                                      "Invalid airport object:",
                                      airport
                                    );
                                    return;
                                  }

                                  setFrom(airport.Iata);
                                  const displayText = `[${airport.Iata}] ${airport.Airportname}`;
                                  setFromSearchTerm(displayText);
                                  setFromDropdownOpen(false);
                                  setFromDropdownSearchTerm("");

                                  console.log(
                                    "FROM updated - IATA:",
                                    airport.Iata,
                                    "Display:",
                                    displayText
                                  );
                                }}
                              >
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">
                                    {airport.Cityname}, {airport.Countryname}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {airport.Airportname}
                                  </div>
                                </div>
                                <div className="text-lg font-bold text-gray-600 ml-4">
                                  {airport.Iata}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-gray-500 text-center">
                              <div className="text-sm">No airports found</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {/* TO Dropdown - Positioned on RIGHT side */}
                    {toDropdownOpen && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:-right-12 lg:left-auto lg:translate-x-0 w-80  bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-hidden mt-1">
                        {/* Search Input Inside Dropdown */}
                        <div className="p-3 border-b border-gray-200 bg-blue-50">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-gray-400 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                            <input
                              type="text"
                              value={toDropdownSearchTerm}
                              onChange={(e) => {
                                console.log(
                                  "TO dropdown search:",
                                  e.target.value
                                );
                                setToDropdownSearchTerm(e.target.value);
                              }}
                              placeholder="To"
                              className="text-sm outline-none w-full bg-transparent text-gray-900 placeholder-gray-500 cursor-text"
                              autoFocus
                            />
                          </div>
                        </div>
                        {/* Scrollable Results */}
                        <div className="max-h-64 overflow-y-auto">
                          {toDropdownSearchTerm.length === 0 && (
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                Popular Cities
                              </span>
                            </div>
                          )}

                          {filteredToAirports.length > 0 ? (
                            filteredToAirports.map((airport, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log("TO airport clicked:", airport);

                                  if (
                                    !airport ||
                                    !airport.Iata ||
                                    !airport.Airportname
                                  ) {
                                    console.error(
                                      "Invalid airport object:",
                                      airport
                                    );
                                    return;
                                  }

                                  setTo(airport.Iata);
                                  const displayText = `[${airport.Iata}] ${airport.Airportname}`;
                                  setToSearchTerm(displayText);
                                  setToDropdownOpen(false);
                                  setToDropdownSearchTerm("");

                                  console.log(
                                    "TO updated - IATA:",
                                    airport.Iata,
                                    "Display:",
                                    displayText
                                  );
                                }}
                              >
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">
                                    {airport.Cityname}, {airport.Countryname}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {airport.Airportname}
                                  </div>
                                </div>
                                <div className="text-lg font-bold text-gray-600 ml-4">
                                  {airport.Iata}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-gray-500 text-center">
                              <div className="text-sm">No airports found</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Departure Date */}
                  <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 cursor-pointer">
                    <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                      Departure Date
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-[#0F172A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                        />
                      </svg>
                    </p>
                    <DatePicker
                      selected={flightDepatureDate}
                      onChange={setflightDepatureDate}
                      dateFormat="dd MMM yyyy"
                      placeholderText="Select Date"
                      className="text-[16px] font-semibold outline-none w-full bg-transparent cursor-pointer text-[#0F172A]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {flightDepatureDate &&
                        flightDepatureDate.toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                    </p>
                  </div>
                  {/* Return Date (Round Trip only) */}
                  {tripType === "Round Trip" && (
                    <div className="w-full md:w-[180px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 cursor-pointer">
                      <p className="text-xs text-gray-500 mb-1 flex items-center justify-between">
                        Return Date
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-[#0F172A]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                          />
                        </svg>
                      </p>
                      <DatePicker
                        selected={flightReturnDate}
                        onChange={setflightReturnDate}
                        dateFormat="dd MMM yyyy"
                        placeholderText="Select Date"
                        minDate={flightDepatureDate}
                        className="text-[16px] font-semibold text-[#0F172A] w-full outline-none bg-transparent cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Book a round trip
                      </p>
                    </div>
                  )}
                  {/* Traveller & Class */}
                  <div
                    className="w-full md:w-[220px] h-[90px] px-4 py-3 rounded-xl border border-gray-200 relative cursor-pointer"
                    ref={dropdownRef}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {/* Dropdown content */}
                    {showDropdown && (
                      <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl z-[9999] shadow-lg p-3">
                        {/* Adult */}
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Adults</span>
                          <div className="flex items-center gap-3">
                            <Minus
                              className={`w-4 h-4 cursor-pointer ${adults > 1 ? "text-black" : "text-gray-300"
                                }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (adults > 1) setAdults(adults - 1);
                              }}
                            />
                            <span className="text-sm font-semibold">
                              {adults}
                            </span>
                            <Plus
                              className="w-4 h-4 cursor-pointer text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAdults(adults + 1);
                              }}
                            />
                          </div>
                        </div>
                        {/* Children */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-600">
                            Children
                          </span>
                          <div className="flex items-center gap-3">
                            <Minus
                              className={`w-4 h-4 cursor-pointer ${children > 0 ? "text-black" : "text-gray-300"
                                }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (children > 0) setChildren(children - 1);
                              }}
                            />
                            <span className="text-sm font-semibold">
                              {children}
                            </span>
                            <Plus
                              className="w-4 h-4 cursor-pointer text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                setChildren(children + 1);
                              }}
                            />
                          </div>
                        </div>
                        {/* Class list */}
                        {[
                          "Economy",
                          "Premium Economy",
                          "Business",
                          "First Class",
                        ].map((cls) => (
                          <div
                            key={cls}
                            className={`py-1 px-2 rounded text-sm cursor-pointer hover:bg-gray-100 ${travelClass === cls
                              ? "bg-gray-100 font-semibold"
                              : ""
                              }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setTravelClass(cls);
                              setShowDropdown(false);
                            }}
                          >
                            {cls}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Static label + selected value */}
                    <p className="text-xs text-gray-500 mb-1">
                      Travellers & Class
                    </p>
                    <div className="flex justify-between items-center font-semibold text-[16px] text-[#0F172A]">
                      <span>
                        {adults + children}{" "}
                        <span className="font-normal text-sm">Travellers</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{travelClass}</p>
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full flex justify-center translate-y-4.5">
                  <button
                    type="submit"
                    disabled={searchLoading}
                    className={`bg-[#EE5128] hover:bg-[#d64520] text-white text-[18px] font-semibold px-18 py-2 rounded-full transition cursor-pointer focus:outline-none active:outline-none focus:bg-[#EE5128] active:bg-[#EE5128] ${searchLoading ? "cursor-not-allowed" : ""
                      }`}
                  >
                    <div className={searchLoading ? "opacity-70" : ""}>
                      {searchLoading ? (
                        <div className="flex items-center space-x-2">
                          <GridLoader
                            color="#ffffff"
                            loading={searchLoading}
                            size={8}
                            margin={1}
                          />
                          <span>Searching...</span>
                        </div>
                      ) : (
                        t("hero.search")
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <img
          src={BannerBottom}
          alt="banner-bottom"
          height={40}
          width={662}
          className="w-full absolute -bottom-[26px] md:-bottom-[40px] object-cover h-20"
        />
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default HeroSection;

const NoSupplierFount = ({
  setIsNotFlightAvailable,
  origin,
  destination,
  AirportList,
}) => {
  console.log(origin, destination);

  console.log(AirportList);

  const FromPlace = AirportList.filter((airport) => airport.Iata === origin);
  const ToPlace = AirportList.filter((airport) => airport.Iata === destination);

  return (
    <div className=" backdrop-blur-sm z-[99] fixed inset-0 flex justify-center items-center px-6">
      <div className=" flex flex-col items-center justify-center py-8 pb-16 px-8 text-center bg-white rounded-lg shadow-2xl">
        <div className="w-full flex justify-end items-end">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIsNotFlightAvailable(false)}
          >
            <X />
          </button>
        </div>
        {/* Local Image */}
        <div className="mb-8">
          <img
            src={Noflight}
            alt="No flights available"
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>

        {/* Simple Message */}
        <div className="space-y-6 max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
            Flights not available for this{" "}
            <span className="capitalize font-black">
              {FromPlace[0]?.Cityname}
            </span>{" "}
            to <span className="font-black">{ToPlace[0]?.Cityname}.</span>
          </h2>

          <div className="relative">
            {/* <p className="text-xl text-gray-600 font-medium relative z-10 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
			  Try different dates and Destinations.
			</p> */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg transform rotate-1"></div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsNotFlightAvailable(false)}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl order-1 sm:order-2 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};