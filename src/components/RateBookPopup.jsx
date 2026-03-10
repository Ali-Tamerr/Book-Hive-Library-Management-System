import React, { useEffect, useState } from "react";
import { MessageSquareText, Star, StarHalf } from "lucide-react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import FormInput from "./FormInput.jsx";

import { getCurrentUser } from "../services/auth.api";
import { useCreateBookReview } from "../hooks/useBookReviews.js";

const RateBookPopup = ({ show, onClose, bookId, initialReview }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (show) {
      setRating(initialReview?.rating || initialReview?.rate || 0);
      setReviewText(initialReview?.review_text || initialReview?.review || "");
    }
  }, [show, initialReview]);

  const createBookReviewMutation = useCreateBookReview();

  const handleSubmit = async () => {
    if (rating < 0.5) {
      setShowWarning(true);
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    if (!bookId) {
      console.error("Missing bookId");
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser?.user_id) {
      alert("Please sign in to submit a review.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newReview = {
        book_id: bookId,
        user_id: currentUser.user_id,
        review_text: reviewText.trim(),
        rating: Math.round(rating),
      };

      await createBookReviewMutation.mutateAsync(newReview);

      setRating(0);
      setReviewText("");
      onClose();
    } catch (error) {
      console.error("Review submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setHoverRating(0);
    setReviewText("");
    onClose();
  };

  const handleMouseMove = (e, star) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - left < width / 2;
    setHoverRating(isLeftHalf ? star - 0.5 : star);
  };

  const handleStarClick = () => {
    setRating(hoverRating);
    setShowWarning(false);
  };

  return (
    <Popup
      show={show}
      onClose={handleCancel}
      title="RATE BOOK"
      icon={<MessageSquareText size={24} />}
      maxWidthClass="max-w-[700px]"
    >
      <div className="flex w-full flex-col gap-6 px-4 pb-4">
        <div className="flex w-full items-center justify-center">
          <FormInput
            type="textarea"
            className="h-[180px] w-full resize-none border-[#A3A3A3] text-[18px] dark:border-[#000035] dark:bg-[#1E1E1E]"
            placeholder="Share your opinion"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

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
                    className="text-[#00004f] dark:text-[#D7D7D7]"
                    strokeWidth={1.5}
                  />
                  {isFull && (
                    <Star
                      size={38}
                      className="absolute left-0 top-0 fill-[#00004f] text-[#00004f] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                      strokeWidth={1.5}
                    />
                  )}
                  {isHalf && (
                    <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
                      <Star
                        size={38}
                        className="min-w-[38px] fill-[#00004f] text-[#00004f] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                        strokeWidth={1.5}
                        style={{
                          width: "38px",
                          height: "38px",
                          minWidth: "38px",
                        }}
                      />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showWarning && (
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
