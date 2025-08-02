// import { Luggage } from "lucide-react";

// import tick from "/assets/ticketpage/tick.png";
// import AirIndiaLogo from "../../assets/images/AirIndiaLogo.svg";
// import FlightLogo from "../../assets/images/FlightIcon.svg";
// import { Link, useParams } from "react-router";
// import { useEffect, useState } from "react";
// import { usePDF } from "react-to-pdf";
// import WeeflyLogo from "../../assets/images/footer/weefly-logo.png";
// import TicketSign from "../../assets/images/TicketSigns.jpg";

// function TicketConfirm() {
//   const { id } = useParams();
//   const [ticketDetails, setTicketDetails] = useState({});
//   const [bookingDetails, setBookingDetails] = useState({});
//   const [isDownloading, setIsDownloading] = useState(false);

//   console.log(id);

//   const getBookingDetail = async (TFBookingReference) => {
//     console.log("TB", TFBookingReference);

//     const travelFusionApi = import.meta.env.VITE_FLIGHT_BACKEND_URL;
//     try {
//       const response = await fetch(`${travelFusionApi}/get-bookingdetails`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ TFBookingReference }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setBookingDetails(data);
//       } else {
//         const data = await response.json();
//         console.log(data);

//         console.log("Ticket detail Not found");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getTicketDetail = async () => {
//     const transactionService = import.meta.env.VITE_TRANSACTION_URL;
//     try {
//       const response = await fetch(
//         `${transactionService}/getticketdetail/${id}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setTicketDetails(data);
//         console.log(data);
//         const bookid = data.Ticketdetail.TFBookingReference;
//         console.log("TBTD", bookid);
//         await getBookingDetail(bookid);
//       } else {
//         console.log("Ticket Not found");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getTicketDetail();
//   }, []);

//   const { toPDF, targetRef } = usePDF({
//     filename: `flight-ticket-${id}.pdf`,
//     page: {
//       margin: 20,
//       format: "a4",
//       orientation: "portrait",
//     },
//   });

//   return (
//     <div className="py-[30px] px-10 xl:px-40">
//       <div className="">
//         <img
//           src={tick}
//           alt={"Ticket Confirm Check Mark"}
//           className="size-[60px] xl:size-[144px] mx-auto"
//           data-aos="zoom-out"
//         />
//         <p
//           data-aos="fade-up"
//           className="font-jakarta font-bold text-[24px] xl:text-[40px] text-center mt-[23px] xl:mt-[41px] uppercase"
//         >
//           Your Ticket has <br className="md:hidden" /> confirmed
//         </p>

//         <h1 className="text-2xl mx-auto text-center mt-10">Ticket ID : {id}</h1>
//       </div>

//       {/* <div className="mt-[61px]" data-aos="fade-up">
//         <h3 className="bg-[#FFE2DA] rounded-t-[17px] px-[45px] py-[17px] font-jakarta font-semibold text-[26px]">
//           Travelers Details
//         </h3>
//         <div className="font-jakarta px-[45px] bg-white">
//           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Name</p>
//               <p className="font-medium text-[18px] mt-[13px]">John brevis</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Age</p>
//               <p className="font-medium text-[18px] mt-[13px]">30</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Date of birth</p>
//               <p className="font-medium text-[18px] mt-[13px]">19-05-1990</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Phone number</p>
//               <p className="font-medium text-[18px] mt-[13px]">
//                 +91 89748 89371
//               </p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Seat no</p>
//               <p className="font-medium text-[18px] mt-[13px]">PW90</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Booking ID</p>
//               <p className="font-medium text-[18px] mt-[13px]">982948</p>
//             </div>
//           </div>
//           <div className="h-px bg-black"></div>
//           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Name</p>
//               <p className="font-medium text-[18px] mt-[13px]">John brevis</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Age</p>
//               <p className="font-medium text-[18px] mt-[13px]">30</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Date of birth</p>
//               <p className="font-medium text-[18px] mt-[13px]">19-05-1990</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Phone number</p>
//               <p className="font-medium text-[18px] mt-[13px]">
//                 +91 89748 89371
//               </p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Seat no</p>
//               <p className="font-medium text-[18px] mt-[13px]">PW90</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Booking ID</p>
//               <p className="font-medium text-[18px] mt-[13px]">982948</p>
//             </div>
//           </div>
//         </div>

//         <div
//           data-aos="fade-up"
//           className="mt-[20px] bg-white rounded-[14px] py-[32px] px-[32px] lg:px-[44px] flex flex-col lg:flex-row items-center gap-10 lg:gap-5"
//         >
//           <div className="">
//             <img src={AirIndiaLogo} alt="air India logo" />
//             <div className="flex items-center gap-[14px]">
//               <p className="font-sans font-normal text-[15px] text-neutral-500">
//                 1244595
//               </p>
//               <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                 Business
//               </p>
//             </div>
//           </div>
//           <div className="flex-1 items-center w-full">
//             <div className="flex xl:px-[84px]">
//               <div className="px-[20px] lg:px-[44px]">
//                 <p className="text-[25px] xl:text-[38px] font-bold">06:00</p>
//                 <p className="font-normal text-[13px] lg:text-[20px] text-neutral-500">
//                   Algeries
//                 </p>
//               </div>
//               <div className="flex-1 py-[40px] relative ">
//                 <div className="relative border border-neutral-200 border-dashed h-px">
//                   <div className="absolute bg-neutral-200 size-4 rounded-full -left-2 -top-2 border-2 border-white"></div>
//                   <div className="absolute bg-neutral-200 size-4 rounded-full -right-2 -top-2 border-2 border-white"></div>
//                 </div>
//                 <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                   <img
//                     src={FlightLogo}
//                     alt="Plane"
//                     className="h-[41px] w-[41px]"
//                   />
//                   <p className="font-normal text-[17px] text-neutral-500">
//                     16h 12m
//                   </p>
//                 </div>
//               </div>

//               <div className="px-[20px] xl:px-[44px]">
//                 <p className="text-[25px] xl:text-[38px] font-bold">19:00</p>
//                 <p className="font-normal text-[13px] xl:text-[20px] text-neutral-500">
//                   Launda
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col justify-end lg:items-end text-center">
//             <p className="font-sans text-[25px] lg:text-[35px] font-black text-[#EE5128]">
//               $1,00,000{" "}
//               <span className="text-base lg:text-[23px] font-normal text-black/70 font-sans">
//                 / pax
//               </span>
//             </p>
//             <p className="font-sans text-base lg:text-[23px] text-black/70 line-through">
//               $1,50,000
//             </p>
//           </div>
//         </div>
//       </div> */}

//       {/* testing */}
//       <div className="mt-10">
//         <div className="">
//           <Recipet
//             id={id}
//             targetRef={targetRef}
//             ticketDetails={ticketDetails}
//             bookingDetails={bookingDetails}
//             isDownloading={isDownloading}
//           />
//         </div>
//       </div>

//       <div className=" max-w-[430px] w-full mx-auto mt-[70px] flex flex-col gap-[37px]">
//         {/* <PDFDownloadLink
//           document={<RecipetPDF />}
//           fileName="ticket-confirmation.pdf"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {({ loading }) =>
//             loading ? "Preparing document..." : "Download Ticket PDF"
//           }
//         </PDFDownloadLink> */}

//         <button
//           data-aos="fade-up"
//           className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]"
//           onClick={async () => {
//             setIsDownloading(true);
//             await toPDF();
//             setIsDownloading(false);
//           }}
//         >
//           Download Ticket
//         </button>

//         <Link
//           data-aos="fade-up"
//           to={"/"}
//           className="text-[#EE5128] font-jakarta font-semibold text-[18px] text-center mx-auto"
//         >
//           Back to home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default TicketConfirm;

// const Recipet = ({
//   id,
//   targetRef,
//   ticketDetails,
//   bookingDetails,
//   isDownloading,
// }) => {
//   console.log(ticketDetails.outwardFlight);
//   console.log(bookingDetails);

//   const TicketData = ticketDetails.Ticketdetail;
//   const OutWardTicketData = TicketData?.outwardFlight;

//   const TravellerData = TicketData?.Travellerdetails?.Traveller;
//   const BookingTravellerData =
//     bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
//       ?.BookingProfile?.[0].TravellerList?.[0]?.Traveller;
//   const AirportName =
//     bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
//       ?.AirportNamePair[0];
//   const Terms =
//     bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
//       ?.RouterHistory?.[0].TermsRouter?.[0]?.SupplierInfoList[0]?.SupplierInfo;

//   console.log(BookingTravellerData);

