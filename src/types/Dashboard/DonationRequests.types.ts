import { DonationStatus, RequestStatus } from "../GlobalType";

export interface acceptedBloodDonations {
  id: number;
  user: number;
  request_user: number;
  request_accept: number;
  donation_status: string;
  units: number;
  date: string;
  donor_name: string;
}

export interface BloodRequestItem {
  id: number;
  name: string;
  blood_group: string;
  required_units: number;
  fulfilled_units: number;
  urgency_level: "normal" | "urgent" | "critical";
  phone: string;
  hospital_address: string;
  hospital_name: string;
  description: string;
  date: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  user: number;
  progress_percentage?: number;
}

export interface AcceptedRequestItem {
  id: number;
  user: number;
  request_accept: number;
  request_user: number;
  donation_status: DonationStatus;
  units: number;
  date: string;
  donor_name?: string;
}

export type donationRequestFilterTabType = {
  filter: "all" | "accepted";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "accepted">>;
};

export interface DonationRequestListType {
  filteredRequests: BloodRequestItem[];
  loading: boolean;
  successMessage: string | null;
  error: string | null;
}
