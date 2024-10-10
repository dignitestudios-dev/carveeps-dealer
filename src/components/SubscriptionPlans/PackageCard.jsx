import React, { useContext, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { BsQrCode } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BtnLoader from "../Global/BtnLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
import { FaClipboard } from "react-icons/fa";
import CopyPlanModal from "./CopyPlanModal";

const PackageCard = ({ plan, setUpdate }) => {
  const qrRef = useRef();
  const [showQRCode, setShowQRCode] = useState(false);

  const downloadQRCode = async () => {
    setShowQRCode(true); // Ensure QR code is visible

    setTimeout(async () => {
      try {
        const qrElement = qrRef.current;
        const canvas = await html2canvas(qrElement);
        const imgData = canvas.toDataURL("image/png");

        // Create a new canvas for the JPEG output
        const qrCanvas = document.createElement("canvas");
        const ctx = qrCanvas.getContext("2d");

        // Set the size of the square canvas (e.g., 500x500)
        const squareSize = 500;
        qrCanvas.width = squareSize;
        qrCanvas.height = squareSize;

        // Draw a white background on the square canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, squareSize, squareSize);

        // Create an image element to draw the QR code
        const qrImage = new Image();
        qrImage.src = imgData;

        qrImage.onload = () => {
          // Calculate the position to center the QR code
          const qrSize = Math.min(squareSize, qrImage.width, qrImage.height);
          const offsetX = (squareSize - qrSize) / 2;
          const offsetY = (squareSize - qrSize) / 2;

          // Draw the QR code on the canvas
          ctx.drawImage(qrImage, offsetX, offsetY, qrSize, qrSize);

          // Convert the canvas to JPEG
          const jpegData = qrCanvas.toDataURL("image/jpeg");

          // Trigger the download
          const link = document.createElement("a");
          link.href = jpegData;
          link.download = `qr-code-${plan?.name}.jpg`;
          link.click();

          // Hide QR code again
          setShowQRCode(false);
        };
      } catch (error) {
        console.error("Error generating QR code image:", error);
        setShowQRCode(false); // Hide QR code in case of error
      }
    }, 100); // Delay to ensure QR code is rendered
  };
  const qrCodeUrl = `https://app.carveeps.com/${plan?._id}`;

  const { setError, baseUrl } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const handleRemove = (id) => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true);
      axios
        .delete(`${baseUrl}/dealership/subscription/${id}`, {
          headers,
          data: null,
        })
        .then((response) => {
          setUpdate((prev) => !prev);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error?.response?.data?.message);
        });
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full md:w-[373px] h-96 rounded-[12px]   p-6 flex flex-col gap-5 bg-white cursor-pointer relative">
        <button
          onClick={() => setOpen(true)}
          className="w-auto px-2 h-7 rounded-md absolute top-3 right-3 bg-[#c2002757] text-[#c20027] text-xs font-medium flex items-center justify-center"
        >
          Copy Plan
        </button>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-[28px] h-[28px] bg-red-200 flex items-center justify-center rounded-md">
                <img
                  src={plan?.dealership?.logo}
                  alt="dealership"
                  className="w-full h-full rounded-md"
                />
              </div>
              <span className="text-[11px] font-medium">
                {plan?.salesPerson?.name}
              </span>
            </div>
            <div className="w-[150px] py-1.5 rounded-full text-center text-white text-sm font-semibold bg-[#C20028]">
              {plan?.name}
            </div>
          </div>
          <h1 className="text-[40px] font-bold relative">
            <sup className="text-xs font-normal absolute top-4 -left-2">$</sup>
            {plan?.price}
            <sub className="text-xs font-normal">/{plan?.interval}</sub>
          </h1>
        </div>
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <div className="w-full h-auto grid grid-cols-3">
            <span className="text-sm text-gray-800 font-medium">Name</span>
            <span className="text-sm w-full flex items-center justify-center text-gray-800 font-medium">
              Frequency
            </span>
            <span className="text-sm w-full flex items-center justify-center text-gray-800 font-medium">
              Duration
            </span>
          </div>
          <div className="w-full max-h-44 overflow-y-auto flex flex-col gap-1 justify-start items-start ">
            {plan?.services?.map((service, key) => {
              return (
                <div className="w-full h-auto grid grid-cols-3" key={key}>
                  <span className="text-xs text-gray-600 font-medium">
                    {service?.name}
                  </span>
                  <span className="w-full flex items-center justify-center text-xs text-gray-600 font-medium">
                    {service?.frequency}
                  </span>
                  <div className="w-full flex justify-center items-center">
                    <span className="w-16 px-2 h-6 flex items-center justify-center text-xs bg-blue-500/20 text-blue-500 rounded-full capitalize font-medium">
                      {service?.interval == "year" ? "Yearly" : "Monthly"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex justify-end items-center px-2 gap-2 h-auto absolute left-0 bottom-2">
          {showQRCode && (
            <div ref={qrRef} className="absolute left-[-9999px]">
              <QRCode value={qrCodeUrl} />
            </div>
          )}
          <button
            className="text-[#000] w-1/2 px-3 justify-center bg-yellow-600 rounded-md h-9 text-[13px] font-medium flex items-center gap-1"
            onClick={downloadQRCode}
          >
            <BsQrCode className="text-base" />
            {showQRCode ? "Downloading" : "Download QR Code"}
          </button>
          {open && (
            <CopyPlanModal
              id={plan?._id}
              showModal={open}
              setShowModal={setOpen}
              setUpdate={setUpdate}
            />
          )}
          <button
            onClick={() => handleRemove(plan?._id)}
            className="text-[#fff] w-1/2 px-3 justify-center bg-red-600 rounded-md h-9 text-[13px] font-medium flex items-center gap-1"
          >
            <MdDelete className="text-base" />
            {loading ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