//   return (
//     <div
//       className={`font-jakarta ${
//         isDownloading ? "min-w-[375px]" : "w-[1220px]"
//       }`}
//       ref={targetRef}
//       style={{ colorScheme: "light" }}
//     >
//       <div className="flex justify-between p-6 my-6 items-center">
//         <img src={WeeflyLogo} alt="Weefly Logo" height={80} width={80} />
//         <div className="flex flex-col items-end text-lg">
//           <p>
//             <span className="font-bold">Flight Ticket</span>{" "}
//             {TicketData?.returnFlight ? "Round Trip" : "One Way"}
//           </p>
//           <p>
//             Booking ID: <span className="font-bold">{id}</span>
//           </p>
//         </div>
//       </div>
//       <>
//         {/* outward */}
//         {TicketData?.returnFlight ? (
//           <>
//             <div
//               className=" font-jakarta border-2 rounded-2x"
//               style={{ borderColor: "#d4d4d4" }}
//             >
//               <div
//                 className="p-6 border-b-2 flex justify-between gap-2"
//                 style={{ borderBottomColor: "#d4d4d4" }}
//               >
//                 <div className="flex flex-col gap-2">
//                   <h2 className="text-3xl font-bold">
//                     {" "}
//                     {AirportName?.OriginAirport[0]}-{" "}
//                     {AirportName?.DestinationAirport[0]}
//                   </h2>
//                   <p>
//                     {OutWardTicketData.departureDate} •{" "}
//                     {OutWardTicketData.duration} duration
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <div
//                     className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
//                     style={{ borderColor: "#6a7282" }}
//                   >
//                     <p
//                       className=" px-4 h-12"
//                       style={{ backgroundColor: "#6a7282", color: "#fff" }}
//                     >
//                       PNR
//                     </p>
//                     <p className=" px-4 ">{id}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div
//                   className="border-r-2"
//                   style={{ borderRightColor: "#d4d4d4" }}
//                 >
//                   <div className="flex items-center p-6">
//                     <img src={OutWardTicketData.logo} alt="air India logo" />
//                     <div className="flex flex-col items-start gap-1">
//                       <p>{OutWardTicketData.airline}</p>
//                       <p
//                         className="font-sans font-normal text-[15px"
//                         style={{ color: "#d4d4d4" }}
//                       >
//                         {OutWardTicketData.flightNumber}
//                       </p>
//                       {/* <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                   Business
//                 </p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 ">
//                   <div className="flex-1 items-center w-full p-6">
//                     <div className="flex">
//                       <div className="px-[20px] lg:px-[44px]">
//                         <p className="text-2xl xl:text-3xl font-bold">
//                           <span className="">
//                             {AirportName?.OriginAirport[0]} <br />
//                             <span className="font-medium">
//                               {OutWardTicketData.departureCity}
//                             </span>
//                           </span>
//                           <span>{OutWardTicketData.departureTime}</span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] lg:text-[20px]"
//                           style={{ color: "#737373" }}
//                         >
//                           Algeries
//                         </p> */}
//                       </div>
//                       <div className="flex-1 py-[40px] relative ">
//                         <div
//                           className="relative border border-dashed h-px"
//                           style={{ borderColor: "#d4d4d4" }}
//                         >
//                           <div
//                             className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                           <div
//                             className="absolute size-4 rounded-full -right-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                         </div>
//                         <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                           <img
//                             src={FlightLogo}
//                             alt="Plane"
//                             className="h-[41px] w-[41px]"
//                           />
//                           <p
//                             className="font-normal text-[17px]"
//                             style={{ color: "#737373" }}
//                           >
//                             {OutWardTicketData.duration}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="px-[20px] xl:px-[44px]">
//                         <p className="text-[25px] xl:text-3xl font-bold">
//                           <span className="flex flex-col items-end">
//                             {AirportName?.DestinationAirport[0]} <br />
//                             <span>
//                               {OutWardTicketData?.arrivalTime}
//                               <span className="font-medium">
//                                 {OutWardTicketData.arrivalCity}
//                               </span>
//                             </span>
//                           </span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] xl:text-[20px]"
//                           style={{ borderColor: "#737373" }}
//                         >
//                           Launda
//                         </p> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               {/* <div
//                 className="border-y-2 p-6"
//                 style={{ borderColor: "#d4d4d4" }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Luggage />
//                     <b>Check-in:</b>
//                     <span>25 KG per Adult</span>
//                   </div>
//                   <div className="flex items-center">

//                     <b>Cabin:</b>
//                     <span>7 KG per Adult</span>
//                   </div>
//                 </div>
//               </div> */}

//               <div
//                 className="border-t-2 "
//                 style={{ borderColor: "#d4d4d4" }}
//               ></div>

//               {/* Travellers */}
//               <div className="w-full p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr
//                       className="text-left uppercase text-sm "
//                       style={{ color: "#525252" }}
//                     >
//                       <th>traveller</th>

//                       <th>Seat</th>
//                     </tr>
//                   </thead>
//                   <tbody className="font-medium">
//                     {/* {TravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name.Title}.{" "}
//                           {travaller.Name.NamePartList.NamePart.map((n) => n)}{" "}
//                           <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span>
//                         </td>
//                         <td>{id}</td>
//                       </tr>
//                     ))} */}
//                     {BookingTravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name[0].Title}.{" "}
//                           {travaller.Name[0].NamePartList[0].NamePart.map(
//                             (n) => n
//                           )}{" "}
//                           {/* <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span> */}
//                         </td>
//                         <td>
//                           {
//                             travaller.CustomSupplierParameterList[0]
//                               .CustomSupplierParameter[1].Value
//                           }
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div
//               className=" font-jakarta border-2 rounded-2x mt-10"
//               style={{ borderColor: "#d4d4d4" }}
//             >
//               <div
//                 className="p-6 border-b-2 flex gap-2 justify-between"
//                 style={{ borderBottomColor: "#d4d4d4" }}
//               >
//                 <div className="flex flex-col gap-2">
//                   <h2 className="text-3xl font-bold">
//                     {" "}
//                     {AirportName?.DestinationAirport[0]} -{" "}
//                     {AirportName?.OriginAirport[0]}
//                   </h2>
//                   <p>
//                     {TicketData.returnFlight.departureDate} •{" "}
//                     {TicketData.returnFlight.duration} duration
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <div
//                     className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
//                     style={{ borderColor: "#6a7282" }}
//                   >
//                     <p
//                       className=" px-4 h-12"
//                       style={{
//                         backgroundColor: "#6a7282",
//                         color: "#fff",
//                       }}
//                     >
//                       PNR
//                     </p>
//                     <p className="px-4">{id}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div
//                   className="border-r-2"
//                   style={{ borderRightColor: "#d4d4d4" }}
//                 >
//                   <div className="flex items-center p-6">
//                     <img
//                       src={TicketData.returnFlight.logo}
//                       alt="air India logo"
//                     />
//                     <div className="flex flex-col items-start gap-1">
//                       <p>{TicketData.returnFlight.airline}</p>
//                       <p
//                         className="font-sans font-normal text-[15px"
//                         style={{ color: "#d4d4d4" }}
//                       >
//                         {TicketData.returnFlight.flightNumber}
//                       </p>
//                       {/* <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                   Business
//                 </p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 ">
//                   <div className="flex-1 items-center w-full p-6">
//                     <div className="flex">
//                       <div className="px-[20px] lg:px-[44px]">
//                         <p className="text-2xl xl:text-3xl font-bold">
//                           <span className="">
//                             {AirportName?.DestinationAirport[0]} <br />
//                             <span className="font-medium">
//                               {TicketData.returnFlight.departureCity}{" "}
//                             </span>
//                           </span>
//                           {TicketData.returnFlight.departureTime}
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] lg:text-[20px]"
//                           style={{ color: "#737373" }}
//                         >
//                           Algeries
//                         </p> */}
//                       </div>
//                       <div className="flex-1 py-[40px] relative ">
//                         <div
//                           className="relative border border-dashed h-px"
//                           style={{ borderColor: "#d4d4d4" }}
//                         >
//                           <div
//                             className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                           <div
//                             className="absolute size-4 rounded-full -right-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                         </div>
//                         <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                           <img
//                             src={FlightLogo}
//                             alt="Plane"
//                             className="h-[41px] w-[41px]"
//                           />
//                           <p
//                             className="font-normal text-[17px]"
//                             style={{ color: "#737373" }}
//                           >
//                             {TicketData.returnFlight.duration}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="px-[20px] xl:px-[44px]">
//                         <p className="text-[25px] xl:text-3xl font-bold text-end">
//                           <span className="text-end">
//                             <span>{AirportName?.OriginAirport[0]}</span>
//                             <br />
//                             <span>{TicketData.returnFlight.arrivalTime}</span>
//                           </span>
//                           <span className="font-medium">
//                             {TicketData.returnFlight.arrivalCity}
//                           </span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] xl:text-[20px]"
//                           style={{ borderColor: "#737373" }}
//                         >
//                           Launda
//                         </p> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Features */}
//               {/* <div
//                 className="border-y-2 p-6"
//                 style={{ borderColor: "#d4d4d4" }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Luggage />
//                     <b>Check-in:</b>
//                     <span>25 KG per Adult</span>
//                   </div>
//                   <div className="flex items-center">

