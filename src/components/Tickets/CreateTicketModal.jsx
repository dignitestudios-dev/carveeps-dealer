import React, { useState, useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { styles } from "../../styles/styles";
import { GlobalContext } from "../../context/GlobalContext";
import BtnLoader from "../Global/BtnLoader";
import axios from "axios";
import Cookies from "js-cookie";

const CreateTicketModal = ({ showModal, onclick, setUpdate }) => {
  const { baseUrl, setError, navigate } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      if (title == "") {
        setError("Title is required.");
      } else if (detail == "") {
        setError("Description is required.");
      } else {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
          .post(
            `${baseUrl}/dealership/tickets`,
            {
              title: title,
              description: detail,
            },
            { headers }
          )
          .then(
            (response) => {
              setLoading(false);
              setTitle("");
              setDetail("");
              setUpdate((prev) => !prev);
              onclick();
            },
            (error) => {
              setLoading(false);
              if (error?.response?.status == 401) {
                Cookies.remove("token");
                navigate("/login");
              }
              setError(error?.response?.data?.message);
            }
          );
      }
    } else {
      navigate("/login");
    }
  }
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center px-4 bg-[rgba(0,0,0,0.5)] z-40">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[530px] bg-white h-auto rounded-xl p-8 relative flex flex-col items-start gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <h1 className="text-lg font-bold mb-1">Create Ticket</h1>
            <button
              type="button"
              onClick={onclick}
              className="w-[24px] h-[24px] bg-gray-100 p-1 rounded-full"
            >
              <IoCloseOutline className="w-full h-full" />
            </button>
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label htmlFor="title" className="text-sm font-medium">
              Ticket Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F7F7F7] h-[52px] border-0 outline-none text-sm font-medium text-gray-500 rounded-[8px] px-3"
            />
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label htmlFor="description" className="text-sm font-medium">
              Ticket Description
            </label>
            <textarea
              name="description"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              id="description"
              className="w-full resize-none bg-[#F7F7F7] h-[125px] border-0 outline-none text-sm font-medium text-gray-500 rounded-[8px] px-3 py-2"
            ></textarea>
          </div>
          <div className="w-full pt-4">
            <button
              type="submit"
              className={`w-full ${styles.bgOrange} text-white font-bold text-base h-[52px] rounded-[8px]`}
            >
              {loading ? <BtnLoader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default CreateTicketModal;
