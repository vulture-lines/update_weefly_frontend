import waiting1 from "/assets/ticketpage/waiting1.png";
import AirIndiaLogo from "../../assets/images/AirIndiaLogo.svg";
import FlightLogo from "../../assets/images/FlightIcon.svg";
import { Link } from "react-router";

function SupplierError() {
  return (
    <div className="py-[30px] px-10 xl:px-40">
      <img
        src={waiting1}
        alt={"Ticket Pending Confirmation"}
        className="size-[60px] xl:size-[133px] mx-auto"
        data-aos="zoom-out"
      />
      <div className="text-center mt-[30px]" data-aos="fade-up">
        <h1 className="text-4xl font-bold font-jakarta text-orange-600 mb-6">
          Unconfirmed By Supplier
        </h1>
        {/* <p className="font-jakarta font-medium text-[18px] xl:text-[22px] text-[#555555] mb-[10px]">
          Please wait for your confirmation, <b>Retry after 15 minutes.</b>
        </p>
        <p className="font-jakarta font-medium text-[16px] xl:text-[20px] text-[#555555]  mb-[30px]">
          Kindly check your email...
        </p> */}

         <p className="font-jakarta font-medium text-[16px] xl:text-[20px] text-[#555555]  mb-[30px] leading-7">
          <span className="text-orange-600 text-xl">
          We're Processing Your Request.
          </span> <br />
Your request is currently being processed. <b> Please do not retry or resubmit at this time.</b>
<br />
We are awaiting final confirmation, and you will be notified as soon as the status is updated.
<br />
Thank you for your patience.
        </p>
        <p className="font-jakarta font-medium text-[12px] xl:text-[16px] text-[#555555]  mb-[10px] max-w-3xl mx-auto text-pretty">
          The airline did not give a clear indication of the status of this
          booking. If the booking succeeded, you should receive an email
          confirmation from them shortly. If in doubt, please contact our help
          desk:{" "}
          <Link to={"/"} className="text-orange-600 underline">
            Contact us
          </Link>
        </p>
      </div>

      <div className=" max-w-[430px] w-full mx-auto mt-[70px] flex flex-col gap-[37px]">
        {/* <button
          data-aos="fade-up"
          className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]"
        >
          Download invoice
        </button> */}
        <Link
          data-aos="fade-up"
          to={"/"}
          className="text-[#EE5128] font-jakarta font-semibold text-[18px] text-center mx-auto"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default SupplierError;
