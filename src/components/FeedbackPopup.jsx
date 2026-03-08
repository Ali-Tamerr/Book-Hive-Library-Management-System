import React, { useState } from "react";
import { ThumbsUp, Star, StarHalf } from "lucide-react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import FormInput from "./FormInput.jsx";

import { getCurrentUser } from "../services/auth.api";
import { useCreateFeedback } from "../hooks/useFeedbacks.js";

const FeedbackPopup = ({ show, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const createFeedbackMutation = useCreateFeedback();

  const handleSubmit = async () => {
    if (rating === 0) {
      setShowWarning(true);
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser?.user_id) {
      alert("Please sign in to submit feedback.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newFeedback = {
        user_id: currentUser.user_id,
        description: feedbackText,
        rate: Math.round(rating),
      };

      await createFeedbackMutation.mutateAsync(newFeedback);

      setRating(0);
      setFeedbackText("");
      onClose();
    } catch (error) {
      console.error("Feedback submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setHoverRating(0);
    setFeedbackText("");
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
      title="Rate your experience"
      icon={<ThumbsUp size={24} />}
      maxWidthClass="max-w-[600px]"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full items-center justify-center">
          <FormInput
            type="textarea"
            className="h-[150px] w-full max-w-[400px] resize-none"
            placeholder="Share your experience"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </div>

        <div
          className="flex items-center justify-center gap-2"
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const value = hoverRating || rating;
            const isFull = value >= star;
            const isHalf = !isFull && value >= star - 0.5;

            return (
              <button
                key={star}
                type="button"
                className="cursor-pointer transition-transform hover:scale-110 "
                onMouseMove={(e) => handleMouseMove(e, star)}
                onClick={handleStarClick}
              >
                <div className="relative">
                  <Star
                    size={34}
                    className="text-[#0b0b3b] dark:text-[#D7D7D7]"
                    strokeWidth={1.5}
                  />
                  {isFull && (
                    <Star
                      size={34}
                      className="absolute left-0 top-0 fill-[#0b0b3b] text-[#0b0b3b] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                      strokeWidth={1.5}
                    />
                  )}
                  {isHalf && (
                    <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
                      <Star
                        size={34}
                        className="min-w-[34px] fill-[#0b0b3b] text-[#0b0b3b] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                        strokeWidth={1.5}
                        style={{
                          width: "34px",
                          height: "34px",
                          minWidth: "34px",
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
            Please select a rating.
          </div>
        )}

        <div className="mt-2 flex gap-4">
          <FormButton onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </FormButton>
          <FormButton onClick={handleSubmit} disabled={isSubmitting} isPrimary>
            {isSubmitting ? "Sending..." : "Send"}
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default FeedbackPopup;
