import { useState } from "react";
import { Crown, ArrowRight, Clock, Shield, Medal, Star } from "lucide-react";

// Mock membership data - would come from API in a real app
const mockMembershipData = {
  isPremium: false,
  expiryDate: null,
  requestsRemaining: 0,
  priorityLevel: 0,
};

// Premium tier details
const premiumTiers = [
  {
    name: "Basic",
    icon: <Shield className="text-secondary h-5 w-5" />,
    price: 25,
    period: "month",
    features: [
      "1 priority blood request per month",
      "24-hour donor match assistance",
      "Basic request tracking",
    ],
  },
  {
    name: "Standard",
    icon: <Medal className="text-primary h-5 w-5" />,
    price: 49,
    period: "month",
    features: [
      "3 priority blood requests per month",
      "48-hour guaranteed donor matching",
      "Dedicated support specialist",
      "Emergency transport coordination",
    ],
    recommended: true,
  },
  {
    name: "Premium",
    icon: <Crown className="text-amber-500 h-5 w-5" />,
    price: 99,
    period: "month",
    features: [
      "Unlimited priority blood requests",
      "24-hour guaranteed donor matching",
      "VIP support with personal coordinator",
      "Free emergency transport services",
      "Family coverage (up to 4 members)",
    ],
  },
];

const PremiumMembership = () => {
  const [membershipData] = useState(mockMembershipData);

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center">
            <Crown className="mr-2 text-amber-500" size={20} />
            Premium Membership
          </h2>
          <p className="text-base-content/70">
            Upgrade your account for priority blood request processing and
            additional benefits
          </p>
        </div>

        {membershipData.isPremium ? (
          <div className="mt-4 md:mt-0 flex items-center bg-success/10 text-success px-4 py-2 rounded-lg">
            <Shield className="mr-2" size={18} />
            <span>Active Premium Member</span>
          </div>
        ) : (
          <button className="mt-4 md:mt-0 btn btn-primary">
            Become a Premium Member
            <ArrowRight className="ml-1" size={16} />
          </button>
        )}
      </div>

      {membershipData.isPremium ? (
        <div className="bg-base-200 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Clock className="text-primary mr-2" size={20} />
              <div>
                <p className="text-sm text-base-content/70">
                  Membership expires
                </p>
                <p className="font-medium">December 31, 2025</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="text-primary mr-2" size={20} />
              <div>
                <p className="text-sm text-base-content/70">
                  Priority requests remaining
                </p>
                <p className="font-medium">3 this month</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="text-primary mr-2" size={20} />
              <div>
                <p className="text-sm text-base-content/70">Membership tier</p>
                <p className="font-medium">Standard</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {premiumTiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-base-200 p-6 rounded-lg border-2 relative flex flex-col ${
                tier.recommended ? "border-primary" : "border-transparent"
              }`}>
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded text-xs font-bold">
                  Recommended
                </div>
              )}
              <div className="flex items-center mb-4">
                {tier.icon}
                <h3 className="text-lg font-bold ml-2">{tier.name}</h3>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold">${tier.price}</span>
                <span className="text-base-content/70">/{tier.period}</span>
              </div>
              <ul className="mb-6 flex-1">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <div className="text-primary mr-2 mt-1">✓</div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`btn w-full ${
                  tier.recommended ? "btn-primary" : "btn-outline"
                }`}>
                Select {tier.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumMembership;