//                     <b>Cabin:</b>
//                     <span>7 KG per Adult</span>
//                   </div>
//                 </div>
//               </div> */}
//               <div
//                 className="border-t-2 "
//                 style={{ borderColor: "#d4d4d4" }}
//               ></div>
//               {/* Travellers */}
//               <div className="w-full p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr
//                       className="text-left uppercase text-sm "
//                       style={{ color: "#525252" }}
//                     >
//                       <th>traveller</th>
//                       <th>seat</th>
//                     </tr>
//                   </thead>
//                   <tbody className="font-medium">
//                     {/* {TravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name.Title}.{" "}
//                           {travaller.Name.NamePartList.NamePart.map((n) => n)}{" "}
//                           <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span>
//                         </td>
//                         <td>{id}</td>
//                       </tr>
//                     ))} */}
//                     {BookingTravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name[0].Title}.{" "}
//                           {travaller.Name[0].NamePartList[0].NamePart.map(
//                             (n) => n
//                           )}{" "}
//                           {/* <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span> */}
//                         </td>
//                         <td>
//                           {
//                             travaller.CustomSupplierParameterList[0]
//                               .CustomSupplierParameter[1].Value
//                           }
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <div
//               className=" font-jakarta border-2 rounded-2x"
//               style={{ borderColor: "#d4d4d4" }}
//             >
//               <div
//                 className="p-6 border-b-2 flex justify-between gap-2"
//                 style={{ borderBottomColor: "#d4d4d4" }}
//               >
//                 <div className="flex flex-col gap-2">
//                   <h2 className="text-3xl font-bold">
//                     {" "}
//                     {AirportName?.OriginAirport[0]}-{" "}
//                     {AirportName?.DestinationAirport[0]}
//                   </h2>
//                   <p>
//                     {OutWardTicketData?.departureDate} •{" "}
//                     {OutWardTicketData?.duration} duration
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <div
//                     className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
//                     style={{ borderColor: "#6a7282" }}
//                   >
//                     <p
//                       className="h-12 px-4"
//                       style={{ backgroundColor: "#6a7282", color: "#fff" }}
//                     >
//                       PNR
//                     </p>
//                     <p className="px-4">{id}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div
//                   className="border-r-2"
//                   style={{ borderRightColor: "#d4d4d4" }}
//                 >
//                   <div className="flex items-center p-6">
//                     <img src={OutWardTicketData?.logo} alt="air India logo" />
//                     <div className="flex flex-col items-start gap-1">
//                       <p>{OutWardTicketData?.airline}</p>
//                       <p
//                         className="font-sans font-normal text-[15px"
//                         style={{ color: "#d4d4d4" }}
//                       >
//                         {OutWardTicketData?.flightNumber}
//                       </p>
//                       {/* <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                   Business
//                 </p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 ">
//                   <div className="flex-1 items-center w-full p-6">
//                     <div className="flex">
//                       <div className="px-[20px] lg:px-[44px]">
//                         <p className="text-2xl xl:text-3xl font-bold">
//                           <span className="">
//                             {AirportName?.OriginAirport[0]} <br />
//                             <span className="font-medium">
//                               {OutWardTicketData?.departureCity}
//                             </span>
//                           </span>
//                           <span>{OutWardTicketData?.departureTime}</span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] lg:text-[20px]"
//                           style={{ color: "#737373" }}
//                         >
//                           Algeries
//                         </p> */}
//                       </div>
//                       <div className="flex-1 py-[40px] relative ">
//                         <div
//                           className="relative border border-dashed h-px"
//                           style={{ borderColor: "#d4d4d4" }}
//                         >
//                           <div
//                             className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                           <div
//                             className="absolute size-4 rounded-full -right-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                         </div>
//                         <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                           <img
//                             src={FlightLogo}
//                             alt="Plane"
//                             className="h-[41px] w-[41px]"
//                           />
//                           <p
//                             className="font-normal text-[17px]"
//                             style={{ color: "#737373" }}
//                           >
//                             {OutWardTicketData?.duration}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="px-[20px] xl:px-[44px]">
//                         <p className="text-[25px] xl:text-3xl font-bold">
//                           <span className="flex flex-col items-end">
//                             {AirportName?.DestinationAirport[0]} <br />
//                             <span>
//                               {OutWardTicketData?.arrivalTime}
//                               <span className="font-medium">
//                                 {OutWardTicketData?.arrivalCity}
//                               </span>
//                             </span>
//                           </span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] xl:text-[20px]"
//                           style={{ borderColor: "#737373" }}
//                         >
//                           Launda
//                         </p> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               {/* <div
//                 className="border-y-2 p-6"
//                 style={{ borderColor: "#d4d4d4" }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Luggage />
//                     <b>Check-in:</b>
//                     <span>25 KG per Adult</span>
//                   </div>
//                   <div className="flex items-center">

//                     <b>Cabin:</b>
//                     <span>7 KG per Adult</span>
//                   </div>
//                 </div>
//               </div> */}

//               <div
//                 className="border-t-2 "
//                 style={{ borderColor: "#d4d4d4" }}
//               ></div>

//               {/* Travellers */}
//               <div className="w-full p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr
//                       className="text-left uppercase text-sm "
//                       style={{ color: "#525252" }}
//                     >
//                       <th>traveller</th>

//                       <th>Seat</th>
//                     </tr>
//                   </thead>
//                   <tbody className="font-medium">
//                     {/* {TravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name.Title}.{" "}
//                           {travaller.Name.NamePartList.NamePart.map((n) => n)}{" "}
//                           <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span>
//                         </td>
//                         <td>{id}</td>
//                       </tr>
//                     ))} */}
//                     {BookingTravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name[0].Title}.{" "}
//                           {travaller.Name[0].NamePartList[0].NamePart.map(
//                             (n) => n
//                           )}{" "}
//                           {/* <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span> */}
//                         </td>
//                         <td>
//                           {
//                             travaller.CustomSupplierParameterList[0]
//                               .CustomSupplierParameter[1].Value
//                           }
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}
//       </>
//       <div className="my-12">
//         <img src={TicketSign} alt="" />
//       </div>
//       <ul
//         className="p-6 border-2 mt-10 font-jakarta"
//         style={{ borderColor: "#d4d4d4" }}
//       >
//         <p className="text-center text-2xl font-bold my-10  ">
//           {" "}
//           Terms and Conditions
//         </p>
//         {Terms?.map((term, idx) => (
//           <li key={idx} className="flex flex-col mb-4 ">
//             <p className="font-medium"> • {term.DisplayName[0]}</p>

//             <div className="leading-8">
//               {term.InfoType[0] === "url" ? (
//                 <Link to={term.Info[0]} className="underline">
//                   {term.Info[0]}
//                 </Link>
//               ) : (
//                 <p> {term.Info[0]}</p>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// import { Luggage } from "lucide-react";

// import tick from "/assets/ticketpage/tick.png";
// import AirIndiaLogo from "../../assets/images/AirIndiaLogo.svg";
// import FlightLogo from "../../assets/images/FlightIcon.svg";
// import { Link, useParams } from "react-router";
// import { useEffect, useState } from "react";
// import { usePDF } from "react-to-pdf";
// import WeeflyLogo from "../../assets/images/footer/weefly-logo.png";

// function TicketConfirm() {
//   const { id } = useParams();
//   const [ticketDetails, setTicketDetails] = useState({});
//   const [bookingDetails, setBookingDetails] = useState({});
//   const [isDownloading, setIsDownloading] = useState(false);

//   console.log(id);

//   const getBookingDetail = async (TFBookingReference) => {
//     console.log("TB", TFBookingReference);

//     const travelFusionApi = import.meta.env.VITE_FLIGHT_BACKEND_URL;
//     try {
//       const response = await fetch(`${travelFusionApi}/get-bookingdetails`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ TFBookingReference }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setBookingDetails(data);
//       } else {
//         const data = await response.json();
//         console.log(data);

//         console.log("Ticket detail Not found");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getTicketDetail = async () => {
//     const transactionService = import.meta.env.VITE_TRANSACTION_URL;
//     try {
//       const response = await fetch(
//         `${transactionService}/getticketdetail/${id}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setTicketDetails(data);
//         console.log(data);
//         const bookid = data.Ticketdetail.TFBookingReference;
//         console.log("TBTD", bookid);
//         await getBookingDetail(bookid);
//       } else {
//         console.log("Ticket Not found");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getpaymentdetail = async () => {
//     const transactionService = import.meta.env.VITE_TRANSACTION_URL;
//     try {
//       const response = await fetch(
//         `${transactionService}/getpaymentdetail/${id}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Payment", data);
//       } else {
//         console.log("Payment Not found");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getTicketDetail();
//     getpaymentdetail();
//   }, []);

//   const { toPDF, targetRef } = usePDF({
//     filename: `flight-ticket-${id}.pdf`,
//     page: {
//       margin: 20,
//       format: "a4",
//       orientation: "portrait",
//     },
//   });

//   return (
//     <div className="py-[30px] px-10 xl:px-40">
//       <div className="">
//         <img
//           src={tick}
//           alt={"Ticket Confirm Check Mark"}
//           className="size-[60px] xl:size-[144px] mx-auto"
//           data-aos="zoom-out"
//         />
//         <p
//           data-aos="fade-up"
//           className="font-jakarta font-bold text-[24px] xl:text-[40px] text-center mt-[23px] xl:mt-[41px] uppercase"
//         >
//           Your Ticket has <br className="md:hidden" /> confirmed
//         </p>

//         <h1 className="text-2xl mx-auto text-center mt-10">Ticket ID : {id}</h1>
//       </div>

//       {/* <div className="mt-[61px]" data-aos="fade-up">
//         <h3 className="bg-[#FFE2DA] rounded-t-[17px] px-[45px] py-[17px] font-jakarta font-semibold text-[26px]">
//           Travelers Details
//         </h3>
//         <div className="font-jakarta px-[45px] bg-white">
//           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Name</p>
//               <p className="font-medium text-[18px] mt-[13px]">John brevis</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Age</p>
//               <p className="font-medium text-[18px] mt-[13px]">30</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Date of birth</p>
//               <p className="font-medium text-[18px] mt-[13px]">19-05-1990</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Phone number</p>
//               <p className="font-medium text-[18px] mt-[13px]">
//                 +91 89748 89371
//               </p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Seat no</p>
//               <p className="font-medium text-[18px] mt-[13px]">PW90</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Booking ID</p>
//               <p className="font-medium text-[18px] mt-[13px]">982948</p>
//             </div>
//           </div>
//           <div className="h-px bg-black"></div>
//           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Name</p>
//               <p className="font-medium text-[18px] mt-[13px]">John brevis</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Age</p>
//               <p className="font-medium text-[18px] mt-[13px]">30</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Date of birth</p>
//               <p className="font-medium text-[18px] mt-[13px]">19-05-1990</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Phone number</p>
//               <p className="font-medium text-[18px] mt-[13px]">
//                 +91 89748 89371
//               </p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Seat no</p>
//               <p className="font-medium text-[18px] mt-[13px]">PW90</p>
//             </div>
//             <div className="py-[29px]">
//               <p className="text-base text-[#555555]">Booking ID</p>
//               <p className="font-medium text-[18px] mt-[13px]">982948</p>
//             </div>
//           </div>
//         </div>

