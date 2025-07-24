import FlightFlyBg from "../../assets/images/ContactUsPage/FlightFlyingVector.svg";

import PhoneIcon from "../../assets/images/ContactUsPage/PhoneIcon.png";
import EmailIcon from "../../assets/images/ContactUsPage/MailLogo.png";
import LocationPinIcon from "../../assets/images/ContactUsPage/LocationPinIcon.png";

import FaceBookIcon from "../../assets/images/ContactUsPage/facebookIcon.svg";
import TwitterXIcon from "../../assets/images/ContactUsPage/twitter-x-Icon.svg";
import LinkedinIcon from "../../assets/images/ContactUsPage/linkedinIcon.svg";
import InstagramIcon from "../../assets/images/ContactUsPage/InstagramIcon.svg";
import { Link } from "react-router";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

function ContactUsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen px-4 md:px-20 lg:px-40 bg-neutral-50 overflow-hidden flex flex-col gap-[50px]">
      {/* header */}
      <div className="flex py-[50px]  items-start lg:items-center justify-between flex-col lg:flex-row">
        <h1 className="font-jakarta text-[24px] lg:text-[40px] uppercase font-semibold">
          {t("contactus-page.title")}
        </h1>
        <img
          src={FlightFlyBg}
          alt="FlightBooking"
          className="translate-x-[130px]"
        />
      </div>

      <div className="flex flex-col lg:flex-row bg-white rounded-md p-[16px] lg:p-[27px] gap-[107px]">
        {/* customer support */}
        <div className="flex-1">
          <CustomerSupport />
        </div>
        {/* get in touch */}
        <div className="flex-1 px-6">
          <GetInTouch />
        </div>
      </div>
      <div className="mb-[100px]">
        <MapModule />
      </div>
    </div>
  );
}

export default ContactUsPage;

const CustomerSupport = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col gap-[30px]">
        <h3 className="font-jakarta font-semibold text-[26px] px-6 py-4 bg-[#FFE2DA] rounded-t-2xl">
          {t("contactus-page.form.title")}
        </h3>
        <div className="font-sans font-normal text-[14px] grid lg:grid-cols-2 gap-[30px]">
          <input
            type="text"
            name=""
            id=""
            placeholder={`${t("contactus-page.form.fullname")}`}
            className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder={`${t("contactus-page.form.lastname")}`}
            className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder={`${t("contactus-page.form.email")}`}
            className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder={`${t("contactus-page.form.phone")}`}
            className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
          />
        </div>
        <textarea
          name=""
          id=""
          placeholder={`${t("contactus-page.form.message")}`}
          className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC] h-[141px]"
        ></textarea>
        <button className="bg-[#EE5128] text-white px-[34px] py-[11px] rounded-[4px] max-w-fit font-jakarta font-semibold text-[18px]">
          {`${t("contactus-page.form.button")}`}
        </button>
      </div>
    </>
  );
};

const GetInTouch = () => {
  const { t } = useTranslation();
  const SocialMediaLinks = [
    { logo: FaceBookIcon, link: "#" },
    { logo: TwitterXIcon, link: "#" },
    { logo: LinkedinIcon, link: "#" },
    { logo: InstagramIcon, link: "#" },
  ];
  return (
    <>
      <div className="">
        <h3 className="font-jakarta font-semibold text-[26px] py-4 mb-[23px]">
          {`${t("contactus-page.support.title")}`}
        </h3>
        <div className="flex flex-col gap-[35px]">
          <div className="flex gap-[11px]">
            <div className="bg-[#EE5128] flex items-center justify-center px-[18px]">
              <img
                src={PhoneIcon}
                alt="phone icon"
                className=" h-[31px] w-[31px]"
              />
            </div>
            <div className="flex flex-col items-start gap-[10px]">
              <label
                htmlFor=""
                className="font-jakarta font-medium text-[20px]"
              >
                {`${t("contactus-page.support.contact")}`}
              </label>
              <p className="font-sans text-[17px] font-normal">
                +238 959 23 88
              </p>
            </div>
          </div>
          <div className="flex gap-[11px]">
            <div className="bg-[#EE5128] flex items-center justify-center px-[18px]">
              <img
                src={EmailIcon}
                alt="Mail icon"
                className=" h-[31px] w-[31px]"
              />
            </div>
            <div className="flex flex-col items-start gap-[10px]">
              <label
                htmlFor=""
                className="font-jakarta font-medium text-[20px]"
              >
                {`${t("contactus-page.support.email")}`}
              </label>
              <p className="font-sans text-[17px] font-normal">
                info@weefly.cv
              </p>
            </div>
          </div>
          {/* <div className="flex gap-[11px] items-start">
            <div className="bg-[#EE5128] flex items-center justify-center p-[18px]">
              <img
                src={LocationPinIcon}
                alt="Location pin icon"
                className=" h-[31px] w-[31px]"
              />
            </div>
            <div className="flex flex-col items-start gap-[10px]">
              <label
                htmlFor=""
                className="font-jakarta font-medium text-[20px]"
              >
                {`${t("contactus-page.support.Address")}`}
              </label>
              <p className="font-sans text-[17px] font-normal">
                loremipsum <br /> loreispumloreiosdisnmfds
              </p>
            </div>
          </div> */}
        </div>

        <div className="flex gap-[20px] mt-[50px]">
          {SocialMediaLinks.map((media, index) => (
            <Link to={media.link} key={index}>
              <img
                src={media.logo}
                alt={media.logo}
                className="h-[27px] w-[27px]"
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

const MapModule = () => {
  return (
    <>
      <div className="h-[300px] lg:h-[500px] bg-neutral-300 rounded-2xl">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            // mapContainerStyle={containerStyle}
            // center={center}
            zoom={4}
          >
            {/* You can add markers or overlays here */}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};
