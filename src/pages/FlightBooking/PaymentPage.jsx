// import { useLocation, useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import { ChevronDown } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import {
//   fetchExchangeRates,
//   convertToRequestedCurrency,
// } from "../../utils/Currencyconverter";

// const paymentIcons = {
//   upi: "/assets/paymentpage/upi.png",
//   "debit-creditCard": "/assets/paymentpage/card.png",
//   netBanking: "/assets/paymentpage/netbanking.png",
//   wallet: "/assets/paymentpage/wallet.png",
//   emi: "/assets/paymentpage/emi.png",
//   payLater: "/assets/paymentpage/paylater.png",
// };

// import Brand1 from "../../assets/images/PaymentBrands/brand1.png";
// import Brand2 from "../../assets/images/PaymentBrands/brand2.png";
// import Brand3 from "../../assets/images/PaymentBrands/brand3.png";
// import Brand4 from "../../assets/images/PaymentBrands/brand4.png";
// import Brand5 from "../../assets/images/PaymentBrands/brand5.png";
// import Brand6 from "../../assets/images/PaymentBrands/brand6.png";
// import Brand7 from "../../assets/images/PaymentBrands/brand7.png";
// import Brand8 from "../../assets/images/PaymentBrands/brand8.png";
// import Brand9 from "../../assets/images/PaymentBrands/brand9.png";
// import Brand10 from "../../assets/images/PaymentBrands/brand10.png";
// import Brand11 from "../../assets/images/PaymentBrands/brand11.png";

// export default function PaymentPage() {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // card charges
//   const cardCharge = location.state.CardCharges;
//   console.log(cardCharge);

//   const [flight, setFlight] = useState(null);
//   const [price, setPrice] = useState(0);
//   const [seatCharge, setseatCharge] = useState(0);
//   const [luggaggeCharge, setluggaggeCharge] = useState(0);
//   const [tax, setTax] = useState("");
//   const OutwardTicket = location.state.flights[0];
//   const returnTicket = location.state.flights[1];
//   const [tfPrice, setTfPrice] = useState(0);
//   useEffect(() => {
//     const stored = location.state?.flights;
//     const price = location.state?.convertedPrice;
//     if (stored && price) {
//       setFlight(stored);
//       setTfPrice(price);
//     }
//   }, [location]);

//   const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;
//   console.log(location.state?.seatCharge);
//   console.log(location.state?.luggageSurcharge);

