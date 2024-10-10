import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import SalesTeamList from "./SalesTeamList";
import { LuPlus } from "react-icons/lu";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import Loader from "../Global/Loader";

const Page1 = () => {
  const [team, setTeam] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { baseUrl, navigate } = useContext(GlobalContext);
  const [teamLoading, setTeamLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const getTeam = () => {
    const token = Cookies.get("token");

    if (token) {
      setTeamLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/dealership/salesPerson`, { headers }).then(
        (response) => {
          setTeam(response?.data?.data);
          setTeamLoading(false);
        },
        (error) => {
          setTeamLoading(false);
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
    getTeam();
  }, [update]);

  const filteredData = team?.filter(
    (person) =>
      person?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
      person?.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
      person?.phoneNumber?.toLowerCase().includes(searchInput.toLowerCase()) ||
      person?.empNo?.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="h-screen md:h-auto">
      <div className="bg-white p-6 rounded-[18px]">
        <h1 className="text-xl font-bold">Sales Team</h1>
        <div className="w-full flex flex-col lg:flex-row items-start gap-4 justify-between">
          <div className="w-[295px] h-[32px] bg-[#EDEDED] rounded-lg px-3 flex items-center justify-start gap-2 mt-3">
            <FiSearch />
            <input
              type="text"
              placeholder="Search here"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-full w-full bg-transparent text-xs outline-none text-[#5C5C5C]"
            />
          </div>
          <div>
            <button
              onClick={() => navigate("/sales-team/add-member")}
              className="px-4 text-white font-semibold rounded-[10px] bg-[#FF204E] text-[13px] py-3 flex items-center gap-1"
            >
              <LuPlus /> Add Salesperson
            </button>
          </div>
        </div>
        <div className="w-full">
          {
            <SalesTeamList
              data={filteredData}
              loading={teamLoading}
              update={setUpdate}
            />
          }
        </div>
        {filteredData?.length < 1 && (
          <div className="w-full flex flex-col items-center justify-center text-center mt-6  gap-6">
            <p className="text-lg text-[#5C5C5C] font-medium">
              It seems like you haven't added your sales team yet. Please add
              your sales team so you can <br /> easily manage and boost your
              sales efforts.
            </p>
            <button
              onClick={() => navigate("/sales-team/add-member")}
              className="w-[195px] text-white font-semibold rounded-[10px] bg-[#FF204E] text-[13px] py-3"
            >
              Add Salesperson
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page1;
