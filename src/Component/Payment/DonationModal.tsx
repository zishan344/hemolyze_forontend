import { useState, useEffect } from "react";
import { X, Heart, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface DonationModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  specialEvent?: {
    name: string;
    date: string;
    icon: React.ReactNode;
  };
}

const DonationModal = ({
  isVisible,
  onClose,
  title = "Support Our Blood Donation Drive",
  description = "Your contribution helps save lives by ensuring blood is available when needed most.",
  specialEvent,
}: DonationModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
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

  // Choose a random amount to suggest
  const suggestedAmounts = [10, 25, 50];
  const randomAmount =
    suggestedAmounts[Math.floor(Math.random() * suggestedAmounts.length)];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true">
      {/* Modal overlay - semi-transparent background */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal content */}
      <div
        className={`relative mt-20 w-full max-w-md rounded-lg bg-base-100 shadow-xl transition-transform duration-300 ${
          isClosing ? "translate-y-[-10px]" : "translate-y-0"
        }`}
        onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1 text-base-content/50 hover:bg-base-200 hover:text-base-content"
          aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Special event banner if applicable */}
        {specialEvent && (
          <div className="bg-primary text-primary-content rounded-t-lg p-3 flex items-center justify-center">
            {specialEvent.icon}
            <span className="ml-2 font-medium">
              {specialEvent.name} - {specialEvent.date}
            </span>
          </div>
        )}

        {/* Modal body */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Heart className="h-8 w-8 fill-primary/20 stroke-primary mr-3" />
            <h3 className="text-xl font-bold">{title}</h3>
          </div>

          <p className="text-base-content/80 mb-6">{description}</p>

          {/* Quick donation buttons */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Make a quick donation:</h4>
            <div className="grid grid-cols-3 gap-3">
              {suggestedAmounts.map((amount) => (
                <Link
                  key={amount}
                  to={`/donation?amount=${amount}`}
                  className={`btn ${
                    amount === randomAmount ? "btn-primary" : "btn-outline"
                  }`}>
                  ${amount}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleClose}
              className="text-sm text-base-content/60 hover:text-base-content">
              Remind me later
            </button>

            <Link to="/donation" className="btn btn-primary">
              Donate Now
            </Link>
          </div>

          {/* Info footer */}
          <div className="mt-6 text-xs text-base-content/60 flex items-center">
            <Info size={12} className="mr-1" />
            <span>
              100% of donations directly support our blood donation programs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
