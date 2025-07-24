import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
import WeeFlyLogo2 from "../assets/images/WeeFly-white-logo.svg";

import SignUpBg from "../assets/Auth/ForgotPasswordBg.png";
import { useState } from "react";
import { Eye, EyeClosed, ArrowLeft, X, AlignRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import SandTimer from "../assets/Auth/SandTimer.svg";

function KYCwaiting() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const NavLinks = [
    { label: t("navbar.home"), link: "/" },
    { label: t("navbar.aboutus"), link: "/" },
    { label: t("navbar.services"), link: "/#ServicesOffered" },
    { label: t("navbar.news"), link: "/#newsSection" },
    { label: t("navbar.media"), link: "/" },
    { label: t("navbar.contactus"), link: "/Contact" },
  ];
  // const HandleGoogleSigninFunction = async () => {
  //   const userData = await HandleGoogleLogin(); // Get user data from Google login
  //   setSigninUserData(userData); // Set user data to state
  //   // Use the local `userData` variable instead of `loginUserData`
  //   if (userData) {
  //     // navigate("/Login-with-mobile", { state: { loginUserData: userData } });
  //     navigate('/profile', { state: { signinUserData: userData } });
  //   } else {
  //     navigate('/');
  //   }
  // };
  // const HandleGoogleLoginFunction = async () => {
  //   const userData = await HandleGoogleLogin(); // Get user data from Google login
  //   // setLoginUserData(userData); // Set user data to state
  //   // Use the local `userData` variable instead of `loginUserData`
  //   if (userData) {
  //     // navigate("/Login-with-mobile", { state: { loginUserData: userData } });
  //     localStorage.setItem('loggedIn', 'true');
  //     localStorage.setItem('loginUserDetail', JSON.stringify(userData));
  //     navigate('/profile', { state: { loginUserData: userData } });
  //   } else {
  //     navigate('/');
  //   }
  // };

  const HandleKYCSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 6000);
    navigate("/agent-dashboard");
    console.log("KYC submitted");
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      <div
        data-aos="fade-right"
        className="left-section w-full xl:w-1/2 h-full bg-white flex flex-col px-[24px] xl:px-[136px] "
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
        <div className=" h-full flex flex-col items-center justify-center gap-[10px] xl:gap-[10px]">
          <img
            src={WeeFlyLogo}
            alt="WeeFly Logo"
            className="h-[70px] w-[100px]"
          />
          <h1 className="font-jakarta font-semibold text-[20px]">
            Login into your account
          </h1>
          <div className="h-[5px] bg-[#EE5128] w-full max-w-[200px]" />

          <form
            onSubmit={HandleKYCSubmit}
            className="max-w-[430px] w-full flex flex-col gap-[10px] xl:gap-[10px] mt-4"
          >
            <img
              src={SandTimer}
              alt="Sand timer"
              height={80}
              width={80}
              className="mt-[100px] mb-[50px] mx-auto"
            />

            <button className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] xl:py-[10px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]">
              Waiting Admin Aprroval
            </button>

            <p className="text-sm text-center text-gray-400">
              Kindly check your mail, Please visit us after sometime
            </p>
          </form>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="right-section hidden xl:block xl:w-1/2 w-full h-full bg-black relative"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat bg-black"
          style={{ backgroundImage: `url(${SignUpBg})` }}
        ></div>
      </div>
    </div>
  );
}

export default KYCwaiting;
