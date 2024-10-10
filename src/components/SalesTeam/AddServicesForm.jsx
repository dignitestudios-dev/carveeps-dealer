import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const AddServicesForm = () => {
    const [addMore, setAddMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
  
    const handleAddMore = () => {
      setAddMore(!addMore);
    };
    const handleShowModal = () => {
      setShowModal(!showModal);
    };
  
    return (
      <>
        <div className="bg-white rounded-[18px] p-6 w-full lg:w-[666px] h-[777px] overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-lg font-bold">Service Preferences</h1>
            <button className="bg-[#FF204E14] h-[30px] w-[64px] rounded-full flex items-center justify-center gap-1 font-medium text-xs text-[#FF204E]" onClick={handleShowModal}>
              <GoPlus className="w-4 h-4" /> Add
            </button>
          </div>
  
          <div className="w-full h-full grid grid-cols-4 mt-4">
            <div className="lg:border-r h-full px-4">
              <h1 className="text-[13px] font-medium text-[#5C5C5C]">Services</h1>
            </div>
            <div className="lg:border-r h-full px-4">
              <h1 className="text-[13px] font-medium text-[#5C5C5C]">
                Service Details
              </h1>
            </div>
            <div className="lg:border-r h-full px-4">
            <h1 className="text-[13px] font-medium text-[#5C5C5C]">
              Service Type
            </h1>
          </div>
            <div className="h-full px-4">
              <h1 className="text-[13px] font-medium text-[#5C5C5C]">
                Frequence
              </h1>
              <div className="mt-6 w-full flex flex-col items-start gap-3">
              <div className="w-full flex items-center justify-between relative">
                <input
                  type="text"
                  className="w-[120px] border-0 outline-none text-xs"
                  placeholder="Type here"
                />
                <button onClick={() => setShowButtons(!showButtons)}>
                  <HiOutlineDotsHorizontal />
                </button>
                {showButtons && (
                  <div className="px-2 py-2 rounded-md shadow-md absolute z-10 bg-white flex flex-col items-start gap-1.5 right-0 top-4">
                    <button className="text-[12px] font-medium">Edit</button>
                    <button className="text-[12px] font-medium">Delete</button>
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
        {/* add service modal */}
        {showModal && (
          <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40 bg-[rgba(0,0,0,0.4)]">
            <div className="bg-white rounded-[18px] py-10 px-8 w-[587px] min-h-[502px] flex flex-col gap-5">
              <div className="w-full flex items-start justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-bold">Add Service</h1>
                  <p className="text-xs text-[#606060]">
                    Add any additional services here to include them in your
                    subscription plan <br /> for your customers.
                  </p>
                </div>
                <button
                  className="w-[30px] h-[30px] rounded-full bg-[#F7F7F7] flex items-center justify-center p-1"
                  onClick={handleShowModal}
                >
                  <IoClose className="w-full h-full" />
                </button>
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="service-name" className="text-[13px] font-medium">
                  Service Name
                </label>
                <input
                  type="text"
                  className="w-full h-[52px] px-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label
                  htmlFor="service-details"
                  className="text-[13px] font-medium"
                >
                  Service Details
                </label>
                <textarea
                  name="service-details"
                  id=""
                  className="w-full p-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg h-[125px]"
                ></textarea>
                <div className="w-full text-end">
                  <button
                    className="float-end text-[#FF204E] text-xs font-medium underline"
                    onClick={handleAddMore}
                  >
                    Add more
                  </button>
                </div>
              </div>
              {addMore && (
                <>
                  <div className="w-full flex flex-col gap-1">
                    <label
                      htmlFor="service-name"
                      className="text-[13px] font-medium"
                    >
                      Service Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-[52px] px-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <label
                      htmlFor="service-details"
                      className="text-[13px] font-medium"
                    >
                      Service Details
                    </label>
                    <textarea
                      name="service-details"
                      id=""
                      className="w-full p-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg h-[125px]"
                    ></textarea>
                    <div className="w-full text-end">
                      <button
                        className="float-end text-[#FF204E] text-xs font-medium underline"
                        onClick={handleAddMore}
                      >
                        Add more
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="w-full">
                <button className="w-full bg-[#FF204E] h-[52px] rounded-lg text-white text-base font-bold" onClick={handleShowModal}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default AddServicesForm
