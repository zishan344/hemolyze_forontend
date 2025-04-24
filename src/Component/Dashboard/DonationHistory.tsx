import { useState, useEffect } from "react";
import { Calendar, Clock, DropletIcon, Info, MapPin, User } from "lucide-react";

type DonationStatus = "pending" | "completed" | "cancelled";

interface DonationRecord {
  id: number;
  recipient_name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  donation_date: string;
  status: DonationStatus;
  units_donated: number;
  notes?: string;
  certificate_url?: string;
}

const DonationHistory = () => {
  // const { user } = useAuthContext();
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | DonationStatus>(
    "all"
  );

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call:
      // const response = await authApiClient.get("/donation-history/");
      // setDonationHistory(response.data);

      // For demo purposes, we'll use sample data
      setTimeout(() => {
        const sampleHistory: DonationRecord[] = [
          {
            id: 1,
            recipient_name: "Sarah Johnson",
            blood_group: "A+",
            hospital_name: "City General Hospital",
            hospital_address: "123 Medical Center Blvd",
            donation_date: "2025-04-01T10:30:00",
            status: "completed",
            units_donated: 1,
            certificate_url: "https://example.com/certificates/123456",
          },
          {
            id: 2,
            recipient_name: "Michael Chen",
            blood_group: "O-",
            hospital_name: "Memorial Hospital",
            hospital_address: "456 Healthcare Ave",
            donation_date: "2025-03-15T14:00:00",
            status: "completed",
            units_donated: 2,
            notes: "Emergency donation for accident victim",
          },
          {
            id: 3,
            recipient_name: "Emma Thompson",
            blood_group: "B+",
            hospital_name: "Northside Medical Center",
            hospital_address: "789 Health Parkway",
            donation_date: "2025-04-20T09:15:00",
            status: "pending",
            units_donated: 1,
          },
          {
            id: 4,
            recipient_name: "David Wilson",
            blood_group: "AB-",
            hospital_name: "Eastside Hospital",
            hospital_address: "321 Care Street",
            donation_date: "2025-02-28T11:30:00",
            status: "cancelled",
            units_donated: 1,
            notes: "Cancelled due to donor illness",
          },
        ];

        setDonationHistory(sampleHistory);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching donation history:", error);
      setError("Failed to load donation history. Please try again.");
      setLoading(false);
    }
  };

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

  const getRelativeTime = (dateString: string) => {
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

  const filteredHistory =
    activeFilter === "all"
      ? donationHistory
      : donationHistory.filter((donation) => donation.status === activeFilter);

  /*  const getStatusColor = (status: DonationStatus) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "pending":
        return "text-warning";
      case "cancelled":
        return "text-error";
      default:
        return "";
    }
  };
 */
  const getBadgeClass = (status: DonationStatus) => {
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

  const downloadCertificate = (certificateUrl: string) => {
    // In a real app, you would handle the download here
    window.open(certificateUrl, "_blank");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          Your Donation History
        </h1>
        <p className="text-base-content/70">
          Review all your blood donation activities including completed,
          pending, and cancelled donations.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6">
        <div className="tabs tabs-boxed bg-base-200 inline-flex">
          <button
            className={`tab ${activeFilter === "all" ? "tab-active" : ""}`}
            onClick={() => setActiveFilter("all")}>
            All
          </button>
          <button
            className={`tab ${
              activeFilter === "completed" ? "tab-active" : ""
            }`}
            onClick={() => setActiveFilter("completed")}>
            Completed
          </button>
          <button
            className={`tab ${activeFilter === "pending" ? "tab-active" : ""}`}
            onClick={() => setActiveFilter("pending")}>
            Pending
          </button>
          <button
            className={`tab ${
              activeFilter === "cancelled" ? "tab-active" : ""
            }`}
            onClick={() => setActiveFilter("cancelled")}>
            Cancelled
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <DropletIcon size={28} className="stroke-success" />
          </div>
          <div className="stat-title">Completed Donations</div>
          <div className="stat-value text-success">
            {donationHistory.filter((d) => d.status === "completed").length}
          </div>
          <div className="stat-desc">Lives you've helped</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-warning">
            <Clock size={28} className="stroke-warning" />
          </div>
          <div className="stat-title">Pending Donations</div>
          <div className="stat-value text-warning">
            {donationHistory.filter((d) => d.status === "pending").length}
          </div>
          <div className="stat-desc">Scheduled donations</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <DropletIcon size={28} className="stroke-primary fill-primary/20" />
          </div>
          <div className="stat-title">Total Blood Units</div>
          <div className="stat-value text-primary">
            {donationHistory.reduce(
              (total, donation) =>
                donation.status === "completed"
                  ? total + donation.units_donated
                  : total,
              0
            )}
          </div>
          <div className="stat-desc">Units you've donated</div>
        </div>
      </div>

      {/* Donation History List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold mb-2">No donations found</h3>
          <p className="text-base-content/70">
            {activeFilter === "all"
              ? "You haven't made any donations yet."
              : `You don't have any ${activeFilter} donations.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredHistory.map((donation) => (
            <div
              key={donation.id}
              className="card bg-base-100 shadow-md overflow-hidden">
              <div className="card-body p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Details */}
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="card-title">{donation.hospital_name}</h2>
                      <div
                        className={`badge ${getBadgeClass(donation.status)}`}>
                        {donation.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-start text-sm mb-3">
                          <User size={16} className="mr-2 text-gray-400 mt-1" />
                          <div>
                            <div className="text-sm text-base-content/70">
                              Recipient
                            </div>
                            <div className="font-medium">
                              {donation.recipient_name}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start text-sm mb-3">
                          <MapPin
                            size={16}
                            className="mr-2 text-gray-400 mt-1"
                          />
                          <div>
                            <div className="text-sm text-base-content/70">
                              Location
                            </div>
                            <div className="font-medium">
                              {donation.hospital_address}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start text-sm mb-3">
                          <Calendar
                            size={16}
                            className="mr-2 text-gray-400 mt-1"
                          />
                          <div>
                            <div className="text-sm text-base-content/70">
                              Date
                            </div>
                            <div className="font-medium">
                              {formatDate(donation.donation_date)}
                            </div>
                            <div className="text-xs text-base-content/60">
                              {getRelativeTime(donation.donation_date)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start text-sm">
                          <DropletIcon
                            size={16}
                            className="mr-2 text-gray-400 mt-1"
                          />
                          <div>
                            <div className="text-sm text-base-content/70">
                              Blood Type & Units
                            </div>
                            <div className="font-medium">
                              {donation.blood_group} • {donation.units_donated}{" "}
                              unit{donation.units_donated !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {donation.notes && (
                      <div className="mt-4 bg-base-200 p-3 rounded-md text-sm flex items-start">
                        <Info size={16} className="mr-2 text-gray-400 mt-1" />
                        <div>
                          <div className="font-medium">Notes</div>
                          <div className="text-base-content/70">
                            {donation.notes}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right side - Actions */}
                  <div className="border-t lg:border-t-0 lg:border-l border-base-200 p-6 lg:w-48 flex flex-col justify-center items-center">
                    <div className="text-center">
                      {donation.status === "completed" && (
                        <>
                          <div className="badge badge-success mb-3">
                            Completed
                          </div>
                          {donation.certificate_url && (
                            <button
                              className="btn btn-outline btn-sm w-full mb-2"
                              onClick={() =>
                                downloadCertificate(donation.certificate_url!)
                              }>
                              View Certificate
                            </button>
                          )}
                          <button className="btn btn-outline btn-sm btn-primary w-full">
                            Share Achievement
                          </button>
                        </>
                      )}

                      {donation.status === "pending" && (
                        <>
                          <div className="badge badge-warning mb-3">
                            Pending
                          </div>
                          <p className="text-sm text-base-content/70 mb-2">
                            Scheduled donation
                          </p>
                          <button className="btn btn-outline btn-sm btn-error w-full">
                            Cancel Donation
                          </button>
                        </>
                      )}

                      {donation.status === "cancelled" && (
                        <>
                          <div className="badge badge-error mb-3">
                            Cancelled
                          </div>
                          <p className="text-sm text-base-content/70">
                            This donation was cancelled
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
