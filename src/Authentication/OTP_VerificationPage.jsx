// import { Link } from "react-router";

// import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
// import OTPVerifyBg from "../assets/Auth/OTPbg.png";
// import { VerifyOTP } from "../features/firebase";

// function OTP_VerificationPage() {
//   const HandleOtpVerification = async (e) => {
//     e.preventDefault();
//     const res = await VerifyOTP();
//   };
//   return (
//     <div className="h-screen flex relative overflow-hidden">
//       <div
//         data-aos="fade-right"
//         className="left-section w-full xl:w-1/2 h-full bg-white flex flex-col px-[24px] xl:px-[136px]"
//       >
//         {/* Add form or content here */}
//         <div className=" h-full flex flex-col items-center justify-center gap-[15px]">
//           <img
//             src={WeeFlyLogo}
//             alt="WeeFly Logo"
//             className="h-[70px] w-[92px]"
//           />
//           <h1 className="font-jakarta font-semibold text-[24px]">Enter OTP</h1>
//           <h1 className="font-jakarta font-normal text-[16px] text-[#555555] text-center max-w-[430px]">
//             We have sent a OTP to your mobile number
//           </h1>
//           <form
//             action=""
//             onSubmit={HandleOtpVerification}
//             className="max-w-[430px] w-full"
//           >
//             <div className="flex gap-[10px] xl:gap-[24px]">
//               <input
//                 type="text"
//                 placeholder="0"
//                 className="px-[20px] py-[14px] w-full outline-[#EE5128] border rounded-[8px] border-[#CCCCCC]"
//               />
//               <input
//                 type="text"
//                 placeholder="0"
//                 className="px-[20px] py-[14px] w-full outline-[#EE5128] border rounded-[8px] border-[#CCCCCC]"
//               />
//               <input
//                 type="text"
//                 placeholder="0"
//                 className="px-[20px] py-[14px] w-full outline-[#EE5128] border rounded-[8px] border-[#CCCCCC]"
//               />
//               <input
//                 type="text"
//                 placeholder="0"
//                 className="px-[20px] py-[14px] w-full outline-[#EE5128] border rounded-[8px] border-[#CCCCCC]"
//               />
//               <input
//                 type="text"
//                 placeholder="0"
//                 className="px-[20px] py-[14px] w-full outline-[#EE5128] border rounded-[8px] border-[#CCCCCC]"
//               />
//               <input
//                 type="text"
//                 placeholder="0"
//                 className="px-[20px] py-[14px] w-full outline-[#EE5128] border rounded-[8px] border-[#CCCCCC]"
//               />
//             </div>

//             <button
//               type="submit"
//               className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[40px] drop-shadow-xl drop-shadow-[#FD74014D]"
//             >
//               Verify now
//             </button>
//           </form>
//           <p className="mt-[30px] font-jakarta font-normal text-[16px]">
//             Don’t have an account?{" "}
//             <Link
//               to={"/SignUp"}
//               className="font-bold text-[18px] text-[#EE5128]"
//             >
//               Signup
//             </Link>
//           </p>
//         </div>
//       </div>
//       <div
//         data-aos="fade-left"
//         className="right-section hidden xl:block xl:w-1/2 h-full bg-black relative"
//       >
//         {/* <div className=""></div> */}
//         <img
//           src={OTPVerifyBg}
//           alt="ForgetPassword Background"
//           className="object-cover object-center w-full h-full"
//         />
//       </div>
//     </div>
//   );
// }

// export default OTP_VerificationPage;

import { useRef } from "react";
import { Link, useNavigate } from "react-router";

import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
import OTPVerifyBg from "../assets/Auth/OTPbg.png";
import { VerifyOTP } from "../features/firebase";
import Cookies from "js-cookie";
function OTP_VerificationPage() {
  const navigate = useNavigate();
  const inputRefs = Array.from({ length: 4 }, () => useRef());

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const otp = inputRefs.map((ref) => ref.current.value).join("");
    console.log(otp);

    if (otp.length === 4) {
      try {
        const email = Cookies.get("email");
        const USER_API_URL =
          import.meta.env.VITE_USER_SERVICE_URL ||
          "http://localhost:3000/userapi";

        const res = await fetch(`${USER_API_URL}/validateotp`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            inputOtp: otp,
          }),
        });
        if (res.ok) {
          Cookies.remove("email");
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please enter all 4 digits of the OTP.");
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      <div
        data-aos="fade-right"
        className="left-section w-full xl:w-1/2 h-full bg-white flex flex-col px-[24px] xl:px-[136px]"
      >
        <div className="h-full flex flex-col items-center justify-center gap-[15px]">
          <img
            src={WeeFlyLogo}
            alt="WeeFly Logo"
            className="h-[70px] w-[92px]"
          />
          <h1 className="font-jakarta font-semibold text-[24px]">Enter OTP</h1>
          <h1 className="font-jakarta font-normal text-[16px] text-[#555555] text-center max-w-[430px]">
            We have sent an OTP to your Email
          </h1>
          <form
            onSubmit={handleOtpVerification}
            className="max-w-[430px] w-full"
          >
            <div className="w-full flex justify-center items-center gap-[10px] xl:gap-[24px] px-16 ">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={ref}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="text-center px-[20px] py-[14px] w-full outline-[#EE5128] border rounded-[8px] border-[#CCCCCC] text-[18px] "
                />
              ))}
            </div>

            <button
              type="submit"
              className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[40px] drop-shadow-xl drop-shadow-[#FD74014D]"
            >
              Verify now
            </button>
          </form>
          <p className="mt-[30px] font-jakarta font-normal text-[16px]">
            Don’t have an account?{" "}
            <Link
              to={"/SignUp"}
              className="font-bold text-[18px] text-[#EE5128]"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="right-section hidden xl:block xl:w-1/2 h-full bg-black relative"
      >
        <img
          src={OTPVerifyBg}
          alt="OTP Background"
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
}

export default OTP_VerificationPage;
