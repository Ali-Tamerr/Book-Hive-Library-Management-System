import React, { useState, useRef } from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import FormInput from "./FormInput.jsx";
import NFCReaderButton from "./NFCReaderButton.jsx";
import { Trash2 } from "lucide-react";

const DeleteConfirmationPopup = ({
  show,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  warningMessage,
  isDeleteDisabled,
  showNFCInput = false,
  bookId,
  context = "book_copy",
}) => {
  const [nfcId, setNfcId] = useState("");
  const [deleteAll, setDeleteAll] = useState(false);
  const inputRef = useRef(null);

  const handleNFCData = (data) => {
    setNfcId(data);
  };

  const handleConfirm = () => {
    if (showNFCInput) {
      onConfirm({ nfcId, deleteAll });
    } else {
      onConfirm();
    }
    setNfcId("");
    setDeleteAll(false);
  };

  const handleClose = () => {
    setNfcId("");
    setDeleteAll(false);
    onClose();
  };

  return (
    <Popup
      show={show}
      onClose={handleClose}
      title={title}
      icon={<Trash2 size={30} />}
      maxWidthClass="max-w-[40.4375rem]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full flex-col gap-4 px-5">
          <p className="text-start text-base font-medium text-[#000035] dark:text-gray-300">
            "Are you certain you wish to proceed with the deletion of the
            selected entry?"
          </p>

          {showNFCInput && (
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full gap-2">
                <NFCReaderButton
                  onDataReceived={handleNFCData}
                  inputRef={inputRef}
                  isFlexOne="true"
                />
                <FormInput
                  inputRef={inputRef}
                  type="text"
                  value={nfcId}
                  onChange={(e) => setNfcId(e.target.value)}
                  placeholder="ID"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="deleteAll"
                  checked={deleteAll}
                  onChange={(e) => setDeleteAll(e.target.checked)}
                  className="h-5 w-5 cursor-pointer rounded border-[#D7D7D7]"
                />
                <label
                  htmlFor="deleteAll"
                  className="cursor-pointer text-sm font-medium text-[#000035] dark:text-gray-300"
                >
                  Do you want Delete all
                </label>
              </div>
            </div>
          )}

          {warningMessage && (
            <p className="text-center text-sm font-medium text-red-600">
              {warningMessage}
            </p>
          )}
        </div>
        <div className="flex justify-between gap-3">
          <FormButton onClick={handleConfirm} disabled={isDeleteDisabled}>
            CONFIRM
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default DeleteConfirmationPopup;
