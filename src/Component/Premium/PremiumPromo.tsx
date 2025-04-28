import { Crown } from "lucide-react";

const PremiumPromo = () => {
  return (
    <div className="bg-base-100 shadow-md rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Crown size={36} className="text-amber-500 mr-3" />
          <div>
            <h2 className="text-xl font-bold">Upgrade to Premium</h2>
            <p className="text-base-content/70">
              Get priority access to blood requests and additional benefits
            </p>
          </div>
        </div>
        <a href="/dashboard/premium" className="btn btn-primary">
          View Premium Benefits
        </a>
      </div>
    </div>
  );
};

export default PremiumPromo;
