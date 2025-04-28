import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div>
      <div className="bg-base-100 rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-10 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={60} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold mb-3">
          Thank You for Your Donation!
        </h2>
        <p className="mb-4">
          Your contribution has been received and will help save lives.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/donation" className="btn btn-outline">
            Make Another Donation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