//         <div
//           data-aos="fade-up"
//           className="mt-[20px] bg-white rounded-[14px] py-[32px] px-[32px] lg:px-[44px] flex flex-col lg:flex-row items-center gap-10 lg:gap-5"
//         >
//           <div className="">
//             <img src={AirIndiaLogo} alt="air India logo" />
//             <div className="flex items-center gap-[14px]">
//               <p className="font-sans font-normal text-[15px] text-neutral-500">
//                 1244595
//               </p>
//               <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                 Business
//               </p>
//             </div>
//           </div>
//           <div className="flex-1 items-center w-full">
//             <div className="flex xl:px-[84px]">
//               <div className="px-[20px] lg:px-[44px]">
//                 <p className="text-[25px] xl:text-[38px] font-bold">06:00</p>
//                 <p className="font-normal text-[13px] lg:text-[20px] text-neutral-500">
//                   Algeries
//                 </p>
//               </div>
//               <div className="flex-1 py-[40px] relative ">
//                 <div className="relative border border-neutral-200 border-dashed h-px">
//                   <div className="absolute bg-neutral-200 size-4 rounded-full -left-2 -top-2 border-2 border-white"></div>
//                   <div className="absolute bg-neutral-200 size-4 rounded-full -right-2 -top-2 border-2 border-white"></div>
//                 </div>
//                 <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                   <img
//                     src={FlightLogo}
//                     alt="Plane"
//                     className="h-[41px] w-[41px]"
//                   />
//                   <p className="font-normal text-[17px] text-neutral-500">
//                     16h 12m
//                   </p>
//                 </div>
//               </div>

//               <div className="px-[20px] xl:px-[44px]">
//                 <p className="text-[25px] xl:text-[38px] font-bold">19:00</p>
//                 <p className="font-normal text-[13px] xl:text-[20px] text-neutral-500">
//                   Launda
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col justify-end lg:items-end text-center">
//             <p className="font-sans text-[25px] lg:text-[35px] font-black text-[#EE5128]">
//               $1,00,000{" "}
//               <span className="text-base lg:text-[23px] font-normal text-black/70 font-sans">
//                 / pax
//               </span>
//             </p>
//             <p className="font-sans text-base lg:text-[23px] text-black/70 line-through">
//               $1,50,000
//             </p>
//           </div>
//         </div>
//       </div> */}

//       {/* testing */}
//       <div className="mt-10">
//         <div className="">
//           <Recipet
//             id={id}
//             targetRef={targetRef}
//             ticketDetails={ticketDetails}
//             bookingDetails={bookingDetails}
//             isDownloading={isDownloading}
//           />
//         </div>
//       </div>

//       <div className=" max-w-[430px] w-full mx-auto mt-[70px] flex flex-col gap-[37px]">
//         {/* <PDFDownloadLink
//           document={<RecipetPDF />}
//           fileName="ticket-confirmation.pdf"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {({ loading }) =>
//             loading ? "Preparing document..." : "Download Ticket PDF"
//           }
//         </PDFDownloadLink> */}

//         <button
//           data-aos="fade-up"
//           className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]"
//           onClick={async () => {
//             setIsDownloading(true);
//             await toPDF();
//             setIsDownloading(false);
//           }}
//         >
//           Download Ticket
//         </button>

//         <Link
//           data-aos="fade-up"
//           to={"/"}
//           className="text-[#EE5128] font-jakarta font-semibold text-[18px] text-center mx-auto"
//         >
//           Back to home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default TicketConfirm;

// const Recipet = ({
//   id,
//   targetRef,
//   ticketDetails,
//   bookingDetails,
//   isDownloading,
// }) => {
//   console.log(ticketDetails.outwardFlight);
//   console.log(bookingDetails);

//   const TicketData = ticketDetails.Ticketdetail;
//   const OutWardTicketData = TicketData?.outwardFlight;

//   const TravellerData = TicketData?.Travellerdetails?.Traveller;
//   const BookingTravellerData =
//     bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
//       ?.BookingProfile?.[0].TravellerList?.[0]?.Traveller;
//   const AirportName =
//     bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
//       ?.AirportNamePair[0];
//   const Terms =
//     bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
//       ?.RouterHistory?.[0].TermsRouter?.[0]?.SupplierInfoList[0]?.SupplierInfo;

//   console.log(BookingTravellerData);

//   return (
//     <div
//       className={`font-jakarta ${
//         isDownloading ? "min-w-[375px]" : "w-[1220px]"
//       }`}
//       ref={targetRef}
//       style={{ colorScheme: "light" }}
//     >
//       <div className="flex justify-between p-6 my-6 items-center">
//         <img src={WeeflyLogo} alt="Weefly Logo" height={80} width={80} />
//         <div className="flex flex-col items-end text-lg">
//           <p>
//             <span className="font-bold">Flight Ticket</span>{" "}
//             {TicketData?.returnFlight ? "Round Trip" : "One Way"}
//           </p>
//           <p>
//             Booking ID: <span className="font-bold">{id}</span>
//           </p>
//         </div>
//       </div>
//       <>
//         {/* outward */}
//         {TicketData?.returnFlight ? (
//           <>
//             <div
//               className=" font-jakarta border-2 rounded-2x"
//               style={{ borderColor: "#d4d4d4" }}
//             >
//               <div
//                 className="p-6 border-b-2 flex justify-between gap-2"
//                 style={{ borderBottomColor: "#d4d4d4" }}
//               >
//                 <div className="flex flex-col gap-2">
//                   <h2 className="text-3xl font-bold">
//                     {" "}
//                     {AirportName?.OriginAirport[0]}-{" "}
//                     {AirportName?.DestinationAirport[0]}
//                   </h2>
//                   <p>
//                     {OutWardTicketData.departureDate} •{" "}
//                     {OutWardTicketData.duration} duration
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <div
//                     className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
//                     style={{ borderColor: "#6a7282" }}
//                   >
//                     <p
//                       className=" px-4 h-12"
//                       style={{ backgroundColor: "#6a7282", color: "#fff" }}
//                     >
//                       PNR
//                     </p>
//                     <p className=" px-4 ">{id}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div
//                   className="border-r-2"
//                   style={{ borderRightColor: "#d4d4d4" }}
//                 >
//                   <div className="flex items-center p-6">
//                     <img src={OutWardTicketData.logo} alt="air India logo" />
//                     <div className="flex flex-col items-start gap-1">
//                       <p>{OutWardTicketData.airline}</p>
//                       <p
//                         className="font-sans font-normal text-[15px"
//                         style={{ color: "#d4d4d4" }}
//                       >
//                         {OutWardTicketData.flightNumber}
//                       </p>
//                       {/* <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                   Business
//                 </p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 ">
//                   <div className="flex-1 items-center w-full p-6">
//                     <div className="flex">
//                       <div className="px-[20px] lg:px-[44px]">
//                         <p className="text-2xl xl:text-3xl font-bold">
//                           <span className="">
//                             {AirportName?.OriginAirport[0]} <br />
//                             <span className="font-medium">
//                               {OutWardTicketData.departureCity}
//                             </span>
//                           </span>
//                           <span>{OutWardTicketData.departureTime}</span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] lg:text-[20px]"
//                           style={{ color: "#737373" }}
//                         >
//                           Algeries
//                         </p> */}
//                       </div>
//                       <div className="flex-1 py-[40px] relative ">
//                         <div
//                           className="relative border border-dashed h-px"
//                           style={{ borderColor: "#d4d4d4" }}
//                         >
//                           <div
//                             className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                           <div
//                             className="absolute size-4 rounded-full -right-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                         </div>
//                         <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                           <img
//                             src={FlightLogo}
//                             alt="Plane"
//                             className="h-[41px] w-[41px]"
//                           />
//                           <p
//                             className="font-normal text-[17px]"
//                             style={{ color: "#737373" }}
//                           >
//                             {OutWardTicketData.duration}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="px-[20px] xl:px-[44px]">
//                         <p className="text-[25px] xl:text-3xl font-bold">
//                           <span className="flex flex-col items-end">
//                             {AirportName?.DestinationAirport[0]} <br />
//                             <span>
//                               {OutWardTicketData?.arrivalTime}
//                               <span className="font-medium">
//                                 {OutWardTicketData.arrivalCity}
//                               </span>
//                             </span>
//                           </span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] xl:text-[20px]"
//                           style={{ borderColor: "#737373" }}
//                         >
//                           Launda
//                         </p> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               {/* <div
//                 className="border-y-2 p-6"
//                 style={{ borderColor: "#d4d4d4" }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Luggage />
//                     <b>Check-in:</b>
//                     <span>25 KG per Adult</span>
//                   </div>
//                   <div className="flex items-center">

//                     <b>Cabin:</b>
//                     <span>7 KG per Adult</span>
//                   </div>
//                 </div>
//               </div> */}

//               <div
//                 className="border-t-2 "
//                 style={{ borderColor: "#d4d4d4" }}
//               ></div>

//               {/* Travellers */}
//               <div className="w-full p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr
//                       className="text-left uppercase text-sm "
//                       style={{ color: "#525252" }}
//                     >
//                       <th>traveller</th>

