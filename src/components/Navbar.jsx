import {
  AlignLeft,
  Bell,
  LogOut,
  Mail,
  Phone,
  Play,
  Plus,
  Search,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import WeeFlyLogo from "../assets/images/WeeFly-white-logo.svg";
import AfricaFlag from "../assets/images/africaflag.png";
import Menu from "../assets/images/menu.svg";
import WeeFlyLogo2 from "../assets/images/Weefly-Orange.svg";

import PlayIcon from "../assets/images/play-flaticon.png";
import PlusIcon from "../assets/images/cancel-flaticon.png";
import { Link, useLocation, useNavigate } from "react-router";

import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HandleGoogleLogout } from "../features/firebase";
import TranslatorSwitch from "./TranslatorSwitch";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const Location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const LoggedIn = JSON.parse(localStorage.getItem("loggedIn") || "false");
  const LoginDetail = JSON.parse(localStorage.getItem("loginUserDetail"));

  const NavLinks = [
    { label: `${t("navbar.home")}`, link: "/" },
    { label: `${t("navbar.aboutus")}`, link: "/" },
    { label: `${t("navbar.services")}`, link: "/#ServicesOffered" },
    { label: `${t("navbar.news")}`, link: "/#newsSection" },
    { label: `${t("navbar.media")}`, link: "/#socialMedia" },
    { label: `${t("navbar.contactus")}`, link: "/Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HandleLogout = () => {
    HandleGoogleLogout();
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      {location.pathname === "/" ? (
        <div
          data-aos="fade-down"
          className={` fixed w-full z-50 top-0 px-10 xl:px-40 font-sans ${
            isScrolled ? "backdrop-blur-lg bg-white text-black" : "text-white"
          }`}
        >
          <div
            className={`flex justify-between items-center  ${
              isMenuOpen || isScrolled ? "h-20" : "h-30"
            }
 transition-all duration-300`}
          >
            {/* <div
            className={`flex justify-between items-center  ${
              isMenuOpen ? "h-20" : isScrolled ? "h-20" : "h-30"
            } transition-all duration-300`}
          > */}
            <div className="">
              {isScrolled ? (
                <img
                  src={WeeFlyLogo2}
                  alt="WeeFly"
                  className="h-10 lg:h-16  cursor-pointer"
                  onClick={() => navigate("/")}
                />
              ) : (
                <img
                  src={WeeFlyLogo}
                  alt="WeeFly"
                  className="h-10 lg:h-16 cursor-pointer"
                  onClick={() => navigate("/")}
                />
              )}
            </div>

            {/* transparent navbar */}
            <div className="items-center gap-10 hidden lg:flex">
              <nav className="flex items-center text-base space-x-10">
                {/* <a href="#">Take a tour</a> */}

                <a href={"#ServicesOffered"}>
                  <div className="rounded-md">
                    <img
                      src={PlusIcon}
                      alt="play icon"
                      className="h-[35px] rotate-45"
                    />
                  </div>
                </a>
                <Link to={"#socialMedia"}>
                  <div className="rounded-md">
                    <img src={PlayIcon} alt="play icon" className="h-[30px]" />
                  </div>
                </Link>
                <Link
                  to={"/"}
                  className="hover:underline hover:text-primary font-medium font-sans"
                >
                  {t("navbar.home")}
                </Link>
                <Link
                  to={"#newsSection"}
                  className="hover:underline hover:text-primary font-medium font-sans"
                >
                  {t("navbar.news")}
                </Link>
                <Link
                  to={"/Contact"}
                  className="hover:underline hover:text-primary font-medium font-sans"
                >
                  {t("navbar.contactus")}
                </Link>
                {/* <Link
                  to={"#"}
                  className="hover:underline hover:text-primary font-medium font-sans"
                >
                  About us
                </Link> */}
                {/* <Link to={"Contact"}>Contact us</Link> */}
                {/* <a href="#">Contact us</a> */}
              </nav>
              <div className="flex items-center divide-x gap-4">
                {/* <form>
                  <div className=" flex items-center gap-4">
                    <Search
                      className="cursor-pointer"
                      onClick={() => setIsSearchOpen((prev) => !prev)}
                    />
                    <input
                      type="search"
                      placeholder="Find"
                      className={`${
                        isSearchOpen ? "w-32 pr-2" : "w-0 pr-0"
                      } outline-none ring-0 transition-all duration-300 ease-in-out`}
                    />
                    <button className="hidden" type="submit" />
                  </div>
                </form> */}
                <div className="flex items-center gap-4">
                  {LoggedIn ? (
                    <button
                      className="font-medium text-sm font-jakarta px-3.5 py-2 flex items-center rounded-md gap-2 transition-colors duration-200"
                      onClick={() => navigate("/profile")}
                    >
                      {LoginDetail.photoURL ? (
                        <img
                          src={LoginDetail.photoURL}
                          alt=""
                          height={30}
                          width={30}
                          className="rounded-full"
                        />
                      ) : (
                        <UserCircle />
                      )}

                      <span className="flex gap-2">
                        <div className="">Hi,</div>
                        <div className="">
                          {LoginDetail.name ? LoginDetail.name : "user"}
                        </div>
                      </span>
                    </button>
                  ) : (
                    <button
                      className="bg-orange-600 px-3.5 py-2 flex items-center rounded-md gap-2 text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                      onClick={() => navigate("/login")}
                    >
                      <UserCircle />
                      <span>{t("navbar.login/register")}</span>
                    </button>
                  )}

                  {LoggedIn ? (
                    <div className="cursor-pointer flex items-center gap-6">
                      <div className="">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div className="" onClick={() => HandleLogout()}>
                        <LogOut />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={AfricaFlag}
                      height={39}
                      width={39}
                      alt="africa flag"
                    />
                  )}
                  <TranslatorSwitch />
                </div>
              </div>
            </div>
            {/* white navbar */}
            <div className="flex gap-[12px] items-center lg:hidden cursor-pointer">
              {LoggedIn ? (
                <Link to={"/profile"}>
                  <img
                    src={LoginDetail.photoURL}
                    alt=""
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                </Link>
              ) : (
                <Link to={"/Login"}>
                  <div className="bg-orange-600 px-3.5 py-2 flex items-center rounded-md gap-2 text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200">
                    <UserCircle />
                    <span>{t("navbar.signin")}</span>
                  </div>
                </Link>
              )}
              {LoggedIn && (
                <div className="">
                  <Bell className="h-5 w-5" />
                </div>
              )}
              <button
                className=""
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {isMenuOpen ? (
                  <X />
                ) : (
                  // <img src={Menu} height={20} width={20} alt="menu" />
                  <AlignLeft className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          data-aos="fade-down"
          className={`sticky w-full z-50 top-0 px-10 xl:px-40 font-sans backdrop-blur-lg bg-white text-black
        }`}
        >
          {/* <div
            className={`flex justify-between items-center ${
              isScrolled ? "h-20" : "h-30"
            } transition-all duration-300`}
          > */}
          <div
            className={`flex justify-between items-center  ${
              isMenuOpen || isScrolled ? "h-20" : "h-30"
            }
 transition-all duration-300`}
          >
            <div className="">
              <img
                src={WeeFlyLogo2}
                alt="WeeFly"
                className="h-10 lg:h-16 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="items-center gap-10 hidden lg:flex">
              <nav className="flex items-center text-base space-x-10">
                {/* <a href="#">Take a tour</a>
                <a href="about">About us</a>
                <a href="#">Contact us</a> */}
                <Link to={"/#ServicesOffered"}>
                  <div className="rounded-md">
                    <img
                      src={PlusIcon}
                      alt="play icon"
                      className="h-[35px] rotate-45"
                    />
                  </div>
                </Link>
                <Link to={"#socialMedia"}>
                  <div className="">
                    <img src={PlayIcon} alt="PlayIcon" className="h-[30px]" />
                  </div>
                </Link>
                <Link
                  to={"/"}
                  className="hover:underline hover:text-primary font-medium font-sans"
                >
                  {t("navbar.home")}
                </Link>
                <Link to={"/#newsSection"}>{t("navbar.news")}</Link>
                {/* <Link to={"#"}>About us</Link> */}
                <Link to={"/Contact"}>{t("navbar.contactus")}</Link>
              </nav>
              <div className="flex items-center divide-x gap-4">
                {/* <form>
                  <div className=" flex items-center gap-4">
                    <Search
                      className="cursor-pointer"
                      onClick={() => setIsSearchOpen((prev) => !prev)}
                    />
                    <input
                      type="search"
                      placeholder="Find"
                      className={`${
                        isSearchOpen ? "w-32 pr-2" : "w-0 pr-0"
                      } outline-none ring-0 transition-all duration-300 ease-in-out`}
                    />
                    <button className="hidden" type="submit" />
                  </div>
                </form> */}
                <div className="flex items-center gap-4">
                  {LoggedIn ? (
                    <button
                      className="font-medium text-sm px-3.5 py-2 flex items-center rounded-md gap-2 transition-colors duration-200 font-jakarta "
                      onClick={() => navigate("/profile")}
                    >
                      {LoggedIn ? (
                        <Link to={"/profile"}>
                          <img
                            src={LoginDetail.photoURL}
                            alt=""
                            height={30}
                            width={30}
                            className="rounded-full"
                          />
                        </Link>
                      ) : (
                        <Link to={"/Login"}>
                          <UserCircle />
                        </Link>
                      )}

                      <span className="flex gap-1">
                        <div className="">Hi,</div>
                        <div className="">
                          {LoginDetail.name ? LoginDetail.name : "user"}
                        </div>
                      </span>
                    </button>
                  ) : (
                    <button
                      className="bg-orange-600 px-3.5 py-2 flex items-center rounded-md gap-2 text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                      onClick={() => navigate("/Login")}
                    >
                      <UserCircle />
                      <span>{t("navbar.login/register")}</span>
                    </button>
                  )}
                  {LoggedIn ? (
                    <div className="cursor-pointer flex items-center gap-6">
                      <div className="">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div className="" onClick={() => HandleLogout()}>
                        <LogOut />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={AfricaFlag}
                      height={39}
                      width={39}
                      alt="africa flag"
                    />
                  )}
                  <TranslatorSwitch />
                </div>
              </div>
            </div>
            <div className="flex gap-[12px] lg:hidden cursor-pointer items-center">
              {LoggedIn ? (
                <Link to={"/profile"} onClick={() => setIsMenuOpen(false)}>
                  <img
                    src={LoginDetail.photoURL}
                    alt=""
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                </Link>
              ) : (
                <Link to={"/Login"} onClick={() => setIsMenuOpen(false)}>
                  <div className="bg-orange-600 px-3.5 py-2 flex items-center rounded-md gap-2 text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200">
                    <UserCircle />
                    <span>{t("navbar.signin")}</span>
                  </div>
                </Link>
              )}
              {LoggedIn && (
                <div className="">
                  <Bell className="h-5 w-5" />
                </div>
              )}
              <button
                className=""
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {isMenuOpen ? (
                  <X />
                ) : (
                  // <img src={Menu} height={20} width={20} alt="menu" />
                  <AlignLeft className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`h-screen transition-all duration-300 origin-right fixed lg:hidden right-0 top-0 z-[999] overflow-hidden ${
          isMenuOpen ? "w-full" : "w-0"
        }`}
      >
        <div className="h-full bg-black/60 bg-opacity-50 backdrop-blur-md flex flex-col items-center">
          <div className="w-full z-50 top-0 px-10 xl:px-40 font-sans h-20 flex justify-between items-center text-white">
            <img
              src={WeeFlyLogo}
              alt="WeeFly"
              className="h-10 lg:h-16  cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="flex gap-[12px] lg:hidden cursor-pointer">
              {LoggedIn ? (
                <Link to={"/profile"} onClick={() => setIsMenuOpen(false)}>
                  <img
                    src={LoginDetail.photoURL}
                    alt=""
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                </Link>
              ) : (
                <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
                  <div className="bg-orange-600 px-3.5 py-2 flex items-center rounded-md gap-2 text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200">
                    <UserCircle />
                    <span>{t("navbar.signin")}</span>
                  </div>
                </Link>
              )}
              <button
                className=""
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {isMenuOpen ? (
                  <X />
                ) : (
                  // <img src={Menu} height={20} width={20} alt="menu" />
                  <AlignLeft className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-between p-4">
            <div className="flex flex-col text-white gap-4 p-4 font-medium text-2xl text-right">
              {NavLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.link}
                  className="transition duration-300 hover:underline hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div
                className="flex items-center justify-end gap-4 cursor-pointer"
                onClick={() => {
                  HandleLogout(), setIsMenuOpen(false);
                }}
              >
                <LogOut />
                <span>{t("navbar.logout")}</span>
              </div>
              <TranslatorSwitch />
            </div>
            <div className="flex flex-col justify-between p-4 gap-8 text-white">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Phone />
                  +238 959 23 88
                </div>
                <div className="flex gap-4">
                  <Mail />
                  info@weefly.cv
                </div>
              </div>
              <div className="flex gap-8">
                <Link to={"/"}>
                  <FaFacebookF className="h-6 w-6" />
                </Link>
                <Link to={"/"}>
                  <FaInstagram className="h-6 w-6" />
                </Link>
                <Link to={"/"}>
                  <FaXTwitter className="h-6 w-6" />
                </Link>
                <Link to={"/"}>
                  <FaLinkedinIn className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
