import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";
import { styles } from "../styles/styles";
import BtnLoader from "../components/Global/BtnLoader";
import { IoSearchOutline } from "react-icons/io5";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(0);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const threshold = 10;
  const { baseUrl, navigate, setError } = useContext(GlobalContext);

  const fetchLogs = () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(
        `${baseUrl}/dealership/audit-logs?from=${from}&threshold=${threshold}&search=${search}&role=${selectedRole}`,
        { headers }
      )
      .then((response) => {
        setLogs(response?.data?.data || response?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch audit logs", err);
        setError(err?.response?.data?.message || "Failed to load audit logs.");
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/roles`, { headers })
        .then((response) => {
          setRoles(response?.data?.data || response?.data || []);
        })
        .catch((err) => {
          console.error("Failed to fetch roles", err);
        });
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchLogs();
  }, [from, search, selectedRole]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFrom(0);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setFrom(0);
  };

  const handleNext = () => {
    if (logs.length === threshold) {
      setFrom((prev) => prev + threshold);
    }
  };

  const handlePrev = () => {
    setFrom((prev) => Math.max(0, prev - threshold));
  };

  const formatIP = (ip) => {
    if (!ip) return "N/A";
    if (ip.startsWith("::ffff:")) {
      return ip.substring(7);
    }
    return ip;
  };

  const getActionBadgeColor = (actionType) => {
    const act = actionType?.toLowerCase() || "";
    if (act.includes("create") || act.includes("add") || act.includes("post")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (act.includes("update") || act.includes("edit") || act.includes("put") || act.includes("patch")) {
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
    if (act.includes("delete") || act.includes("remove")) {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }
    if (act.includes("login")) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getMethodBadgeColor = (method) => {
    const m = method?.toUpperCase() || "";
    if (m === "POST") return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (m === "PUT" || m === "PATCH") return "bg-indigo-100 text-indigo-800 border-indigo-200";
    if (m === "DELETE") return "bg-rose-100 text-rose-800 border-rose-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getActionDescription = (log) => {
    const action = log?.actionType?.toLowerCase() || "";
    const details = log?.details || {};
    const title = details?.title;

    if (title) {
      return title;
    }

    if (action === "login") {
      return "Logged in to the dealership panel";
    }

    let resourceName = "Resource";
    const endpoint = details?.endpoint || "";
    const method = details?.method || "";
    if (endpoint) {
      const cleanPath = endpoint.split("?")[0];
      const parts = cleanPath.split("/").filter(part => part && part !== "dealership");
      if (parts.length > 0) {
        const lastPart = parts[parts.length - 1];
        resourceName = lastPart
          .replace(/[-_]/g, " ")
          .replace(/([A-Z])/g, " $1")
          .trim()
          .split(/\s+/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
      }
    }

    if (action === "create" || method === "POST") {
      return `Created new ${resourceName}`;
    }
    if (action === "update" || method === "PUT" || method === "PATCH") {
      return `Updated ${resourceName}`;
    }
    if (action === "delete" || method === "DELETE") {
      return `Deleted ${resourceName}`;
    }

    return `${action.charAt(0).toUpperCase() + action.slice(1)} ${resourceName}`;
  };

  const formatRole = (role) => {
    if (!role) return "N/A";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getActorName = (log) => {
    if (log?.staffName) return log.staffName;
    if (log?.performedBy?.role === "dealership") return "Dealer";
    return "Staff Member";
  };

  const getActorEmail = (log) => {
    return log?.staffEmail || log?.performedBy?.email || "System";
  };

  const getActorRole = (log) => {
    return log?.staffRole || log?.performedBy?.role || "N/A";
  };

  return (
    <div className="w-[calc(100%+3rem)] min-h-[calc(100vh)] p-6 bg-white -m-6 flex flex-col justify-start">
      <div className="flex items-center justify-between pb-6 border-b border-gray-100 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time audit log of actions performed by staff and administrators.
          </p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className={`px-4 py-2 border rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-start gap-4 mt-6">
        <div className="w-full md:w-96 relative">
          <input
            type="text"
            placeholder="Search activity logs..."
            value={search}
            onChange={handleSearchChange}
            className="w-full h-[42px] rounded-full px-5 pr-12 outline-none border border-gray-200 text-sm text-gray-700 bg-gray-50/30 focus:bg-white focus:border-[#ff204e] transition-all"
          />
          <span className="w-8 h-8 absolute top-1.5 right-2 rounded-full text-md text-[#ff204e] flex items-center justify-center pointer-events-none">
            <IoSearchOutline className="w-5 h-5" />
          </span>
        </div>

        <div className="w-full md:w-48 relative">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full h-[42px] rounded-full px-5 pr-10 outline-none border border-gray-200 text-sm text-gray-700 bg-gray-50/30 focus:bg-white focus:border-[#ff204e] transition-all appearance-none cursor-pointer"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role._id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 bg-white">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Activity Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Performed By
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-3 bg-gray-100 rounded w-16 mt-1.5"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                </tr>
              ))
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log._id || Math.random().toString()} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-800">
                        {getActionDescription(log)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getActionBadgeColor(
                            log.actionType
                          )}`}
                        >
                          {log.actionType || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-gray-800">
                        {getActorName(log)}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {getActorEmail(log)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-600 border border-gray-200 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {formatRole(getActorRole(log))}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {log.createdAt ? new Date(log.createdAt).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-sm text-gray-400 font-medium">
                  No activity logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between pt-6 mt-auto">
        <span className="text-xs text-gray-500 font-medium">
          Showing logs {from + 1} to {from + logs.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={from === 0 || loading}
            className={`px-4 py-2 border rounded-xl text-xs font-semibold transition-all ${
              from === 0 || loading
                ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100"
                : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={logs.length < threshold || loading}
            className={`px-4 py-2 border rounded-xl text-xs font-semibold transition-all ${
              logs.length < threshold || loading
                ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100"
                : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
