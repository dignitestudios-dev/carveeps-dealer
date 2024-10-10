import React, { useRef, useState } from "react";
import { styles } from "../../styles/styles";
import { LuCalendar } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router";
import { TimePicker, Application } from "react-rainbow-components";

const TimeModal = ({ showModal, setShowModal, business, setBusiness }) => {
  const [showFields, setShowFields] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [flexibleDays, setFlexibleDays] = useState([]);
  const [workStart, setWorkStart] = useState(null);
  const [workEnd, setWorkEnd] = useState(null);
  const [flexibleWorkStart, setFlexibleWorkStart] = useState(null);
  const [flexibleWorkEnd, setFlexibleWorkEnd] = useState(null);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayClick = (day) => {
    if (selectedDays.length === 0) {
      setSelectedDays([day]);
    } else if (selectedDays[0] == day) {
      setSelectedDays([]);
    } else {
      const startDayIndex = daysOfWeek.indexOf(selectedDays[0]);
      const endDayIndex = daysOfWeek.indexOf(day);
      const newSelectedDays = daysOfWeek.slice(startDayIndex, endDayIndex + 1);
      setSelectedDays(newSelectedDays);
    }
  };

  const handleFlexibleClick = (day) => {
    if (!flexibleDays.includes(day)) {
      setFlexibleDays([...flexibleDays, day]);
    } else {
      setFlexibleDays(flexibleDays.filter((d) => d !== day));
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSave = () => {
    const businessHours = {
      normal: {
        days: selectedDays,
        time: {
          start: workStart,
          end: workEnd,
        },
      },
      flexible: isChecked
        ? {
            days: flexibleDays,
            time: {
              start: flexibleWorkStart,
              end: flexibleWorkEnd,
            },
          }
        : null,
    };
    console.log(businessHours);

    setBusiness((prevBusiness) => ({
      ...prevBusiness,
      businessHours,
    }));

    setShowModal(false);
  };

  const modalRef = useRef();
  const toggleModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
      setIsChecked(false);
    }
  };

  const containerStyles = {
    width: "100%",
  };

  const theme = {
    rainbow: {
      palette: {
        brand: "#FF204E",
      },
      width: "100%",
      height: "100%",
    },
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-auto lg:h-screen flex items-center justify-center bg-[#0F0F0F80] z-20">
          <div
            ref={modalRef}
            className="w-[95%] lg:w-[666px] h-auto bg-white p-6 flex flex-col items-start gap-6 rounded-xl"
          >
            <h1 className="text-lg font-semibold">Working Days</h1>
            <div className="w-full flex flex-col items-start gap-2">
              <label
                htmlFor="work-days"
                className="font-medium text-xs text-[#5C5C5C]"
              >
                Select Working Days
              </label>
              <div className="w-auto flex justify-start items-center gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs text-black ${
                      selectedDays.includes(day)
                        ? `${styles.bgOrange} text-white`
                        : `${styles.bodyBg} text-black`
                    } hover:bg-[#FF204E] hover:text-white uppercase`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full col-span-2 md:col-span-1 flex flex-col items-start gap-2">
                <label
                  htmlFor="work-starts"
                  className="text-[13px] font-medium"
                >
                  Work Starts
                </label>
                <div className={`w-full flex items-center`}>
                  <Application theme={theme} className="w-full">
                    <TimePicker
                      id="time-picker-1"
                      style={containerStyles}
                      className="w-full"
                      value={workStart}
                      onChange={setWorkStart}
                    />
                  </Application>
                </div>
              </div>
              <div className="w-full col-span-2 md:col-span-1 flex flex-col items-start justify-start gap-2">
                <label htmlFor="work-ends" className="text-[13px] font-medium">
                  Work Ends
                </label>
                <div className={`w-full flex items-center`}>
                  <Application theme={theme} className="w-full">
                    <TimePicker
                      id="time-picker-2"
                      style={containerStyles}
                      className="w-full"
                      value={workEnd}
                      onChange={setWorkEnd}
                    />
                  </Application>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <input
                type="checkbox"
                name="flexible-work-hours"
                checked={isChecked}
                onChange={handleCheckboxChange}
                id="flexible-work-hours"
                className="w-4 h-4 rounded accent-[#FF204E]"
              />
              <label
                htmlFor="flexible-work-hours"
                className="text-base font-normal"
              >
                Flexible working hours
              </label>
            </div>
            {isChecked && (
              <div className="w-full flex flex-col items-start gap-y-6">
                <div className="w-full flex flex-col items-start gap-2">
                  <label
                    htmlFor="flexible-days"
                    className="font-medium text-xs text-[#5C5C5C]"
                  >
                    Select Flexible Working Days
                  </label>
                  <div className="w-auto flex justify-start items-center gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs  ${
                          flexibleDays.includes(day)
                            ? `${styles.bgOrange} text-white`
                            : `${styles.bodyBg} text-black`
                        } hover:bg-[#FF204E] hover:text-white uppercase`}
                        onClick={() => handleFlexibleClick(day)}
                      >
                        {day[0]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full col-span-2 md:col-span-1 flex flex-col items-start gap-2">
                    <label
                      htmlFor="flexible-work-starts"
                      className="text-[13px] font-medium"
                    >
                      Flexible Work Starts
                    </label>
                    <div className={`w-full flex items-center`}>
                      <Application theme={theme} className="w-full">
                        <TimePicker
                          id="time-picker-3"
                          style={containerStyles}
                          className="w-full"
                          value={flexibleWorkStart}
                          onChange={setFlexibleWorkStart}
                        />
                      </Application>
                    </div>
                  </div>
                  <div className="w-full col-span-2 md:col-span-1 flex flex-col items-start justify-start gap-2">
                    <label
                      htmlFor="flexible-work-ends"
                      className="text-[13px] font-medium"
                    >
                      Flexible Work Ends
                    </label>
                    <div className={`w-full flex items-center`}>
                      <Application theme={theme} className="w-full">
                        <TimePicker
                          id="time-picker-4"
                          style={containerStyles}
                          className="w-full"
                          value={flexibleWorkEnd}
                          onChange={setFlexibleWorkEnd}
                        />
                      </Application>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-[8px] bg-transparent border border-[#999999] text-[#999999] hover:bg-[#FF204E] hover:border-[#FF204E] hover:text-white transition-all duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                type="submit"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-[8px] bg-[#FF204E] text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimeModal;
