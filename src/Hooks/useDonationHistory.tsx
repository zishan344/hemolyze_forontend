import { useEffect, useState } from "react";
import {
  AllDonationRecord,
  DonationHistoryApiResponse,
  DonationRecord,
  ReceivedRecord,
} from "../types/Dashboard/DonationHistory.type";
import authApiClient from "../Service/authApiClient";

const useDonationHistory = () => {
  const [AllDonations, setAllDonations] = useState<AllDonationRecord[]>([]);
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([]);
  const [receivedHistory, setReceivedHistory] = useState<ReceivedRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make real API call to fetch donation history
      const response = await authApiClient.get<DonationHistoryApiResponse>(
        "/donation-history/"
      );

      // Map API responses to our component's expected format
      const donationRecords: DonationRecord[] = response.data.donations.map(
        (donation) => ({
          id: donation.id,
          recipient_name: donation.recipient_name,
          donor_name: donation.donor_name,
          blood_group: donation.blood_request.blood_group,
          hospital_name: donation.blood_request.hospital_name,
          hospital_address: "Hospital Address", // Not provided in API response
          donation_date: donation.date,
          status: donation.donation_status,
          units_donated: 1, // Default value since not provided in API
          notes: "",
          request_id: donation.blood_request.id,
        })
      );

      const receivedRecords: ReceivedRecord[] = response.data.received.map(
        (received) => ({
          id: received.id,
          donor_name: received.donor_name,
          blood_group: received.blood_request.blood_group,
          hospital_name: received.blood_request.hospital_name,
          hospital_address: "Hospital Address", // Not provided in API response
          received_date: received.date,
          status: received.donation_status,
          units_received: 1, // Default value since not provided in API
          notes: "",
          blood_request: {
            id: received.blood_request.id,
            blood_group: received.blood_request.blood_group,
            hospital_name: received.blood_request.hospital_name,
            status: received.blood_request.status,
            date: received.blood_request.date,
          },
        })
      );
      setDonationHistory(donationRecords);
      setReceivedHistory(receivedRecords);
    } catch (error) {
      console.error("Error fetching donation history:", error);
      setError("Failed to load history data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // handle all donations

  const fetchAllDonationData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApiClient.get("/all-blood-donation-history/");

      setAllDonations(response.data);
    } catch (err) {
      console.error("Error fetching donation history:", err);
      setError("Failed to load donation history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    donationHistory,
    receivedHistory,
    loading,
    error,
    fetchAllDonationData,
    AllDonations,
  };
};

export default useDonationHistory;
