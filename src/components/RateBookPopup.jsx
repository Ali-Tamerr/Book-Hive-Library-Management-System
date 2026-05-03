import React, { useEffect, useState } from "react";
import { MessageSquareText, Star, StarHalf } from "lucide-react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import FormInput from "./FormInput.jsx";

import { getCurrentUser } from "../services/auth.api";
import {
  useCreateBookReview,
  useCreateBookReviewReply,
} from "../hooks/useBookReviews.js";

const RateBookPopup = ({
  show,
  onClose,
  bookId,
  initialReview,
  replyToReviewId = null,
}) => {
  const isReply = !!replyToReviewId;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (show) {
      if (!isReply) {
        setRating(initialReview?.rating || initialReview?.rate || 0);
        setReviewText(
          initialReview?.review_text || initialReview?.review || ""
        );
      } else {
        setRating(0);
        setReviewText("");
        setShowWarning(false);
      }
    }
  }, [show, initialReview, isReply]);

  const createBookReviewMutation = useCreateBookReview();
  const createReplyMutation = useCreateBookReviewReply();

  const handleSubmit = async () => {
    if (!isReply && rating < 0.5) {
      setShowWarning(true);
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write a text before submitting.");
      return;
    }

    if (!bookId) {
      console.error("Missing bookId");
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser?.user_id) {
      alert("Please sign in to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isReply) {
        await createReplyMutation.mutateAsync({
          book_id: bookId,
          review_id: replyToReviewId,
          user_id: currentUser.user_id,
          reply_text: reviewText.trim(),
        });
      } else {
        await createBookReviewMutation.mutateAsync({
          book_id: bookId,
          user_id: currentUser.user_id,
          review_text: reviewText.trim(),
          rating: Math.round(rating),
        });
      }

      setRating(0);
      setReviewText("");
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isReply) {
      setRating(0);
      setHoverRating(0);
    }
    setReviewText("");
    onClose();
  };

  const handleMouseMove = (e, star) => {
    if (isReply) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - left < width / 2;
    setHoverRating(isLeftHalf ? star - 0.5 : star);
  };

  const handleStarClick = () => {
    if (isReply) return;
    setRating(hoverRating);
    setShowWarning(false);
  };

  return (
    <Popup
      show={show}
      onClose={handleCancel}
      title={isReply ? "COMMENT REPLY" : "RATE BOOK"}
      icon={<MessageSquareText size={24} />}
      maxWidthClass="max-w-[43.75rem]"
    >
      <div className="flex w-full flex-col gap-6 px-4 pb-4">
        <div className="flex w-full items-center justify-center">
          <FormInput
            type="textarea"
            className="h-45 w-full resize-none text-[#000035] placeholder:text-[#000035] dark:text-[#D7D7D7] dark:placeholder:text-[#D7D7D7] border-[#000035] dark:border-[#D7D7D7] text-[1.125rem] "
            placeholder={isReply ? "Write your reply..." : "Share your opinion"}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        {!isReply && (
          <div
            className="flex items-center justify-center gap-2"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const value = hoverRating || rating;
              const isFull = value >= star;
              const isHalf = !isFull && value > star - 1;

              return (
                <button
                  key={star}
                  type="button"
                  className="cursor-pointer transition-transform hover:scale-110"
                  onMouseMove={(e) => handleMouseMove(e, star)}
                  onClick={handleStarClick}
                >
                  <div className="relative">
                    <Star
                      size={38}
                      className="text-[#000035] dark:text-[#D7D7D7]"
                      strokeWidth={1.5}
                    />
                    {isFull && (
                      <Star
                        size={38}
                        className="absolute left-0 top-0 fill-[#000035] text-[#000035] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                        strokeWidth={1.5}
                      />
                    )}
                    {isHalf && (
                      <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
                        <Star
                          size={38}
                          className="min-w-9.5 fill-[#000035] text-[#000035] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                          strokeWidth={1.5}
                          style={{
                            width: "2.375rem",
                            height: "2.375rem",
                            minWidth: "2.375rem",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {showWarning && !isReply && (
          <div className="text-center text-sm font-semibold text-red-500">
            Please pick a star rating.
          </div>
        )}

        <div className="mt-4 flex gap-4">
          <FormButton
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            CANCEL
          </FormButton>
          <FormButton
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            isPrimary
          >
            {isSubmitting ? "Sending..." : "Send"}
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default RateBookPopup;
