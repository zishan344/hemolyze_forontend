import { useState, useEffect } from "react";
import { X, DropletIcon } from "lucide-react";
import BloodRequestForm from "../BloodRequestForm";
import { RequestRecord } from "./BloodRequestType";

interface BloodRequestModalProps {
  isVisible: boolean;
  onClose: () => void;
  requestToUpdate?: RequestRecord | null;
  onRequestSubmitted?: () => void;
  title?: string;
}

const BloodRequestModal = ({
  isVisible,
  onClose,
  requestToUpdate,
  onRequestSubmitted,
  title = requestToUpdate ? "Update Blood Request" : "Create Blood Request",
}: BloodRequestModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Handle form submission
  const handleRequestSubmitted = () => {
    if (onRequestSubmitted) {
      onRequestSubmitted();
    }
    handleClose();
  };

  // Close modal if user presses escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true">
      {/* Modal overlay - semi-transparent background */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal content */}
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-base-100 shadow-xl transition-transform duration-300 ${
          isClosing ? "translate-y-[-10px]" : "translate-y-0"
        }`}
        onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1 text-base-content/50 hover:bg-base-200 hover:text-base-content z-10"
          aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal header */}
        <div className="bg-base-200 p-4 rounded-t-lg">
          <div className="flex items-center">
            <DropletIcon className="h-6 w-6 stroke-primary fill-primary/20 mr-2" />
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-4">
          <BloodRequestForm
            onRequestSubmitted={handleRequestSubmitted}
            requestToUpdate={requestToUpdate}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BloodRequestModal;
