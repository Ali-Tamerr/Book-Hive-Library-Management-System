import React, { useState } from "react";
import { X, ThumbsUp, Star } from "lucide-react";

const FeedbackPopup = ({ show, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log("Submitting feedback:", { rating, feedbackText });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleCancel}></div>

      <div className="relative w-full max-w-[600px] flex flex-col rounded-[20px] bg-white dark:bg-[#121317] dark:border dark:border-[#2C2D33] p-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b0b3b] text-white dark:bg-[#D7D7D7] dark:text-[#0b0b3b]">
              <ThumbsUp size={24} fill="currentColor" />
            </div>
            <h2 className="text-xl font-bold text-[#0a0f33] dark:text-white">
              Rate your experience
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="rounded-lg border border-[#3D3E3E] p-1.5 text-[#3D3E3E] transition-colors hover:bg-gray-100 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#2C2D33]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="h-[1px] w-full bg-[#E3E3E3] dark:bg-[#2C2D33] mb-6"></div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <textarea
            className="w-full h-32 p-4 rounded-xl border border-[#E3E3E3] bg-transparent text-sm text-[#0a0f33] placeholder-gray-400 outline-none resize-none focus:border-[#0b0b3b] dark:border-[#2C2D33] dark:text-[#D7D7D7] dark:focus:border-[#D7D7D7]"
            placeholder="Share your experience"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          ></textarea>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-[#0b0b3b] text-[#0b0b3b] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleCancel}
              className="flex-1 py-3.5 rounded-xl bg-[#E3E3E3] text-[#0a0f33] font-bold text-sm uppercase tracking-wider hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-xl bg-[#0b0b3b] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#1a1a6a] transition-colors dark:bg-[#0b0b3b] dark:text-white dark:hover:bg-[#1a1a6a]"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
