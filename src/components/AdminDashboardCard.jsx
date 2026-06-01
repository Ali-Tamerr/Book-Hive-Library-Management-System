import React, { useState, useRef, useEffect, useMemo } from "react";
import { RefreshCw, User, MapPin } from "lucide-react";
import DashboardCard from "./DashboardCard";

const AdminDashboardCard = ({
  loading,
  displayAdmins,
  handleRefreshAdmins,
  loadingAdmins = {},
  title = "BookWorm Librarians",
  emptyLabel = "No librarians found",
}) => {
  const [hoveredAdmin, setHoveredAdmin] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null);

  const [selectedBranch, setSelectedBranch] = useState("All branches");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const branches = useMemo(() => {
    const branchSet = new Set();
    displayAdmins.forEach((admin) => {
      if (admin.subtitle) {
        const match = admin.subtitle.match(/Branch:\s*(.+)$/i);
        if (match && match[1] && match[1] !== "N/A") {
          branchSet.add(match[1]);
        }
      }
    });
    return ["All branches", ...Array.from(branchSet).sort()];
  }, [displayAdmins]);

  const filteredAdmins = useMemo(() => {
    if (selectedBranch === "All branches") return displayAdmins;
    return displayAdmins.filter((admin) => {
      return (
        admin.subtitle && admin.subtitle.includes(`Branch: ${selectedBranch}`)
      );
    });
  }, [displayAdmins, selectedBranch]);

  const handleMouseEnter = (e, admin) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredAdmin(admin);
      setTooltipPos({ x, y });
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) {
      setHoveredAdmin(null);
    }
  };

  const handleRowClick = (e, admin) => {
    e.stopPropagation();
    if (hoveredAdmin?.id === admin.id) {
      setHoveredAdmin(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setHoveredAdmin(admin);
      setTooltipPos({ x, y });
    }
  };

  useEffect(() => {
    if (!hoveredAdmin) return;
    const handleClose = () => setHoveredAdmin(null);
    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose, true);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose, true);
    };
  }, [hoveredAdmin]);

  const customTitle = (
    <div className="flex items-center justify-center gap-2">
      <span>{title}</span>
      <div className="relative flex items-center justify-center" ref={dropdownRef}>
        <MapPin
          className="h-7 w-7 cursor-pointer text-[#000035] transition-opacity hover:opacity-80 dark:text-[#d3d6de] max-[75rem]:h-6 max-[75rem]:w-6"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-md border border-[#000035] bg-white shadow-lg dark:border-[#D7D7D7] dark:bg-[#121317]">
            <ul className="py-1">
              {branches.map((branch) => (
                <li
                  key={branch}
                  className={`cursor-pointer px-4 py-2 text-sm text-[#000035] hover:bg-gray-100 dark:text-[#d3d6de] dark:hover:bg-gray-800 ${
                    selectedBranch === branch ? "font-bold" : ""
                  }`}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setDropdownOpen(false);
                  }}
                >
                  {branch}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardCard title={customTitle}>
      {loading ? (
        <li className="flex items-center gap-2.5 rounded-md p-2.5 text-xs dark:text-[#d3d6de]">
          Loading...
        </li>
      ) : filteredAdmins.length > 0 ? (
        filteredAdmins.map((admin) => (
          <li
            key={admin.id}
            onMouseEnter={(e) => handleMouseEnter(e, admin)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleRowClick(e, admin)}
            className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-[#000035] bg-transparent p-3 py-2.5 dark:border-[#D7D7D7]"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full fill-[#000035] dark:fill-[#D7D7D7]"
              >
                <path
                  d="M50 12 L82 30 L82 70 L50 88 L18 70 L18 30 Z"
                  strokeWidth="24"
                  strokeLinejoin="round"
                  className="stroke-[#000035] dark:stroke-[#D7D7D7]"
                />
              </svg>
              <User className="relative z-10 h-5 w-5 text-[#F2F2F2] dark:text-[#121317]" />
            </div>

            <div className="h-10 w-0.5 rounded-full bg-[#000035] dark:bg-[#D7D7D7]"></div>

            <div className="flex-1 overflow-hidden">
              <p className="truncate text-lg font-bold leading-tight text-[#000035] dark:text-[#D7D7D7] max-[78.125rem]:text-sm">
                {admin.name}
              </p>
              <p className="truncate text-[0.8125rem] font-medium leading-tight text-[#000035] dark:text-[#D7D7D7] max-[78.125rem]:text-[0.65rem]">
                {admin.subtitle || `Unknown Branch`}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 self-stretch max-[81.25rem]:-ml-2 max-[81.25rem]:w-20">
              <RefreshCw
                onClick={(e) => {
                  e.stopPropagation();
                  handleRefreshAdmins(admin.id);
                }}
                className={`h-8 w-8 cursor-pointer text-[#000035] transition-transform dark:text-[#D7D7D7] max-[78.125rem]:h-6 max-[78.125rem]:w-6 ${
                  loadingAdmins[admin.id] ? "animate-spin" : ""
                }`}
              />
              <div className="flex items-center gap-1.5">
                <div
                  className={`h-2 w-2 rounded-full ${
                    admin.isOnline
                      ? "bg-[#000035] dark:bg-[#D7D7D7]"
                      : "bg-[#3d3e3e] dark:bg-[#3d3e3e]"
                  }`}
                ></div>
                <p
                  className={`text-[0.75rem] font-bold text-[#000035] dark:text-[#D7D7D7] max-[78.125rem]:text-[0.65rem]`}
                >
                  {admin.isOnline ? "Active" : "Not Active"}
                </p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li className="rounded-md bg-[#f5f7fb] p-2.5 text-xs text-[#000035] dark:bg-transparent dark:text-[#c3c7d1]">
          {emptyLabel}
        </li>
      )}

      {/* Tooltip rendered outside the scrollable area to avoid clipping */}
      {hoveredAdmin && (
        <div
          className="animate-in fade-in zoom-in pointer-events-none fixed z-9999 -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-lg border-2 border-[#000035] bg-[#F2F2F2] px-4 py-3 shadow-lg duration-200 dark:border-[#D7D7D7] dark:bg-[#121317]"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          <p className="whitespace-nowrap text-sm font-bold text-[#000035] dark:text-[#D7D7D7]">
            {hoveredAdmin.name}
          </p>
          <p className="whitespace-nowrap text-xs font-semibold text-[#000035] dark:text-[#D7D7D7]">
            {hoveredAdmin.subtitle}
          </p>
          {/* Tooltip Arrow */}
          <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 border-b-2 border-r-2 border-[#000035] bg-[#F2F2F2] dark:border-[#D7D7D7] dark:bg-[#121317]" />
        </div>
      )}
    </DashboardCard>
  );
};

export default AdminDashboardCard;