//                       <th>Seat</th>
//                     </tr>
//                   </thead>
//                   <tbody className="font-medium">
//                     {/* {TravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name.Title}.{" "}
//                           {travaller.Name.NamePartList.NamePart.map((n) => n)}{" "}
//                           <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span>
//                         </td>
//                         <td>{id}</td>
//                       </tr>
//                     ))} */}
//                     {BookingTravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name[0].Title}.{" "}
//                           {travaller.Name[0].NamePartList[0].NamePart.map(
//                             (n) => n
//                           )}{" "}
//                           {/* <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span> */}
//                         </td>
//                         <td>
//                           {
//                             travaller.CustomSupplierParameterList[0]
//                               .CustomSupplierParameter[1].Value
//                           }
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div
//               className=" font-jakarta border-2 rounded-2x mt-10"
//               style={{ borderColor: "#d4d4d4" }}
//             >
//               <div
//                 className="p-6 border-b-2 flex gap-2 justify-between"
//                 style={{ borderBottomColor: "#d4d4d4" }}
//               >
//                 <div className="flex flex-col gap-2">
//                   <h2 className="text-3xl font-bold">
//                     {" "}
//                     {AirportName?.DestinationAirport[0]} -{" "}
//                     {AirportName?.OriginAirport[0]}
//                   </h2>
//                   <p>
//                     {TicketData.returnFlight.departureDate} •{" "}
//                     {TicketData.returnFlight.duration} duration
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <div
//                     className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
//                     style={{ borderColor: "#6a7282" }}
//                   >
//                     <p
//                       className=" px-4 h-12"
//                       style={{
//                         backgroundColor: "#6a7282",
//                         color: "#fff",
//                       }}
//                     >
//                       PNR
//                     </p>
//                     <p className="px-4">{id}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div
//                   className="border-r-2"
//                   style={{ borderRightColor: "#d4d4d4" }}
//                 >
//                   <div className="flex items-center p-6">
//                     <img
//                       src={TicketData.returnFlight.logo}
//                       alt="air India logo"
//                     />
//                     <div className="flex flex-col items-start gap-1">
//                       <p>{TicketData.returnFlight.airline}</p>
//                       <p
//                         className="font-sans font-normal text-[15px"
//                         style={{ color: "#d4d4d4" }}
//                       >
//                         {TicketData.returnFlight.flightNumber}
//                       </p>
//                       {/* <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                   Business
//                 </p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 ">
//                   <div className="flex-1 items-center w-full p-6">
//                     <div className="flex">
//                       <div className="px-[20px] lg:px-[44px]">
//                         <p className="text-2xl xl:text-3xl font-bold">
//                           <span className="">
//                             {AirportName?.DestinationAirport[0]} <br />
//                             <span className="font-medium">
//                               {TicketData.returnFlight.departureCity}{" "}
//                             </span>
//                           </span>
//                           {TicketData.returnFlight.departureTime}
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] lg:text-[20px]"
//                           style={{ color: "#737373" }}
//                         >
//                           Algeries
//                         </p> */}
//                       </div>
//                       <div className="flex-1 py-[40px] relative ">
//                         <div
//                           className="relative border border-dashed h-px"
//                           style={{ borderColor: "#d4d4d4" }}
//                         >
//                           <div
//                             className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                           <div
//                             className="absolute size-4 rounded-full -right-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                         </div>
//                         <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                           <img
//                             src={FlightLogo}
//                             alt="Plane"
//                             className="h-[41px] w-[41px]"
//                           />
//                           <p
//                             className="font-normal text-[17px]"
//                             style={{ color: "#737373" }}
//                           >
//                             {TicketData.returnFlight.duration}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="px-[20px] xl:px-[44px]">
//                         <p className="text-[25px] xl:text-3xl font-bold text-end">
//                           <span className="text-end">
//                             <span>{AirportName?.OriginAirport[0]}</span>
//                             <br />
//                             <span>{TicketData.returnFlight.arrivalTime}</span>
//                           </span>
//                           <span className="font-medium">
//                             {TicketData.returnFlight.arrivalCity}
//                           </span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] xl:text-[20px]"
//                           style={{ borderColor: "#737373" }}
//                         >
//                           Launda
//                         </p> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Features */}
//               {/* <div
//                 className="border-y-2 p-6"
//                 style={{ borderColor: "#d4d4d4" }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Luggage />
//                     <b>Check-in:</b>
//                     <span>25 KG per Adult</span>
//                   </div>
//                   <div className="flex items-center">

//                     <b>Cabin:</b>
//                     <span>7 KG per Adult</span>
//                   </div>
//                 </div>
//               </div> */}
//               <div
//                 className="border-t-2 "
//                 style={{ borderColor: "#d4d4d4" }}
//               ></div>
//               {/* Travellers */}
//               <div className="w-full p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr
//                       className="text-left uppercase text-sm "
//                       style={{ color: "#525252" }}
//                     >
//                       <th>traveller</th>
//                       <th>seat</th>
//                     </tr>
//                   </thead>
//                   <tbody className="font-medium">
//                     {/* {TravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name.Title}.{" "}
//                           {travaller.Name.NamePartList.NamePart.map((n) => n)}{" "}
//                           <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span>
//                         </td>
//                         <td>{id}</td>
//                       </tr>
//                     ))} */}
//                     {BookingTravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name[0].Title}.{" "}
//                           {travaller.Name[0].NamePartList[0].NamePart.map(
//                             (n) => n
//                           )}{" "}
//                           {/* <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span> */}
//                         </td>
//                         <td>
//                           {
//                             travaller.CustomSupplierParameterList[0]
//                               .CustomSupplierParameter[1].Value
//                           }
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <div
//               className=" font-jakarta border-2 rounded-2x"
//               style={{ borderColor: "#d4d4d4" }}
//             >
//               <div
//                 className="p-6 border-b-2 flex justify-between gap-2"
//                 style={{ borderBottomColor: "#d4d4d4" }}
//               >
//                 <div className="flex flex-col gap-2">
//                   <h2 className="text-3xl font-bold">
//                     {" "}
//                     {AirportName?.OriginAirport[0]}-{" "}
//                     {AirportName?.DestinationAirport[0]}
//                   </h2>
//                   <p>
//                     {OutWardTicketData?.departureDate} •{" "}
//                     {OutWardTicketData?.duration} duration
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <div
//                     className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
//                     style={{ borderColor: "#6a7282" }}
//                   >
//                     <p
//                       className="h-12 px-4"
//                       style={{ backgroundColor: "#6a7282", color: "#fff" }}
//                     >
//                       PNR
//                     </p>
//                     <p className="px-4">{id}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div
//                   className="border-r-2"
//                   style={{ borderRightColor: "#d4d4d4" }}
//                 >
//                   <div className="flex items-center p-6">
//                     <img src={OutWardTicketData?.logo} alt="air India logo" />
//                     <div className="flex flex-col items-start gap-1">
//                       <p>{OutWardTicketData?.airline}</p>
//                       <p
//                         className="font-sans font-normal text-[15px"
//                         style={{ color: "#d4d4d4" }}
//                       >
//                         {OutWardTicketData?.flightNumber}
//                       </p>
//                       {/* <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
//                   Business
//                 </p> */}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 ">
//                   <div className="flex-1 items-center w-full p-6">
//                     <div className="flex">
//                       <div className="px-[20px] lg:px-[44px]">
//                         <p className="text-2xl xl:text-3xl font-bold">
//                           <span className="">
//                             {AirportName?.OriginAirport[0]} <br />
//                             <span className="font-medium">
//                               {OutWardTicketData?.departureCity}
//                             </span>
//                           </span>
//                           <span>{OutWardTicketData?.departureTime}</span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] lg:text-[20px]"
//                           style={{ color: "#737373" }}
//                         >
//                           Algeries
//                         </p> */}
//                       </div>
//                       <div className="flex-1 py-[40px] relative ">
//                         <div
//                           className="relative border border-dashed h-px"
//                           style={{ borderColor: "#d4d4d4" }}
//                         >
//                           <div
//                             className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                           <div
//                             className="absolute size-4 rounded-full -right-2 -top-2 border-2"
//                             style={{
//                               borderColor: "#fff",
//                               backgroundColor: "#e5e5e5",
//                             }}
//                           ></div>
//                         </div>
//                         <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
//                           <img
//                             src={FlightLogo}
//                             alt="Plane"
//                             className="h-[41px] w-[41px]"
//                           />
//                           <p
//                             className="font-normal text-[17px]"
//                             style={{ color: "#737373" }}
//                           >
//                             {OutWardTicketData?.duration}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="px-[20px] xl:px-[44px]">
//                         <p className="text-[25px] xl:text-3xl font-bold">
//                           <span className="flex flex-col items-end">
//                             {AirportName?.DestinationAirport[0]} <br />
//                             <span>
//                               {OutWardTicketData?.arrivalTime}
//                               <span className="font-medium">
//                                 {OutWardTicketData?.arrivalCity}
//                               </span>
//                             </span>
//                           </span>
//                         </p>
//                         {/* <p
//                           className="font-normal text-[13px] xl:text-[20px]"
//                           style={{ borderColor: "#737373" }}
//                         >
//                           Launda
//                         </p> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               {/* <div
//                 className="border-y-2 p-6"
//                 style={{ borderColor: "#d4d4d4" }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <Luggage />
//                     <b>Check-in:</b>
//                     <span>25 KG per Adult</span>
//                   </div>
//                   <div className="flex items-center">

//                     <b>Cabin:</b>
//                     <span>7 KG per Adult</span>
//                   </div>
//                 </div>
//               </div> */}

//               <div
//                 className="border-t-2 "
//                 style={{ borderColor: "#d4d4d4" }}
//               ></div>

//               {/* Travellers */}
//               <div className="w-full p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr
//                       className="text-left uppercase text-sm "
//                       style={{ color: "#525252" }}
//                     >
//                       <th>traveller</th>

