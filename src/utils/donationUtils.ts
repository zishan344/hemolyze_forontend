export const getUrgencyBadgeClass = (urgency: string) => {
  switch (urgency) {
    case "critical":
      return "badge badge-error";
    case "urgent":
      return "badge badge-warning";
    default:
      return "badge badge-info";
  }
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getDaysUntil = (dateString: string) => {
  const requestDate = new Date(dateString);
  const today = new Date();
  const diffTime = requestDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  return `In ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
};
