import { useState } from "react";
import { DonationRequestListType } from "../../../types/Dashboard/DonationRequests.types";
import RequestDetails from "./RequestDetails";

import useBloodDataContext from "../../../Hooks/useBloodDataContext";
import toast from "react-hot-toast";

const DonationRequestsList = ({
  filteredRequests,
  // loading,
  successMessage,
  error,
}: DonationRequestListType) => {
  const { handleRequestAccepted } = useBloodDataContext();
  const [processingRequestIds, setProcessingRequestIds] = useState<number[]>(
    []
  );

  const handleAcceptRequest = async (
    requestId: number,
    units: number
  ): Promise<void> => {
    try {
      setProcessingRequestIds((prev) => [...prev, requestId]);
      await handleRequestAccepted(requestId, units);
    } catch (err: unknown | any) {
      console.error("Error accepting request:", err);
    } finally {
      setProcessingRequestIds((prev) => prev.filter((id) => id !== requestId));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {successMessage && toast.success(successMessage)}
      {error && toast.error(error)}
      {filteredRequests.map((request) => {
        // const acceptedRequest = isRequestAccepted();
        return (
          <div
            key={request.id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="card-body p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Left side - Request details */}
                <RequestDetails
                  handleAcceptRequest={handleAcceptRequest}
                  loading={processingRequestIds.includes(request.id)}
                  request={{
                    id: request.id,
                    name: request.name,
                    blood_group: request.blood_group,
                    hospital_name: request.hospital_name,
                    hospital_address: request.hospital_address,
                    phone: request.phone,
                    required_units: request.required_units,
                    fulfilled_units: request.fulfilled_units,
                    urgency_level: request.urgency_level,
                    date: request.date,
                    created_at: request.created_at,
                    status: request.status,
                    description: request.description,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {filteredRequests.length === 0 && (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">No requests available</h3>
          <p className="text-base-content/70">
            There are no blood requests matching your current filters
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationRequestsList;
