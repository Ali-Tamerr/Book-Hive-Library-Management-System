import React, { useState } from "react";
import Popup from "./Popup.jsx";
import { ReceiptText, Star, StarHalf, UserRound } from "lucide-react";
import reviewerAvatar from "../assets/img/testimonial-perfil-1.png";
import { useBookReviews } from "../hooks/useBookReviews.js";
import RateBookPopup from "./RateBookPopup.jsx";

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
  const [showRatePopup, setShowRatePopup] = useState(false);
  const bookId = data?.["Book ID"];
  const { data: bookReviews = [], isLoading: isLoadingReviews } =
    useBookReviews(bookId);

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
  const branchEntry = firstMatchingEntry(["Branch", "Branch Name", "Location"]);
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

  const remainingEntries = normalizedEntries.filter(
    ([key]) => !usedKeys.has(key) && String(key).toLowerCase() !== "book id",
  );

  const toDisplayValue = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string" && value.trim() === "") return "";
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

  const timeSince = (dateParam) => {
    if (!dateParam) return "";
    const date = new Date(dateParam);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const renderStars = (rating) => {
    return (
      <div className="mt-1 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? "fill-[#facc15] text-[#facc15]"
                : "text-[#d1d5db]"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Popup
        show={show}
        onClose={onClose}
        title={title}
        icon={null}
        maxWidthClass="max-w-[860px]"
        panelClassName="!max-h-[96vh] overflow-hidden rounded-[14px] border border-[#cfcfcf] bg-[#ebebeb] shadow-[0_24px_70px_rgba(0,0,0,0.45)] dark:border-[#cfcfcf] dark:bg-[#ebebeb]"
        contentClassName="overflow-x-hidden overflow-y-auto p-0"
        hideHeader
        hideDivider
        heightClass="px-1 py-1 sm:px-3 sm:py-3"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1px_1fr]">
          <div className="flex items-start justify-center px-4 pb-7 pt-8 sm:px-6">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt || String(headingText || "Details")}
                className="h-[360px] w-[230px] max-w-full border border-[#cecece] object-cover"
              />
            ) : (
              <div className="flex h-[360px] w-[230px] max-w-full items-center justify-center border border-[#cecece] bg-gradient-to-br from-[#0a0f33] to-[#192261]">
                <UserRound size={48} className="text-white/70" />
              </div>
            )}
          </div>

          <div className="mx-auto my-7 hidden w-px bg-[#b3b3b3] lg:block" />

          <div className="flex flex-col px-4 pb-7 pt-8 sm:px-7">
            <div>
              <h3
                className="text-4xl font-normal uppercase leading-[0.9] tracking-[0.5px] text-[#050549] sm:text-5xl lg:text-[56px]"
                style={{
                  fontFamily:
                    "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif",
                }}
              >
                {String(headingText || "N/A")}
              </h3>
              {subtitleText && (
                <p className="mt-2 text-xl font-medium text-[#050549] sm:text-[28px]">
                  {subtitleText}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {detailsEntries.map(([key, value]) => (
                <p key={key} className="text-xl text-[#050549] sm:text-[28px]">
                  {key} : {toDisplayValue(value)}
                </p>
              ))}
            </div>

            <div className="mt-4 h-px w-full max-w-[280px] bg-[#b1b1b1]" />

            {hasCustomContent ? (
              <div className="mt-8">{children}</div>
            ) : bookId ? (
              <div className="mt-8 flex flex-col gap-5">
                <h4
                  className="text-4xl text-[#050549] sm:text-[48px]"
                  style={{
                    fontFamily:
                      "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif",
                  }}
                >
                  RATING & REVIEWS
                </h4>

                <div className="mt-2 flex max-h-[400px] flex-col gap-4 overflow-y-auto pr-2">
                  {isLoadingReviews ? (
                    <p className="text-[#050549]">Loading reviews...</p>
                  ) : bookReviews.length === 0 ? (
                    <p className="text-[#050549]">
                      No reviews yet. Be the first!
                    </p>
                  ) : (
                    bookReviews.map((review) => (
                      <div
                        key={review.review_id}
                        className="flex min-h-[96px] items-center justify-between gap-4 rounded-[12px] border border-[#d8d8d8] bg-[#efefef] px-3 py-2 shadow-[0_2px_0_rgba(0,0,0,0.15)]"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-16 w-16 min-w-[64px] items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
                            {review.user_image_url ? (
                              <img
                                src={`data:image/png;base64,${review.user_image_url}`}
                                alt={review.user_name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <UserRound className="h-16 w-16 text-[#0b0c28]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="truncate text-[18px] leading-tight text-[#050549]"
                              style={{
                                fontFamily: "'Noto Sans Georgian', sans-serif",
                              }}
                            >
                              {review.user_name?.toUpperCase() || "GUEST"}
                            </p>
                            {renderStars(review.rating)}
                            {review.review_text && (
                              <p className="mt-1 truncate text-[14px] text-[#050549]">
                                {review.review_text}
                              </p>
                            )}
                            <p className="mt-1 text-xs text-[#8c8c8c]">
                              {timeSince(review.created_at)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="h-[54px] min-w-[150px] cursor-pointer rounded-[10px] bg-[#00004f] px-6 text-[28px] text-white transition-colors hover:bg-[#161669]"
                          style={{
                            fontFamily: "'Noto Sans Georgian', sans-serif",
                          }}
                        >
                          Replay
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRatePopup(true)}
                    className="h-[54px] min-w-[150px] cursor-pointer rounded-[10px] bg-[#00004f] px-6 text-[28px] text-white transition-colors hover:bg-[#161669]"
                    style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
                  >
                    Comment
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Popup>
      <RateBookPopup
        show={showRatePopup}
        onClose={() => setShowRatePopup(false)}
        bookId={bookId}
      />
    </>
  );
};

export default ViewDetailsPopup;
