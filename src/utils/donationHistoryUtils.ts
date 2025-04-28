import { DonationStatus } from "../Component/Dashboard/DonationHistory";

export const getBadgeClass = (status: DonationStatus) => {
  switch (status) {
    case "donated":
      return "badge-success";
    case "pending":
      return "badge-warning";
    case "canceled":
      return "badge-error";
    default:
      return "badge-info";
  }
};

export const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365)
    return `${Math.floor(diffInDays / 30)} month${
      Math.floor(diffInDays / 30) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(diffInDays / 365)} year${
    Math.floor(diffInDays / 365) > 1 ? "s" : ""
  } ago`;
};

export const downloadCertificate = (certificateUrl: string) => {
  // In a real app, you would handle the download here
  window.open(certificateUrl, "_blank");
};
