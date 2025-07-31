import { useState } from "react";

import Brand1 from "../../assets/images/PaymentBrands/brand1.png";
import Brand2 from "../../assets/images/PaymentBrands/brand2.png";
import Brand3 from "../../assets/images/PaymentBrands/brand3.png";
import Brand4 from "../../assets/images/PaymentBrands/brand4.png";
import Brand5 from "../../assets/images/PaymentBrands/brand5.png";
import Brand6 from "../../assets/images/PaymentBrands/brand6.png";
import Brand7 from "../../assets/images/PaymentBrands/brand7.png";
import Brand8 from "../../assets/images/PaymentBrands/brand8.png";
import Brand9 from "../../assets/images/PaymentBrands/brand9.png";
import Brand10 from "../../assets/images/PaymentBrands/brand10.png";
import Brand11 from "../../assets/images/PaymentBrands/brand11.png";
// import Brand23 from "../../assets/images/PaymentBrands/brand23.png";
import Brand24 from "../../assets/images/PaymentBrands/brand24.png";
import Brand25 from "../../assets/images/PaymentBrands/brand25.png";
import Brand26 from "../../assets/images/PaymentBrands/brand26.png";
import Brand27 from "../../assets/images/PaymentBrands/brand27.jpg";
// import Brand28 from "../../assets/images/PaymentBrands/brand28.png";

import BannerBottom from "../../assets/images/banner-bottom.png";
import { useTranslation } from "react-i18next";

const PaymentBrands = [
  { id: 1, src: Brand1, alt: "Visa" },
  { id: 2, src: Brand2, alt: "Mastercard" },
  { id: 3, src: Brand3, alt: "PayPal" },
  { id: 4, src: Brand4, alt: "American Express" },
  { id: 5, src: Brand5, alt: "Discover" },
  { id: 6, src: Brand6, alt: "Stripe" },
  { id: 7, src: Brand7, alt: "UnionPay" },
  { id: 8, src: Brand8, alt: "Razorpay" },
  { id: 9, src: Brand9, alt: "Apple Pay" },
  { id: 10, src: Brand10, alt: "Google Pay" },
  { id: 11, src: Brand11, alt: "Samsung Pay" },
  { id: 13, src: Brand24, alt: "Samsung Pay" },
  { id: 14, src: Brand25, alt: "Samsung Pay" },
  { id: 15, src: Brand26, alt: "Samsung Pay" },
  { id: 16, src: Brand27, alt: "Samsung Pay" },
];

export default function PaymentOptionSection() {
  const { t } = useTranslation();
  return (
    <div className="relative flex items-center justify-center px-[12px] sm:px-8 md:px-10 lg:px-20 xl:px-40 py-16 sm:py-20 pb-[169px] bg-white">
      <div className="flex flex-col gap-10 sm:gap-14 w-full">
        <div className="text-center">
          <h2
            data-aos="zoom-in-up"
            className="text-[31px] sm:text-3xl lg:text-4xl font-semibold text-black font-jakarta"
          >
            {t("payment-section.title")}
          </h2>
          <p
            data-aos="zoom-in-up"
            className="mt-4 text-[17px] sm:text-base lg:text-xl text-black/80 leading-relaxed sm:leading-8 xl:px-40"
          >
            {t("payment-section.description")}
          </p>
        </div>

        <div className="w-full">
          <div className="hidden lg:block">
            <LogoMarquee logos={PaymentBrands} />
          </div>
          <div className="flex flex-wrap lg:hidden gap-[30px] items-center justify-center">
            {PaymentBrands.map((brand) => (
              <div className="" key={brand.id}>
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  width={60}
                  height={50}
                  className="object-contain max-h-10 sm:max-h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <img
        // src="/assets/images/banner-bottom.png"
        src={BannerBottom}
        alt="Decorative bottom banner"
        height={40}
        width={662}
        className="absolute bottom-[-25px] z-10 h-20 w-full object-cover"
      />
    </div>
  );
}

const LogoMarquee = ({ logos }) => {
  const [isPaused, setIsPaused] = useState(false);
  const firstRow = logos.slice(0, 6);
  const secondRow = logos.slice(6);

  return (
    <div className="sm:px-4 md:px-8 lg:px-10">
      <div className="w-full overflow-hidden">
        {/* Row 1 */}
        <div className="mb-6 sm:mb-8">
          <div
            className="flex gap-6 sm:gap-12 animate-scroll whitespace-nowrap"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...firstRow, ...firstRow].map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="flex items-center justify-center rounded-lg bg-white p-2 sm:p-4 min-w-[100px] h-20 sm:h-24"
              >
                <img
                  src={logo.src}
                  alt={logo.alt || `Brand ${index + 1}`}
                  width={100}
                  height={50}
                  className="object-contain max-h-10 sm:max-h-12"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div>
          <div
            className="flex gap-6 sm:gap-12 animate-scroll-reverse whitespace-nowrap"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...secondRow, ...secondRow].map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="flex items-center justify-center rounded-lg bg-white p-2 sm:p-4 min-w-[100px] h-20 sm:h-24"
              >
                <img
                  src={logo.src}
                  alt={logo.alt || `Brand ${index + 7}`}
                  width={100}
                  height={50}
                  className="object-contain max-h-10 sm:max-h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
