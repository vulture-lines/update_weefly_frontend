import { useNavigate } from "react-router";

import tanzaniaImg from "../../../assets/images/agentPackages/Tanzania.png";
import southAfricaImg from "../../../assets/images/agentPackages/southAfrica.png";
import seychellesImg from "../../../assets/images/agentPackages/seychelles.png";
import moroccoImg from "../../../assets/images/agentPackages/morocco.png";
import tanzania2Img from "../../../assets/images/agentPackages/tanzania2.png";
import { Check, Plus } from "lucide-react";

const PackageSection = () => {
  return (
    <div className="p-[80px]">
      <Destinations />
      <Packages />
    </div>
  );
};

export default PackageSection;

const Destinations = () => {
  const navigate = useNavigate();
  const DestinationPackages = [
    {
      title: "Tanzania",
      packages: "05",
      image: tanzaniaImg,
    },
    {
      title: "South Africa",
      packages: "12",
      image: southAfricaImg,
    },
    {
      title: "Seychelles",
      packages: "12",
      image: seychellesImg,
    },
    {
      title: "Morocco",
      packages: "12",
      image: moroccoImg,
    },
  ];

  return (
    <div className="">
      <h1 className="text-[17px] font-semibold mb-[22px]">Your Destinations</h1>
      <div className="flex gap-[14px]">
        {DestinationPackages.map((pkg, index) => (
          <div
            key={index}
            className="h-[260px] w-[210px] rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-cover bg-center flex flex-col justify-end items-start"
            style={{ backgroundImage: `url(${pkg.image})` }}
          >
            {/* <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-48 object-cover"
            /> */}
            <div className="p-4 text-white bg-gradient-to-b from-0% to-100% from-white/0 to-black w-full">
              <h4 className="text-xl font-semibold">{pkg.title}</h4>
              <p className="text-white/80">{pkg.packages} Packages</p>
            </div>
          </div>
        ))}
        <div
          className="h-[260px] w-[210px] rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:shadow-[#EE5128] bg-[#EE5128] hover:bg-[#EE5129] flex flex-col justify-center items-center"
          onClick={() => navigate("AddPackage")}
        >
          <div className="h-[40px] w-[40px] bg-white grid place-items-center rounded-full mb-4">
            <Plus className="h-[20px] w-[20px] text-[#EE5128]" />
          </div>
          <p className="text-white text-center">
            Add your <br /> Destinations
          </p>
        </div>
      </div>
    </div>
  );
};

const Packages = () => {
  const navigate = useNavigate();
  const pkgs = [
    {
      image: tanzania2Img,
      title: "Enjoy Honeymoon in Tanzania",
      dec: "2D in Tanzania | 1D in Inner city",
      features: [
        "Airport Pick & Drop",
        "4 Activites",
        "Selected Meals",
        "3 Star Hotels",
        "Free Cab Fare",
      ],
      price: {
        org: "2,456",
        offer: "2,000",
      },
    },
    {
      image: tanzania2Img,
      title: "Enjoy Honeymoon in Tanzania",
      dec: "2D in Tanzania | 1D in Inner city",
      features: [
        "Airport Pick & Drop",
        "4 Activites",
        "Selected Meals",
        "3 Star Hotels",
        "Free Cab Fare",
      ],
      price: {
        org: "2,456",
        offer: "2,000",
      },
    },
  ];
  return (
    <div className="mt-[34px]">
      <h1 className="text-[17px] font-semibold mb-[22px]">Tanzania packages</h1>

      <div className="flex gap-[20px] items-start">
        {pkgs.map((pkg, index) => (
          <div
            className="p-[11px] max-w-[350px] border-2 border-black/20 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            key={index}
          >
            <div className="relative">
              <img
                src={pkg.image}
                alt={pkg.image + "image"}
                height={150}
                width={325}
                className="relative rounded-xl"
              />
              <p className="absolute -bottom-3.5 left-3 px-[21px] py-[5px] bg-[#EE5128] text-white rounded-full text-sm">
                3D/2N
              </p>
            </div>
            <div className="mt-[23px] p-2">
              <h4 className="text-base font-semibold">{pkg.title}</h4>
              <p className="text-sm text-black/50 font-semibold mt-[6px]">
                {pkg.dec}
              </p>
              <div className="mt-[20px] grid grid-cols-2 gap-2 border-b-2 border-dashed pb-4 border-black/20">
                {pkg.features.map((ftr, idx) => (
                  <div
                    className="flex items-center gap-2 font-semibold text-sm"
                    key={idx}
                  >
                    <div className="h-[13px] w-[13px] bg-[#EE5128] flex justify-center items-center rounded-full">
                      <Check className="text-white [12px] w-[12px]" />
                    </div>
                    {ftr}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <div className="">
                <p className="text-sm font-semibold text-black/50">
                  Starting from
                </p>
                <p className="font-semibold flex gap-1 items-center">
                  <span className="line-through text-black/50 text-sm ">
                    ${pkg.price.org}
                  </span>
                  <span className="font-black text-xl">${pkg.price.offer}</span>
                </p>
              </div>
              <button className="bg-[#EE5128] text-white p-2 rounded-full text-sm">
                Customize package
              </button>
            </div>
          </div>
        ))}
        <div
          className="w-[150px] grid place-items-center border-2 border-[#EE5128] rounded-2xl p-[20px] bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:shadow-[#EE5128] hover:bg-[#EE5129] group"
          onClick={() => navigate("AddPackage")}
        >
          <div className="h-[40px] w-[40px] bg-[#EE5128] grid place-items-center rounded-full mb-4 group-hover:bg-white">
            <Plus className="h-[20px] w-[20px] text-white group-hover:text-[#EE5128]" />
          </div>
          <p className="text-black text-center group-hover:text-white">
            Add your <br /> Packages
          </p>
        </div>
      </div>
    </div>
  );
};