//   const getCommissionDetail = async () => {
//     try {
//       const res = await fetch(`${transactionUrl}/getcommissiondetails`);
//       const result = await res.json();
//       console.log(result.commissionDetail);
//       const commissionDetails = result.commissionDetail;
//       if (!commissionDetails) {
//         return console.log("Error");
//       } else {
//         const Tax = commissionDetails.Tax;
//         const Commission = commissionDetails.Commission;
//         if (Tax && Commission) {
//           console.log("Tf" + tfPrice);
//           console.log(Tax, Commission);
//           if (commissionDetails.CommissionType.toLowerCase() === "percentage") {
//             setTax(`${Tax}%`);
//             const taxAmount = (tfPrice * Tax) / 100;
//             const commissionAmount = (tfPrice * Commission) / 100;
//             const totalAmount = tfPrice + taxAmount + commissionAmount;
//             setPrice(totalAmount.toFixed(2));
//           } else if (
//             commissionDetails.CommissionType.toLowerCase() === "amount"
//           ) {
//             setTax(`${Tax}CVE`);
//             const totalAmount = tfPrice + Tax + Commission;
//             setPrice(totalAmount.toFixed(2));
//           }
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     if (tfPrice > 0) {
//       getCommissionDetail();
//     }
//   }, [tfPrice]);

//   function timestampgenerator() {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const formattedDate = `${year}/${month}/${day}`;
//     return formattedDate;
//   }
//   const address = location.state.Address;
//   console.log(address);
//   /*
//   const handleProcessTerm = async (requestBody) => {
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     const response = await fetch(`${backendUrl}/process-terms`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: requestBody,
//     });

//     if (response.ok) {
//       const contentType = response.headers.get("content-type");
//       let res;

//       if (contentType && contentType.includes("application/json")) {
//         try {
//           res = await response.json();
//         } catch (error) {
//           console.error("JSON parse error:", error);
//           alert("Invalid JSON received from server.");
//           return;
//         }
//         console.log(res)
//         // process JSON as usual
//         try {
//           const priceList = res.data.Router[0].GroupList[0].Group[0].Price;
//           const originalPrice = priceList[0].Amount[0];
//           const originalCurrency = priceList[0].Currency[0];
//           return {
//             price: originalPrice,
//             currency: originalCurrency,
//             bookid:res.data.TFBookingReference[0]
//           };
//         } catch (error) {
//           console.error("Error using JSON data:", error);
//         }
//       } else if (contentType && contentType.includes("text/xml")) {
//         // handle XML
//         const textResponse = await response.text();
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(textResponse, "text/xml");

//         // get the error details
//         const processTerms = xmlDoc.querySelector("ProcessTerms");
//         if (processTerms) {
//           const ecode = processTerms.getAttribute("ecode");
//           const etext = processTerms.getAttribute("etext");
//           const edetail = processTerms.getAttribute("edetail");
//           const edate = processTerms.getAttribute("edate");

//           console.error(
//             `XML error received: code=${ecode}, text=${etext}, details=${edetail}, date=${edate}`
//           );

//           alert(`Seat selection failed:\n${edetail}`);
//         } else {
//           alert("Received unexpected XML data.");
//         }
//       } else {
//         // unknown content-type
//         const textResponse = await response.text();
//         console.error("Unexpected content-type response:", textResponse);
//         alert("Server returned data in an unsupported format.");
//         // setErrorMsg(true)
//       }
//     } else {
//       console.error(`Server returned status: ${response.status}`);
//       alert("Could not fetch booking details.");
//     }
//   };

//   const reCalculatePrice = async (price, currency) => {
//     if (currency && price) {
//       const rates = await fetchExchangeRates("CVE");
//       const convertedPrice = parseFloat(
//         convertToRequestedCurrency(price, currency, "CVE", rates).toFixed(2)
//       );
//       setTfPrice(convertedPrice);
//     }
//   };
//   */
//   console.log("rt", returnTicket);
//   // Update your handleBooking function in PaymentPage.jsx

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     const transactionApi = import.meta.env.VITE_TRANSACTION_URL;
//     const Paymentdate = timestampgenerator();
//     const date = new Date();
//     const time = date.getTime();
//     const totalPrice = Math.ceil(price);
//     const originalCurrencyPrice = location.state?.originalPrice;
//     const originalCurrency = location.state?.originalCurrency;
//     const bookid = location.state.TFBookingReference;
//     const senderId = location.state.Guestid;
//     const seat = location.state.Seatoption;
//     const travellerDetails = location.state.TravellerList.TravellerList;

//     // Prepare payment summary data
//     const paymentSummaryData = {
//       outwardTicketPrice: OutwardTicket.price,
//       returnTicketPrice: returnTicket ? returnTicket.price : null,
//       seatCharge: location.state?.seatCharge || 0,
//       luggageCharge: location.state?.luggageSurcharge || 0,
//       tax: tax,
//       totalPrice: totalPrice,
//       currency: "CVE",
//       tripType: location.state.tripType,
//     };

//     if (
//       originalCurrencyPrice &&
//       originalCurrency &&
//       bookid &&
//       senderId &&
//       OutwardTicket &&
//       travellerDetails
//     ) {
//       try {
//         const response = await fetch(`${transactionApi}/start-payment`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             amount: totalPrice,
//             email: location.state.Email,
//             billAddrCountry: "Portugal",
//             billAddrCity: address.City,
//             billAddrline1: `${address.Flat}, ${address.BuildingName}, ${address.BuildingNumber}`,
//             billAddrPostCode: address.Postcode,
//             Paymentdate,
//             time,
//             expectedAmount: originalCurrencyPrice,
//             expectedCurrency: originalCurrency,
//             TFBookingReference: bookid,
//             fakeBooking: true,
//             // Add payment summary data
//             paymentSummary: paymentSummaryData,
//             ...(Array.isArray(seat) &&
//               seat.length > 0 && {
//                 seatOptions: seat,
//               }),
//             outwardFlight: OutwardTicket,
//             ...(returnTicket &&
//               Object.keys(returnTicket).length > 0 && {
//                 returnFlight: returnTicket,
//               }),
//             Travellerdetail: travellerDetails,
//             senderId: senderId,
//           }),
//         });

//         const html = await response.text();
//         const container = document.createElement("div");
//         container.innerHTML = html;
//         document.body.appendChild(container);
//         container.querySelector("form").submit();

//         if (!response.ok) {
//           const data = await response.json();
//           if (data.status === "UserCancelled") {
//             navigate("/booking/payment");
//             return;
//           }
//         }
//       } catch (error) {
//         console.error("Error starting payment:", error);
//       }
//     } else {
//       console.log(bookid);
//     }
//   };

//   // const handleBooking = async (e) => {
//   //   e.preventDefault();
//   //   const flightApi = import.meta.env.VITE_BACKEND_URL;
//   //   const bookid = location.state?.TFBookingReference;
//   //   const originalCurrencyPrice = location.state?.originalPrice;
//   //   const originalCurrency = location.state?.originalCurrency;

//   //   try {
//   //     const startBookingResult = await fetch(
//   //       "https://dev.weefly.africa/api/flightapi/start-booking",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           expectedAmount: originalCurrencyPrice,
//   //           expectedCurrency: originalCurrency,
//   //           TFBookingReference: bookid,
//   //           fakeBooking: true,
//   //         }),
//   //       }
//   //     );
//   //     const contentType = startBookingResult.headers.get("content-type");

//   //     if (contentType && contentType.includes("application/json")) {
//   //       try {
//   //         const res = await startBookingResult.json();
//   //         console.log(res);
//   //       } catch (error) {
//   //         console.error("JSON parse error:", error);
//   //         alert("Invalid JSON received from server.");
//   //         return;
//   //       }
//   //     }
//   //     if (contentType && contentType.includes("text/xml")) {
//   //       // handle XML
//   //       const textResponse = await startBookingResult.text();
//   //       const parser = new DOMParser();
//   //       const xmlDoc = parser.parseFromString(textResponse, "text/xml");

//   //       // get the error details
//   //       const processTerms = xmlDoc.querySelector("ProcessTerms");
//   //       if (processTerms) {
//   //         const ecode = processTerms.getAttribute("ecode");
//   //         const etext = processTerms.getAttribute("etext");
//   //         const edetail = processTerms.getAttribute("edetail");
//   //         const edate = processTerms.getAttribute("edate");

//   //         console.error(
//   //           `XML error received: code=${ecode}, text=${etext}, details=${edetail}, date=${edate}`
//   //         );

//   //         alert(`Seat selection failed:\n${edetail}`);
//   //       } else {
//   //         const textResponse = await startBookingresult.text();
//   //         console.error("Unexpected content-type response:", textResponse);
//   //         alert("Server returned data in an unsupported format.");
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   // '/ticketconfirm' ticketconfirm
//   // '/ticketnotconfirm' ticketconfirm

//   if (!flight)
//     return <p className="text-center mt-20 font-['Lato']">Loading...</p>;

//   return (
//     <div className=" font-sans flex justify-center">
//       <div className="w-full px-4">
//         {/* <h1 className="text-[24px] font-semibold mb-12 relative left-[29px] font-['Plus Jakarta Sans'] ml-[14px]">
//           Complete your Booking
//         </h1>

//         <div className="w-full max-w-[1090px] mx-auto flex items-center mb-10 relative justify-start gap-[214px]">
//           <div className="absolute top-[32px] left-[28px] right-[28px] h-[1px] z-0 bg-[radial-gradient(circle,#D1D5DB_1px,transparent_1.5px)] bg-[length:10px_1px]" />
//           {["Review your booking", "Travelers Details", "Seat Selection", "Payment"].map((label, index) => (
//             <div key={index} className={`relative flex flex-col items-center ${index === 0 || index === 3 ? "w-[150px]" : "flex-1"}`}>
//               <div className={`w-[56px] h-[56px] rounded-full text-white flex items-center justify-center text-[16px] font-semibold z-10 font-['Plus Jakarta Sans'] ${index === 3 ? "bg-[#EE5128]" : "bg-gray-400"}`}>
//                 {`0${index + 1}`}
//               </div>
//               <span className={`text-[14px] mt-2 text-center font-['Lato'] ${index === 3 ? "text-black font-semibold" : "text-gray-400"}`}>
//                 {label}
//               </span>
//             </div>
//           ))}
//         </div> */}

//         <div className="flex flex-col lg:flex-row justify-between gap-4 xl:gap-8">
//           {/* Left */}
//           {/* <div className="w-full lg:w-[740px] space-y-6"> */}
//           <div className="w-full lg:max-w-[740px] space-y-6">
//             {location.state.tripType === "One Way" ? (
//               <>
//                 <p className="mb-6">Outward ticket</p>
//                 <div className="rounded-md bg-white">
//                   <div className="flex flex-col md:flex-row space-y-6 py-6 justify-between items-center px-4 pt-4">
//                     <div className="flex flex-col min-w-[170px] relative">
//                       <img
//                         src={OutwardTicket.logo}
//                         alt={OutwardTicket.airline}
//                         className="w-[120px] h-[40px] object-contain mb-[25px]"
//                       />
//                       <div className="absolute top-[38px] left-[4px] flex items-center space-x-2">
//                         <span className="text-[13px] text-gray-500">
//                           {OutwardTicket.flightNumber}
//                         </span>
//                         <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold">
//                           {OutwardTicket.class}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="text-center">
//                         <p className="text-[22px] font-bold text-black">
//                           {" "}
//                           {OutwardTicket?.departureTime}
//                         </p>
//                         <p className="text-[13px] text-gray-500">
//                           {OutwardTicket.departureCity}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <div className="flex items-center">
//                           <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                           <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                           <span className="text-black text-sm">✈</span>
//                           <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                           <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                         </div>
//                         <span className="text-[12px] text-gray-400 mt-[4px]">
//                           {OutwardTicket.duration}
//                         </span>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-[22px] font-bold text-black">
//                           {OutwardTicket?.arrivalTime}
//                         </p>
//                         <p className="text-[13px] text-gray-500">
//                           {OutwardTicket.arrivalCity}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right flex flex-col items-center lg:items-end space-y-[2px] w-[152px]">
//                       <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
//                         <span className="text-[20px] pr-2">
//                           {OutwardTicket.currency}
//                         </span>
//                         {OutwardTicket.price}
//                         <span className="text-[12px] text-black font-normal">
//                           /pax
//                         </span>
//                       </p>
//                       {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none">
//                         {OutwardTicket.currency}
//                         {OutwardTicket.originalPrice}
//                       </p> */}
//                     </div>
//                   </div>
//                   {/* <div className='flex justify-between items-center px-4 py-2 border-t border-[#CCCCCC] text-sm font-medium text-[#EE5128]'>
//               <div className='flex space-x-8'>
//               <span>
//               {t('booking-card.Flight-details')}
//               </span>
//               <span className='hidden lg:block'>
//               {t('booking-card.price-details')}
//               </span>
//               <span className='hidden lg:block'>
//               {t('booking-card.policy')}
//               </span>
//               <span className='hidden lg:block'>
//               {t('booking-card.refund')}
//               </span>
//               <span className='hidden lg:block'>
//               {t('booking-card.reschedule')}
//               </span>
//               </div>
//               <button
//               className='bg-[#EE5128] text-white px-4 py-1.5 rounded font-semibold
//               hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
//               {t('booking-card.book-now')}
//               </button>
//             </div> */}
//                 </div>
//               </>
//             ) : location.state.tripType === "Round Trip" ? (
//               <div className="flex flex-col gap-6">
//                 <p className="">Outward ticket</p>
//                 <div className="rounded-md bg-white">
//                   <div className="flex flex-col md:flex-row space-y-6 py-6 justify-between items-center px-4 pt-4">
//                     <div className="flex flex-col min-w-[170px] relative">
//                       <img
//                         src={OutwardTicket.logo}
//                         alt={OutwardTicket.airline}
//                         className="w-[120px] h-[40px] object-contain mb-[25px]"
//                       />
//                       <div className="absolute top-[38px] left-[4px] flex items-center space-x-2">
//                         <span className="text-[13px] text-gray-500">
//                           {OutwardTicket.flightNumber}
//                         </span>
//                         <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold">
//                           {OutwardTicket.class}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="text-center">
//                         <p className="text-[22px] font-bold text-black">
//                           {" "}
//                           {OutwardTicket?.departureTime}
//                         </p>
//                         <p className="text-[13px] text-gray-500">
//                           {OutwardTicket.departureCity}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <div className="flex items-center">
//                           <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                           <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                           <span className="text-black text-sm">✈</span>
//                           <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                           <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                         </div>
//                         <span className="text-[12px] text-gray-400 mt-[4px]">
//                           {OutwardTicket.duration}
//                         </span>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-[22px] font-bold text-black">
//                           {OutwardTicket?.arrivalTime}
//                         </p>
//                         <p className="text-[13px] text-gray-500">
//                           {OutwardTicket.arrivalCity}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right flex flex-col items-center lg:items-end space-y-[2px] w-[152px]">
//                       <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
//                         <span className="text-[20px] pr-2">
//                           {OutwardTicket.currency}
//                         </span>
//                         {OutwardTicket.price}
//                         <span className="text-[12px] text-black font-normal">
//                           /pax
//                         </span>
//                       </p>
//                       {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none">
//                         {OutwardTicket.currency}
//                         {OutwardTicket.originalPrice}
//                       </p> */}
//                     </div>
//                   </div>
//                   {/* <div className='flex justify-between items-center px-4 py-2 border-t border-[#CCCCCC] text-sm font-medium text-[#EE5128]'>
// 								<div className='flex space-x-8'>
// 									<span>
// 										{t('booking-card.Flight-details')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.price-details')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.policy')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.refund')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.reschedule')}
// 									</span>
// 								</div>
// 								<button
// 									className='bg-[#EE5128] text-white px-4 py-1.5 rounded font-semibold
//              hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
// 									{t('booking-card.book-now')}
// 								</button>
// 							</div> */}
//                 </div>
//                 <p className="">Return ticket</p>
//                 <div className="rounded-md bg-white">
//                   <div className="flex flex-col md:flex-row space-y-6 py-6 justify-between items-center px-4 pt-4">
//                     <div className="flex flex-col min-w-[170px] relative">
//                       <img
//                         src={returnTicket.logo}
//                         alt={returnTicket.airline}
//                         className="w-[120px] h-[40px] object-contain mb-[25px]"
//                       />
//                       <div className="absolute top-[38px] left-[4px] flex items-center space-x-2">
//                         <span className="text-[13px] text-gray-500">
//                           {returnTicket.flightNumber}
//                         </span>
//                         <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold">
//                           {returnTicket.class}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="text-center">
//                         <p className="text-[22px] font-bold text-black">
//                           {" "}
//                           {returnTicket?.departureTime}
//                         </p>
//                         <p className="text-[13px] text-gray-500">
//                           {returnTicket.departureCity}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <div className="flex items-center">
//                           <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                           <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                           <span className="text-black text-sm">✈</span>
//                           <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                           <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                         </div>
//                         <span className="text-[12px] text-gray-400 mt-[4px]">
//                           {returnTicket.duration}
//                         </span>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-[22px] font-bold text-black">
//                           {returnTicket?.arrivalTime}
//                         </p>
//                         <p className="text-[13px] text-gray-500">
//                           {returnTicket.arrivalCity}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right flex flex-col items-center lg:items-end space-y-[2px] w-[152px]">
//                       <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
//                         <span className="text-[20px] pr-2">
//                           {returnTicket.currency}
//                         </span>
//                         {returnTicket.price}
//                         <span className="text-[12px] text-black font-normal">
//                           /pax
//                         </span>
//                       </p>
//                       {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none">
//                         {returnTicket.currency}
//                         {returnTicket.originalPrice}
//                       </p> */}
//                     </div>
//                   </div>
//                   {/* <div className='flex justify-between items-center px-4 py-2 border-t border-[#CCCCCC] text-sm font-medium text-[#EE5128]'>
// 								<div className='flex space-x-8'>
// 									<span>
// 										{t('booking-card.Flight-details')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.price-details')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.policy')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.refund')}
// 									</span>
// 									<span className='hidden lg:block'>
// 										{t('booking-card.reschedule')}
// 									</span>
// 								</div>
// 								<button
// 									className='bg-[#EE5128] text-white px-4 py-1.5 rounded font-semibold
//              hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
// 									{t('booking-card.book-now')}
// 								</button>
// 							</div> */}
//                 </div>
//               </div>
//             ) : (
//               <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
//                 <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
//                   <h2 className="font-semibold text-[18px] font-jakarta">
//                     {t("booking-details.title")}
//                   </h2>
//                 </div>

//                 <div className="flex justify-between items-center px-6 mt-[20px]">
//                   Some thing error
//                 </div>
//               </div>
//             )}

//             <div className="bg-white rounded-md shadow-sm">
//               <div className="bg-[#FFE4DB] p-4 font-semibold font-['Plus Jakarta Sans']">
//                 {t("summary.title")}
//               </div>
//               <div className="p-4 space-y-3 text-[14px] text-black font-['Lato']">
//                 {/* <div className='flex justify-between'>
// 									<span>{t('summary.adult')} x 1</span>
// 									<span className='font-semibold flex gap-1'>
// 										<span>{flight.currency}</span>
// 										<span>{flight.price}</span>
// 									</span>
// 								</div> */}

//                 {location.state.tripType === "One Way" ? (
//                   <div className="flex justify-between">
//                     <span>Outward Ticket</span>
//                     <span className="font-semibold flex gap-1 items-center">
//                       <span className="text-xs">CVE</span>{" "}
//                       <span>{OutwardTicket.price}</span>
//                     </span>
//                   </div>
//                 ) : location.state.tripType === "Round Trip" ? (
//                   <>
//                     <div className="flex justify-between">
//                       <span>Outward Ticket</span>
//                       <span className="font-semibold flex gap-1 items-center">
//                         <span className="text-xs">CVE</span>{" "}
//                         <span>{OutwardTicket.price}</span>
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Return Ticket</span>
//                       <span className="font-semibold flex gap-1 items-center">
//                         <span className="text-xs">CVE</span>{" "}
//                         <span>{returnTicket.price}</span>
//                       </span>
//                     </div>
//                   </>
//                 ) : null}

//                 {location.state?.seatCharge && (
//                   <div className="flex justify-between">
//                     <span>Seat Charge</span>
//                     <span className="font-semibold flex gap-1 items-center">
//                       <span className="text-xs">CVE</span>{" "}
//                       <span>{location.state?.seatCharge}</span>
//                     </span>
//                   </div>
//                 )}
//                 {location.state?.luggageSurcharge === 0 ? (
//                   ""
//                 ) : (
//                   <div className="flex justify-between">
//                     <span>Luggage Charge</span>
//                     <span className="font-semibold flex gap-1 items-center">
//                       <span className="text-xs">CVE</span>{" "}
//                       <span> {location.state?.luggageSurcharge}</span>
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>{t("summary.totalTax")} +</span>
//                   <span className="font-semibold flex gap-1">
//                     <span>{flight.currency}</span> <span>{tax}</span>
//                   </span>
//                 </div>
//                 {/* <div className='flex justify-between'>
// 									<span>{t('summary.otherCharged')}</span>
// 									<span className='font-semibold flex gap-1'>
// 										{' '}
// 										<span>{flight.currency}</span>{' '}
// 										<span>200.00</span>
// 									</span>
// 								</div> */}
//                 <div className="flex justify-between border-t pt-3 text-[#EE5128] font-semibold">
//                   <span>{t("summary.total")}</span>
//                   <span className="flex items-center gap-1">
//                     {" "}
//                     <span className="text-xs">CVE</span> <span>{price}</span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-10 bg-white p-4 rounded-md">
//               <p className="text-xl font-jakarta mb-6 font-semibold">
//                 Supported Card
//               </p>

//               <div className="grid grid-cols-6 gap-5 items-center">
//                 <img src={Brand1} alt="brand1" height={50} width={50} />
//                 <img src={Brand2} alt="brand2" height={50} width={50} />
//                 <img src={Brand3} alt="brand3" height={50} width={50} />
//                 <img src={Brand4} alt="brand4" height={50} width={50} />
//                 <img src={Brand5} alt="brand5" height={50} width={50} />
//                 <img src={Brand6} alt="brand6" height={50} width={50} />
//                 <img src={Brand7} alt="brand7" height={50} width={50} />
//                 <img src={Brand8} alt="brand8" height={50} width={50} />
//                 <img src={Brand9} alt="brand9" height={50} width={50} />
//                 <img src={Brand10} alt="brand10" height={50} width={50} />
//                 <img src={Brand11} alt="brand11" height={50} width={50} />
//               </div>
//             </div>

//             {/* Payment Timing */}
//             {/* <div className='bg-white p-6 rounded-md shadow-sm '>
// 							<h2 className='text-[18px] font-semibold text-black mb-1'>
// 								{t('paytime.title')}
// 							</h2>
// 							<p className='text-sm text-gray-500 mb-3'>
// 								Lorem ipsum Lorem ipsum Lorem ipsum
// 							</p>
// 							<label className='flex items-center gap-3'>
// 								<input
// 									type='checkbox'
// 									checked
// 									className='accent-[#EE5128]'
// 									readOnly
// 								/>
// 								<span className='text-sm text-black'>
// 									{t('paytime.payNow')}
// 								</span>
// 								<input
// 									type='checkbox'
// 									disabled
// 									className='accent-[#ccc]'
// 								/>
// 								<span className='text-sm text-gray-400'>
// 									{t('paytime.payLater')}
// 								</span>
// 							</label>
// 						</div> */}

//             {/* Payment Methods */}
//             {/*
// 						<div className='bg-white rounded-md shadow-sm overflow-hidden'>
// 							<div className='bg-[#FFE4DB] p-4 font-semibold'>
// 								Payment methods
// 							</div>
// 							<div className='divide-y divide-gray-300'>
// 								{Object.entries(paymentIcons).map(
// 									([method, icon]) => (
// 										<div
// 											key={method}
// 											className='flex items-center justify-between px-4 py-4'>
// 											<div className='flex items-center gap-3'>
// 												<img
// 													src={icon}
// 													alt={method}
// 													className='w-6 h-6 object-contain'
// 												/>
// 												<div>
// 													<p className='font-semibold'>
// 														{t(
// 															`payment-methods.${method}`
// 														)}
// 													</p>
// 													<p className='text-sm text-gray-500'>
// 														Lorem ipsum Lorem ipsum
// 														Lorem
// 													</p>
// 												</div>
// 											</div>
// 											<ChevronDown
// 												className='text-gray-400'
// 												size={20}
// 											/>
// 										</div>
// 									)
// 								)}
// 							</div>
// 						</div> */}
//           </div>

//           {/* Right Column */}
//           <div className="w-full relative lg:max-w-[360px] space-y-6">
//             {location.state.tripType === "One Way" ? (
//               <div className="max-w-[377px] w-full max-h-[280px] pb-4 bg-white rounded-[12px]">
//                 <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
//                   <h2 className="font-semibold text-[18px] font-jakarta">
//                     {t("booking-details.title")}
//                   </h2>
//                 </div>

//                 <div className="flex justify-between items-center px-6 mt-[20px]">
//                   <div className="text-center">
//                     <p className="text-[20px] font-bold font-jakarta">
//                       {/* {flight.departureTime} */}
//                       {OutwardTicket.departureTime}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {OutwardTicket.departureCity}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-center relative">
//                     <p className="text-xs text-gray-500 mb-[2px]">
//                       {OutwardTicket.duration}
//                     </p>
//                     <div className="flex items-center justify-center">
//                       <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                       <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                       <span className="text-black text-sm">✈</span>
//                       <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                       <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                     </div>
//                     <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
//                       {OutwardTicket.class}
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-[20px] font-bold font-jakarta">
//                       {/* {flight.arrivalTime} */}
//                       {OutwardTicket?.arrivalTime}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {OutwardTicket.arrivalCity}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex justify-between px-6 mt-6">
//                   <div className="text-left w-1/2 border-r pr-4">
//                     <p className="text-sm font-semibold text-black font-jakarta m">
//                       {t("booking-details.departure")}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-[2px]">
//                       {OutwardTicket?.departureDate.split("-")[0]}
//                     </p>
//                   </div>
//                   <div className="text-left w-1/2 pl-4">
//                     <p className="text-sm font-semibold text-black font-jakarta ml-5">
//                       {t("booking-details.landing")}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-[2px] ml-5">
//                       {OutwardTicket?.arrivalDate.split("-")[0]}
//                     </p>
//                   </div>
//                 </div>

//                 {/* <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
//                   <span>{t("booking-details.policy")}</span>
//                   <span className="ml-10">{t("booking-details.refund")}</span>
//                   <span>{t("booking-details.reschedule")}</span>
//                 </div> */}
//               </div>
//             ) : location.state.tripType === "Round Trip" ? (
//               <div className="flex flex-col gap-6">
//                 <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
//                   <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
//                     <h2 className="font-semibold text-[18px] font-jakarta">
//                       {t("booking-details.title")}
//                     </h2>
//                   </div>

//                   <div className="flex justify-between items-center px-6 mt-[20px]">
//                     <div className="text-center">
//                       <p className="text-[20px] font-bold font-jakarta">
//                         {/* {flight.departureTime} */}
//                         {OutwardTicket?.departureTime}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {OutwardTicket.departureCity}
//                       </p>
//                     </div>
//                     <div className="flex flex-col items-center relative">
//                       <p className="text-xs text-gray-500 mb-[2px]">
//                         {OutwardTicket.duration}
//                       </p>
//                       <div className="flex items-center justify-center">
//                         <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                         <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                         <span className="text-black text-sm">✈</span>
//                         <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                         <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                       </div>
//                       <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
//                         {OutwardTicket.class}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-[20px] font-bold font-jakarta">
//                         {/* {flight.arrivalTime} */}
//                         {OutwardTicket?.arrivalTime}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {OutwardTicket.arrivalCity}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex justify-between px-6 mt-6">
//                     <div className="text-left w-1/2 border-r pr-4">
//                       <p className="text-sm font-semibold text-black font-jakarta m">
//                         {t("booking-details.departure")}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-[2px]">
//                         {OutwardTicket?.departureDate.split("-")[0]}
//                       </p>
//                     </div>
//                     <div className="text-left w-1/2 pl-4">
//                       <p className="text-sm font-semibold text-black font-jakarta ml-5">
//                         {t("booking-details.landing")}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-[2px] ml-5">
//                         {OutwardTicket?.arrivalDate.split("-")[0]}
//                       </p>
//                     </div>
//                   </div>

//                   {/* <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
//                     <span>{t("booking-details.policy")}</span>
//                     <span className="ml-10">{t("booking-details.refund")}</span>
//                     <span>{t("booking-details.reschedule")}</span>
//                   </div> */}
//                 </div>
//                 <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
//                   <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
//                     <h2 className="font-semibold text-[18px] font-jakarta">
//                       {t("booking-details.title")}
//                     </h2>
//                   </div>

//                   <div className="flex justify-between items-center px-6 mt-[20px]">
//                     <div className="text-center">
//                       <p className="text-[20px] font-bold font-jakarta">
//                         {/* {flight.departureTime} */}
//                         {returnTicket?.departureTime}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {returnTicket.departureCity}
//                       </p>
//                     </div>
//                     <div className="flex flex-col items-center relative">
//                       <p className="text-xs text-gray-500 mb-[2px]">
//                         {returnTicket.duration}
//                       </p>
//                       <div className="flex items-center justify-center">
//                         <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                         <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                         <span className="text-black text-sm">✈</span>
//                         <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
//                         <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
//                       </div>
//                       <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
//                         {returnTicket.class}
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-[20px] font-bold font-jakarta">
//                         {/* {flight.arrivalTime} */}
//                         {returnTicket?.arrivalTime}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {returnTicket.arrivalCity}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex justify-between px-6 mt-6">
//                     <div className="text-left w-1/2 border-r pr-4">
//                       <p className="text-sm font-semibold text-black font-jakarta m">
//                         {t("booking-details.departure")}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-[2px]">
//                         {returnTicket?.departureDate.split("-")[0]}
//                       </p>
//                     </div>
//                     <div className="text-left w-1/2 pl-4">
//                       <p className="text-sm font-semibold text-black font-jakarta ml-5">
//                         {t("booking-details.landing")}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-[2px] ml-5">
//                         {returnTicket?.arrivalDate.split("-")[0]}
//                       </p>
//                     </div>
//                   </div>

//                   {/* <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
//                     <span>{t("booking-details.policy")}</span>
//                     <span className="ml-10">{t("booking-details.refund")}</span>
//                     <span>{t("booking-details.reschedule")}</span>
//                   </div> */}
//                 </div>
//               </div>
//             ) : (
//               <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
//                 <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
//                   <h2 className="font-semibold text-[18px] font-jakarta">
//                     {t("booking-details.title")}
//                   </h2>
//                 </div>

//                 <div className="flex justify-between items-center px-6 mt-[20px]">
//                   Some thing error
//                 </div>
//               </div>
//             )}

//             {/* <div className="bg-white rounded-md  shadow-sm overflow-hidden">
//               <div className="bg-[#FFE4DB] p-4 font-semibold">
//                 Price summary
//               </div>
//               <div className="p-4 space-y-3 text-[14px] text-black">
//                 <div className="flex justify-between">
//                   <span>Adult x 1</span>
//                   <span className="font-semibold">$2500</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Total taxes +</span>
//                   <span className="font-semibold">$500</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Other Charged</span>
//                   <span className="font-semibold">$200</span>
//                 </div>
//                 <div className="flex justify-between border-t pt-3 text-[#EE5128] font-semibold">
//                   <span>Total</span>
//                   <span>$3200</span>
//                 </div>
//               </div>
//             </div> */}

//             <div className="w-full flex flex-col gap-8 justify-end p-6 bg-white">
//               <p>
//                 Total Pay :
//                 <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
//                   <span className="text-[20px] pr-2">CVE</span>
//                   {price}
//                 </p>
//               </p>

//               <button
//                 className="font-jakarta font-semibold bg-orange-600 px-14 py-2.5 flex items-center rounded-md gap-2 text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
//                 onClick={handleBooking}
//               >
//                 Pay Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  fetchExchangeRates,
  convertToRequestedCurrency,
} from "../../utils/Currencyconverter";

const paymentIcons = {
  upi: "/assets/paymentpage/upi.png",
  "debit-creditCard": "/assets/paymentpage/card.png",
  netBanking: "/assets/paymentpage/netbanking.png",
  wallet: "/assets/paymentpage/wallet.png",
  emi: "/assets/paymentpage/emi.png",
  payLater: "/assets/paymentpage/paylater.png",
};

// import Brand1 from "../../assets/images/PaymentBrands/brand1.png";
// import Brand2 from "../../assets/images/PaymentBrands/brand2.png";
// import Brand3 from "../../assets/images/PaymentBrands/brand3.png";
// import Brand4 from "../../assets/images/PaymentBrands/brand4.png";
// import Brand5 from "../../assets/images/PaymentBrands/brand5.png";
// import Brand6 from "../../assets/images/PaymentBrands/brand6.png";
// import Brand7 from "../../assets/images/PaymentBrands/brand7.png";
// import Brand8 from "../../assets/images/PaymentBrands/brand8.png";
// import Brand9 from "../../assets/images/PaymentBrands/brand9.png";
// import Brand10 from "../../assets/images/PaymentBrands/brand10.png";
// import Brand11 from "../../assets/images/PaymentBrands/brand11.png";

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
import Brand23 from "../../assets/images/PaymentBrands/brand23.png";
import Brand24 from "../../assets/images/PaymentBrands/brand24.png";
import Brand25 from "../../assets/images/PaymentBrands/brand25.png";
import Brand26 from "../../assets/images/PaymentBrands/brand26.png";
import Brand27 from "../../assets/images/PaymentBrands/brand27.jpg";

export default function PaymentPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // card charges
  const cardCharge = location.state.CardCharges;
  console.log(cardCharge);

  const [flight, setFlight] = useState(null);
  const [price, setPrice] = useState(0);
  const [seatCharge, setseatCharge] = useState(0);
  const [luggaggeCharge, setluggaggeCharge] = useState(0);
  const [tax, setTax] = useState("");
  const OutwardTicket = location.state.flights[0];
  const returnTicket = location.state.flights[1];
  const [tfPrice, setTfPrice] = useState(0);
  useEffect(() => {
    const stored = location.state?.flights;
    const price = location.state?.convertedPrice;
    if (stored && price) {
      setFlight(stored);
      setTfPrice(price);
    }
  }, [location]);

  const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;
  console.log(location.state?.seatCharge);
  console.log(location.state?.luggageSurcharge);

  const getCommissionDetail = async () => {
    try {
      const res = await fetch(`${transactionUrl}/getcommissiondetails`);
      const result = await res.json();
      console.log(result.commissionDetail);
      const commissionDetails = result.commissionDetail;
      if (!commissionDetails) {
        return console.log("Error");
      } else {
        const Tax = commissionDetails.Tax;
        const Commission = commissionDetails.Commission;
        if (Tax && Commission) {
          console.log("Tf" + tfPrice);
          console.log(Tax, Commission);
          if (commissionDetails.CommissionType.toLowerCase() === "percentage") {
            setTax(`${Tax}%`);
            const taxAmount = (tfPrice * Tax) / 100;
            const commissionAmount = (tfPrice * Commission) / 100;
            const totalAmount = tfPrice + taxAmount + commissionAmount;
            setPrice(totalAmount.toFixed(2));
          } else if (
            commissionDetails.CommissionType.toLowerCase() === "amount"
          ) {
            setTax(`${Tax}CVE`);
            const totalAmount = tfPrice + Tax + Commission;
            setPrice(totalAmount.toFixed(2));
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tfPrice > 0) {
      getCommissionDetail();
    }
  }, [tfPrice]);

  function timestampgenerator() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  }
  const address = location.state.Address;
  console.log(address);
  /*
  const handleProcessTerm = async (requestBody) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendUrl}/process-terms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      let res;

      if (contentType && contentType.includes("application/json")) {
        try {
          res = await response.json();
        } catch (error) {
          console.error("JSON parse error:", error);
          alert("Invalid JSON received from server.");
          return;
        }
        console.log(res)
        // process JSON as usual
        try {
          const priceList = res.data.Router[0].GroupList[0].Group[0].Price;
          const originalPrice = priceList[0].Amount[0];
          const originalCurrency = priceList[0].Currency[0];
          return {
            price: originalPrice,
            currency: originalCurrency,
            bookid:res.data.TFBookingReference[0]
          };
        } catch (error) {
          console.error("Error using JSON data:", error);
        }
      } else if (contentType && contentType.includes("text/xml")) {
        // handle XML
        const textResponse = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textResponse, "text/xml");

        // get the error details
        const processTerms = xmlDoc.querySelector("ProcessTerms");
        if (processTerms) {
          const ecode = processTerms.getAttribute("ecode");
          const etext = processTerms.getAttribute("etext");
          const edetail = processTerms.getAttribute("edetail");
          const edate = processTerms.getAttribute("edate");

          console.error(
            `XML error received: code=${ecode}, text=${etext}, details=${edetail}, date=${edate}`
          );

          alert(`Seat selection failed:\n${edetail}`);
        } else {
          alert("Received unexpected XML data.");
        }
      } else {
        // unknown content-type
        const textResponse = await response.text();
        console.error("Unexpected content-type response:", textResponse);
        alert("Server returned data in an unsupported format.");
        // setErrorMsg(true)
      }
    } else {
      console.error(`Server returned status: ${response.status}`);
      alert("Could not fetch booking details.");
    }
  };
 
  const reCalculatePrice = async (price, currency) => {
    if (currency && price) {
      const rates = await fetchExchangeRates("CVE");
      const convertedPrice = parseFloat(
        convertToRequestedCurrency(price, currency, "CVE", rates).toFixed(2)
      );
      setTfPrice(convertedPrice);
    }
  };
  */
  console.log("rt", returnTicket);
  const handleBooking = async (e) => {
    e.preventDefault();
    const transactionApi = import.meta.env.VITE_TRANSACTION_URL;
    const Paymentdate = timestampgenerator();
    const date = new Date();
    const time = date.getTime();
    const totalPrice = Math.ceil(price);
    // const bookid = location.state?.TFBookingReference;
    const originalCurrencyPrice = location.state?.originalPrice;
    const originalCurrency = location.state?.originalCurrency;
    // console.log(bookid);
    console.log("oc", originalCurrency);
    console.log("ocp", originalCurrencyPrice);
    // const result = await handleProcessTerm(location.state?.requestBody);
    const bookid = location.state.TFBookingReference;
    console.log("bookid", bookid);
    // if (result.price !== originalCurrencyPrice) {
    //   const { price, currency } = result;
    //   window.alert("Price CHanges !!");
    //   console.log(result.price);
    //   reCalculatePrice(price, currency);
    // } else if (result.price === originalCurrencyPrice) {
    console.log("seat", location.state.Seatoption);
    console.log("gi", location.state.Guestid);
    const senderId = location.state.Guestid;
    const seat = location.state.Seatoption;
    // const luggageOptions=location.state.luggage;
    console.log(location.state.travellerDetails);

    const travellerDetails = location.state.TravellerList.TravellerList;
    console.log(travellerDetails);
    const Receipt = {
      OutwardTicketcharge: `${OutwardTicket.price} ${OutwardTicket.currency}`,
      SeatCharge: `${location.state?.seatCharge} CVE`,
      Totaltax: `${tax}`,
      Totalprice: `${Math.ceil(price)} CVE`,
    };

    // Add return ticket charge only if returnTicket exists
    if (returnTicket) {
      Receipt.Returnticketcharge = `${returnTicket.price} ${returnTicket.currency}`;
    }
    // return console.log("Receipt", Receipt);

    if (
      originalCurrencyPrice &&
      originalCurrency &&
      bookid &&
      senderId &&
      OutwardTicket &&
      travellerDetails &&
      Receipt.OutwardTicketcharge &&
      Receipt.SeatCharge &&
      Receipt.Totalprice &&
      Receipt.Totaltax &&
      Receipt
    ) {
      try {
        const response = await fetch(`${transactionApi}/start-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
            email: location.state.Email,
            billAddrCountry: "Portugal",
            billAddrCity: address.City,
            billAddrline1: `${address.Flat}, ${address.BuildingName}, ${address.BuildingNumber}`,
            // billAddrline2: `${address.street}, ${address.locality}, ${address.province}`,
            billAddrPostCode: address.Postcode,
            Paymentdate,
            time,
            expectedAmount: originalCurrencyPrice,
            expectedCurrency: originalCurrency,
            TFBookingReference: bookid,
            fakeBooking: true,
            ...(Array.isArray(seat) &&
              seat.length > 0 && {
                seatOptions: seat,
              }),
            outwardFlight: OutwardTicket,
            ...(returnTicket &&
              Object.keys(returnTicket).length > 0 && {
                returnFlight: returnTicket,
              }),
            Travellerdetail: travellerDetails,
            senderId: senderId,
            Receiptdetails: Receipt,
          }),
        });

        const html = await response.text();

        const container = document.createElement("div");
        container.innerHTML = html;
        document.body.appendChild(container);
        container.querySelector("form").submit();
        if (!response.ok) {
          const data = await response.json();
          if (data.status === "UserCancelled") {
            navigate("/booking/payment"); // react-router handles it smoothly
            return;
          }
        }
      } catch (error) {
        console.error("Error starting payment:", error);
      }
    } else {
      console.log(bookid);
    }
  };

  // const handleBooking = async (e) => {
  //   e.preventDefault();
  //   const flightApi = import.meta.env.VITE_BACKEND_URL;
  //   const bookid = location.state?.TFBookingReference;
  //   const originalCurrencyPrice = location.state?.originalPrice;
  //   const originalCurrency = location.state?.originalCurrency;

  //   try {
  //     const startBookingResult = await fetch(
  //       "https://dev.weefly.africa/api/flightapi/start-booking",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           expectedAmount: originalCurrencyPrice,
  //           expectedCurrency: originalCurrency,
  //           TFBookingReference: bookid,
  //           fakeBooking: true,
  //         }),
  //       }
  //     );
  //     const contentType = startBookingResult.headers.get("content-type");

  //     if (contentType && contentType.includes("application/json")) {
  //       try {
  //         const res = await startBookingResult.json();
  //         console.log(res);
  //       } catch (error) {
  //         console.error("JSON parse error:", error);
  //         alert("Invalid JSON received from server.");
  //         return;
  //       }
  //     }
  //     if (contentType && contentType.includes("text/xml")) {
  //       // handle XML
  //       const textResponse = await startBookingResult.text();
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(textResponse, "text/xml");

  //       // get the error details
  //       const processTerms = xmlDoc.querySelector("ProcessTerms");
  //       if (processTerms) {
  //         const ecode = processTerms.getAttribute("ecode");
  //         const etext = processTerms.getAttribute("etext");
  //         const edetail = processTerms.getAttribute("edetail");
  //         const edate = processTerms.getAttribute("edate");

  //         console.error(
  //           `XML error received: code=${ecode}, text=${etext}, details=${edetail}, date=${edate}`
  //         );

  //         alert(`Seat selection failed:\n${edetail}`);
  //       } else {
  //         const textResponse = await startBookingresult.text();
  //         console.error("Unexpected content-type response:", textResponse);
  //         alert("Server returned data in an unsupported format.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // '/ticketconfirm' ticketconfirm
  // '/ticketnotconfirm' ticketconfirm

  if (!flight)
    return <p className="text-center mt-20 font-['Lato']">Loading...</p>;

  return (
    <div className=" font-sans flex justify-center">
      <div className="w-full px-4">
        {/* <h1 className="text-[24px] font-semibold mb-12 relative left-[29px] font-['Plus Jakarta Sans'] ml-[14px]">
          Complete your Booking
        </h1>

        <div className="w-full max-w-[1090px] mx-auto flex items-center mb-10 relative justify-start gap-[214px]">
          <div className="absolute top-[32px] left-[28px] right-[28px] h-[1px] z-0 bg-[radial-gradient(circle,#D1D5DB_1px,transparent_1.5px)] bg-[length:10px_1px]" />
          {["Review your booking", "Travelers Details", "Seat Selection", "Payment"].map((label, index) => (
            <div key={index} className={`relative flex flex-col items-center ${index === 0 || index === 3 ? "w-[150px]" : "flex-1"}`}>
              <div className={`w-[56px] h-[56px] rounded-full text-white flex items-center justify-center text-[16px] font-semibold z-10 font-['Plus Jakarta Sans'] ${index === 3 ? "bg-[#EE5128]" : "bg-gray-400"}`}>
                {`0${index + 1}`}
              </div>
              <span className={`text-[14px] mt-2 text-center font-['Lato'] ${index === 3 ? "text-black font-semibold" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div> */}

        <div className="flex flex-col lg:flex-row justify-between gap-4 xl:gap-8">
          {/* Left */}
          {/* <div className="w-full lg:w-[740px] space-y-6"> */}
          <div className="w-full lg:max-w-[740px] space-y-6">
            {location.state.tripType === "One Way" ? (
              <>
                <p className="mb-6">Outward ticket</p>
                <div className="rounded-md bg-white">
                  <div className="flex flex-col md:flex-row space-y-6 py-6 justify-between items-center px-4 pt-4">
                    <div className="flex flex-col min-w-[170px] relative">
                      <img
                        src={OutwardTicket.logo}
                        alt={OutwardTicket.airline}
                        className="w-[120px] h-[40px] object-contain mb-[25px]"
                      />
                      <div className="absolute top-[38px] left-[4px] flex items-center space-x-2">
                        <span className="text-[13px] text-gray-500">
                          {OutwardTicket.flightNumber}
                        </span>
                        <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold">
                          {OutwardTicket.class}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black">
                          {" "}
                          {OutwardTicket?.departureTime}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          {OutwardTicket.departureCity}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                          <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                          <span className="text-black text-sm">✈</span>
                          <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                          <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        </div>
                        <span className="text-[12px] text-gray-400 mt-[4px]">
                          {OutwardTicket.duration}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black">
                          {OutwardTicket?.arrivalTime}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          {OutwardTicket.arrivalCity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-center lg:items-end space-y-[2px] w-[152px]">
                      <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                        <span className="text-[20px] pr-2">
                          {OutwardTicket.currency}
                        </span>
                        {OutwardTicket.price}
                        <span className="text-[12px] text-black font-normal">
                          /pax
                        </span>
                      </p>
                      {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none">
                        {OutwardTicket.currency}
                        {OutwardTicket.originalPrice}
                      </p> */}
                    </div>
                  </div>
                  {/* <div className='flex justify-between items-center px-4 py-2 border-t border-[#CCCCCC] text-sm font-medium text-[#EE5128]'>
              <div className='flex space-x-8'>
              <span>
              {t('booking-card.Flight-details')}
              </span>
              <span className='hidden lg:block'>
              {t('booking-card.price-details')}
              </span>
              <span className='hidden lg:block'>
              {t('booking-card.policy')}
              </span>
              <span className='hidden lg:block'>
              {t('booking-card.refund')}
              </span>
              <span className='hidden lg:block'>
              {t('booking-card.reschedule')}
              </span>
              </div>
              <button
              className='bg-[#EE5128] text-white px-4 py-1.5 rounded font-semibold
              hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
              {t('booking-card.book-now')}
              </button>
            </div> */}
                </div>
              </>
            ) : location.state.tripType === "Round Trip" ? (
              <div className="flex flex-col gap-6">
                <p className="">Outward ticket</p>
                <div className="rounded-md bg-white">
                  <div className="flex flex-col md:flex-row space-y-6 py-6 justify-between items-center px-4 pt-4">
                    <div className="flex flex-col min-w-[170px] relative">
                      <img
                        src={OutwardTicket.logo}
                        alt={OutwardTicket.airline}
                        className="w-[120px] h-[40px] object-contain mb-[25px]"
                      />
                      <div className="absolute top-[38px] left-[4px] flex items-center space-x-2">
                        <span className="text-[13px] text-gray-500">
                          {OutwardTicket.flightNumber}
                        </span>
                        <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold">
                          {OutwardTicket.class}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black">
                          {" "}
                          {OutwardTicket?.departureTime}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          {OutwardTicket.departureCity}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                          <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                          <span className="text-black text-sm">✈</span>
                          <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                          <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        </div>
                        <span className="text-[12px] text-gray-400 mt-[4px]">
                          {OutwardTicket.duration}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black">
                          {OutwardTicket?.arrivalTime}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          {OutwardTicket.arrivalCity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-center lg:items-end space-y-[2px] w-[152px]">
                      <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                        <span className="text-[20px] pr-2">
                          {OutwardTicket.currency}
                        </span>
                        {OutwardTicket.price}
                        <span className="text-[12px] text-black font-normal">
                          /pax
                        </span>
                      </p>
                      {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none">
                        {OutwardTicket.currency}
                        {OutwardTicket.originalPrice}
                      </p> */}
                    </div>
                  </div>
                  {/* <div className='flex justify-between items-center px-4 py-2 border-t border-[#CCCCCC] text-sm font-medium text-[#EE5128]'>
								<div className='flex space-x-8'>
									<span>
										{t('booking-card.Flight-details')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.price-details')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.policy')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.refund')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.reschedule')}
									</span>
								</div>
								<button
									className='bg-[#EE5128] text-white px-4 py-1.5 rounded font-semibold
             hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
									{t('booking-card.book-now')}
								</button>
							</div> */}
                </div>
                <p className="">Return ticket</p>
                <div className="rounded-md bg-white">
                  <div className="flex flex-col md:flex-row space-y-6 py-6 justify-between items-center px-4 pt-4">
                    <div className="flex flex-col min-w-[170px] relative">
                      <img
                        src={returnTicket.logo}
                        alt={returnTicket.airline}
                        className="w-[120px] h-[40px] object-contain mb-[25px]"
                      />
                      <div className="absolute top-[38px] left-[4px] flex items-center space-x-2">
                        <span className="text-[13px] text-gray-500">
                          {returnTicket.flightNumber}
                        </span>
                        <span className="text-[12px] bg-[#008905] text-white px-[10px] py-[2px] rounded font-semibold">
                          {returnTicket.class}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black">
                          {" "}
                          {returnTicket?.departureTime}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          {returnTicket.departureCity}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                          <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                          <span className="text-black text-sm">✈</span>
                          <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                          <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        </div>
                        <span className="text-[12px] text-gray-400 mt-[4px]">
                          {returnTicket.duration}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-[22px] font-bold text-black">
                          {returnTicket?.arrivalTime}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          {returnTicket.arrivalCity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-center lg:items-end space-y-[2px] w-[152px]">
                      <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                        <span className="text-[20px] pr-2">
                          {returnTicket.currency}
                        </span>
                        {returnTicket.price}
                        <span className="text-[12px] text-black font-normal">
                          /pax
                        </span>
                      </p>
                      {/* <p className="text-[13px] text-gray-400 line-through font-normal leading-none">
                        {returnTicket.currency}
                        {returnTicket.originalPrice}
                      </p> */}
                    </div>
                  </div>
                  {/* <div className='flex justify-between items-center px-4 py-2 border-t border-[#CCCCCC] text-sm font-medium text-[#EE5128]'>
								<div className='flex space-x-8'>
									<span>
										{t('booking-card.Flight-details')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.price-details')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.policy')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.refund')}
									</span>
									<span className='hidden lg:block'>
										{t('booking-card.reschedule')}
									</span>
								</div>
								<button
									className='bg-[#EE5128] text-white px-4 py-1.5 rounded font-semibold
             hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200'>
									{t('booking-card.book-now')}
								</button>
							</div> */}
                </div>
              </div>
            ) : (
              <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                  <h2 className="font-semibold text-[18px] font-jakarta">
                    {t("booking-details.title")}
                  </h2>
                </div>

                <div className="flex justify-between items-center px-6 mt-[20px]">
                  Some thing error
                </div>
              </div>
            )}

            <div className="bg-white rounded-md shadow-sm">
              <div className="bg-[#FFE4DB] p-4 font-semibold font-['Plus Jakarta Sans']">
                {t("summary.title")}
              </div>
              <div className="p-4 space-y-3 text-[14px] text-black font-['Lato']">
                {/* <div className='flex justify-between'>
									<span>{t('summary.adult')} x 1</span>
									<span className='font-semibold flex gap-1'>
										<span>{flight.currency}</span>
										<span>{flight.price}</span>
									</span>
								</div> */}

                {location.state.tripType === "One Way" ? (
                  <div className="flex justify-between">
                    <span>Outward Ticket</span>
                    <span className="font-semibold flex gap-1 items-center">
                      <span className="text-xs">CVE</span>{" "}
                      <span>{OutwardTicket.price}</span>
                    </span>
                  </div>
                ) : location.state.tripType === "Round Trip" ? (
                  <>
                    <div className="flex justify-between">
                      <span>Outward Ticket</span>
                      <span className="font-semibold flex gap-1 items-center">
                        <span className="text-xs">CVE</span>{" "}
                        <span>{OutwardTicket.price}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return Ticket</span>
                      <span className="font-semibold flex gap-1 items-center">
                        <span className="text-xs">CVE</span>{" "}
                        <span>{returnTicket.price}</span>
                      </span>
                    </div>
                  </>
                ) : null}

                {location.state?.seatCharge && (
                  <div className="flex justify-between">
                    <span>Seat Charge</span>
                    <span className="font-semibold flex gap-1 items-center">
                      <span className="text-xs">CVE</span>{" "}
                      <span>{location.state?.seatCharge}</span>
                    </span>
                  </div>
                )}
                {location.state?.luggageSurcharge === 0 ? (
                  ""
                ) : (
                  <div className="flex justify-between">
                    <span>Luggage Charge</span>
                    <span className="font-semibold flex gap-1 items-center">
                      <span className="text-xs">CVE</span>{" "}
                      <span> {location.state?.luggageSurcharge}</span>
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t("summary.totalTax")} +</span>
                  <span className="font-semibold flex gap-1">
                    <span>{flight.currency}</span> <span>{tax}</span>
                  </span>
                </div>
                {/* <div className='flex justify-between'>
									<span>{t('summary.otherCharged')}</span>
									<span className='font-semibold flex gap-1'>
										{' '}
										<span>{flight.currency}</span>{' '}
										<span>200.00</span>
									</span>
								</div> */}
                <div className="flex justify-between border-t pt-3 text-[#EE5128] font-semibold">
                  <span>{t("summary.total")}</span>
                  <span className="flex items-center gap-1">
                    {" "}
                    <span className="text-xs">CVE</span> <span>{price}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-white p-4 rounded-md">
              <p className="text-xl font-jakarta mb-6 font-semibold">
                Supported Card
              </p>

              <div className="grid grid-cols-6 gap-5 items-center">
                <img src={Brand1} alt="brand1" height={50} width={50} />
                <img src={Brand2} alt="brand2" height={50} width={50} />
                <img src={Brand3} alt="brand3" height={50} width={50} />
                <img src={Brand4} alt="brand4" height={50} width={50} />
                <img src={Brand5} alt="brand5" height={50} width={50} />
                <img src={Brand6} alt="brand6" height={50} width={50} />
                <img src={Brand7} alt="brand7" height={50} width={50} />
                <img src={Brand8} alt="brand8" height={50} width={50} />
                <img src={Brand9} alt="brand9" height={50} width={50} />
                <img src={Brand10} alt="brand10" height={50} width={50} />
                <img src={Brand11} alt="brand11" height={50} width={50} />
                <img src={Brand23} alt="brand24" height={80} width={80} />
                <img src={Brand24} alt="brand24" height={50} width={50} />
                <img src={Brand25} alt="brand25" height={50} width={50} />
                <img src={Brand26} alt="brand26" height={80} width={80} />
                <img src={Brand27} alt="brand27" height={50} width={50} />
              </div>
            </div>

            {/* Payment Timing */}
            {/* <div className='bg-white p-6 rounded-md shadow-sm '>
							<h2 className='text-[18px] font-semibold text-black mb-1'>
								{t('paytime.title')}
							</h2>
							<p className='text-sm text-gray-500 mb-3'>
								Lorem ipsum Lorem ipsum Lorem ipsum
							</p>
							<label className='flex items-center gap-3'>
								<input
									type='checkbox'
									checked
									className='accent-[#EE5128]'
									readOnly
								/>
								<span className='text-sm text-black'>
									{t('paytime.payNow')}
								</span>
								<input
									type='checkbox'
									disabled
									className='accent-[#ccc]'
								/>
								<span className='text-sm text-gray-400'>
									{t('paytime.payLater')}
								</span>
							</label>
						</div> */}

            {/* Payment Methods */}
            {/* 
						<div className='bg-white rounded-md shadow-sm overflow-hidden'>
							<div className='bg-[#FFE4DB] p-4 font-semibold'>
								Payment methods
							</div>
							<div className='divide-y divide-gray-300'>
								{Object.entries(paymentIcons).map(
									([method, icon]) => (
										<div
											key={method}
											className='flex items-center justify-between px-4 py-4'>
											<div className='flex items-center gap-3'>
												<img
													src={icon}
													alt={method}
													className='w-6 h-6 object-contain'
												/>
												<div>
													<p className='font-semibold'>
														{t(
															`payment-methods.${method}`
														)}
													</p>
													<p className='text-sm text-gray-500'>
														Lorem ipsum Lorem ipsum
														Lorem
													</p>
												</div>
											</div>
											<ChevronDown
												className='text-gray-400'
												size={20}
											/>
										</div>
									)
								)}
							</div>
						</div> */}
          </div>

          {/* Right Column */}
          <div className="w-full relative lg:max-w-[360px] space-y-6">
            {location.state.tripType === "One Way" ? (
              <div className="max-w-[377px] w-full max-h-[280px] pb-4 bg-white rounded-[12px]">
                <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                  <h2 className="font-semibold text-[18px] font-jakarta">
                    {t("booking-details.title")}
                  </h2>
                </div>

                <div className="flex justify-between items-center px-6 mt-[20px]">
                  <div className="text-center">
                    <p className="text-[20px] font-bold font-jakarta">
                      {/* {flight.departureTime} */}
                      {OutwardTicket.departureTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {OutwardTicket.departureCity}
                    </p>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <p className="text-xs text-gray-500 mb-[2px]">
                      {OutwardTicket.duration}
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="text-black text-sm">✈</span>
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                    </div>
                    <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                      {OutwardTicket.class}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-bold font-jakarta">
                      {/* {flight.arrivalTime} */}
                      {OutwardTicket?.arrivalTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {OutwardTicket.arrivalCity}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between px-6 mt-6">
                  <div className="text-left w-1/2 border-r pr-4">
                    <p className="text-sm font-semibold text-black font-jakarta m">
                      {t("booking-details.departure")}
                    </p>
                    <p className="text-xs text-gray-500 mt-[2px]">
                      {OutwardTicket?.departureDate.split("-")[0]}
                    </p>
                  </div>
                  <div className="text-left w-1/2 pl-4">
                    <p className="text-sm font-semibold text-black font-jakarta ml-5">
                      {t("booking-details.landing")}
                    </p>
                    <p className="text-xs text-gray-500 mt-[2px] ml-5">
                      {OutwardTicket?.arrivalDate.split("-")[0]}
                    </p>
                  </div>
                </div>

                {/* <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
                  <span>{t("booking-details.policy")}</span>
                  <span className="ml-10">{t("booking-details.refund")}</span>
                  <span>{t("booking-details.reschedule")}</span>
                </div> */}
              </div>
            ) : location.state.tripType === "Round Trip" ? (
              <div className="flex flex-col gap-6">
                <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                  <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                    <h2 className="font-semibold text-[18px] font-jakarta">
                      {t("booking-details.title")}
                    </h2>
                  </div>

                  <div className="flex justify-between items-center px-6 mt-[20px]">
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.departureTime} */}
                        {OutwardTicket?.departureTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {OutwardTicket.departureCity}
                      </p>
                    </div>
                    <div className="flex flex-col items-center relative">
                      <p className="text-xs text-gray-500 mb-[2px]">
                        {OutwardTicket.duration}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="text-black text-sm">✈</span>
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      </div>
                      <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                        {OutwardTicket.class}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.arrivalTime} */}
                        {OutwardTicket?.arrivalTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {OutwardTicket.arrivalCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between px-6 mt-6">
                    <div className="text-left w-1/2 border-r pr-4">
                      <p className="text-sm font-semibold text-black font-jakarta m">
                        {t("booking-details.departure")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px]">
                        {OutwardTicket?.departureDate.split("-")[0]}
                      </p>
                    </div>
                    <div className="text-left w-1/2 pl-4">
                      <p className="text-sm font-semibold text-black font-jakarta ml-5">
                        {t("booking-details.landing")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px] ml-5">
                        {OutwardTicket?.arrivalDate.split("-")[0]}
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
                    <span>{t("booking-details.policy")}</span>
                    <span className="ml-10">{t("booking-details.refund")}</span>
                    <span>{t("booking-details.reschedule")}</span>
                  </div> */}
                </div>
                <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                  <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                    <h2 className="font-semibold text-[18px] font-jakarta">
                      {t("booking-details.title")}
                    </h2>
                  </div>

                  <div className="flex justify-between items-center px-6 mt-[20px]">
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.departureTime} */}
                        {returnTicket?.departureTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {returnTicket.departureCity}
                      </p>
                    </div>
                    <div className="flex flex-col items-center relative">
                      <p className="text-xs text-gray-500 mb-[2px]">
                        {returnTicket.duration}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="text-black text-sm">✈</span>
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      </div>
                      <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                        {returnTicket.class}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.arrivalTime} */}
                        {returnTicket?.arrivalTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {returnTicket.arrivalCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between px-6 mt-6">
                    <div className="text-left w-1/2 border-r pr-4">
                      <p className="text-sm font-semibold text-black font-jakarta m">
                        {t("booking-details.departure")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px]">
                        {returnTicket?.departureDate.split("-")[0]}
                      </p>
                    </div>
                    <div className="text-left w-1/2 pl-4">
                      <p className="text-sm font-semibold text-black font-jakarta ml-5">
                        {t("booking-details.landing")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px] ml-5">
                        {returnTicket?.arrivalDate.split("-")[0]}
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
                    <span>{t("booking-details.policy")}</span>
                    <span className="ml-10">{t("booking-details.refund")}</span>
                    <span>{t("booking-details.reschedule")}</span>
                  </div> */}
                </div>
              </div>
            ) : (
              <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                  <h2 className="font-semibold text-[18px] font-jakarta">
                    {t("booking-details.title")}
                  </h2>
                </div>

                <div className="flex justify-between items-center px-6 mt-[20px]">
                  Some thing error
                </div>
              </div>
            )}

            {/* <div className="bg-white rounded-md  shadow-sm overflow-hidden">
              <div className="bg-[#FFE4DB] p-4 font-semibold">
                Price summary
              </div>
              <div className="p-4 space-y-3 text-[14px] text-black">
                <div className="flex justify-between">
                  <span>Adult x 1</span>
                  <span className="font-semibold">$2500</span>
                </div>
                <div className="flex justify-between">
                  <span>Total taxes +</span>
                  <span className="font-semibold">$500</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Charged</span>
                  <span className="font-semibold">$200</span>
                </div>
                <div className="flex justify-between border-t pt-3 text-[#EE5128] font-semibold">
                  <span>Total</span>
                  <span>$3200</span>
                </div>
              </div>
            </div> */}

            <div className="w-full flex flex-col gap-8 justify-end p-6 bg-white">
              <p>
                Total Pay :
                <p className="text-[#EE5128] text-[26px] font-black leading-none font-sans">
                  <span className="text-[20px] pr-2">CVE</span>
                  {price}
                </p>
              </p>

              <button
                className="font-jakarta font-semibold bg-orange-600 px-14 py-2.5 flex items-center rounded-md gap-2 text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                onClick={handleBooking}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
