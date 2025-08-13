import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
import WeeFlyLogo2 from "../assets/images/WeeFly-white-logo.svg";
import MailIcon from "../assets/Auth/MailIcon.svg";
import LockIcon from "../assets/Auth/LockIcon.svg";
import FacebookIcon from "../assets/Auth/FBIcon.svg";
import GoogleIcon from "../assets/Auth/GoogleIcon.svg";
import AppleIcon from "../assets/Auth/AppleIcon.svg";
import LoginBg from "../assets/Auth/LoginBg.png";
import { useState } from "react";
import {
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Eye,
  EyeClosed,
  Lock,
  Unlock,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { HandleGoogleLogin } from "../features/firebase";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import axios from "axios";

const backendUrl = import.meta.env.VITE_USER_SERVICE_URL;

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUserData, setLoginUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("User");
  const [formData, setformData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const NavLinks = [
    { label: t("navbar.home"), link: "/" },
    { label: t("navbar.aboutus"), link: "/" },
    { label: t("navbar.services"), link: "/#ServicesOffered" },
    { label: t("navbar.news"), link: "/#newsSection" },
    { label: t("navbar.media"), link: "/" },
    { label: t("navbar.contactus"), link: "/Contact" },
  ];
  // Updated HandleLoginSubmit with API integration
  const HandleLoginSubmit = async (e, loginData = formData) => {
    if (e?.preventDefault) e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!loginData.email || !loginData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      if (selectedType === "Agent") {
        const res = await axios.post(`${backendUrl}/agentlogin`, {
          Emailaddress: loginData.email,
          Password: loginData.password,
        });
        console.log(res.data);
        navigate("/KYC-waiting");
      } else if (selectedType === "User") {
        const payload = {
          Emailaddress: loginData.email,
        };

        if (loginData.password !== "Googleauth") {
          payload.Password = loginData.password;
        }

        try {
          const Login = await axios.post(
            `${backendUrl}/userlogin`,
            {
              Emailaddress: loginData.email,
              ...(loginData.password !== "Googleauth" && {
                Password: loginData.password,
              }),
            },
            {
              withCredentials: true,
            }
          );
          if (Login.status === 200) {
            navigate("/Profile");
          }
        } catch (error) {
          console.error(error);
        }
      } else if (selectedType === "Vendor") {
        console.log("Vendor", loginData);
        navigate("/KYC-waiting");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(
            "Login failed. Please check your credentials and try again."
          );
        }
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };

  const HandleGoogleLoginFunction = async () => {
    const userData = await HandleGoogleLogin(); // Get user data from Google login
    setLoginUserData(userData);

    if (userData) {
      const googleLoginData = {
        email: userData.email,
        password: "Googleauth",
      };

      setformData(googleLoginData); // Optional — keep UI in sync
      await HandleLoginSubmit({ preventDefault: () => {} }, googleLoginData);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="h-screen flex relative overflow-hidden">
        <div
          data-aos="fade-right"
          className="left-section w-full lg:w-1/2 h-full bg-white flex flex-col px-[24px] xl:px-[136px] relative"
        >
          <div
            className={`fixed h-full transition-all duration-300 origin-left right-0 bg-black/40 backdrop-blur-md z-[60] overflow-hidden ${
              isMenuOpen ? "w-full" : "w-0"
            }`}
          >
            <div className="w-full z-50 top-0 px-10 xl:px-40 font-sans h-20 flex justify-between items-center text-white">
              <div className="text-2xl font-bold">
                <p
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <span>
                    <ArrowLeft />
                  </span>
                  <span> {t("back")}</span>
                </p>
              </div>
              <div className="" onClick={() => setIsMenuOpen(false)}>
                <X className="h-8 w-8 -rotate-90" />
              </div>
            </div>
            <div className="flex flex-col text-right top-0 px-10 xl:px-40 text-3xl font-medium text-white gap-5 mt-5">
              {NavLinks.map((link, index) => (
                <Link
                  to={link.link}
                  key={index}
                  onClick={() => setIsMenuOpen(false)}
                  className="transition duration-300 hover:underline hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* menu */}
          <div className="w-full z-50 top-0 font-sans h-20 flex justify-between items-center text-primary">
            <div
              className="font-bold flex items-center gap-1 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <span>
                <ArrowLeft />
              </span>
              <span>{t("back")}</span>
            </div>
            <div className="" onClick={() => setIsMenuOpen(true)}>
              <AlignRight className="h-8 w-8" />
            </div>
          </div>

          {/* Add form or content here */}
          <div className=" h-full flex flex-col items-center justify-center gap-[15px]">
            <img
              src={WeeFlyLogo}
              alt="WeeFly Logo"
              className="h-[70px] w-[92px]"
            />
            <h1 className="font-jakarta font-semibold text-[24px]">
              {t("login.title")}
            </h1>
            <div className="h-[5px] bg-[#EE5128] w-full max-w-[200px]" />

            <div className="inline-flex gap-2 bg-[#EE5128] p-1 rounded-full text-white">
              {["User", "Agent", "Vendor"].map((type) => (
                <div
                  className={`px-6 py-2 font-semibold hover:shadow-2xl hover:drop-shadow-2xl hover:bg-white rounded-full hover:text-[#EE5128] cursor-pointer ${
                    type === selectedType
                      ? "shadow-2xl drop-shadow-2xl bg-white text-[#EE5128]"
                      : ""
                  }`}
                  key={type}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </div>
              ))}
            </div>

            <form
              action=""
              className="max-w-[430px] w-full"
              onSubmit={HandleLoginSubmit}
            >
              <div className="w-full">
                <label
                  htmlFor=""
                  className="font-jakarta font-normal text-base text-[#555555]"
                >
                  {t("login.email")}
                </label>
                <div className="relative bg-[#F1F3F6] flex rounded-l-[8px] w-full mt-[14px]">
                  <input
                    type="email"
                    placeholder="alex@email.com"
                    className="px-[20px] py-[14px] w-full outline-[#EE5128]"
                    value={formData.email}
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className="px-[20px] py-[14px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                    <img src={MailIcon} alt="Mail Icon" />
                  </div>
                </div>
              </div>
              <div className="w-full mt-[10px]">
                <label
                  htmlFor=""
                  className="font-jakarta font-normal text-base text-[#555555]"
                >
                  {t("login.password")}
                </label>
                <div className="relative bg-[#F1F3F6] flex rounded-l-[8px] w-full mt-[14px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="px-[20px] py-[14px] w-full outline-[#EE5128] relative"
                    value={formData.password}
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />
                  <div
                    className="my-auto px-2 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Eye className="text-gray-400" />
                    ) : (
                      <div className="relative text-gray-400">
                        <Eye className="h-[16] w-[16]" />
                        <div className="absolute h-px bg-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] rotate-45"></div>
                      </div>
                    )}
                  </div>
                  <div className="px-[20px] py-[14px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                    <img src={LockIcon} alt="Mail Icon" />
                  </div>
                </div>
              </div>
              <div id="recaptcha-container"></div>
              <div className="flex justify-end mt-[10px]">
                <Link
                  to={"/ForgotPassword"}
                  className="font-sans font-bold text-[14px] underline text-[#EE5128] underline-[#EE5128]"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>

              <button className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]">
                {t("login.button")}
                {" as "}
                {selectedType}
              </button>

              {/* Display error message if any */}
              {error && (
                <div className="text-red-600 mt-2 font-jakarta font-normal text-base">
                  {error}
                </div>
              )}
            </form>
            <div className="flex items-center w-full gap-[11px] mt-[10px] max-w-[430px]">
              <div className="h-[2px] w-full bg-[#C2C2C2]"></div>
              <p className="text-[#C2C2C2]">OR</p>
              <div className="h-[2px] w-full bg-[#C2C2C2]"></div>
            </div>
            <div className="flex gap-[8px] w-full justify-center max-w-[430px]">
              {/* <div className="px-[37px] py-[15px] border border-[#E8ECF4] rounded-[8px]">
                                <img src={FacebookIcon} alt="Facebook icon" />
                            </div> */}
              <div
                className="px-[37px] py-[15px] border border-[#E8ECF4] rounded-[8px] w-full  flex justify-center gap-4 cursor-pointer"
                onClick={() => HandleGoogleLoginFunction()}
              >
                <img src={GoogleIcon} alt="Google icon" />
                <p className="font-jakarta font-medium">{t("login.google")}</p>
              </div>
              {/* <div className="px-[37px] py-[15px] border border-[#E8ECF4] rounded-[8px]">
                                <img src={AppleIcon} alt="Apple icon" />
                            </div> */}
            </div>
            <p className=" font-jakarta font-normal text-[16px]">
              {t("login.signup-content")}
              <Link
                to={"/SignUp"}
                className="font-bold text-[18px] text-[#EE5128]"
              >
                {t("login.signup")}
              </Link>
            </p>
            {/* <p className="font-jakarta font-normal text-[16px]">
                            Are you a business?
                            <Link
                                to={'/#travel-section'}
                                className="font-bold pl-1 text-[18px] text-[#EE5128]">
                                Register here
                            </Link>
                        </p> */}
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="right-section hidden lg:block lg:w-1/2 h-full bg-black relative"
        >
          {/* <div className=""></div> */}
          <img
            src={LoginBg}
            alt="Login Background"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
