import React from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { MessageSquare, Star, StarHalf } from "lucide-react";

const FeedbackDetailsPopup = ({ show, onClose, feedback, user }) => {
  if (!feedback) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => {
      const isFull = rating >= star;
      const isHalf = !isFull && rating >= star - 0.5;

      return (
        <div key={star} className="relative">
          <Star
            size={24}
            className="text-[#0b0b3b] dark:text-[#D7D7D7]"
            strokeWidth={1.5}
          />
          {isFull && (
            <Star
              size={24}
              className="absolute left-0 top-0 fill-[#0b0b3b] text-[#0b0b3b] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
              strokeWidth={1.5}
            />
          )}
          {isHalf && (
            <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
              <Star
                size={24}
                className="min-w-[24px] fill-[#0b0b3b] text-[#0b0b3b] dark:fill-[#D7D7D7] dark:text-[#D7D7D7]"
                strokeWidth={1.5}
                style={{ width: "24px", height: "24px", minWidth: "24px" }}
              />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Feedback Details"
      icon={<MessageSquare size={24} />}
      maxWidthClass="max-w-[700px]"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            From User
          </label>
          <div className="text-lg font-medium text-[#1e255e] dark:text-white">
            {user?.name || "Unknown User"}
          </div>
          <div className="text-sm text-gray-400">
            ID: {feedback.user_id} • {formatDate(feedback.created_at)}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Rating
          </label>
          <div className="flex gap-1">{renderStars(feedback.rate)}</div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Message
          </label>
          <div className="rounded-xl border border-[#3D3E3E] bg-white p-4 text-sm text-[#1e255e] dark:bg-[#121317] dark:text-[#D7D7D7]">
            {feedback.feedback ||
              feedback.description ||
              "No content provided."}
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          <FormButton onClick={onClose} isPrimary={false} className="">
            Close
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default FeedbackDetailsPopup;
