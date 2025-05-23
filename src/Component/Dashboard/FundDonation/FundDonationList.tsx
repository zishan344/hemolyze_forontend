import { Calendar, DollarSign, User } from "lucide-react";
import {
  FundDonation,
  FundDonationListProps,
} from "../../../types/Dashboard/FundDonation.type";
import ReceiptModal from "../AdminDashboard/ReceiptModal";
import { useState } from "react";

const FundDonationList = ({
  donations,
  loading,
  error,
  isAdmin,
}: FundDonationListProps) => {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<FundDonation | null>(
    null
  );
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleReceipt = (receiptInfo: FundDonation) => {
    setCurrentReceipt(receiptInfo);
    setShowReceiptModal(true);
  };

  const handleCloseModal = () => {
    setShowReceiptModal(false);
    setCurrentReceipt(null);
  };
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            {isAdmin && <th>Username</th>}
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="hover">
              <td>{donation.id}</td>
              {isAdmin && (
                <td>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span>{donation.username}</span>
                  </div>
                </td>
              )}
              <td>
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-success" />
                  <span>{formatCurrency(donation.amount)}</span>
                </div>
              </td>
              <td>
                <span className="text-xs font-mono bg-base-200 p-1 rounded">
                  {donation.transaction_id}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{formatDate(donation.created_date)}</span>
                </div>
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => {
                      // Handle receipt action
                      handleReceipt(donation);
                    }}>
                    Receipt
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {donations.length === 0 && !loading && !error && (
            <tr>
              <td
                colSpan={isAdmin ? 5 : 4}
                className="text-center py-8 text-gray-500">
                No donation records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Receipt Modal Component */}
      <ReceiptModal
        receiptInfo={currentReceipt}
        isOpen={showReceiptModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default FundDonationList;
