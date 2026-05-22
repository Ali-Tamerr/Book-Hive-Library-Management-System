import React, { useState, useEffect, useRef } from "react";
import { BookCopy } from "lucide-react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import NFCReaderButton from "./NFCReaderButton.jsx";
import { useBranches } from "../hooks/useBranches";

function BookCopiesPopup({
  show,
  onClose,
  quantity,
  bookCopies,
  onSave,
  bookId,
  editMode = false,
}) {
  const [copies, setCopies] = useState([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const inputRefs = useRef([]);
  const { data: branches = [] } = useBranches();

  useEffect(() => {
    if (show) {
      const qty = parseInt(quantity, 10) || 1;

      if (bookCopies && bookCopies.length > 0) {
        const initial = bookCopies.slice(0, qty).map((c) => ({
          id: c.book_copy_id || "",
          branch: String(c.branch_id || ""),
        }));
        while (initial.length < qty) initial.push({ id: "", branch: "" });
        setCopies(initial);
      } else {
        setCopies(Array(qty).fill(null).map(() => ({ id: "", branch: "" })));
      }

      inputRefs.current = Array(qty).fill(null);
      setCurrentInputIndex(0);
    }
  }, [show, quantity, bookCopies]);

  const handleIdChange = (index, value) => {
    setCopies((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], id: value };
      return next;
    });
  };

  const handleBranchChange = (index, value) => {
    setCopies((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], branch: value };
      return next;
    });
  };

  const handleInputFocus = (index) => {
    setCurrentInputIndex(index);
  };

  const handleNFCData = React.useCallback((uid) => {
    setCopies((prev) => {
      const updated = [...prev];
      const firstEmptyIndex = updated.findIndex((c) => !c.id || c.id.trim() === "");
      if (firstEmptyIndex !== -1) {
        updated[firstEmptyIndex] = { ...updated[firstEmptyIndex], id: uid };
        const nextEmptyIndex = updated.findIndex(
          (c, idx) => idx > firstEmptyIndex && (!c.id || c.id.trim() === "")
        );
        if (nextEmptyIndex !== -1) {
          setTimeout(() => {
            const el = inputRefs.current[nextEmptyIndex];
            if (el) el.focus();
            setCurrentInputIndex(nextEmptyIndex);
          }, 100);
        }
      }
      return updated;
    });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    const allIdsFilled = copies.every((c) => c.id.trim() !== "");
    if (!allIdsFilled) {
      alert(`Please fill all ${copies.length} copy IDs`);
      return;
    }

    const allBranchesFilled = copies.every((c) => c.branch !== "");
    if (!allBranchesFilled) {
      alert("Please select a branch for every copy");
      return;
    }

    const uniqueIds = new Set(copies.map((c) => c.id));
    if (uniqueIds.size !== copies.length) {
      alert("Copy IDs must be unique");
      return;
    }

    const bookCopiesArray = copies.map((c) => ({
      book_copy_id: c.id,
      branch_id: parseInt(c.branch, 10),
    }));

    onSave(bookCopiesArray);
    onClose();
  };

  const firstEmptyIndex = copies.findIndex((c) => !c.id || c.id.trim() === "");
  const firstEmptyRef = {
    current: inputRefs.current[firstEmptyIndex === -1 ? 0 : firstEmptyIndex],
  };

  return (
    <Popup
      show={show}
      onClose={onClose}
      title={editMode ? "Edit Book" : "Add Book"}
      icon={<BookCopy size={32} strokeWidth={2.2} />}
      iconWrapperClassName="min-h-[4.375rem] min-w-[4.375rem]"
      titleClassName="!text-4xl"
      maxWidthClass="max-w-[53.75rem]"
      contentClassName="px-4 py-6"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-start gap-4 px-20">
          <div className="shrink-0">
            <NFCReaderButton
              isFlexOne
              inputRef={firstEmptyRef}
              onDataReceived={handleNFCData}
            />
          </div>

          <div className="flex flex-1 flex-col gap-5 max-h-[22.5rem] overflow-y-auto pr-1">
            {copies.map((copy, index) => (
              <div key={index} className="flex h-14 items-stretch overflow-hidden rounded-2xl border border-[#000035] dark:border-[#D7D7D7]">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={copy.id}
                  onChange={(e) => handleIdChange(index, e.target.value)}
                  onFocus={() => handleInputFocus(index)}
                  placeholder="ID"
                  required
                  className="w-[11.25rem] shrink-0 bg-transparent px-5 py-4 text-[1rem] font-semibold text-[#000035] outline-none placeholder:font-semibold placeholder:text-[#000035] dark:text-[#D7D7D7] dark:placeholder:text-[#D7D7D7]"
                />
                <div className="w-px h-[80%] self-center bg-[#000035] dark:bg-[#D7D7D7]" />
                <select
                  value={copy.branch}
                  onChange={(e) => handleBranchChange(index, e.target.value)}
                  required
                  className="flex-1 cursor-pointer appearance-none bg-transparent px-5 py-4 text-[1rem] font-semibold text-[#000035] outline-none dark:text-[#D7D7D7]"
                >
                  <option value="" disabled>Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center pr-4 pointer-events-none text-[#000035] dark:text-[#D7D7D7]">
                  ▼
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-3 px-6 pb-2 pt-2">
          <FormButton type="button" onClick={onClose}>
            CANCEL
          </FormButton>
          <FormButton type="submit" isPrimary>
            {editMode ? "UPDATE" : "ADD"}
          </FormButton>
        </div>
      </form>
    </Popup>
  );
}

export default BookCopiesPopup;
