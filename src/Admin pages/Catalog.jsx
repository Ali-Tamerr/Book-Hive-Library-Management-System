import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BorrowedBooks from "./BorrowedBooks";
import Overdue from "./Overdue";
import ReservedBooks from "./ReservedBooks";
import TabButton from "../components/TabButton";

function Catalog({ searchValue, setSearchValue }) {
  const location = useLocation();
  const [localActiveTab, setLocalActiveTab] = useState("borrowed");

  const [activeTab, setActiveTab] = useState("catalog");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/admin/catalog")) {
      setActiveTab("catalog");
    }
  }, [location.pathname]);

  const tabButtons = (
    <div className="flex gap-4 max-[650px]:grid max-[650px]:grid-cols-1">
      <TabButton
        label="Borrowed Books"
        isActive={localActiveTab === "borrowed"}
        onClick={() => setLocalActiveTab("borrowed")}
        position="first"
      />
      <TabButton
        label="Overdue Borrowers"
        isActive={localActiveTab === "overdue"}
        onClick={() => setLocalActiveTab("overdue")}
        position="last"
      />
      <TabButton
        label="Returned Books"
        isActive={localActiveTab === "returned"}
        onClick={() => setLocalActiveTab("returned")}
      />
     
    </div>
  );

  return (
    <>
      {localActiveTab === "borrowed" && (
        <BorrowedBooks
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          customTitle={tabButtons}
          hideButton={true}
        />
      )}
      {localActiveTab === "returned" && (
        <BorrowedBooks
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          customTitle={tabButtons}
          hideButton={true}
          showReturned={true}
        />
      )}
      {localActiveTab === "overdue" && (
        <Overdue
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          customTitle={tabButtons}
        />
      )}
    </>
  );
}

export default Catalog;
