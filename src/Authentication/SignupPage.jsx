import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
import WeeFlyLogo2 from "../assets/images/WeeFly-white-logo.svg";
import UserIcon from "../assets/Auth/UserIcon.svg";
import MobileIcon from "../assets/Auth/MobileIcon.svg";
import MailIcon from "../assets/Auth/MailIcon.svg";
import LockIcon from "../assets/Auth/LockIcon.svg";
// import FacebookIcon from "../assets/Auth/FBIcon.svg";
import GoogleIcon from "../assets/Auth/GoogleIcon.svg";
// import AppleIcon from "../assets/Auth/AppleIcon.svg";
import SignUpBg from "../assets/Auth/SignUpBg.png";
import { useState } from "react";
import { Eye, ArrowLeft, X, AlignRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { HandleGoogleLogin } from "../features/firebase";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie"
const USER_API_URL =
  import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:3000/userapi";

function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signinUserData, setSigninUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("User");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const NavLinks = [
    { label: t("navbar.home"), link: "/" },
    { label: t("navbar.aboutus"), link: "/" },
    { label: t("navbar.services"), link: "/#ServicesOffered" },
    { label: t("navbar.news"), link: "/#newsSection" },
    { label: t("navbar.media"), link: "/" },
    { label: t("navbar.contactus"), link: "/Contact" },
  ];

  // Handle input changes for controlled components
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e, formData = form) => {
    if (e?.preventDefault) e.preventDefault();
    setError("");
    setSuccess("");

    // Use provided formData instead of form state
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${USER_API_URL}/userregister`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: {
            Name: formData.name,
            Mobilenumber: formData.phone,
            Emailaddress: formData.email,
            Password: formData.password,
          },
        }),
        credentials: "include",
      });
      if (response.status === 200) {
        Cookies.set("email",formData.email)
        navigate("/OTP-Verification");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error(err);
    }
  };

  // GOOGLE handler (unchanged)
  const HandleGoogleSigninFunction = async () => {
    const userData = await HandleGoogleLogin();
    setSigninUserData(userData);

    if (userData) {
      const googleFormData = {
        name: userData.name,
        phone: "Googleauth",
        email: userData.email,
        password: "Googleauth",
      };
      await HandleSubmit({ preventDefault: () => {} }, googleFormData);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      <div
        data-aos="fade-right"
        className="left-section w-full xl:w-1/2 h-full bg-white flex flex-col px-[24px] xl:px-[136px] overflow-y-scroll"
      >
        {/* MENU Overlay */}
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
        {/* menu header */}
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
        <div className=" h-full flex flex-col items-center justify-center gap-[10px] xl:gap-[10px]">
          <img
            src={WeeFlyLogo}
            alt="WeeFly Logo"
            className="h-[50px] w-[92px]"
          />
          <h1 className="font-jakarta font-semibold text-[18px]">
            {t("signup.title")}
          </h1>
          <div className="h-[5px] bg-[#EE5128] w-full max-w-[200px]" />
          <div className="inline-flex gap-2  bg-[#EE5128] p-1 rounded-full text-white">
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
            onSubmit={HandleSubmit}
            className="max-w-[430px] w-full flex flex-col gap-[10px] xl:gap-[5px]"
          >
            <div className="w-full">
              <label
                htmlFor="name"
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                {t("signup.fields.name")}
              </label>
              <div className="relative bg-[rgb(241,243,246)] flex rounded-l-[8px] w-full mt-[10px] xl:mt-[5px]">
                <input
                  type="text"
                  name="name"
                  placeholder="Alex"
                  value={form.name}
                  onChange={handleInput}
                  className="px-[20px] py-[14px] xl:py-[10px] w-full outline-[#EE5128]"
                  required
                />
                <div className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                  <img src={UserIcon} alt="Mail Icon" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="phone"
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                {t("signup.fields.phone")}
              </label>
              <div className="relative bg-[#F1F3F6] flex rounded-l-[8px] w-full mt-[10px] xl:mt-[5px]">
                <input
                  type="tel"
                  name="phone"
                  placeholder="+289 | "
                  value={form.phone}
                  onChange={handleInput}
                  className="px-[20px] py-[14px] xl:py-[10px] w-full outline-[#EE5128]"
                  required
                />
                <div className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                  <img src={MobileIcon} alt="Mobile Icon" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                {t("signup.fields.email")}
              </label>
              <div className="relative bg-[#F1F3F6] flex rounded-l-[8px] w-full mt-[10px] xl:mt-[5px]">
                <input
                  type="email"
                  name="email"
                  placeholder="alex@email.com"
                  value={form.email}
                  onChange={handleInput}
                  className="px-[20px] py-[14px] xl:py-[10px] w-full outline-[#EE5128]"
                  required
                />
                <div className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                  <img src={MailIcon} alt="Mail Icon" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                {t("signup.fields.password")}
              </label>
              <div className="relative bg-[#F1F3F6] flex rounded-l-[8px] w-full mt-[10px] xl:mt-[5px]">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleInput}
                  className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px]  w-full outline-[#EE5128] relative"
                  required
                />

                <div
                  className="my-auto px-2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Eye className="text-gray-400" />
                </div>
                <div
                  className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px] rounded-[8px] bg-[#EE5128] grid place-items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <img src={LockIcon} alt="Lock Icon" />
                </div>
              </div>
            </div>
            <button className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] xl:py-[10px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]">
              {t("signup.button")} {" as "}
              {selectedType}
            </button>
            {/* Show error or success below button */}
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-green-600 mt-2">{success}</div>}
          </form>
          <div className="flex items-center w-full gap-[11px] mt-[10px] max-w-[430px]">
            <div className="h-px w-full bg-[#C2C2C2]"></div>
            <p className="text-[#C2C2C2]">OR</p>
            <div className="h-px w-full bg-[#C2C2C2]"></div>
          </div>
          <div className="flex gap-[8px] max-w-[430px] w-full">
            <div
              className="px-[37px] py-[10px] border border-[#E8ECF4] rounded-[8px] w-full  flex justify-center gap-4"
              onClick={() => HandleGoogleSigninFunction()}
            >
              <img src={GoogleIcon} alt="Google icon" />
              <p className="font-jakarta font-medium">Sign up with Google</p>
            </div>
          </div>
          <p className="mt-[10px] xl:mt-[5px] font-jakarta font-normal text-[16px]">
            {t("signup.options.login-content")}
            <Link
              to={"/Login"}
              className="font-bold pl-1 text-[18px] text-[#EE5128]"
            >
              {t("signup.options.login")}
            </Link>
          </p>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="right-section hidden xl:block xl:w-1/2 w-full h-full bg-black relative"
      >
        <div
          className="w-full h-full bg-cover bg-right bg-no-repeat bg-black"
          style={{ backgroundImage: `url(${SignUpBg})` }}
        ></div>
      </div>
    </div>
  );
}

export default SignupPage;
