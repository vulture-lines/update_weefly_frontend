import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import WeeFlyLogo from "../assets/images/footer/weefly-logo.png";
import { useTranslation } from "react-i18next";

import Brand1 from "../assets/images/PaymentBrands/brand1.png";
import Brand2 from "../assets/images/PaymentBrands/brand2.png";
import Brand3 from "../assets/images/PaymentBrands/brand3.png";
import Brand4 from "../assets/images/PaymentBrands/brand4.png";
import Brand5 from "../assets/images/PaymentBrands/brand5.png";
import Brand6 from "../assets/images/PaymentBrands/brand6.png";
import Brand7 from "../assets/images/PaymentBrands/brand7.png";
import Brand8 from "../assets/images/PaymentBrands/brand8.png";
import Brand9 from "../assets/images/PaymentBrands/brand9.png";
import Brand10 from "../assets/images/PaymentBrands/brand10.png";
import Brand11 from "../assets/images/PaymentBrands/brand11.png";

export default function Footer() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const handleMouseEnter = (idx) => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpenIndex(idx), 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 300);
  };

  // Scroll animation
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  const footerSections = [
    {
      title: `${t("footer.quick")}`,
      content: [
        `${t("footer.links.link1")}`,
        `${t("footer.links.link2")}`,
        `${t("footer.links.link3")}`,
        `${t("footer.links.link4")}`,
        `${t("footer.links.link5")}`,
        `${t("footer.links.link6")}`,
      ],
      isLinks: true,
    },
    {
      title: `${t("footer.topDestination")}`,
      content: [
        "Tanzania",
        "South Africa",
        "Seychelles",
        "Morocco",
        "Zimbabwe",
        "Rwanda",
      ],
      isLinks: true,
    },
    {
      title: "Contact Us",
      content: [
        `${t("footer.mobile")}: +(1) 123 456 7890`,
        `${t("footer.email")}: weefly@gmail.com`,
      ],
      isLinks: false,
    },
    {
      title: `${t("footer.follow")}`,
      content: [FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram],
      isLinks: false,
      isIcons: true,
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`bg-white text-[#222] px-6 sm:px-8 md:px-22 pt-10 pb-6 ml-4 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-[0.97] translate-y-8"
      }`}
    >
      <div>
        {/* Logo */}
        <div className="mb-8 flex justify-center md:justify-start">
          <img
            src={WeeFlyLogo}
            alt="WeeFly Logo"
            width={130}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Mobile Version */}
        <div className="space-y-4 md:hidden">
          {footerSections.map((section, idx) => (
            <div
              key={idx}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              className="bg-gray-50 rounded shadow-sm overflow-hidden transition-all duration-500 ease-in-out"
            >
              <div className="w-full py-3 px-4 flex justify-between items-center font-jakarta font-bold text-base cursor-default">
                <span>{section.title}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </div>

              <div
                className={`px-4 font-lato transition-all duration-500 ease-in-out ${
                  openIndex === idx
                    ? "max-h-96 opacity-100 pt-2 pb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                {section.isLinks ? (
                  <ul className="space-y-2 text-[15px] text-[#444]">
                    {section.content.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-black">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : section.isIcons ? (
                  <div className="flex items-center gap-5 text-[#0A0A23] text-xl">
                    {section.content.map((Icon, i) => (
                      <a key={i} href="#" className="hover:text-black">
                        <Icon />
                      </a>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2 text-[15px] text-[#444]">
                    {section.content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Version */}
        <div className="hidden md:grid grid-cols-4 gap-6 sm:gap-8 md:gap-12 items-start">
          <div className="flex flex-col items-start text-left">
            <h4 className="text-lg font-bold font-jakarta mb-3">
              {t("footer.quick")}
            </h4>
            <ul className="space-y-2 text-[15px] text-[#444] font-lato">
              {[
                `${t("footer.links.link1")}`,
                `${t("footer.links.link2")}`,
                `${t("footer.links.link3")}`,
                `${t("footer.links.link4")}`,
                `${t("footer.links.link5")}`,
                `${t("footer.links.link6")}`,
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-black">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="text-lg font-bold font-jakarta mb-3">
              {t("footer.topDestination")}
            </h4>
            <ul className="space-y-2 text-[15px] text-[#444] font-lato">
              {[
                "Tanzania",
                "South Africa",
                "Seychelles",
                "Morocco",
                "Zimbabwe",
                "Rwanda",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-black">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="text-lg font-bold font-jakarta mb-3">
              {t("footer.mobile")}
            </h4>
            <p className="text-[15px] text-[#444] font-lato mb-5">
              +238 959 23 88
            </p>
            <h4 className="text-lg font-bold font-jakarta mb-2">
              {t("footer.email")}
            </h4>
            <p className="text-[15px] text-[#444] font-lato">info@weefly.cv</p>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="text-lg font-bold font-jakarta mb-3">
              {t("footer.follow")}
            </h4>
            <div className="flex items-center gap-5 text-[#0A0A23] text-xl">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
            <h4 className="text-lg font-bold font-jakarta my-3 mt-6">
              Supported Cards
            </h4>
            <div className="grid items-center gap-5 text-[#0A0A23] text-xl grid-cols-4">
              <img src={Brand1} alt="brand" height={24} width={24} />
              <img src={Brand2} alt="brand" height={24} width={24} />
              <img src={Brand3} alt="brand" height={24} width={24} />
              <img src={Brand4} alt="brand" height={24} width={24} />
              <img src={Brand5} alt="brand" height={24} width={24} />
              <img src={Brand6} alt="brand" height={24} width={24} />
              <img src={Brand7} alt="brand" height={24} width={24} />
              <img src={Brand8} alt="brand" height={24} width={24} />
              <img src={Brand9} alt="brand" height={24} width={24} />
              <img src={Brand10} alt="brand" height={24} width={24} />
              <img src={Brand11} alt="brand" height={24} width={24} />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-[14px] text-[#444] font-lato">
          Copyright © 2025 weefly. All rights reserved
        </div>
      </div>
    </footer>
  );
}
