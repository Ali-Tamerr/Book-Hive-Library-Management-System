import React, { useEffect, useMemo } from "react";
import { useBranches } from "../hooks/useBranches";
import { useBookCopies } from "../hooks/useBookCopies";

const AboutBranchesPopup = ({ isOpen, onClose }) => {
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
        className="branches-popup popup-typography flex max-h-[92vh] w-[min(1100px,96vw)] flex-col gap-4 overflow-hidden rounded-[25px] bg-[#F2F2F2] px-[60px] pb-14 pt-8 shadow-[0_20px_50px_rgba(10,10,35,0.25)] max-[700px]:gap-2 max-[700px]:px-[20px] max-[700px]:pb-8  dark:bg-[#121317] "
        role="dialog"
        aria-modal="true"
        aria-labelledby="branches-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <button
            type="button"
            className="cursor-pointer rounded-xl border-2 border-[#0a0b2b] bg-white px-5 py-2 text-[14px] font-bold uppercase tracking-[0.5px] text-[#0a0b2b] transition-all hover:bg-[#0a0b2b] hover:text-white dark:border-[#e3e6f0] dark:bg-transparent dark:text-[#e3e6f0] dark:hover:bg-[#e3e6f0] dark:hover:text-[#0f1116]"
            onClick={onClose}
          >
            Back
          </button>
          <div className="flex items-center gap-4">
            <div
              className="h-[60px] w-[75px] bg-[#000035] dark:bg-[#D7D7D7]"
              style={{
                mask: `url(${new URL("../assets/logo.svg", import.meta.url).href}) no-repeat center`,
                WebkitMask: `url(${new URL("../assets/logo.svg", import.meta.url).href}) no-repeat center`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
            <div>
              <span className="font-[family-name:var(--body-font)] text-[32px] uppercase leading-none tracking-wider text-[#000035] dark:text-[#f1f2f6]">
                BookHive
              </span>
              <span className="-mt-1 block text-right font-[family-name:var(--second-font)] text-[16px] font-normal text-[#000035] dark:text-[#f1f2f6]">
                Library
              </span>
            </div>
          </div>
        </div>

        <h3
          id="branches-popup-title"
          className="mt-6 font-[family-name:var(--body-font)] text-[56px] font-extrabold uppercase tracking-wide text-[#000035] max-[700px]:text-[36px] dark:text-[#f1f2f6]"
        >
          OUR BRANCHES
        </h3>

        <div className="mt-2.5 overflow-auto pt-2.5">
          <table className="w-full min-w-[620px] table-fixed border-collapse max-[700px]:min-w-[520px]">
            <thead>
              <tr className="*:border-b-2 *:border-[#000035] *:p-6 *:text-center *:font-[family-name:var(--body-font)] *:text-[28px] *:font-normal *:uppercase *:tracking-wider *:text-[#000035] dark:*:border-[#f1f2f6] dark:*:text-[#f1f2f6]">
                <th className="w-1/4">NAME</th>
                <th className="w-1/4">CONTACT NO</th>
                <th className="w-1/4">LOCATION</th>
                <th className="w-1/4">BO QUANTITY</th>
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
                      className="*:p-6 *:py-10 *:text-center *:font-[family-name:var(--second-font)] *:text-[20px] *:font-bold *:text-[#000035] dark:*:text-[#d8dbe6]"
                    >
                      <td>{branch?.name || "N/A"}</td>
                      <td>{branch?.contact_number || "N/A"}</td>
                      <td>{branch?.location || "N/A"}</td>
                      <td>{bookCount}</td>
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

export default AboutBranchesPopup;
