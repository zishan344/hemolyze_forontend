import { useState } from "react";
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentOptions from "../Component/Payment/PaymentOptions";

import useAuthContext from "../Hooks/useAuthContext";
import authApiClient from "../Service/authApiClient";
import PaymentSuccess from "../Component/Payment/PaymentSuccess";

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
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle payment submission
  const handlePaymentSubmit = async (amount: number) => {
    // console.log("heare are donation amount,", amount);
    try {
      setIsProcessing(true);
      setErrorMessage(null);
      const response = await authApiClient.post("payment/initiate/", {
        amount,
      });
      if (response.data.payment_url) {
        setIsProcessing(false);
        window.location.href = response.data.payment_url;
      } else {
        alert("Payment failed");
      }
      // setPaymentSuccess(true);
      // Reset form after successful payment
      /* setTimeout(() => {
        setAmount(25);
        setPaymentSuccess(false);
      }, 5000); */
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(
        "There was an error processing your payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
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
      {/* <PaymentSuccess amount={amount} paymentSuccess={paymentSuccess} /> */}

      {!paymentSuccess && (
        <div className="  max-w-3xl mx-auto">
          {/* Donation type selection - Left sidebar */}

          {/* Main payment content - Right area */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <PaymentOptions
                onAmountSelect={setAmount}
                selectedAmount={amount}
              />
              <div className="flex justify-between mt-6">
                <Link to="/dashboard" className="btn btn-outline">
                  <ArrowLeft size={16} className="mr-2" />
                  Cancel
                </Link>
                <button
                  disabled={isProcessing}
                  onClick={() => handlePaymentSubmit(amount)}
                  className="btn btn-primary">
                  {isProcessing ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
