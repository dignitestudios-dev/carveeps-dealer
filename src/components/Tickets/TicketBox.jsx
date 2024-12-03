import React from "react";

const TicketBox = ({ ticket }) => {
  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "N/A";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div key={ticket?._id} className="min-h-52 h-52">
      <div className="w-full h-full max-h-52 rounded-xl border shadow-sm flex flex-col gap-4 justify-start items-start p-4">
        <div className="w-full flex justify-between items-center">
          <div className="w-auto h-auto flex justify-start items-center gap-2">
            <span className="w-auto h-auto relative">
              <img
                src={ticket?.dealership?.logo}
                className="w-12 h-12 rounded-full shadow-sm"
              />
            </span>
            <div className="w-auto flex flex-col justify-start items-start">
              <h3 className="text-sm font-semibold">
                {ticket?.dealership?.name}
              </h3>

              <h3 className="text-[10px] text-[#ff204e] font-semibold">
                {formatDateFromISOString(ticket?.createdAt)}
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start ">
          <h3 className="text-lg font-bold text-gray-800">{ticket?.title}</h3>
          <p className="text-[11px] w-[90%] font-medium text-gray-600">
            {ticket?.description}
          </p>
        </div>

        {/* <div className="w-full h-auto flex justify-end items-center">
                  <button className="w-auto px-3 h-8 rounded-full flex justify-start items-center gap-2 text-sm font-medium bg-[#ff204e] text-white">
                    <FaReply />
                    Reply
                  </button>
                </div> */}
      </div>
    </div>
  );
};

export default TicketBox;
