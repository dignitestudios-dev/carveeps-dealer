import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles/styles";
import CreateTicketModal from "../components/Tickets/CreateTicketModal";
import TicketBox from "../components/Tickets/TicketBox";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";
import { NoData } from "../assets/export";

const Tickets = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const [tickets, setTickets] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { baseUrl, navigate } = useContext(GlobalContext);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const getTickets = () => {
    const token = Cookies.get("token");

    if (token) {
      setTicketsLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/dealership/tickets`, { headers }).then(
        (response) => {
          setTickets(response?.data?.data);
          setTicketsLoading(false);
        },
        (error) => {
          setTicketsLoading(false);
          if (error?.response?.status == 401) {
            setIsLoggedIn(false);
            Cookies.remove("token");
            navigate("/login");
          }
        }
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getTickets();
  }, [update]);

  const arr = [1, 2, 3, 4, 5];

  return (
    <div className="w-[calc(100%+3rem)] h-auto lg:h-[calc(100vh)] p-6 bg-white -m-6">
      <CreateTicketModal
        showModal={showModal}
        onclick={handleShowModal}
        setUpdate={setUpdate}
      />
      <div className="w-full bg-white flex items-center justify-between">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <button
          onClick={handleShowModal}
          className={`${styles.bgOrange} text-white font-medium text-sm px-4 py-2 rounded-md`}
        >
          Create a Ticket
        </button>
      </div>

      <div className="w-full bg-white rounded-2xl  mt-6">
        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ticketsLoading &&
            arr?.map((item) => {
              return (
                <div key={item} className="min-h-52 h-52">
                  <div className="w-full h-full max-h-52 rounded-xl border shadow-sm flex flex-col gap-4 justify-start items-start p-4 animate-pulse">
                    <div className="w-full flex justify-between items-center">
                      <div className="w-auto h-auto flex justify-start items-center gap-2">
                        <span className="w-12 h-12 rounded-full bg-gray-300"></span>
                        <div className="w-auto flex flex-col justify-start items-start">
                          <div className="w-24 h-4 bg-gray-300 rounded"></div>
                          <div className="w-16 h-3 bg-gray-300 rounded mt-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-auto flex flex-col justify-start items-start">
                      <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                      <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="w-5/6 h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          {tickets?.length > 0 &&
            tickets?.map((ticket, key) => {
              return <TicketBox key={key} ticket={ticket} />;
            })}
        </div>
        {!ticketsLoading && tickets?.length < 1 && (
          <div className="w-full flex items-center justify-center">
            <img src={NoData} alt="" className="w-96 my-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
