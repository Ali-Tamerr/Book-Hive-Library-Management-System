import React, { useState } from "react";
import Popup from "./Popup.jsx";
import { ReceiptText, Star, StarHalf, UserRound, Book } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import reviewerAvatar from "../assets/img/testimonial-perfil-1.png";
import {
  useBookReviews,
  useCreateBookReviewReply,
} from "../hooks/useBookReviews.js";
import RateBookPopup from "./RateBookPopup.jsx";
import FormButton from "./FormButton.jsx";
import { getCurrentUser } from "../services/auth.api";
import BookCopiesViewPopup from "./BookCopiesViewPopup.jsx";
import { useBranches } from "../hooks/useBranches.js";
import BookBranchesPopup from "./BookBranchesPopup.jsx";

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
  maxWidthClassOverride,
  onRequireLogin,
  bookCopiesData = [],
  isAdmin = false,
}) => {
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [showCopiesPopup, setShowCopiesPopup] = useState(false);
  const [showBranchesPopup, setShowBranchesPopup] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  const { data: branchesData = [] } = useBranches();

  const isBookVariant = variant === "book";
  const isUserVariant = variant === "user";
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

  const handleActionRequiringLogin = (actionCallback) => {
    if (!currentUser) {
      if (onRequireLogin) {
        onRequireLogin();
      }
      return; // Do not execute action if not logged in
    }
    if (actionCallback) actionCallback();
  };

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

  let branchElement = branchEntry ? toDisplayValue(branchEntry[1]) : "N/A";
  let popupBranches = [];

  if (isBookVariant && bookCopiesData && bookCopiesData.length > 0 && branchesData.length > 0) {
    const branchMap = {};
    bookCopiesData.forEach((copy) => {
      const bId = String(copy.branch_id);
      if (bId !== "undefined" && bId !== "null") {
        if (!branchMap[bId]) branchMap[bId] = 0;
        branchMap[bId]++;
      }
    });

    const uniqueBranchIds = Object.keys(branchMap);
    
    if (uniqueBranchIds.length > 0) {
      popupBranches = uniqueBranchIds.map((id) => {
        const found = branchesData.find((b) => String(b.branch_id || b.id) === String(id));
        return {
          branch_id: id,
          name: found?.name || `Branch ${id}`,
          location: found?.location || "N/A",
          count: branchMap[id]
        };
      });

      if (uniqueBranchIds.length <= 2) {
        branchElement = popupBranches.map(b => b.name).join(", ");
      } else {
        const firstTwo = popupBranches.slice(0, 2).map(b => b.name).join(", ");
        branchElement = (
          <span>
            {firstTwo},{" "}
            <button 
              onClick={() => setShowBranchesPopup(true)} 
              className="text-[#000035]/70 hover:text-[#000035] dark:text-[#D7D7D7]/70 dark:hover:text-[#D7D7D7] underline font-medium cursor-pointer"
            >
              ...See more
            </button>
          </span>
        );
      }
    }
  }

  if (branchEntry || (isBookVariant && popupBranches.length > 0)) {
    detailsEntries.push(["Branch", branchElement]);
  }
  if (categoryEntry) detailsEntries.push(categoryEntry);
  if (detailsEntries.length < 2) {
    remainingEntries.forEach((entry) => {
      if (detailsEntries.length < 2) detailsEntries.push(entry);
    });
  }

  const userDetailsEntries = [
    ["ID User", firstMatchingEntry(["ID User", "User ID"])?.[1]],
    ["Email", firstMatchingEntry(["Email"])?.[1]],
    ["Plan", firstMatchingEntry(["Plan"])?.[1]],
    ["Branch", firstMatchingEntry(["Branch", "Branch Name"])?.[1]],
  ];

  const visibleDetailsEntries = isUserVariant
    ? userDetailsEntries
    : detailsEntries;

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
        maxWidthClass={
          maxWidthClassOverride || (isBookVariant ? "max-w-[75rem]" : "w-min")
        }
        panelClassName={`!p-0 ${isBookVariant ? "h-full max-h-[43.75rem]" : "h-auto"} overflow-hidden rounded-[0.875rem] border border-[#cfcfcf] bg-[#ebebeb] shadow-[0_1.5rem_4.375rem_rgba(0,0,0,0.45)] dark:border-[#D7D7D7] dark:bg-[#121317]`}
        contentClassName={`${isBookVariant ? "h-full overflow-y-auto" : "h-auto overflow-hidden"} p-0 overflow-x-hidden`}
        hideHeader
        hideDivider
        heightClass={isBookVariant ? "px-1 py-1 sm:px-4 sm:py-4" : "p-0"}
      >
        <div
          className={`relative grid ${
            isBookVariant
              ? "h-full grid-cols-1 lg:grid-cols-[27.5rem_0.0625rem_1fr]"
              : isUserVariant
                ? "h-auto grid-cols-1 lg:grid-cols-[20rem_0.0625rem_minmax(0,1fr)]"
                : "h-auto grid-cols-1 lg:grid-cols-[auto_0.0625rem_auto]"
          }`}
        >
          <button
            onClick={onClose}
            className="lg:hidden absolute left-0 top-4 z-10 cursor-pointer rounded-r-full border-y border-r border-[#000035] bg-[#ebebeb] px-4 py-1 font-['Noto_Sans_Georgian',sans-serif] text-xs font-medium text-[#000035] transition-colors hover:bg-[#000035] hover:text-white dark:border-white dark:bg-[#121317] dark:text-white dark:hover:bg-white dark:hover:text-[#121317]"
          >
            BACK
          </button>
          <div
            className={`flex flex-col items-center justify-center ${isBookVariant ? "px-10 pb-10 pt-10" : "p-10"}`}
          >
            <div className="flex items-center justify-center">
              {isBookVariant ? (
                imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={imageAlt || String(headingText || "Details")}
                    className="h-[37.5rem] w-[29.375rem] max-w-full border border-[#cecece] object-cover"
                  />
                ) : (
                  <div className="flex h-[37.5rem] w-[25rem] max-w-full items-center justify-center border border-[#cecece] bg-gradient-to-br from-[#000035] to-[#192261]">
                    <Book size={48} className="text-[#F2F2F2]" />
                  </div>
                )
              ) : (
                <div className="relative flex aspect-square h-[12.5rem] w-[12.5rem] items-center justify-center p-2">
                  {imageUrl ? (
                    <div className="-mt-4 h-full w-full overflow-hidden rounded-full">
                      <img
                        src={imageUrl}
                        alt={imageAlt || String(headingText || "Details")}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="-mt-4 flex h-full w-full items-center justify-center rounded-full bg-[#000035] dark:bg-[#D7D7D7]">
                      <UserRound
                        size={64}
                        className="text-[#F2F2F2] dark:text-[#121317]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {variant === "details" && savedBy && (
              <div className="mt-4 self-start">
                <p className="text-[0.625rem] text-[#000035]/50 dark:text-[#D7D7D7]/50">
                  Added by: {savedBy.name}
                </p>
              </div>
            )}
          </div>

          <div
            className={`${isBookVariant ? "my-6" : "my-3 h-auto min-h-[8.75rem]"} mx-auto hidden w-px bg-[#000035]/50 lg:block dark:bg-[#D7D7D7]/50`}
          />

          <div
            className={`flex min-h-0 flex-1 flex-col justify-center ${
              isBookVariant
                ? "px-12 py-12"
                : isUserVariant
                  ? "px-8 py-6"
                  : "py-3 pl-4 pr-6"
            }`}
          >
            {/* Header and Details - Fixed */}
            <div className="shrink-0">
              <div className="flex flex-col items-start">
                <h3
                  className={`truncate font-bold uppercase leading-[1.1] tracking-[0.0313rem] text-[#000035] dark:text-[#D7D7D7] ${isBookVariant ? "text-4xl font-bold sm:text-5xl lg:text-[3.5rem]" : "text-4xl font-bold sm:text-5xl lg:text-[3.5rem]"}`}
                  style={{
                    fontFamily: isBookVariant
                      ? "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif"
                      : "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif",
                  }}
                  title={String(headingText || "N/A")}
                >
                  {String(headingText || "N/A")}
                </h3>
                {isBookVariant && bookReviews.length > 0 && (
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
                  className={`font-medium text-[#000035] dark:text-[#D7D7D7] ${isBookVariant ? "text-xl sm:text-[1.75rem]" : "mb-6 text-2xl sm:text-[2rem]"}`}
                >
                  {subtitleText}
                </p>
              )}

              <div
                className={`flex flex-col ${isBookVariant ? "mt-6 gap-4" : "mt-1 gap-2"}`}
                style={{
                  fontFamily: "'Noto Sans Georgian', sans-serif",
                }}
              >
                {visibleDetailsEntries.map(([key, value]) => (
                  <p
                    key={key}
                    className={`whitespace-nowrap text-[#000035] dark:text-[#D7D7D7] ${isBookVariant ? "text-xl sm:text-[1.75rem]" : "text-base font-medium sm:text-[1.25rem]"}`}
                  >
                    {key} :{" "}
                    <span className="font-normal">{toDisplayValue(value)}</span>
                  </p>
                ))}
              </div>

              {isBookVariant && (
                <div className="my-6 h-px w-full max-w-[17.5rem] bg-[#000035] dark:bg-[#D7D7D7]" />
              )}
            </div>

            {/* Custom Content or Reviews - Scrolling */}
            {hasCustomContent ? (
              <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            ) : bookId ? (
              <div className="flex min-h-0 flex-1 flex-col gap-5">
                <div className="shrink-0">
                  <h4
                    className="mb-2 text-4xl text-[#000035] sm:text-[3rem] dark:text-[#D7D7D7]"
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
                        <LoadingSpinner size="md" />
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
                    bookReviews.map((review) => {
                      const hasReplies =
                        review.replies && review.replies.length > 0;
                      return (
                        <div
                          key={review.review_id}
                          className="rounded-[0.75rem] border border-[#000035] bg-transparent dark:border-[#D7D7D7]"
                        >
                          {/* PARENT ROW */}
                          <div
                            className={`flex px-3 pr-4 ${hasReplies ? "items-stretch pb-0 pt-2.5" : "items-center py-2.5"}`}
                          >
                            <div className="flex w-14 min-w-[3.5rem] shrink-0 flex-col items-center">
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
                                {review.user_image_url ? (
                                  <img
                                    src={`data:image/png;base64,${review.user_image_url}`}
                                    alt={review.user_name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <UserRound className="h-14 w-14 text-[#000035] dark:text-[#121317]" />
                                )}
                              </div>
                              {hasReplies && (
                                <div className="flex-1 border-l-[0.0938rem] border-[#000035] dark:border-[#D7D7D7]"></div>
                              )}
                            </div>
                            <div className="flex min-w-0 flex-1 items-center justify-between gap-4 pl-3">
                              <div className="min-w-0 pt-0.5">
                                <div className="flex flex-col items-start min-[48rem]:flex-row min-[48rem]:items-center gap-0 min-[48rem]:gap-2">
                                  <span className="truncate text-[1rem] max-[48rem]:text-[0.875rem] font-semibold leading-tight text-[#000035] dark:text-[#D7D7D7]">
                                    {review.user_name?.toUpperCase() || "GUEST"}
                                  </span>
                                  <div className="flex gap-0.5">
                                    {renderStars(
                                      review.rating || review.rate,
                                      12,
                                    )}
                                  </div>
                                </div>
                                {(review.review || review.review_text) && (
                                  <p className="mt-1 text-[0.8125rem] text-[#000035] dark:text-[#D7D7D7]">
                                    {review.review || review.review_text}
                                  </p>
                                )}
                                <p className="mt-1 text-xs text-[#8c8c8c] dark:text-[#A3A3A3]">
                                  {timeSince(review.created_at)}
                                </p>
                              </div>
                              <FormButton
                                isPrimary
                                fullWidth={false}
                                onClick={() =>
                                  handleActionRequiringLogin(() => {
                                    setReplyingTo(review.review_id);
                                    setShowRatePopup(true);
                                  })
                                }
                                className="h-9 w-[9.375rem] shrink-0 !p-0 text-sm max-[48rem]:hidden"
                              >
                                Reply
                              </FormButton>
                            </div>
                          </div>

                          {/* REPLY ROWS — each reply is its own sibling row */}
                          {hasReplies &&
                            review.replies.map((reply, idx) => {
                              const isLast = idx === review.replies.length - 1;
                              return (
                                <div
                                  key={reply.reply_id}
                                  className={`flex gap-0 px-3 pr-4 ${isLast ? "pb-2.5" : "pb-0"}`}
                                >
                                  {/* Left col: L-shaped connector (same width 3.5rem keeps alignment) */}
                                  <div className="flex w-14 min-w-[3.5rem] shrink-0 flex-col">
                                    {/* L curve: border-l (vertical) + border-b (horizontal) + rounded-bl (curve) */}
                                    <div
                                      className="shrink-0 rounded-bl-[0.75rem] border-b-[0.0938rem] border-l-[0.0938rem] border-[#000035] dark:border-[#D7D7D7]"
                                      style={{
                                        height: "1.75rem",
                                        width: "1.75rem",
                                        marginLeft: "1.75rem",
                                      }}
                                    />
                                    {!isLast && (
                                      <div
                                        className="flex-1 border-l-[0.0938rem] border-[#000035] dark:border-[#D7D7D7]"
                                        style={{ marginLeft: "1.75rem" }}
                                      ></div>
                                    )}
                                  </div>
                                  {/* Reply avatar + content, shifted down so avatar center = L bottom */}
                                  <div className="mt-[0.5rem] flex min-w-0 flex-1 items-start gap-3">
                                    <div className="flex h-10 w-10 min-w-[2.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
                                      {reply.user_image_url ? (
                                        <img
                                          src={`data:image/png;base64,${reply.user_image_url}`}
                                          alt={reply.user_name}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <UserRound className="h-10 w-10 text-[#000035] dark:text-[#121317]" />
                                      )}
                                    </div>
                                    <div className="min-w-0 pt-0.5">
                                      <span className="block truncate text-[0.875rem] max-[48rem]:text-[0.75rem] font-semibold leading-tight text-[#000035] dark:text-[#D7D7D7]">
                                        {reply.user_name?.toUpperCase() ||
                                          "GUEST"}
                                      </span>
                                      <p className="mt-1 text-[0.8125rem] text-[#000035] dark:text-[#D7D7D7]">
                                        {reply.reply_text}
                                      </p>
                                      <p className="mt-1 text-xs text-[#8c8c8c] dark:text-[#A3A3A3]">
                                        {timeSince(reply.created_at)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          
                          {/* MOBILE REPLY BUTTON */}
                          <div className="max-[48rem]:flex hidden px-3 pb-2.5 justify-end">
                            <FormButton
                              isPrimary
                              fullWidth={false}
                              onClick={() =>
                                handleActionRequiringLogin(() => {
                                  setReplyingTo(review.review_id);
                                  setShowRatePopup(true);
                                })
                              }
                              className="h-9 w-full shrink-0 !p-0 text-sm"
                            >
                              Reply
                            </FormButton>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex shrink-0 gap-3 pt-2">
                  {isAdmin && bookCopiesData.length > 0 && (
                    <FormButton
                      isPrimary
                      fullWidth={false}
                      onClick={() => setShowCopiesPopup(true)}
                      className={`h-[3.375rem] w-[11.875rem] cursor-pointer rounded-[0.625rem] !p-0 text-[1.125rem] transition-colors`}
                    >
                      Show IDs
                    </FormButton>
                  )}
                  <FormButton
                    isPrimary
                    fullWidth={false}
                    onClick={() =>
                      handleActionRequiringLogin(() => {
                        setReplyingTo(null);
                        setShowRatePopup(true);
                      })
                    }
                    className={`h-[3.375rem] w-[11.875rem] cursor-pointer rounded-[0.625rem] !p-0 text-[1.125rem] transition-colors`}
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
        onClose={() => {
          setShowRatePopup(false);
          setReplyingTo(null);
        }}
        bookId={bookId}
        initialReview={existingReview}
        replyToReviewId={replyingTo}
      />
      <BookCopiesViewPopup
        show={showCopiesPopup}
        onClose={() => setShowCopiesPopup(false)}
        bookName={data?.["Name"] || data?.["Book Name"]}
        copies={bookCopiesData}
      />
      <BookBranchesPopup
        show={showBranchesPopup}
        onClose={() => setShowBranchesPopup(false)}
        bookName={data?.["Name"] || data?.["Book Name"]}
        branches={popupBranches}
      />
    </>
  );
};

export default ViewDetailsPopup;
