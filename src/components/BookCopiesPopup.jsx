import React, { useState, useEffect, useRef } from "react";
import { Copy } from "lucide-react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import FormInput from "./FormInput.jsx";
import FormSelect from "./FormSelect.jsx";
import NFCReaderButton from "./NFCReaderButton.jsx";
import { useBranches } from "../hooks/useBranches";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
};

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

  const handleNFCData = React.useCallback((uid) => {
    setCopies((prev) => {
      const updated = [...prev];
      // Find the first empty row
      const firstEmptyIndex = updated.findIndex((c) => !c || c.trim() === "");

      if (firstEmptyIndex !== -1) {
        updated[firstEmptyIndex] = uid;

        // Auto-focus next empty box if exists
        const nextEmptyIndex = updated.findIndex(
          (c, idx) => idx > firstEmptyIndex && (!c || c.trim() === ""),
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

  // Realtime: استقبل UID من جدول scanned_book_uids للجهاز kiosk1
  useEffect(() => {
    if (!show) return;

    const supabase = getSupabaseClient();
    if (!supabase) return;

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
          handleNFCData(uid);
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

  const firstEmptyIndex = copies.findIndex((c) => !c || c.trim() === "");
  const firstEmptyRef = {
    current: inputRefs.current[firstEmptyIndex === -1 ? 0 : firstEmptyIndex],
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
              inputRef={firstEmptyRef}
              onDataReceived={handleNFCData}
            />
          </div>
          <div className="relative flex-1">
            <FormSelect
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              placeholder="Select Branch"
              required
              options={branches.map((branch) => ({
                value: branch.branch_id,
                label: branch.name,
              }))}
            />
          </div>
        </div>

        <div
          className={`grid max-h-[400px] overflow-y-auto px-10 text-[#000035] ${
            copies.length === 1 ? "grid-cols-1" : "grid-cols-2"
          } gap-3`}
        >
          {copies.map((copy, index) => (
            <FormInput
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={copy}
              onChange={(e) => handleCopyChange(index, e.target.value)}
              onFocus={() => handleInputFocus(index)}
              placeholder={`ID`}
              required
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
