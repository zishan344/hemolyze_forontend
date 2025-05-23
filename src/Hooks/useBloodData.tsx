import { useCallback, useEffect, useState } from "react";
import authApiClient from "../Service/authApiClient";
import { Donor } from "../types/Donor/Donor.typ";
import {
  acceptedBloodDonations,
  BloodRequestItem,
} from "../types/Dashboard/DonationRequests.types";
import useAuthContext from "./useAuthContext";
import { RequestRecord } from "../Component/Dashboard/BloodRequest/BloodRequestType";
import apiClient from "../Service/apiClient";

const useBloodData = () => {
  const { user } = useAuthContext();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [bloodDonationRequests, setBloodDonationRequests] = useState<
    BloodRequestItem[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bloodDonationAccepted, setBloodDonationAccepted] = useState<
    acceptedBloodDonations[]
  >([]);
  const [requestHistory, setRequestHistory] = useState<RequestRecord[]>([]);
  // fetching my blood request data

  useEffect(() => {
    if (user) {
      fetchOwnBloodRequestData();
    }
  }, [user]);

  const fetchOwnBloodRequestData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the API endpoint to get user's blood requests
      const response = await authApiClient.get("/blood-request/my-requests/");
      setRequestHistory(response.data);
    } catch (err: unknown | any) {
      console.error("Error fetching blood requests:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load blood request data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // fetching donor
  const fetchDonors = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      // This endpoint is assumed based on your API structure
      const response = await apiClient.get("/donar-list/");
      setDonors(response.data);
      setFilteredDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setError("Failed to load available donors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // handle blood donations,blood request`
  const fetchDonationRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the API endpoint for available blood requests
      const response = await authApiClient.get("/blood-request/");

      // Filter out any requests created by the current user - donors shouldn't see their own requests
      const filteredRequests = user?.id
        ? response.data.filter((req: BloodRequestItem) => req.user !== user.id)
        : response.data;

      setBloodDonationRequests(filteredRequests);
      // Update stats
    } catch (err: any) {
      console.error("Error fetching blood requests:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load blood requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchBloodDonationAccepted = useCallback(async () => {
    setUpdateLoading(true);
    setError(null);
    try {
      // Get the user's accepted requests
      const response = await authApiClient.get(`my-donations/`);
      setBloodDonationAccepted(response.data);
    } catch (err: any) {
      console.error("Error fetching accepted requests:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load accepted requests. Please try again."
      );
    } finally {
      setUpdateLoading(false);
    }
  }, []);

  const handleRequestAccepted = async (requestId: number, units: number) => {
    try {
      // Accept the blood request
      await authApiClient.post(
        `/blood-request/${requestId}/accept-blood-request/`,
        { units }
      );

      // Show success message
      setSuccessMessage(
        "Blood request accepted successfully! The recipient has been notified."
      );

      // Refresh both the requests and accepted requests
      await fetchDonationRequests();

      // Clear the success message after a delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return Promise.resolve();
    } catch (err: any) {
      console.error("Error accepting request:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to accept request. Please try again."
      );
      return Promise.reject(err);
    }
  };

  const handleUpdateDonationStatus = async (
    acceptedRequestId: number,
    status: string
  ): Promise<void> => {
    try {
      // Update the donation status
      await authApiClient.patch(
        `/blood-request/accept-requests/${acceptedRequestId}/update-status/`,
        { donation_status: status }
      );
      // Show success message
      setSuccessMessage(`Donation status updated to "${status}" successfully!`);
      // Update local state to reflect the change
      // // Refresh both the requests and accepted requests
      await fetchDonationRequests();

      // Clear the success message after a delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return Promise.resolve();
    } catch (err: any) {
      console.error("Error updating donation status:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update donation status. Please try again."
      );
    }
  };

  const handleCancelBloodPostRequest = async (requestId: number) => {
    setUpdateLoading(true);
    setError(null);
    try {
      await authApiClient.patch(`/blood-request/${requestId}/`, {
        status: "cancelled",
      });

      // Update local state to reflect the change
      setRequestHistory((prevHistory) =>
        prevHistory.map((req) =>
          req.id === requestId ? { ...req, status: "cancelled" as const } : req
        )
      );
    } catch (err: unknown | any) {
      console.error("Error canceling request:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to cancel request. Please try again."
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // handle update, blood request
  const handleUpdateAcceptedBloodRequest = async (
    requestId: number,
    status: string
  ) => {
    setUpdateLoading(true);
    setError(null);
    try {
      await authApiClient.patch(
        `/blood-request/${requestId}/accept-blood-request/${requestId}/update-status/`,
        {
          donation_status: status,
        }
      );
      // Show success message
      setSuccessMessage(`Donation updated successfully!`);
      // Update local state to reflect the change
      if (status === "accepted_by_user") {
        setRequestHistory((prevHistory) =>
          prevHistory.map((req) =>
            req.id === requestId
              ? { ...req, status: "completed" as const }
              : req
          )
        );
      } else if (status === "canceled_by_user") {
        setRequestHistory((prevHistory) =>
          prevHistory.map((req) =>
            req.id === requestId ? { ...req, status: "pending" as const } : req
          )
        );
      }
    } catch (err: any) {
      console.error("Error canceling request:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to canceled to  request. Please try again."
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    fetchDonors,
    donors,
    filteredDonors,
    setFilteredDonors,
    fetchDonationRequests,
    bloodDonationRequests,
    handleUpdateDonationStatus,
    handleRequestAccepted,
    handleUpdateAcceptedBloodRequest,
    fetchBloodDonationAccepted,
    handleCancelBloodPostRequest,
    bloodDonationAccepted,
    requestHistory,
    successMessage,
    updateLoading,
    error,
    loading,
  };
};

export default useBloodData;
