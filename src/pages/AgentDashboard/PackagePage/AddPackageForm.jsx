import { Plus, Upload } from 'lucide-react';
import React from 'react';

const AddPackageForm = () => {
  return (
    <div className="p-[109px]">
      <div className="">
        <h1 className="font-jakarta font-semibold text-xl">
          Add a New Travel Package
        </h1>
        <p className="text-base font-medium font-jakarta text-gray-400 mt-2">
          Fill in the details below to build a custom travel package for this
          destination.
        </p>
      </div>
      <div className="">
        <form className="mt-8 ">
          <div className="grid xl:grid-cols-2 gap-[42px]">
            <div className="bg-white rounded-[12px]">
              <div className="bg-[#FFE2DA] flex justify-between items-center py-[11px] px-[30px] rounded-t-[12px]">
                <h2 className="font-jakarta font-semibold text-[17px]">
                  Package Info
                </h2>
                <button className="flex items-center gap-2 bg-[#EE5128] text-white p-2 rounded-md">
                  <Plus /> <span className="text-sm">Add More</span>
                </button>
              </div>
              <div className="py-[11px] px-[30px] grid grid-cols-2 gap-4 items-center">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Package Title"
                    max={100}
                    className="border border-gray-300 rounded-md p-[10px]"
                  />
                  <input
                    type="text"
                    placeholder="Destination Name"
                    max={100}
                    className="border border-gray-300 rounded-md p-[10px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <select className="flex flex-col gap-2 border border-gray-300 rounded-md p-[10px]">
                    <option value="" className="p-[10px]">
                      Duration Breakdown
                    </option>
                  </select>
                  <label className="border border-gray-300 rounded-md p-[10px]">
                    <input type="file" name="" id="" className="hidden" />
                    <div className="flex justify-between items-center">
                      <p>Cover Image Upload</p>
                      <Upload />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[12px]">
              <div className="bg-[#FFE2DA] flex justify-between items-center py-[11px] px-[30px] rounded-t-[12px]">
                <h2 className="font-jakarta font-semibold text-[17px]">
                  Gallery (Optional)
                </h2>
                {/* <button className="flex items-center gap-2 bg-[#EE5128] text-white p-2 rounded-md">
                <Plus /> <span>Add More</span>
              </button> */}
              </div>
              <div className="py-[11px] px-[30px] flex flex-col gap-4 items-start">
                Upload multiple supporting images for the destination Max 5–6
                images
                <label className="">
                  <input type="file" name="" id="" className="hidden" />
                  <div className="flex justify-between items-center gap-4">
                    <Upload className="text-[#EE5128]" />
                    <p>Cover Image Upload</p>
                  </div>
                </label>
              </div>
            </div>
            <div className="bg-white rounded-[12px]">
              <div className="bg-[#FFE2DA] flex justify-between items-center py-[11px] px-[30px] rounded-t-[12px]">
                <h2 className="font-jakarta font-semibold text-[17px]">
                  Inclusions
                </h2>
                <button className="flex items-center gap-2 bg-[#EE5128] text-white p-2 rounded-md">
                  <Plus /> <span className="text-sm">Add More</span>
                </button>
              </div>
              <div className="py-[11px] px-[30px] grid grid-cols-2 gap-4 items-center">
                <div className="flex flex-col gap-2">
                  <label className=" flex items-center justify-between border border-gray-300 rounded-md p-[10px]">
                    <p className="text-sm font-jakarta text-gray-400">
                      Airport Pick & Drop
                    </p>
                    <input
                      type="checkbox"
                      // placeholder="Package Title"
                      max={100}
                      className="size-6 accent-[#EE5128]"
                    />
                  </label>
                  <label className=" flex items-center justify-between border border-gray-300 rounded-md p-[10px]">
                    <p className="text-sm font-jakarta text-gray-400">
                      Free Cab Fare
                    </p>
                    <input
                      type="checkbox"
                      // placeholder="Package Title"
                      max={100}
                      className="size-6 accent-[#EE5128]"
                    />
                  </label>
                  <label className=" flex items-center justify-between border border-gray-300 rounded-md p-[10px]">
                    <p className="text-sm font-jakarta text-gray-400">
                      Free Hotel Stay
                    </p>
                    <input
                      type="checkbox"
                      // placeholder="Package Title"
                      max={100}
                      className="size-6 accent-[#EE5128]"
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className=" flex items-center justify-between border border-gray-300 rounded-md p-[10px]">
                    <p className="text-sm font-jakarta text-gray-400">
                      Entry Tickets
                    </p>
                    <input
                      type="checkbox"
                      // placeholder="Package Title"
                      max={100}
                      className="size-6 accent-[#EE5128]"
                    />
                  </label>
                  <label className=" flex items-center justify-between border border-gray-300 rounded-md p-[10px]">
                    <p className="text-sm font-jakarta text-gray-400">
                      Tour Guide
                    </p>
                    <input
                      type="checkbox"
                      // placeholder="Package Title"
                      max={100}
                      className="size-6 accent-[#EE5128]"
                    />
                  </label>
                  <label className=" flex items-center justify-between border border-gray-300 rounded-md p-[10px]">
                    <p className="text-sm font-jakarta text-gray-400">Meals</p>
                    <input
                      type="checkbox"
                      // placeholder="Package Title"
                      max={100}
                      className="size-6 accent-[#EE5128]"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[12px]">
              <div className="bg-[#FFE2DA] flex justify-between items-center py-[11px] px-[30px] rounded-t-[12px]">
                <h2 className="font-jakarta font-semibold text-[17px]">
                  Pricing Details
                </h2>
                {/* <button className="flex items-center gap-2 bg-[#EE5128] text-white p-2 rounded-md">
                <Plus /> <span>Add More</span>
              </button> */}
              </div>
              <div className="py-[11px] px-[30px] grid grid-cols-2 gap-4 items-start">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Original Price"
                    max={100}
                    className="border border-gray-300 rounded-md p-[10px]"
                  />
                  <input
                    type="text"
                    placeholder="Per Person"
                    max={100}
                    className="border border-gray-300 rounded-md p-[10px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Offer Price"
                    max={100}
                    className="border border-gray-300 rounded-md p-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm accent-[#EE5128] mt-[40px] flex flex-col gap-2">
            <label
              htmlFor=""
              className="flex gap-4 items-center font-jakarta font-medium">
              <input
                type="checkbox"
                name=""
                id=""
                className="size-4 rounded-full"
              />
              Allow Package Customization by Custome
            </label>
            <label
              htmlFor=""
              className="flex gap-4 items-center font-jakarta font-medium">
              <input type="checkbox" name="" id="" className="size-4" />
              Add Terms & Conditions
            </label>
          </div>

          <div className="mt-[40px] flex gap-[15px]">
            <button className="bg-[#EE5128] text-white px-[32px] py-[10px] rounded-full font-jakarta">
              Save Packages
            </button>
            <button className="border-2 border-[#EE5128]  text-[#EE5128] px-[32px] py-[10px] rounded-full font-jakarta">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackageForm;