//                       <th>Seat</th>
//                     </tr>
//                   </thead>
//                   <tbody className="font-medium">
//                     {/* {TravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name.Title}.{" "}
//                           {travaller.Name.NamePartList.NamePart.map((n) => n)}{" "}
//                           <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span>
//                         </td>
//                         <td>{id}</td>
//                       </tr>
//                     ))} */}
//                     {BookingTravellerData?.map((travaller, index) => (
//                       <tr key={index}>
//                         <td>
//                           {travaller.Name[0].Title}.{" "}
//                           {travaller.Name[0].NamePartList[0].NamePart.map(
//                             (n) => n
//                           )}{" "}
//                           {/* <span className="" style={{ borderColor: "#737373" }}>
//                             Adult
//                           </span> */}
//                         </td>
//                         <td>
//                           {
//                             travaller.CustomSupplierParameterList[0]
//                               .CustomSupplierParameter[1].Value
//                           }
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}
//       </>

//       <ul
//         className="p-6 border-2 mt-10 font-jakarta"
//         style={{ borderColor: "#d4d4d4" }}
//       >
//         <p className="text-center text-2xl font-bold my-10  ">
//           {" "}
//           Terms and Conditions
//         </p>
//         {Terms?.map((term, idx) => (
//           <li key={idx} className="flex flex-col mb-4 ">
//             <p className="font-medium"> • {term.DisplayName[0]}</p>

//             <div className="leading-8">
//               {term.InfoType[0] === "url" ? (
//                 <Link to={term.Info[0]} className="underline">
//                   {term.Info[0]}
//                 </Link>
//               ) : (
//                 <p> {term.Info[0]}</p>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
import { Luggage } from "lucide-react";

import tick from "/assets/ticketpage/tick.png";
import AirIndiaLogo from "../../assets/images/AirIndiaLogo.svg";
import FlightLogo from "../../assets/images/FlightIcon.svg";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import WeeflyLogo from "../../assets/images/footer/weefly-logo.png";

