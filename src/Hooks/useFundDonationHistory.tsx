import { useEffect, useState } from "react";
import authApiClient from "../Service/authApiClient";
import { FundDonation } from "../types/Dashboard/FundDonation.type";
import useAuthContext from "./useAuthContext";

const useFundDonationHistory = () => {
  const [donations, setDonations] = useState<FundDonation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApiClient.get("/donated-fund");

      setDonations(response.data);
    } catch (err: any) {
      console.error("Error fetching fund donation history:", err);
      setError("Failed to load fund donation history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    donations,
    loading,
    error,
    isAdmin: user?.role === "admin",
  };
};

export default useFundDonationHistory;
