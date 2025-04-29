import { RequestRecord } from "../Component/Dashboard/BloodRequest/BloodRequestType";
import { DonationRecord } from "../types/Dashboard/DonationHistory.type";

// Calculate upcoming donations (those with status "scheduled")
export const upcomingDonations = (donationHistory: DonationRecord[]) => {
  return donationHistory.filter((donation) => donation.status === "pending");
};

// Count total donations (completed ones)
export const totalDonations = (donationHistory: DonationRecord[]) => {
  return donationHistory.filter((donation) => donation.status === "donated")
    .length;
};

// Count active blood requests (estimate based on received history with pending status)
export const totalRequest = (totalRequest: RequestRecord[]) => {
  return totalRequest.length;
};

// Estimate lives impacted (total donations + received help)
export const livesImpacted = (
  totalDonations: number,
  receivedHistoryLength: number
) => {
  return totalDonations + receivedHistoryLength;
};
