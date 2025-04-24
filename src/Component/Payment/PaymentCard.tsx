import { CreditCard, Calendar, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type CardDetails = {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
};

interface PaymentCardProps {
  onPaymentSubmit: (data: CardDetails) => void;
  isProcessing: boolean;
}

const PaymentCard = ({ onPaymentSubmit, isProcessing }: PaymentCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardDetails>();

  const [cardType, setCardType] = useState<string>("");

  const detectCardType = (cardNumber: string) => {
    // Basic card type detection based on first digits
    const cleanedNumber = cardNumber.replace(/\s+/g, "");

    if (/^4/.test(cleanedNumber)) {
      setCardType("Visa");
    } else if (/^5[1-5]/.test(cleanedNumber)) {
      setCardType("MasterCard");
    } else if (/^3[47]/.test(cleanedNumber)) {
      setCardType("American Express");
    } else if (/^6(?:011|5)/.test(cleanedNumber)) {
      setCardType("Discover");
    } else {
      setCardType("");
    }
  };

  const formatCardNumber = (value: string) => {
    // Format the card number with spaces every 4 digits
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-base-content">Payment Details</h2>
        <div className="flex items-center">
          <CreditCard className="text-primary mr-2" size={24} />
          {cardType && <span className="text-sm font-medium">{cardType}</span>}
        </div>
      </div>

      <form onSubmit={handleSubmit(onPaymentSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-base-content mb-1">
            Card Number
          </label>
          <div className="relative">
            <CreditCard
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className={`input input-bordered w-full pl-10 ${
                errors.cardNumber ? "input-error" : ""
              }`}
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^[\d\s]{13,19}$/,
                  message: "Invalid card number",
                },
                onChange: (e) => {
                  const formattedValue = formatCardNumber(e.target.value);
                  e.target.value = formattedValue;
                  detectCardType(formattedValue);
                },
              })}
            />
          </div>
          {errors.cardNumber && (
            <p className="text-error text-sm mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-base-content mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className={`input input-bordered w-full ${
              errors.cardholderName ? "input-error" : ""
            }`}
            {...register("cardholderName", {
              required: "Cardholder name is required",
            })}
          />
          {errors.cardholderName && (
            <p className="text-error text-sm mt-1">
              {errors.cardholderName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Expiration Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className={`input input-bordered w-full pl-10 ${
                  errors.expiryDate ? "input-error" : ""
                }`}
                {...register("expiryDate", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Format: MM/YY",
                  },
                  onChange: (e) => {
                    // Auto format expiry date as MM/YY
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length > 2) {
                      e.target.value = `${value.slice(0, 2)}/${value.slice(
                        2,
                        4
                      )}`;
                    } else {
                      e.target.value = value;
                    }
                  },
                })}
              />
            </div>
            {errors.expiryDate && (
              <p className="text-error text-sm mt-1">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              CVV
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="123"
                maxLength={4}
                className={`input input-bordered w-full pl-10 ${
                  errors.cvv ? "input-error" : ""
                }`}
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "3 or 4 digits required",
                  },
                })}
              />
            </div>
            {errors.cvv && (
              <p className="text-error text-sm mt-1">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isProcessing}>
          {isProcessing ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-base-content/60">
        <p>Your payment information is securely processed</p>
        <div className="flex justify-center mt-3 space-x-2">
          <img src="/images/visa.svg" alt="Visa" className="h-6" />
          <img src="/images/mastercard.svg" alt="MasterCard" className="h-6" />
          <img src="/images/amex.svg" alt="American Express" className="h-6" />
          <img src="/images/discover.svg" alt="Discover" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
