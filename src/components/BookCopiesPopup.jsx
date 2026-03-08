import React, { useState, useEffect, useRef } from "react";
import { Copy, ChevronUp } from "lucide-react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import NFCReaderButton from "./NFCReaderButton.jsx";
import { useBranches } from "../hooks/useBranches";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function BookCopiesPopup({
  show,
  onClose,
  quantity,
  bookCopies,
  onSave,
  bookId,
}) {
  const [copies, setCopies] = useState([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isBranchSelectOpen, setIsBranchSelectOpen] = useState(false);
  const inputRefs = useRef([]);
  const { data: branches = [] } = useBranches();

  // تهيئة النسخ عند فتح البوب‑اب
  useEffect(() => {
    if (show) {
      const qty = parseInt(quantity, 10) || 1;

      if (bookCopies && bookCopies.length > 0) {
        const existingCopies = bookCopies.map((c) => c.book_copy_id || "");
        const firstBranch = bookCopies[0]?.branch_id || "";
        setSelectedBranch(firstBranch);

        while (existingCopies.length < qty) {
          existingCopies.push("");
        }
        setCopies(existingCopies.slice(0, qty));
      } else {
        setCopies(Array(qty).fill(""));
        setSelectedBranch("");
      }

      inputRefs.current = Array(qty).fill(null);
      setCurrentInputIndex(0);
    }
  }, [show, quantity, bookCopies]);

  const handleCopyChange = (index, value) => {
    const newCopies = [...copies];
    newCopies[index] = value;
    setCopies(newCopies);
  };

  const handleInputFocus = (index) => {
    setCurrentInputIndex(index);
  };

  const handleNFCData = React.useCallback(
    (uid) => {
      // Set the UID in the currently focused/active box
      handleCopyChange(currentInputIndex, uid);

      // Auto-focus next box if exists
      const nextIndex = currentInputIndex + 1;
      if (nextIndex < copies.length) {
        setTimeout(() => {
          const el = inputRefs.current[nextIndex];
          if (el) el.focus();
          setCurrentInputIndex(nextIndex);
        }, 100);
      }
    },
    [currentInputIndex, copies.length],
  );

  // Realtime: استقبل UID من جدول scanned_book_uids للجهاز kiosk1
  useEffect(() => {
    if (!show) return;

    const channel = supabase
      .channel("book-uid-scans")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "scanned_book_uids",
          filter: "device_id=eq.kiosk1",
        },
        (payload) => {
          const uid = payload.new.uid;

          // حط الـ UID في الخانة الحالية
          setCopies((prev) => {
            const updated = [...prev];
            updated[currentInputIndex] = uid;
            return updated;
          });

          // روح للخانة اللي بعدها لو موجودة
          const nextIndex = currentInputIndex + 1;
          if (nextIndex < copies.length) {
            setCurrentInputIndex(nextIndex);
            setTimeout(() => {
              const el = inputRefs.current[nextIndex];
              if (el) el.focus();
            }, 100);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [show, currentInputIndex, copies.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFilled = copies.every((c) => c.trim() !== "");
    if (!allFilled) {
      alert(`Please fill all ${copies.length} copy IDs`);
      return;
    }

    if (!selectedBranch) {
      alert("Please select a branch");
      return;
    }

    const uniqueCopies = new Set(copies);
    if (uniqueCopies.size !== copies.length) {
      alert("Copy IDs must be unique");
      return;
    }

    const bookCopiesArray = copies.map((c) => ({
      book_copy_id: c,
      branch_id: parseInt(selectedBranch, 10),
    }));

    onSave(bookCopiesArray);
    onClose();
  };

  return (
    <Popup
      show={show}
      onClose={onClose}
      title={`Add Book`}
      icon={<Copy size={24} strokeWidth={2.3} />}
      maxWidthClass="max-w-[800px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-3 px-10">
          <div className="w-auto">
            <NFCReaderButton
              deviceId="kiosk1"
              isFlexOne
              bookId={bookId || quantity}
              onDataReceived={handleNFCData}
            />
          </div>
          <div className="relative flex-1">
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setIsBranchSelectOpen(false);
              }}
              onClick={() => setIsBranchSelectOpen(!isBranchSelectOpen)}
              onBlur={() => setIsBranchSelectOpen(false)}
              required
              className="h-[50px] w-full appearance-none rounded-xl border border-[#D7D7D7] bg-white px-4 py-4 text-[13px] text-black placeholder-[#000035] outline-none dark:border-[#D7D7D7] dark:bg-[#121317] dark:text-[#D7D7D7] dark:placeholder-[#D7D7D7]"
            >
              <option value="" disabled hidden>
                Select Branch
              </option>
              {branches.map((branch) => (
                <option
                  key={branch.branch_id}
                  value={branch.branch_id}
                  className="bg-[#D7D7D7] text-[#000035] dark:bg-[#121317] dark:text-[#D7D7D7]"
                >
                  {branch.name}
                </option>
              ))}
            </select>
            <ChevronUp
              className={`pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#000035] transition-transform duration-200 dark:text-[#D7D7D7] ${
                isBranchSelectOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>

        <div
          className={`grid max-h-[400px] overflow-y-auto px-10 text-[#000035] ${
            copies.length === 1 ? "grid-cols-1" : "grid-cols-2"
          } gap-3`}
        >
          {copies.map((copy, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={copy}
              onChange={(e) => handleCopyChange(index, e.target.value)}
              onFocus={() => handleInputFocus(index)}
              placeholder={`ID`}
              required
              className="h-[50px] w-full rounded-xl border border-[#D7D7D7] bg-white px-4 py-4 text-[13px] text-black placeholder-[#000035] outline-none dark:border-[#D7D7D7] dark:bg-[#121317] dark:text-[#D7D7D7] dark:placeholder-[#D7D7D7]"
            />
          ))}
        </div>

        <div className="flex justify-between gap-3 px-10 pb-2">
          <FormButton type="button" onClick={onClose}>
            BACK
          </FormButton>
          <FormButton type="submit" isPrimary>
            SAVE COPIES
          </FormButton>
        </div>
      </form>
    </Popup>
  );
}

export default BookCopiesPopup;