function TicketConfirm() {
  const { id } = useParams();
  const [ticketDetails, setTicketDetails] = useState({});
  const [bookingDetails, setBookingDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false);

  console.log(id);

  const getBookingDetail = async (TFBookingReference) => {
    console.log("TB", TFBookingReference);

    const travelFusionApi = import.meta.env.VITE_FLIGHT_BACKEND_URL;
    try {
      const response = await fetch(`${travelFusionApi}/get-bookingdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ TFBookingReference }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBookingDetails(data);
      } else {
        const data = await response.json();
        console.log(data);

        console.log("Ticket detail Not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTicketDetail = async () => {
    const transactionService = import.meta.env.VITE_TRANSACTION_URL;
    try {
      const response = await fetch(
        `${transactionService}/getticketdetail/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setTicketDetails(data);
        console.log(data);
        const bookid = data.Ticketdetail.TFBookingReference;
        console.log("TBTD", bookid);
        await getBookingDetail(bookid);
      } else {
        console.log("Ticket Not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getpaymentdetail = async () => {
    const transactionService = import.meta.env.VITE_TRANSACTION_URL;
    try {
      const response = await fetch(
        `${transactionService}/getpaymentdetail/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Payment", data);
        setPaymentDetails(data);
      } else {
        console.log("Payment Not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTicketDetail();
    getpaymentdetail();
  }, []);

  const { toPDF, targetRef } = usePDF({
    filename: `flight-ticket-${id}.pdf`,
    page: {
      margin: 20,
      format: "a4",
      orientation: "portrait",
    },
  });

  const { toPDF: toReceiptPDF, targetRef: receiptTargetRef } = usePDF({
    filename: `e-receipt-${id}.pdf`,
    page: {
      margin: 20,
      format: "a4",
      orientation: "portrait",
    },
  });

  return (
    <div className="py-[30px] px-10 xl:px-40">
      <div className="">
        <img
          src={tick}
          alt={"Ticket Confirm Check Mark"}
          className="size-[60px] xl:size-[144px] mx-auto"
          data-aos="zoom-out"
        />
        <p
          data-aos="fade-up"
          className="font-jakarta font-bold text-[24px] xl:text-[40px] text-center mt-[23px] xl:mt-[41px] uppercase"
        >
          Your Ticket has <br className="md:hidden" /> confirmed
        </p>

        <h1 className="text-2xl mx-auto text-center mt-10">Ticket ID : {id}</h1>
      </div>

      {/* Ticket Receipt */}
      <div className="mt-10">
        <div className="">
          <Recipet
            id={id}
            targetRef={targetRef}
            ticketDetails={ticketDetails}
            bookingDetails={bookingDetails}
            isDownloading={isDownloading}
          />
        </div>
      </div>

      {/* E-Receipt (Hidden) */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <EReceipt
          id={id}
          targetRef={receiptTargetRef}
          ticketDetails={ticketDetails}
          paymentDetails={paymentDetails}
          isDownloading={isDownloadingReceipt}
          // Add payment summary from backend or reconstruct from ticket details
          paymentSummary={
            ticketDetails?.paymentSummary || {
              outwardTicketPrice:
                ticketDetails?.Ticketdetail?.Receiptdetails
                  ?.OutwardTicketcharge,
              returnTicketPrice:
                ticketDetails?.Ticketdetail?.Receiptdetails?.Returnticketcharge,
              seatCharge:
                ticketDetails?.Ticketdetail?.Receiptdetails?.SeatCharge,
              luggageCharge: ticketDetails?.Ticketdetail?.luggageCharge,
              tax: ticketDetails?.Ticketdetail?.Receiptdetails?.Totaltax,
              totalPrice:
                ticketDetails?.Ticketdetail?.Receiptdetails?.Totalprice,
              currency: "CVE",
              tripType: ticketDetails?.Ticketdetail?.returnFlight
                ? "Round Trip"
                : "One Way",
            }
          }
        />
      </div>

      <div className="max-w-[430px] w-full mx-auto mt-[70px] flex flex-col gap-[20px]">
        <button
          data-aos="fade-up"
          className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white drop-shadow-xl drop-shadow-[#FD74014D]"
          onClick={async () => {
            setIsDownloading(true);
            await toPDF();
            setIsDownloading(false);
          }}
        >
          Download Ticket
        </button>

        <button
          data-aos="fade-up"
          className="font-jakarta font-semibold text-[18px] w-full bg-black py-[14px] rounded-[8px] text-white drop-shadow-xl"
          onClick={async () => {
            setIsDownloadingReceipt(true);
            await toReceiptPDF();
            setIsDownloadingReceipt(false);
          }}
        >
          Download E-Receipt
        </button>

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

export default TicketConfirm;

const Recipet = ({
  id,
  targetRef,
  ticketDetails,
  bookingDetails,
  isDownloading,
}) => {
  console.log(ticketDetails.outwardFlight);
  console.log(bookingDetails);

  const TicketData = ticketDetails.Ticketdetail;
  const OutWardTicketData = TicketData?.outwardFlight;

  const TravellerData = TicketData?.Travellerdetails?.Traveller;
  const BookingTravellerData =
    bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
      ?.BookingProfile?.[0].TravellerList?.[0]?.Traveller;
  const AirportName =
    bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
      ?.AirportNamePair[0];
  const Terms =
    bookingDetails?.Bookingdetails?.CommandList?.GetBookingDetails?.[0]
      ?.RouterHistory?.[0].TermsRouter?.[0]?.SupplierInfoList[0]?.SupplierInfo;

  console.log(BookingTravellerData);

  // Get current date for transaction
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Next day for service delivery
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      className={`font-jakarta ${
        isDownloading ? "min-w-[375px]" : "w-[1220px]"
      }`}
      ref={targetRef}
      style={{ colorScheme: "light" }}
    >
      <div className="flex justify-between p-6 my-6 items-center">
        <img src={WeeflyLogo} alt="Weefly Logo" height={80} width={80} />
        <div className="flex flex-col items-end text-lg">
          <p>
            <span className="font-bold">Flight Ticket</span>{" "}
            {TicketData?.returnFlight ? "Round Trip" : "One Way"}
          </p>
          <p>
            Booking ID: <span className="font-bold">{id}</span>
          </p>
        </div>
      </div>
      <>
        {/* outward */}
        {TicketData?.returnFlight ? (
          <>
            <div
              className=" font-jakarta border-2 rounded-2x"
              style={{ borderColor: "#d4d4d4" }}
            >
              <div
                className="p-6 border-b-2 flex justify-between gap-2"
                style={{ borderBottomColor: "#d4d4d4" }}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold">
                    {" "}
                    {AirportName?.OriginAirport[0]}-{" "}
                    {AirportName?.DestinationAirport[0]}
                  </h2>
                  <p>
                    {OutWardTicketData.departureDate} •{" "}
                    {OutWardTicketData.duration} duration
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <div
                    className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
                    style={{ borderColor: "#6a7282" }}
                  >
                    <p
                      className=" px-4 h-12"
                      style={{ backgroundColor: "#6a7282", color: "#fff" }}
                    >
                      PNR
                    </p>
                    <p className=" px-4 ">{id}</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div
                  className="border-r-2"
                  style={{ borderRightColor: "#d4d4d4" }}
                >
                  <div className="flex items-center p-6">
                    <img src={OutWardTicketData.logo} alt="air India logo" />
                    <div className="flex flex-col items-start gap-1">
                      <p>{OutWardTicketData.airline}</p>
                      <p
                        className="font-sans font-normal text-[15px"
                        style={{ color: "#d4d4d4" }}
                      >
                        {OutWardTicketData.flightNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 ">
                  <div className="flex-1 items-center w-full p-6">
                    <div className="flex">
                      <div className="px-[20px] lg:px-[44px]">
                        <p className="text-2xl xl:text-3xl font-bold">
                          <span className="">
                            {AirportName?.OriginAirport[0]} <br />
                            <span className="font-medium">
                              {OutWardTicketData.departureCity}
                            </span>
                          </span>
                          <span>{OutWardTicketData.departureTime}</span>
                        </p>
                      </div>
                      <div className="flex-1 py-[40px] relative ">
                        <div
                          className="relative border border-dashed h-px"
                          style={{ borderColor: "#d4d4d4" }}
                        >
                          <div
                            className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
                            style={{
                              borderColor: "#fff",
                              backgroundColor: "#e5e5e5",
                            }}
                          ></div>
                          <div
                            className="absolute size-4 rounded-full -right-2 -top-2 border-2"
                            style={{
                              borderColor: "#fff",
                              backgroundColor: "#e5e5e5",
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
                          <img
                            src={FlightLogo}
                            alt="Plane"
                            className="h-[41px] w-[41px]"
                          />
                          <p
                            className="font-normal text-[17px]"
                            style={{ color: "#737373" }}
                          >
                            {OutWardTicketData.duration}
                          </p>
                        </div>
                      </div>

                      <div className="px-[20px] xl:px-[44px]">
                        <p className="text-[25px] xl:text-3xl font-bold">
                          <span className="flex flex-col items-end">
                            {AirportName?.DestinationAirport[0]} <br />
                            <span>
                              {OutWardTicketData?.arrivalTime}
                              <span className="font-medium">
                                {OutWardTicketData.arrivalCity}
                              </span>
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="border-t-2 "
                style={{ borderColor: "#d4d4d4" }}
              ></div>

              {/* Travellers */}
              <div className="w-full p-6">
                <table className="w-full">
                  <thead>
                    <tr
                      className="text-left uppercase text-sm "
                      style={{ color: "#525252" }}
                    >
                      <th>traveller</th>
                      <th>Seat</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium">
                    {BookingTravellerData?.map((travaller, index) => (
                      <tr key={index}>
                        <td>
                          {travaller.Name[0].Title}.{" "}
                          {travaller.Name[0].NamePartList[0].NamePart.map(
                            (n) => n
                          )}{" "}
                        </td>
                        <td>
                          {
                            travaller.CustomSupplierParameterList[0]
                              .CustomSupplierParameter[1].Value
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className=" font-jakarta border-2 rounded-2x mt-10"
              style={{ borderColor: "#d4d4d4" }}
            >
              <div
                className="p-6 border-b-2 flex gap-2 justify-between"
                style={{ borderBottomColor: "#d4d4d4" }}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold">
                    {" "}
                    {AirportName?.DestinationAirport[0]} -{" "}
                    {AirportName?.OriginAirport[0]}
                  </h2>
                  <p>
                    {TicketData.returnFlight.departureDate} •{" "}
                    {TicketData.returnFlight.duration} duration
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <div
                    className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
                    style={{ borderColor: "#6a7282" }}
                  >
                    <p
                      className=" px-4 h-12"
                      style={{
                        backgroundColor: "#6a7282",
                        color: "#fff",
                      }}
                    >
                      PNR
                    </p>
                    <p className="px-4">{id}</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div
                  className="border-r-2"
                  style={{ borderRightColor: "#d4d4d4" }}
                >
                  <div className="flex items-center p-6">
                    <img
                      src={TicketData.returnFlight.logo}
                      alt="air India logo"
                    />
                    <div className="flex flex-col items-start gap-1">
                      <p>{TicketData.returnFlight.airline}</p>
                      <p
                        className="font-sans font-normal text-[15px"
                        style={{ color: "#d4d4d4" }}
                      >
                        {TicketData.returnFlight.flightNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 ">
                  <div className="flex-1 items-center w-full p-6">
                    <div className="flex">
                      <div className="px-[20px] lg:px-[44px]">
                        <p className="text-2xl xl:text-3xl font-bold">
                          <span className="">
                            {AirportName?.DestinationAirport[0]} <br />
                            <span className="font-medium">
                              {TicketData.returnFlight.departureCity}{" "}
                            </span>
                          </span>
                          {TicketData.returnFlight.departureTime}
                        </p>
                      </div>
                      <div className="flex-1 py-[40px] relative ">
                        <div
                          className="relative border border-dashed h-px"
                          style={{ borderColor: "#d4d4d4" }}
                        >
                          <div
                            className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
                            style={{
                              borderColor: "#fff",
                              backgroundColor: "#e5e5e5",
                            }}
                          ></div>
                          <div
                            className="absolute size-4 rounded-full -right-2 -top-2 border-2"
                            style={{
                              borderColor: "#fff",
                              backgroundColor: "#e5e5e5",
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
                          <img
                            src={FlightLogo}
                            alt="Plane"
                            className="h-[41px] w-[41px]"
                          />
                          <p
                            className="font-normal text-[17px]"
                            style={{ color: "#737373" }}
                          >
                            {TicketData.returnFlight.duration}
                          </p>
                        </div>
                      </div>

                      <div className="px-[20px] xl:px-[44px]">
                        <p className="text-[25px] xl:text-3xl font-bold text-end">
                          <span className="text-end">
                            <span>{AirportName?.OriginAirport[0]}</span>
                            <br />
                            <span>{TicketData.returnFlight.arrivalTime}</span>
                          </span>
                          <span className="font-medium">
                            {TicketData.returnFlight.arrivalCity}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="border-t-2 "
                style={{ borderColor: "#d4d4d4" }}
              ></div>
              {/* Travellers */}
              <div className="w-full p-6">
                <table className="w-full">
                  <thead>
                    <tr
                      className="text-left uppercase text-sm "
                      style={{ color: "#525252" }}
                    >
                      <th>traveller</th>
                      <th>seat</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium">
                    {BookingTravellerData?.map((travaller, index) => (
                      <tr key={index}>
                        <td>
                          {travaller.Name[0].Title}.{" "}
                          {travaller.Name[0].NamePartList[0].NamePart.map(
                            (n) => n
                          )}{" "}
                        </td>
                        <td>
                          {
                            travaller.CustomSupplierParameterList[0]
                              .CustomSupplierParameter[1].Value
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className=" font-jakarta border-2 rounded-2x"
              style={{ borderColor: "#d4d4d4" }}
            >
              <div
                className="p-6 border-b-2 flex justify-between gap-2"
                style={{ borderBottomColor: "#d4d4d4" }}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold">
                    {" "}
                    {AirportName?.OriginAirport[0]}-{" "}
                    {AirportName?.DestinationAirport[0]}
                  </h2>
                  <p>
                    {OutWardTicketData?.departureDate} •{" "}
                    {OutWardTicketData?.duration} duration
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <div
                    className="flex rounded-lg overflow-hidden border-2 font-bold tracking-wider text-xl "
                    style={{ borderColor: "#6a7282" }}
                  >
                    <p
                      className="h-12 px-4"
                      style={{ backgroundColor: "#6a7282", color: "#fff" }}
                    >
                      PNR
                    </p>
                    <p className="px-4">{id}</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div
                  className="border-r-2"
                  style={{ borderRightColor: "#d4d4d4" }}
                >
                  <div className="flex items-center p-6">
                    <img src={OutWardTicketData?.logo} alt="air India logo" />
                    <div className="flex flex-col items-start gap-1">
                      <p>{OutWardTicketData?.airline}</p>
                      <p
                        className="font-sans font-normal text-[15px"
                        style={{ color: "#d4d4d4" }}
                      >
                        {OutWardTicketData?.flightNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 ">
                  <div className="flex-1 items-center w-full p-6">
                    <div className="flex">
                      <div className="px-[20px] lg:px-[44px]">
                        <p className="text-2xl xl:text-3xl font-bold">
                          <span className="">
                            {AirportName?.OriginAirport[0]} <br />
                            <span className="font-medium">
                              {OutWardTicketData?.departureCity}
                            </span>
                          </span>
                          <span>{OutWardTicketData?.departureTime}</span>
                        </p>
                      </div>
                      <div className="flex-1 py-[40px] relative ">
                        <div
                          className="relative border border-dashed h-px"
                          style={{ borderColor: "#d4d4d4" }}
                        >
                          <div
                            className="absolute  size-4 rounded-full -left-2 -top-2 border-2"
                            style={{
                              borderColor: "#fff",
                              backgroundColor: "#e5e5e5",
                            }}
                          ></div>
                          <div
                            className="absolute size-4 rounded-full -right-2 -top-2 border-2"
                            style={{
                              borderColor: "#fff",
                              backgroundColor: "#e5e5e5",
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-col items-center gap-[8px] absolute top-5 left-1/3">
                          <img
                            src={FlightLogo}
                            alt="Plane"
                            className="h-[41px] w-[41px]"
                          />
                          <p
                            className="font-normal text-[17px]"
                            style={{ color: "#737373" }}
                          >
                            {OutWardTicketData?.duration}
                          </p>
                        </div>
                      </div>

                      <div className="px-[20px] xl:px-[44px]">
                        <p className="text-[25px] xl:text-3xl font-bold">
                          <span className="flex flex-col items-end">
                            {AirportName?.DestinationAirport[0]} <br />
                            <span>
                              {OutWardTicketData?.arrivalTime}
                              <span className="font-medium">
                                {OutWardTicketData?.arrivalCity}
                              </span>
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="border-t-2 "
                style={{ borderColor: "#d4d4d4" }}
              ></div>

              {/* Travellers */}
              <div className="w-full p-6">
                <table className="w-full">
                  <thead>
                    <tr
                      className="text-left uppercase text-sm "
                      style={{ color: "#525252" }}
                    >
                      <th>traveller</th>
                      <th>Seat</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium">
                    {BookingTravellerData?.map((travaller, index) => (
                      <tr key={index}>
                        <td>
                          {travaller.Name[0].Title}.{" "}
                          {travaller.Name[0].NamePartList[0].NamePart.map(
                            (n) => n
                          )}{" "}
                        </td>
                        <td>
                          {
                            travaller.CustomSupplierParameterList[0]
                              .CustomSupplierParameter[1].Value
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </>

      <ul
        className="p-6 border-2 mt-10 font-jakarta"
        style={{ borderColor: "#d4d4d4" }}
      >
        <p className="text-center text-2xl font-bold my-10  ">
          {" "}
          Terms and Conditions
        </p>
        {Terms?.map((term, idx) => (
          <li key={idx} className="flex flex-col mb-4 ">
            <p className="font-medium"> • {term.DisplayName[0]}</p>

            <div className="leading-8">
              {term.InfoType[0] === "url" ? (
                <Link to={term.Info[0]} className="underline">
                  {term.Info[0]}
                </Link>
              ) : (
                <p> {term.Info[0]}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* E-Receipt Details Section - Only visible during PDF download, hidden on screen */}
      <div
        className="border-2 mt-10 font-jakarta"
        style={{
          borderColor: "#d4d4d4",
          pageBreakBefore: "always",
          display: isDownloading ? "block" : "none",
        }}
      >
        <div className="p-6">
          <h3 className="text-center text-3xl font-bold mb-6">E-RECEIPT</h3>
          <p className="text-center text-lg font-semibold mb-8">
            Payment Confirmation
          </p>

          {/* Merchant & Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Merchant Information</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Merchant Name:</span> FLY CABO
                  VERDE LDA
                </p>
                <p>
                  <span className="font-medium">Website:</span> weefly.africa
                </p>
                <p>
                  <span className="font-medium">Customer Service:</span>{" "}
                  support@weefly.africa
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Transaction Details</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Transaction ID:</span> {id}
                </p>
                <p>
                  <span className="font-medium">Payment Reference:</span> PAY-
                  {id}
                </p>
                <p>
                  <span className="font-medium">Transaction Date:</span>{" "}
                  {getCurrentDate()}
                </p>
                <p>
                  <span className="font-medium">Service Delivery Date:</span>{" "}
                  {getDeliveryDate()}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-6">Payment Summary</h4>

            <div className="space-y-3">
              {/* Flight Services */}
              <div className="flex justify-between text-sm">
                <span>Outward Ticket</span>
                <span className="font-medium">10097.25 CVE</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Return Ticket</span>
                <span className="font-medium">8532.50 CVE</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Total Tax</span>
                <span className="font-medium">1670.25 CVE</span>
              </div>

              {/* Divider line */}
              <div className="border-t pt-3" style={{ borderColor: "#d4d4d4" }}>
                {/* Total Amount */}
                <div
                  className="border-2 p-4 rounded flex justify-between items-center"
                  style={{
                    borderColor: "#000000",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  }}
                >
                  <span className="text-lg font-bold">Total Amount Paid</span>
                  <span className="text-xl font-bold">20300.00 CVE</span>
                </div>
                <p className="text-sm mt-2 text-center">
                  Payment Status: <span className="font-bold">Confirmed ✓</span>
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Footer */}
          <div
            className="text-center pt-4 border-t"
            style={{ borderColor: "#d4d4d4" }}
          >
            <p className="text-lg font-bold mb-2">
              Thank You for Choosing Weefly!
            </p>
            <p className="text-sm mb-4">
              We appreciate your business and hope you have a wonderful travel
              experience.
            </p>
            <div className="flex justify-center items-center space-x-4 text-xs">
              <span>Generated on: {getCurrentDate()}</span>
              <span>•</span>
              <span>Receipt ID: WF-RCP-{id}</span>
              <span>•</span>
              <span>weefly.africa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EReceipt = ({
  id,
  targetRef,
  ticketDetails,
  paymentDetails,
  isDownloading,
  // paymentSummary = {}, // Add this new prop
}) => {
  const TicketData = ticketDetails?.Ticketdetail;

  const paymentSummary =
    paymentDetails?.TravelfusionBookingDetails?.Receiptdetails;
  // console.log(paymentDetails.);

  // Get current date for both transaction and service delivery (same date)
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Helper function to clean currency values
  const cleanCurrencyValue = (value) => {
    if (!value) return "0";
    return typeof value === "string"
      ? value.replace(/[^\d.]/g, "")
      : value.toString();
  };

  // Helper function to format currency display
  const formatCurrency = (value, currency = "CVE") => {
    const cleanValue = cleanCurrencyValue(value);
    return `${cleanValue} ${currency}`;
  };

  return (
    <div
      className={`font-jakarta ${
        isDownloading ? "min-w-[375px]" : "w-[800px]"
      } mx-auto bg-white`}
      ref={targetRef}
      style={{ colorScheme: "light" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 my-6">
        <img src={WeeflyLogo} alt="Weefly Logo" height={80} width={80} />
        <div className="text-right">
          <h1 className="text-3xl font-bold">E-RECEIPT</h1>
          <p className="text-lg font-semibold mt-2">Payment Confirmation</p>
          <p className="text-sm mt-1">weefly.africa</p>
        </div>
      </div>

      {/* Merchant & Customer Info */}
      <div
        className="border-2 rounded-lg mb-6"
        style={{ borderColor: "#d4d4d4" }}
      >
        <div className="p-6 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Merchant Information</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Merchant Name:</span> FLY CABO
                VERDE LDA
              </p>
              <p>
                <span className="font-medium">Website:</span> weefly.africa
              </p>
              <p>
                <span className="font-medium">Customer Service:</span>{" "}
                support@weefly.africa
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Transaction Details</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Transaction ID:</span>{" "}
                {paymentDetails?.Paymentresponse?.merchantRespMerchantSession ||
                  id}
              </p>
              <p>
                <span className="font-medium">Transaction Date:</span>{" "}
                {getCurrentDate()}
              </p>
              <p>
                <span className="font-medium">Service Delivery Date:</span>{" "}
                {getCurrentDate()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary - Using props data */}
      <div
        className="border-2 rounded-lg mb-6"
        style={{ borderColor: "#d4d4d4" }}
      >
        <div className="p-6">
          <h3 className="text-lg font-bold mb-6">Payment Summary</h3>

          <div className="space-y-3">
            {/* Flight Services */}
            {paymentSummary?.OutwardTicketcharge && (
              <div className="flex justify-between text-sm">
                <span>Outward Ticket</span>
                <span className="font-medium">
                  {paymentSummary?.OutwardTicketcharge}
                </span>
              </div>
            )}

            {/* {paymentSummary?.Returnticketcharge &&
              paymentSummary.tripType === "Round Trip" && (
                <div className="flex justify-between text-sm">
                  <span>Return Ticket</span>
                  <span className="font-medium">
                    {formatCurrency(
                      paymentSummary.returnTicketPrice,
                      paymentSummary.currency
                    )}
                  </span>
                </div>
              )} */}
            {paymentSummary?.Returnticketcharge && TicketData?.returnFlight && (
              <div className="flex justify-between text-sm">
                <span>Return Ticket</span>
                <span className="font-medium">
                  {paymentSummary?.Returnticketcharge}
                </span>
              </div>
            )}

            {paymentSummary?.SeatCharge &&
              parseFloat(cleanCurrencyValue(paymentSummary?.SeatCharge)) >
                0 && (
                <div className="flex justify-between text-sm">
                  <span>Seat Charge</span>
                  <span className="font-medium">
                    {paymentSummary?.SeatCharge}
                  </span>
                </div>
              )}

            {/* {paymentSummary.luggageCharge &&
              parseFloat(cleanCurrencyValue(paymentSummary.luggageCharge)) >
                0 && (
                <div className="flex justify-between text-sm">
                  <span>Luggage Charge</span>
                  <span className="font-medium">
                    {formatCurrency(
                      paymentSummary.luggageCharge,
                      paymentSummary.currency
                    )}
                  </span>
                </div>
              )} */}

            {/* Taxes and Fees */}
            {paymentSummary?.Totaltax && (
              <div className="flex justify-between text-sm">
                <span>Total Tax</span>
                <span className="font-medium">{paymentSummary.Totaltax}</span>
              </div>
            )}

            {/* Divider line */}
            <div className="border-t pt-3" style={{ borderColor: "#d4d4d4" }}>
              {/* Total Amount */}
              <div
                className="border-2 p-4 rounded flex justify-between items-center"
                style={{
                  borderColor: "#000000",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                }}
              >
                <span className="text-lg font-bold">Total Amount Paid</span>
                <span className="text-xl font-bold">
                  {paymentSummary?.Totalprice}
                </span>
              </div>
              <p className="text-sm mt-2 text-center">
                Payment Status: <span className="font-bold">Confirmed ✓</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <div className="border-t-2 pt-6" style={{ borderColor: "#d4d4d4" }}>
          <p className="text-lg font-bold mb-2">
            Thank You for Choosing Weefly!
          </p>
          <p className="text-sm mb-4">
            We appreciate your business and hope you have a wonderful travel
            experience.
          </p>
          <div className="flex justify-center items-center space-x-4 text-xs">
            <span>Generated on: {getCurrentDate()}</span>
            <span>•</span>
            <span>
              Receipt ID : {paymentDetails?.transactionid || `WF-RCP-${id}`}
            </span>
            <span>•</span>
            <span>weefly.africa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
