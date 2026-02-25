import React from "react";
import Popup from "./Popup.jsx";
import { ReceiptText } from "lucide-react";
import reviewerAvatar from "../assets/img/testimonial-perfil-1.png";

const ViewDetailsPopup = ({
  show,
  onClose,
  title = "View Details",
  children,
  data,
  savedBy,
  imageUrl,
  imageAlt,
}) => {
  const normalizedEntries =
    data && typeof data === "object" ? Object.entries(data) : [];

  const isBlankTextChild = (child) =>
    typeof child === "string" && child.trim().length === 0;

  const hasCustomContent = React.Children.toArray(children).some(
    (child) => child != null && !isBlankTextChild(child),
  );

  const firstMatchingEntry = (keys) => {
    const lowerKeys = keys.map((key) => key.toLowerCase());
    return normalizedEntries.find(([key]) =>
      lowerKeys.includes(String(key).toLowerCase()),
    );
  };

  const headingEntry =
    firstMatchingEntry([
      "Name",
      "Book Name",
      "Book Title",
      "Title",
      "User Name",
      "Username",
      "Branch",
      "Category",
    ]) || normalizedEntries[0];

  const authorEntry = firstMatchingEntry(["Author"]);
  const branchEntry = firstMatchingEntry([
    "Branch",
    "Branch Name",
    "Location",
  ]);
  const categoryEntry = firstMatchingEntry([
    "Category",
    "Book Category",
    "Genre",
  ]);

  const usedKeys = new Set();
  if (headingEntry?.[0]) usedKeys.add(headingEntry[0]);
  if (authorEntry?.[0]) usedKeys.add(authorEntry[0]);
  if (branchEntry?.[0]) usedKeys.add(branchEntry[0]);
  if (categoryEntry?.[0]) usedKeys.add(categoryEntry[0]);

  const remainingEntries = normalizedEntries.filter(([key]) => !usedKeys.has(key));

  const toDisplayValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "string" && value.trim() === "") return "N/A";
    return value;
  };

  const headingText = headingEntry ? toDisplayValue(headingEntry[1]) : title;
  const subtitleText = authorEntry ? toDisplayValue(authorEntry[1]) : null;
  const detailsEntries = [];
  if (branchEntry) detailsEntries.push(branchEntry);
  if (categoryEntry) detailsEntries.push(categoryEntry);
  if (detailsEntries.length < 2) {
    remainingEntries.forEach((entry) => {
      if (detailsEntries.length < 2) detailsEntries.push(entry);
    });
  }

  const reviewerName =
    savedBy &&
    typeof savedBy === "object" &&
    typeof savedBy.name === "string" &&
    savedBy.name.trim().length > 0 &&
    savedBy.name.trim().toLowerCase() !== "n/a"
      ? savedBy.name.toUpperCase()
      : "AHMED MOHAMMED";

  const reviewCards = [
    {
      id: 1,
      reviewer: reviewerName,
      content: "5/5 Great book for Football community",
      time: "7 days ago",
    },
    {
      id: 2,
      reviewer: reviewerName,
      content: "5/5 Great book for Football community",
      time: "7 days ago",
    },
  ];

  return (
    <Popup
      show={show}
      onClose={onClose}
      title={title}
      icon={null}
      maxWidthClass="max-w-[1320px]"
      panelClassName="!max-h-[96vh] overflow-hidden rounded-[14px] border border-[#cfcfcf] bg-[#ebebeb] p-0 pb-0 shadow-[0_24px_70px_rgba(0,0,0,0.45)] dark:border-[#cfcfcf] dark:bg-[#ebebeb]"
      contentClassName="overflow-x-hidden overflow-y-hidden p-0"
      hideHeader
      hideDivider
      heightClass="px-1 py-1 sm:px-3 sm:py-3 !bg-black/85 !backdrop-blur-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[470px_1px_1fr]">
        <div className="flex items-start justify-center px-6 pb-10 pt-12 sm:px-10">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || String(headingText || "Details")}
              className="h-[560px] w-[360px] max-w-full border border-[#cecece] object-cover"
            />
          ) : (
            <div className="flex h-[560px] w-[360px] max-w-full items-center justify-center border border-[#cecece] bg-gradient-to-br from-[#0a0f33] to-[#192261]">
              <ReceiptText size={74} className="text-white/70" />
            </div>
          )}
        </div>

        <div className="mx-auto my-10 hidden w-px bg-[#b3b3b3] lg:block" />

        <div className="flex flex-col px-6 pb-10 pt-12 sm:px-10">
          <div>
            <h3
              className="text-6xl leading-[0.9] font-normal uppercase tracking-[0.5px] text-[#050549] sm:text-7xl lg:text-[86px]"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
            >
              {String(headingText || "N/A")}
            </h3>
            <p className="mt-3 text-3xl font-medium text-[#050549] sm:text-[44px]">
              {subtitleText || "N/A"}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-6">
            {detailsEntries.map(([key, value]) => (
              <p key={key} className="text-3xl text-[#050549] sm:text-[46px]">
                {key} : {toDisplayValue(value)}
              </p>
            ))}
          </div>

          <div className="mt-6 h-px w-full max-w-[420px] bg-[#b1b1b1]" />

          {hasCustomContent ? (
            <div className="mt-8">{children}</div>
          ) : (
            <div className="mt-8 flex flex-col gap-5">
              <h4
                className="text-4xl text-[#050549] sm:text-[48px]"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
              >
                RATING & REVIEWS
              </h4>

              <div className="mt-2 flex flex-col gap-4">
                {reviewCards.map((review) => (
                  <div
                    key={review.id}
                    className="flex min-h-[96px] items-center justify-between gap-4 rounded-[12px] border border-[#d8d8d8] bg-[#efefef] px-3 py-2 shadow-[0_2px_0_rgba(0,0,0,0.15)]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={reviewerAvatar}
                        alt={review.reviewer}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p
                          className="truncate text-[18px] leading-tight text-[#050549]"
                          style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
                        >
                          {review.reviewer}
                        </p>
                        <p className="truncate text-[14px] text-[#050549]">
                          {review.content}
                        </p>
                        <p className="mt-1 text-xs text-[#8c8c8c]">{review.time}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="h-[54px] min-w-[150px] cursor-pointer rounded-[10px] bg-[#00004f] px-6 text-[32px] text-white transition-colors hover:bg-[#161669]"
                      style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
                    >
                      Replay
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[54px] min-w-[150px] cursor-pointer rounded-[10px] bg-[#00004f] px-6 text-[34px] text-white transition-colors hover:bg-[#161669]"
                  style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
                >
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default ViewDetailsPopup;
