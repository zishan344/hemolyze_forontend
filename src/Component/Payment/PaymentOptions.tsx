import { Wallet, CreditCard, BanknoteIcon, Tag } from "lucide-react";
import { useState } from "react";

interface PaymentOptionsProps {
  onAmountSelect: (amount: number) => void;
  onPaymentTypeSelect: (paymentType: string) => void;
  selectedAmount: number;
  selectedPaymentType: string;
}

interface DonationOption {
  amount: number;
  description: string;
  impact: string;
}

interface PaymentType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const PaymentOptions = ({
  onAmountSelect,
  onPaymentTypeSelect,
  selectedAmount,
  selectedPaymentType,
}: PaymentOptionsProps) => {
  const [customAmount, setCustomAmount] = useState<string>("");

  // Predefined donation amounts with impact descriptions
  const donationOptions: DonationOption[] = [
    {
      amount: 10,
      description: "Basic Donor Support",
      impact: "Helps cover donor refreshments for one donation session",
    },
    {
      amount: 25,
      description: "Blood Testing Kit",
      impact: "Provides testing supplies for 5 blood donations",
    },
    {
      amount: 50,
      description: "Transportation Fund",
      impact: "Helps transport blood to rural hospitals",
    },
    {
      amount: 100,
      description: "Premium Supporter",
      impact: "Sponsors a small community blood drive",
    },
  ];

  // Payment method options
  const paymentTypes: PaymentType[] = [
    {
      id: "credit_card",
      name: "Credit Card",
      icon: <CreditCard className="mr-2" size={18} />,
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: <BanknoteIcon className="mr-2" size={18} />,
    },
    {
      id: "digital_wallet",
      name: "Digital Wallet",
      icon: <Wallet className="mr-2" size={18} />,
    },
  ];

  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    if (value && parseInt(value) > 0) {
      onAmountSelect(parseInt(value));
    }
  };

  // Select predefined amount
  const handleAmountSelect = (amount: number) => {
    setCustomAmount("");
    onAmountSelect(amount);
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-base-content mb-6">
        Choose Donation Amount
      </h2>

      {/* Predefined donation amounts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {donationOptions.map((option) => (
          <button
            key={option.amount}
            type="button"
            onClick={() => handleAmountSelect(option.amount)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
              selectedAmount === option.amount
                ? "border-primary bg-primary/10"
                : "border-base-300 hover:border-primary"
            }`}>
            <span className="text-xl font-bold text-primary">
              ${option.amount}
            </span>
            <span className="text-sm mt-1">{option.description}</span>
          </button>
        ))}
      </div>

      {/* Custom amount input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-base-content mb-2">
          Or enter custom amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/70">
            $
          </span>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Other amount"
            className="input input-bordered w-full pl-8"
          />
        </div>
      </div>

      {/* Impact information */}
      {selectedAmount > 0 && (
        <div className="flex items-center p-4 bg-primary/5 rounded-lg mb-8 border border-primary/20">
          <Tag className="text-primary mr-3 shrink-0" size={20} />
          <div>
            <p className="font-medium">Your Impact</p>
            <p className="text-sm text-base-content/70">
              {selectedAmount >= 100
                ? "Sponsors a community blood drive and supports donor recruitment"
                : selectedAmount >= 50
                ? "Helps transport blood to rural hospitals and clinics"
                : selectedAmount >= 25
                ? "Provides testing supplies for 5 blood donations"
                : "Helps cover donor refreshments and basic supplies"}
            </p>
          </div>
        </div>
      )}

      {/* Payment method selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paymentTypes.map((paymentType) => (
            <button
              key={paymentType.id}
              type="button"
              onClick={() => onPaymentTypeSelect(paymentType.id)}
              className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                selectedPaymentType === paymentType.id
                  ? "border-primary bg-primary/10"
                  : "border-base-300 hover:border-primary"
              }`}>
              {paymentType.icon}
              <span>{paymentType.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 p-4 rounded-lg bg-base-200">
        <div className="flex justify-between items-center">
          <span className="text-base-content/80">Selected amount:</span>
          <span className="text-lg font-bold text-primary">
            ${selectedAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
