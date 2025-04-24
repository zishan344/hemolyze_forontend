import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DonationCTAProps {
  variant?: "compact" | "full";
  title?: string;
  description?: string;
  className?: string;
}

const DonationCTA = ({
  variant = "full",
  title = "Support Our Mission",
  description = "Help us connect blood donors with those in need. Your contribution makes a difference.",
  className = "",
}: DonationCTAProps) => {
  return variant === "compact" ? (
    <div className={`bg-base-200 p-4 rounded-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Heart className="text-primary mr-3" size={20} />
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-base-content/70">
              Your support saves lives
            </p>
          </div>
        </div>
        <Link to="/donation" className="btn btn-sm btn-primary">
          Donate
        </Link>
      </div>
    </div>
  ) : (
    <div
      className={`bg-base-100 p-6 rounded-lg shadow-md border-l-4 border-primary ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold flex items-center">
            <Heart className="text-primary mr-2 fill-primary/20" size={24} />
            {title}
          </h3>
          <p className="text-base-content/70 mt-2">{description}</p>
        </div>
        <Link to="/donation" className="btn btn-primary self-start">
          Make a Donation
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default DonationCTA;
