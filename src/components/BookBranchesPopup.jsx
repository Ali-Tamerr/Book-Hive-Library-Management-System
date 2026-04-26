import React from "react";
import Popup from "./Popup.jsx";
import RequestsTable from "./RequestsTable.jsx";
import { BookOpen } from "lucide-react";

const BookBranchesPopup = ({ show, onClose, bookName, branches = [] }) => {
  const columns = [
    {
      header: "Branch ID",
      accessor: "branch_id",
    },
    {
      header: "Branch Name",
      accessor: "name",
    },
    {
      header: "Location",
      accessor: "location",
      render: (branch) => branch.location || "N/A",
    },
    {
      header: "Copies Available",
      accessor: "count",
    },
  ];

  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Book Branches"
      icon={<BookOpen size={20} className="text-[#000035] dark:text-[#D7D7D7]" />}
      maxWidthClass="max-w-[50rem]"
      panelClassName="!p-0 h-full max-h-[43.75rem] flex flex-col"
      contentClassName="p-0 overflow-hidden flex-1 flex flex-col"
      hideHeader={false}
      hideDivider={false}
    >
      <div className="flex-1 overflow-x-auto relative">
        <div className="min-w-[40rem]">
          {branches.length > 0 ? (
            <RequestsTable
              columns={columns}
              data={branches}
              keyExtractor={(item) => item.branch_id}
            />
          ) : (
            <div className="flex h-32 items-center justify-center p-8">
              <p className="text-lg text-[#000035]/60 dark:text-[#D7D7D7]/60">
                No branches found for "{bookName}".
              </p>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default BookBranchesPopup;
