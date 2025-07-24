import error from "/assets/ticketpage/error.jpg";
import { Link } from "react-router";

function ErrorPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center py-[30px] px-10 xl:px-40">
      <img
        src={error}
        alt={"Ticket Pending Confirmation"}
        className="size-[100px] xl:size-[253px] mx-auto"
        data-aos="zoom-out"
      />
      <div className="text-center mt-[30px]" data-aos="fade-up">
        <p className="font-jakarta font-medium text-[18px] xl:text-[22px] text-[#555555] mb-[10px]">
          Uh-oh!
        </p>
        <p className="font-jakarta font-medium text-[16px] xl:text-[20px] text-[#555555]">
          Something went wrong.
        </p>
        {/* <p className="font-jakarta font-medium text-[16px] xl:text-[20px] text-[#555555] mt-6">
          Service currently unavailable. Your booking did not go through. <br />{" "}
          <b>Please try again.</b>
        </p> */}

        <p className="font-jakarta font-medium text-[16px] xl:text-[20px] text-[#555555] my-6 max-w-7xl">
          {" "}
          <span className="text-orange-600 text-2xl font-semibold mb-8">
            Service Temporarily Unavailable
          </span>{" "}
          <br />
          We're experiencing a service issue.Your request is currently being
          processed. <b> Please do not retry or resubmit at this time.</b>
          <br />
          We are awaiting final confirmation, and you will be notified as soon
          as the status is updated.
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

export default ErrorPage;
