import { BloodPostStatus } from "../types/Dashboard/DonationRequests.types";

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const getBadgeClass = (status: BloodPostStatus) => {
  switch (status) {
    case "completed":
      return "badge-success";
    case "pending":
      return "badge-warning";
    case "cancelled":
      return "badge-error";
    default:
      return "badge-info";
  }
};
