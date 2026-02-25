import React, { useEffect, useMemo } from "react";
import { useBranches } from "../hooks/useBranches";
import { useBookCopies } from "../hooks/useBookCopies";

const OurBranchesPopup = ({ isOpen, onClose }) => {
  const {
    data: branches = [],
    isLoading: branchesLoading,
    error: branchesError,
  } = useBranches();
  const {
    data: bookCopies = [],
    isLoading: copiesLoading,
    error: copiesError,
  } = useBookCopies();

  const isLoading = branchesLoading;
  const hasError = Boolean(branchesError);
  const canShowCounts = !copiesLoading && !copiesError;

  const bookCountByBranch = useMemo(() => {
    const counts = new Map();
    bookCopies.forEach((copy) => {
      const key =
        copy?.branch_id !== undefined && copy?.branch_id !== null
          ? String(copy.branch_id)
          : null;
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return counts;
  }, [bookCopies]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(140,140,140,0.7)] p-8 dark:bg-[rgba(10,10,12,0.7)]"
      onClick={onClose}
    >
      <div
        className="branches-popup popup-typography flex max-h-[90vh] w-[min(940px,96vw)] flex-col gap-2.5 overflow-hidden rounded-[10px] border border-[#d1d1dd] bg-white px-[22px] pb-7 pt-3 shadow-[0_12px_28px_rgba(10,10,35,0.18)] max-[700px]:gap-1.5 max-[700px]:p-[14px] max-[700px]:pb-5 dark:border-[#242732] dark:bg-[#14161b] dark:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="branches-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <button
            type="button"
            className="cursor-pointer rounded-xl border border-[#0a0b2b] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3px] text-[#0a0b2b] hover:bg-[#0a0b2b] hover:text-white dark:border-[#e3e6f0] dark:bg-transparent dark:text-[#e3e6f0] dark:hover:bg-[#e3e6f0] dark:hover:text-[#0f1116]"
            onClick={onClose}
          >
            Back
          </button>
          <div className="flex items-center gap-2">
            <img
              src={new URL("../assets/logo.svg", import.meta.url).href}
              alt="Book Hive Logo"
              className="h-auto w-[44px]"
            />
            <div>
              <span className="text-base font-extrabold text-[#0a0b2b] dark:text-[#f1f2f6]">
                BookHive
              </span>
              <span className="-mt-1 block text-[11px] text-[#0a0b2b] dark:text-[#f1f2f6]">
                Library
              </span>
            </div>
          </div>
        </div>

        <h3
          id="branches-popup-title"
          className="mt-2 font-[family-name:var(--body-font)] text-2xl font-extrabold text-[#0a0b2b] max-[700px]:text-[20px] dark:text-[#f1f2f6]"
        >
          Our Branches
        </h3>

        <div className="mt-2.5 overflow-auto border-t border-[#9a9aa7] pt-2.5 dark:border-[#2b2f3a]">
          <table className="w-full min-w-[620px] border-collapse max-[700px]:min-w-[520px]">
            <thead>
              <tr className="*:border-b *:border-[#9a9aa7] *:p-2.5 *:text-left *:text-[13px] *:font-bold *:text-[#0a0b2b] dark:*:border-[#2b2f3a] dark:*:text-[#e3e6f0]">
                <th>Name</th>
                <th>Contact No</th>
                <th>Location</th>
                <th className="!w-[120px] !text-center">Bo Quantity</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-3 py-7 text-center text-[#6f6f76] dark:text-[#a2a7b3]"
                  >
                    Loading branches...
                  </td>
                </tr>
              ) : hasError ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-3 py-7 text-center text-[#6f6f76] dark:text-[#a2a7b3]"
                  >
                    Unable to load branches right now.
                  </td>
                </tr>
              ) : branches.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-3 py-7 text-center text-[#6f6f76] dark:text-[#a2a7b3]"
                  >
                    No branches found.
                  </td>
                </tr>
              ) : (
                branches.map((branch, index) => {
                  const branchId = branch?.branch_id ?? branch?.id ?? index;
                  const countKey =
                    branchId !== undefined && branchId !== null
                      ? String(branchId)
                      : null;
                  const bookCount =
                    canShowCounts && countKey
                      ? (bookCountByBranch.get(countKey) ?? 0)
                      : "N/A";

                  return (
                    <tr
                      key={branchId}
                      className="*:p-2.5 *:py-5 *:text-sm *:text-[#0a0b2b] dark:*:text-[#d8dbe6]"
                    >
                      <td>{branch?.name || "N/A"}</td>
                      <td>{branch?.contact_number || "N/A"}</td>
                      <td>{branch?.location || "N/A"}</td>
                      <td className="!w-[120px] !text-center">{bookCount}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OurBranchesPopup;
