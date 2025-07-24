import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
import WeeFlyLogo2 from "../assets/images/WeeFly-white-logo.svg";
import UserIcon from "../assets/Auth/UserIcon.svg";
import MobileIcon from "../assets/Auth/MobileIcon.svg";
import MailIcon from "../assets/Auth/MailIcon.svg";
import LockIcon from "../assets/Auth/LockIcon.svg";
// import FacebookIcon from "../assets/Auth/FBIcon.svg";
import GoogleIcon from "../assets/Auth/GoogleIcon.svg";
// import AppleIcon from "../assets/Auth/AppleIcon.svg";
import SignUpBg from "../assets/Auth/Login-with-mobile-Bg.png";
import UploadImg from "../assets/Auth/uploadIcon.svg";
import { useState } from "react";
import { Eye, EyeClosed, ArrowLeft, X, AlignRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { HandleGoogleLogin } from "../features/firebase";
import { useTranslation } from "react-i18next";

function AgentKYCVerification() {
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
    navigate("/KYC-waiting");
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
            Weefly Agent KYC Verification Page
          </h1>
          <div className="h-[5px] bg-[#EE5128] w-full max-w-[200px]" />

          <form
            onSubmit={HandleKYCSubmit}
            className="max-w-[430px] w-full flex flex-col gap-[10px] xl:gap-[10px] mt-4"
          >
            <div className="w-full">
              <label
                htmlFor=""
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                Company Name
              </label>
              <div className="relative bg-[rgb(241,243,246)] flex rounded-l-[8px] w-full mt-[10px] xl:mt-[5px]">
                <input
                  type="text"
                  placeholder="Enter your company name"
                  className="px-[20px] py-[14px] xl:py-[10px] w-full outline-[#EE5128]"
                />
                <div className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                  <img src={UserIcon} alt="Mail Icon" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor=""
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                Agent Name
              </label>
              <div className="relative bg-[rgb(241,243,246)] flex rounded-l-[8px] w-full mt-[10px] xl:mt-[5px]">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="px-[20px] py-[14px] xl:py-[10px] w-full outline-[#EE5128]"
                />
                <div className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                  <img src={UserIcon} alt="Mail Icon" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor=""
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                Contact Number
              </label>
              <div className="relative bg-[#F1F3F6] flex rounded-l-[8px] w-full mt-[10px] xl:mt-[5px]">
                <input
                  type="tel"
                  placeholder="+289 | "
                  className="px-[20px] py-[14px] xl:py-[10px] w-full outline-[#EE5128]"
                />
                <div className="px-[20px] py-[14px] xl:py-[10px] xl:px-[10px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                  <img src={MobileIcon} alt="Mail Icon" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-jakarta font-medium">Upload Documents</p>

              <div className="flex gap-4 text-center">
                <label className="cursor-pointer flex flex-col w-[130px] items-center p-4 gap-4 border border-[#F1F3F6] rounded-md">
                  <input type="file" className="hidden" />
                  <img
                    src={UploadImg}
                    alt="Upload"
                    height={24}
                    width={24}
                    className="object-contain"
                  />
                  <p className="text-xs font-medium font-jakarta tracking-tight">
                    Upload ID Proof
                  </p>
                </label>

                <label className="cursor-pointer w-[130px] flex flex-col items-center p-4 gap-4 border border-[#F1F3F6] rounded-md">
                  <input type="file" className="hidden" />
                  <img
                    src={UploadImg}
                    alt="Upload"
                    height={24}
                    width={24}
                    className="object-contain"
                  />
                  <p className="text-xs font-medium font-jakarta tracking-tighter">
                    Upload Agency License
                  </p>
                </label>

                <label className="cursor-pointer flex flex-col w-[130px] items-center p-4 border border-[#F1F3F6] gap-4 rounded-md">
                  <input type="file" className="hidden" />
                  <img
                    src={UploadImg}
                    alt="Upload"
                    height={24}
                    width={24}
                    className="object-contain"
                  />
                  <p className="text-xs font-medium font-jakarta tracking-tighter">
                    Upload Company Logo
                  </p>
                </label>
              </div>

              <div className="text-gray-300 text-xs">
                *5MB. Formats: JPG, PNG, PDF.
              </div>
            </div>

            <button className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] xl:py-[10px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]">
              {submitting ? "Waiting Admin Aprroval" : "Submit"}
            </button>
            {submitting ? (
              <p className="text-sm text-center text-gray-400">
                Kindly check your mail, Please visit us after sometime
              </p>
            ) : (
              ""
            )}
          </form>
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

export default AgentKYCVerification;
