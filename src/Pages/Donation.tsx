import { useState } from "react";
import {
  Heart,
  AlertCircle,
  PiggyBank,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import PaymentOptions from "../Component/Payment/PaymentOptions";
import PaymentCard from "../Component/Payment/PaymentCard";
import useAuthContext from "../Hooks/useAuthContext";

type CardDetails = {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
};

type DonationType = "general" | "emergency" | "priority";

const Donation = () => {
  const { user } = useAuthContext();
  const [amount, setAmount] = useState<number>(25);
  const [paymentType, setPaymentType] = useState<string>("credit_card");
  const [donationType, setDonationType] = useState<DonationType>("general");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentStep, setPaymentStep] = useState<number>(1);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle payment submission
  const handlePaymentSubmit = async (cardData: CardDetails) => {
    try {
      setIsProcessing(true);
      setErrorMessage(null);
      await cardData;
      // Simulate API call to payment processor
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, this would be an API call:
      // const response = await authApiClient.post("/payments/donate", {
      //   amount,
      //   paymentType,
      //   donationType,
      //   cardData: { // Only send necessary card data, not full details
      //     cardholderName: cardData.cardholderName,
      //     lastFourDigits: cardData.cardNumber.slice(-4),
      //     expiryDate: cardData.expiryDate
      //   }
      // });

      setPaymentSuccess(true);

      // Reset form after successful payment
      setTimeout(() => {
        setPaymentStep(1);
        setAmount(25);
        setPaymentType("credit_card");
        setDonationType("general");
        setPaymentSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(
        "There was an error processing your payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Get benefits based on donation type
  const getDonationTypeBenefits = (type: DonationType) => {
    switch (type) {
      case "emergency":
        return [
          "Support emergency blood needs in crisis situations",
          "Fund rapid transportation of blood to accident sites",
          "Enable mobile blood collection units",
        ];
      case "priority":
        return [
          "Prioritize your blood donation requests for 6 months",
          "Receive dedicated support from our donation coordinators",
          "Get exclusive access to specialized blood type matching",
        ];
      default:
        return [
          "Support general blood donation programs",
          "Help maintain blood supplies in local hospitals",
          "Fund donor recruitment and education programs",
        ];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Support Hemolyze
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Your financial contribution helps us maintain and grow our blood
          donation network, ensuring we can connect donors with recipients when
          they need it most.
        </p>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="alert alert-error mb-6 max-w-3xl mx-auto">
          <AlertCircle className="stroke-current shrink-0 h-6 w-6" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success message */}
      {paymentSuccess && (
        <div className="bg-base-100 rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-10 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={60} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            Thank You for Your Donation!
          </h2>
          <p className="mb-4">
            Your contribution of ${amount.toFixed(2)} has been received and will
            help save lives.
            {donationType === "priority" &&
              " Your account has been upgraded to priority status."}
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <button
              onClick={() => setPaymentSuccess(false)}
              className="btn btn-outline">
              Make Another Donation
            </button>
          </div>
        </div>
      )}

      {!paymentSuccess && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Donation type selection - Left sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-base-content mb-6">
                Donation Type
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => setDonationType("general")}
                  className={`w-full flex items-start p-4 rounded-lg border ${
                    donationType === "general"
                      ? "border-primary bg-primary/10"
                      : "border-base-300 hover:border-primary"
                  }`}>
                  <Heart
                    className={`mr-3 shrink-0 ${
                      donationType === "general" ? "text-primary" : ""
                    }`}
                  />
                  <div className="text-left">
                    <h3 className="font-medium">General Support</h3>
                    <p className="text-sm text-base-content/70">
                      Support our ongoing blood donation programs
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setDonationType("emergency")}
                  className={`w-full flex items-start p-4 rounded-lg border ${
                    donationType === "emergency"
                      ? "border-primary bg-primary/10"
                      : "border-base-300 hover:border-primary"
                  }`}>
                  <AlertCircle
                    className={`mr-3 shrink-0 ${
                      donationType === "emergency" ? "text-primary" : ""
                    }`}
                  />
                  <div className="text-left">
                    <h3 className="font-medium">Emergency Response Fund</h3>
                    <p className="text-sm text-base-content/70">
                      Help us respond quickly to crisis situations
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setDonationType("priority")}
                  className={`w-full flex items-start p-4 rounded-lg border ${
                    donationType === "priority"
                      ? "border-primary bg-primary/10"
                      : "border-base-300 hover:border-primary"
                  }`}>
                  <PiggyBank
                    className={`mr-3 shrink-0 ${
                      donationType === "priority" ? "text-primary" : ""
                    }`}
                  />
                  <div className="text-left">
                    <h3 className="font-medium">Priority Account</h3>
                    <p className="text-sm text-base-content/70">
                      Get priority access for your blood requests
                    </p>
                  </div>
                </button>
              </div>

              {/* Benefits of selected donation type */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-base-content/80">
                  {getDonationTypeBenefits(donationType).map(
                    (benefit, index) => (
                      <li key={index}>{benefit}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Main payment content - Right area */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="flex items-center mb-6">
                <div className="flex w-full">
                  <div
                    className={`flex-1 border-b-2 pb-2 ${
                      paymentStep >= 1 ? "border-primary" : "border-base-300"
                    }`}>
                    <span
                      className={`w-8 h-8 rounded-full inline-flex items-center justify-center mr-2 ${
                        paymentStep >= 1
                          ? "bg-primary text-white"
                          : "bg-base-300"
                      }`}>
                      1
                    </span>
                    <span
                      className={
                        paymentStep >= 1 ? "text-primary font-medium" : ""
                      }>
                      Amount
                    </span>
                  </div>
                  <div
                    className={`flex-1 border-b-2 pb-2 ${
                      paymentStep >= 2 ? "border-primary" : "border-base-300"
                    }`}>
                    <span
                      className={`w-8 h-8 rounded-full inline-flex items-center justify-center mr-2 ${
                        paymentStep >= 2
                          ? "bg-primary text-white"
                          : "bg-base-300"
                      }`}>
                      2
                    </span>
                    <span
                      className={
                        paymentStep >= 2 ? "text-primary font-medium" : ""
                      }>
                      Payment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {paymentStep === 1 && (
              <div className="mb-6">
                <PaymentOptions
                  onAmountSelect={setAmount}
                  onPaymentTypeSelect={setPaymentType}
                  selectedAmount={amount}
                  selectedPaymentType={paymentType}
                />
                <div className="flex justify-between mt-6">
                  <Link to="/dashboard" className="btn btn-outline">
                    <ArrowLeft size={16} className="mr-2" />
                    Cancel
                  </Link>
                  <button
                    onClick={() => setPaymentStep(2)}
                    disabled={amount <= 0}
                    className="btn btn-primary">
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 2 && (
              <div>
                {paymentType === "credit_card" ? (
                  <PaymentCard
                    onPaymentSubmit={handlePaymentSubmit}
                    isProcessing={isProcessing}
                  />
                ) : paymentType === "bank_transfer" ? (
                  <div className="bg-base-100 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-base-content mb-4">
                      Bank Transfer Details
                    </h2>
                    <p className="mb-6">
                      Please transfer ${amount.toFixed(2)} to the following
                      account:
                    </p>

                    <div className="p-4 bg-base-200 rounded-lg mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Bank Name:</p>
                          <p>National Blood Bank</p>
                        </div>
                        <div>
                          <p className="font-medium">Account Name:</p>
                          <p>Hemolyze Foundation</p>
                        </div>
                        <div>
                          <p className="font-medium">Account Number:</p>
                          <p>123456789</p>
                        </div>
                        <div>
                          <p className="font-medium">Routing Number:</p>
                          <p>987654321</p>
                        </div>
                        <div>
                          <p className="font-medium">Reference:</p>
                          <p>
                            {user?.username || "DONATION"}-
                            {new Date().getTime().toString().slice(-6)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-base-content/70 mb-6">
                      After making the transfer, please send your receipt to
                      donations@hemolyze.com with your username for
                      verification.
                    </p>

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={() => setPaymentStep(1)}
                        className="btn btn-outline">
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                      </button>
                      <button
                        onClick={() => {
                          setIsProcessing(true);
                          setTimeout(() => {
                            setPaymentSuccess(true);
                            setIsProcessing(false);
                          }, 1000);
                        }}
                        className="btn btn-primary"
                        disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Processing...
                          </>
                        ) : (
                          "I've Sent the Payment"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-base-100 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-base-content mb-4">
                      Digital Wallet
                    </h2>
                    <p className="mb-6">Choose your digital wallet provider:</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <button className="btn btn-outline w-full">PayPal</button>
                      <button className="btn btn-outline w-full">
                        Apple Pay
                      </button>
                      <button className="btn btn-outline w-full">
                        Google Pay
                      </button>
                    </div>

                    <p className="text-sm text-base-content/70 mb-6">
                      You'll be redirected to your selected payment provider to
                      complete the donation of ${amount.toFixed(2)}.
                    </p>

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={() => setPaymentStep(1)}
                        className="btn btn-outline">
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                      </button>
                      <button
                        onClick={() => {
                          setIsProcessing(true);
                          setTimeout(() => {
                            setPaymentSuccess(true);
                            setIsProcessing(false);
                          }, 2000);
                        }}
                        className="btn btn-primary"
                        disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Processing...
                          </>
                        ) : (
                          "Continue to Payment"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
