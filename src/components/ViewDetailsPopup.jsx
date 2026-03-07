import React, { useState } from "react";
import Popup from "./Popup.jsx";
import {
  ReceiptText,
  Star,
  StarHalf,
  UserRound,
  Loader2,
  Book,
} from "lucide-react";
import reviewerAvatar from "../assets/img/testimonial-perfil-1.png";
import { useBookReviews } from "../hooks/useBookReviews.js";
import RateBookPopup from "./RateBookPopup.jsx";
import FormButton from "./FormButton.jsx";
import { getCurrentUser } from "../services/auth.api";

const ViewDetailsPopup = ({
  show,
  onClose,
  title = "View Details",
  children,
  data,
  savedBy,
  imageUrl,
  imageAlt,
  variant = "book",
}) => {
  const [showRatePopup, setShowRatePopup] = useState(false);
  const bookId = data?.["Book ID"];
  const { data: bookReviews = [], isLoading: isLoadingReviews } =
    useBookReviews(bookId);
  const averageRating =
    bookReviews.length > 0
      ? bookReviews.reduce(
          (sum, rev) => sum + Number(rev.rating || rev.rate || 0),
          0,
        ) / bookReviews.length
      : 0;

  const currentUser = getCurrentUser();
  const existingReview = bookReviews.find(
    (rev) => String(rev.user_id) === String(currentUser?.user_id || "Guest"),
  );

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

  const renderStars = (rating, size = 14) => {
    return (
      <div className="mt-1 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = rating >= star;
          const isHalf = !isFull && rating > star - 1;

          return (
            <div key={star} className="relative">
              <Star
                size={size}
                className="text-[#000035] dark:text-[#D7D7D7]"
                strokeWidth={1.5}
              />
              {isFull && (
                <Star
                  size={size}
                  className="absolute left-0 top-0 fill-[#000035] text-[#000035] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                  strokeWidth={1.5}
                />
              )}
              {isHalf && (
                <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
                  <Star
                    size={size}
                    className={`fill-[#000035] text-[#000035] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]`}
                    strokeWidth={1.5}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      minWidth: `${size}px`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
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
        maxWidthClass={variant === "book" ? "max-w-[1200px]" : "max-w-[700px]"}
        panelClassName={`!p-0 ${variant === "book" ? "h-full max-h-[700px]" : "h-auto"} overflow-hidden rounded-[14px] border border-[#cfcfcf] bg-[#ebebeb] shadow-[0_24px_70px_rgba(0,0,0,0.45)] dark:border-[#D7D7D7] dark:bg-[#121317]`}
        contentClassName={`${variant === "book" ? "h-full overflow-y-auto" : "h-auto overflow-hidden"} p-0 overflow-x-hidden`}
        hideHeader
        hideDivider
        heightClass={variant === "book" ? "px-1 py-1 sm:px-4 sm:py-4" : "p-0"}
      >
        <div
          className={`grid ${variant === "book" ? "h-full grid-cols-1 lg:grid-cols-[440px_1px_1fr]" : "h-auto grid-cols-1 lg:grid-cols-[auto_1px_auto]"}`}
        >
          <div
            className={`flex flex-col items-center justify-center ${variant === "book" ? "px-10 pb-10 pt-10" : "py-3 pl-4 pr-1"}`}
          >
            <div className="flex items-center justify-center">
              {variant === "book" ? (
                imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={imageAlt || String(headingText || "Details")}
                    className="h-[600px] w-[470px] max-w-full border border-[#cecece] object-cover"
                  />
                ) : (
                  <div className="flex h-[600px] w-[400px] max-w-full items-center justify-center border border-[#cecece] bg-gradient-to-br from-[#000035] to-[#192261]">
                    <Book size={48} className="text-[#F2F2F2]" />
                  </div>
                )
              ) : (
                <div className="relative flex aspect-square h-[200px] w-[200px] items-center justify-center">
                  {imageUrl ? (
                    <div className="h-full w-full overflow-hidden rounded-full">
                      <img
                        src={imageUrl}
                        alt={imageAlt || String(headingText || "Details")}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#000020]">
                      <UserRound size={64} className="text-[#F2F2F2]" />
                    </div>
                  )}
                </div>
              )}
            </div>
            {variant === "details" && savedBy && (
              <div className="mt-4 self-start">
                <p className="text-[10px] text-[#000035]/50 dark:text-[#D7D7D7]/50">
                  Added by: {savedBy.name}
                </p>
              </div>
            )}
          </div>

          <div
            className={`${variant === "book" ? "my-6" : "my-3 h-auto min-h-[140px]"} mx-auto hidden w-px bg-[#000035]/20 lg:block dark:bg-[#D7D7D7]/20`}
          />

          <div
            className={`flex min-h-0 flex-1 flex-col justify-center ${variant === "book" ? "px-12 py-12" : "py-3 pl-4 pr-6"}`}
          >
            {/* Header and Details - Fixed */}
            <div className="shrink-0">
              <div className="flex flex-col items-start">
                <h3
                  className={`truncate font-bold uppercase leading-[1.1] tracking-[0.5px] text-[#000035] dark:text-[#D7D7D7] ${variant === "book" ? "text-4xl font-bold sm:text-5xl lg:text-[56px]" : "text-4xl font-bold sm:text-5xl lg:text-[56px]"}`}
                  style={{
                    fontFamily:
                      variant === "book"
                        ? "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif"
                        : "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif",
                  }}
                  title={String(headingText || "N/A")}
                >
                  {String(headingText || "N/A")}
                </h3>
                {variant === "book" && bookReviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    {renderStars(averageRating, 24)}
                    {/* <span className="text-xl font-medium text-[#000035] dark:text-[#D7D7D7]">
                      ({averageRating.toFixed(1)})
                    </span> */}
                  </div>
                )}
              </div>
              {subtitleText && (
                <p
                  className={`font-medium text-[#000035] dark:text-[#D7D7D7] ${variant === "book" ? "text-xl sm:text-[28px]" : "mb-6 text-2xl sm:text-[32px]"}`}
                >
                  {subtitleText}
                </p>
              )}

              <div
                className={`flex flex-col ${variant === "book" ? "mt-6 gap-4" : "mt-1 gap-2"}`}
                style={{
                  fontFamily: "'Noto Sans Georgian', sans-serif",
                }}
              >
                {detailsEntries.map(([key, value]) => (
                  <p
                    key={key}
                    className={`whitespace-nowrap text-[#000035] dark:text-[#D7D7D7] ${variant === "book" ? "text-xl sm:text-[28px]" : "text-base font-medium sm:text-[20px]"}`}
                  >
                    {key} :{" "}
                    <span className="font-normal">{toDisplayValue(value)}</span>
                  </p>
                ))}
              </div>

              {variant === "book" && (
                <div className="my-6 h-px w-full max-w-[280px] bg-[#000035] dark:bg-[#D7D7D7]" />
              )}
            </div>

            {/* Custom Content or Reviews - Scrolling */}
            {hasCustomContent ? (
              <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            ) : bookId ? (
              <div className="flex min-h-0 flex-1 flex-col gap-5">
                <div className="shrink-0">
                  <h4
                    className="mb-2 text-4xl text-[#000035] sm:text-[48px] dark:text-[#D7D7D7]"
                    style={{
                      fontFamily:
                        "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif",
                    }}
                  >
                    RATING & REVIEWS
                  </h4>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto scroll-smooth pr-3">
                  {isLoadingReviews ? (
                    <div className="flex flex-1 items-center justify-center p-8">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-[#000035] dark:text-[#D7D7D7]" />
                        <p className="text-lg font-medium text-[#000035] dark:text-[#D7D7D7]">
                          Loading reviews...
                        </p>
                      </div>
                    </div>
                  ) : bookReviews.length === 0 ? (
                    <p className="text-[#000035] dark:text-[#D7D7D7]">
                      No reviews yet. Be the first!
                    </p>
                  ) : (
                    bookReviews.map((review) => (
                      <div
                        key={review.review_id}
                        className="flex min-h-[96px] items-center justify-between gap-4 rounded-[12px] border border-[#000035] bg-transparent px-3 py-2 pr-10 dark:border-[#D7D7D7]"
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
                              <UserRound className="h-16 w-16 text-[#0b0c28] dark:text-[#121317]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-[18px] leading-tight text-[#000035] dark:text-[#D7D7D7]">
                                {review.user_name?.toUpperCase() || "GUEST"}
                              </span>
                              <div className="flex gap-0.5">
                                {renderStars(review.rating || review.rate, 12)}
                              </div>
                            </div>
                            {(review.review || review.review_text) && (
                              <p className="truncate text-[14px] text-[#000035] dark:text-[#D7D7D7]">
                                {review.review || review.review_text}
                              </p>
                            )}
                            <p className="text-xs text-[#8c8c8c] dark:text-[#A3A3A3]">
                              {timeSince(review.created_at)}
                            </p>
                          </div>
                        </div>

                        <FormButton
                          isPrimary
                          fullWidth={false}
                          className="h-12 w-[140px] !p-0 text-lg"
                        >
                          Replay
                        </FormButton>
                      </div>
                    ))
                  )}
                </div>

                <div className="shrink-0 pt-2">
                  <FormButton
                    isPrimary
                    fullWidth={false}
                    onClick={() => setShowRatePopup(true)}
                    className={`h-[54px] w-[190px] cursor-pointer rounded-[10px] !p-0 text-[18px] transition-colors`}
                  >
                    Comment
                  </FormButton>
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
        initialReview={existingReview}
      />
    </>
  );
};

export default ViewDetailsPopup;
