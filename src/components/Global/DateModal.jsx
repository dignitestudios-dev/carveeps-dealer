import React, { useRef, useState } from "react";
import { Application, Card, Calendar } from "react-rainbow-components";
import moment from "moment";
import { IoClose } from "react-icons/io5";

const theme = {
  rainbow: {
    palette: {
      brand: "#ff204e",
    },
    shadows: {
      brand: "none",
    },
  },
};

const DateModal = ({ isOpen, setIsOpen, setFilter }) => {
  const today = moment();
  const [date, setDate] = useState(today.toDate()); // Initialize date with today's date
  const dateRef = useRef();

  const toggleModal = (e) => {
    if (dateRef.current && !dateRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onClick={toggleModal}
      className={`fixed z-[10000] top-0 p-2 left-0 transition-all duration-300 w-screen h-screen flex justify-center items-center bg-transparent ${
        isOpen ? "scale-1" : "scale-0"
      }`}
    >
      <div
        ref={dateRef}
        className="w-full lg:w-[748px] h-auto md:h-[547px] divide-x-2 divide-[#eaeaea] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex  justify-start items-start bg-white rounded-2xl relative"
      >
        <div className="w-[40%] md:flex hidden h-full  p-10  flex-col justify-center gap-y-20 items-center">
          <h1 className="text-[#7c7c7c] text-xl font-medium">
            {new Date(date).toLocaleString("en-US", { weekday: "long" })}
          </h1>
          <h1 className="text-[#ff204e] text-9xl font-bold">
            {new Date(date).getDate()}
          </h1>
          <h1 className="text-[#7c7c7c] text-xl font-medium">
            {new Date(date).toLocaleString("en-US", { month: "long" })}
          </h1>
        </div>
        <div className="w-full md:w-[60%] px-2 pt-10 pb-4 h-full flex flex-col gap-4 justify-start items-start">
          <button
            className="w-7 h-7 rounded-full bg-gray-100 absolute top-5 right-5 p-1"
            onClick={() => setIsOpen(false)}
          >
            <IoClose className="w-full h-full" />
          </button>
          <div className="w-full flex flex-col justify-start items-start  px-8">
            <h1 className="text-xl font-bold">Select Date</h1>
            <p className="text-base font-normal">
              Choose the perfect date for the task deadline
            </p>
          </div>
          <div
            id="calendar_div"
            className="flex flex-col gap-1 w-full h-[22rem]"
          >
            <Application
              theme={theme}
              className="w-full h-[22rem] flex gap-4 flex-col items-center justify-start"
            >
              <Card
                className="rainbow-p-around_large w-full h-full"
                style={{ boxShadow: "none", borderRadius: 0, border: "none" }}
              >
                <Calendar
                  className="h-full"
                  id="calendar-1"
                  value={date}
                  maxDate={today.toDate()}
                  onChange={(value) => {
                    setDate(value);
                  }}
                />
              </Card>
            </Application>
          </div>

          <button
            className="w-full h-[54px] rounded-lg flex justify-center items-center text-base font-bold bg-[#ff204e] text-white"
            onClick={() => {
              setFilter({ date: date, filter: "none" });
              setIsOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateModal;
