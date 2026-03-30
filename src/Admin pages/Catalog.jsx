import { useState } from "react";
import BorrowedBooks from "./BorrowedBooks";
import Overdue from "./Overdue";
import ReservedBooks from "./ReservedBooks";
import TabButton from "../components/TabButton";

function Catalog({ searchValue, setSearchValue }) {
  const [localActiveTab, setLocalActiveTab] = useState("borrowed");

  const tabButtons = (
    <div className="flex gap-4 max-[40.625rem]:grid max-[40.625rem]:grid-cols-1">
      <TabButton
        label="Borrowed Books"
        isActive={localActiveTab === "borrowed"}
        onClick={() => setLocalActiveTab("borrowed")}
        position="first"
      />

      <TabButton
        label="Returned Books"
        isActive={localActiveTab === "returned"}
        onClick={() => setLocalActiveTab("returned")}
      />
      <TabButton
        label="Overdue Borrowers"
        isActive={localActiveTab === "overdue"}
        onClick={() => setLocalActiveTab("overdue")}
        position="last"
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
