import { DonationStatus, RequestStatus } from "../GlobalType";
export type ViewType = "donated" | "received";
export interface DonationRecord {
  id: number;
  recipient_name: string;
  donor_name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  donation_date: string;
  status: DonationStatus;
  units_donated: number;
  notes?: string;
  certificate_url?: string;
  request_id?: number;
}
export interface AllDonationRecord {
  id: number;
  recipient_name: string;
  donor_name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  date: string;
  donation_status: DonationStatus;
  units_donated: number;
  notes?: string;
  certificate_url?: string;
  request_id?: number;
}

export interface ReceivedRecord {
  id: number;
  donor_name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  received_date: string;
  status: DonationStatus;
  units_received: number;
  notes?: string;
  blood_request?: {
    id: number;
    blood_group: string;
    hospital_name: string;
    status: RequestStatus;
    date: string;
  };
}

// Interface to match the actual API response structure
export interface DonationHistoryApiResponse {
  donations: {
    id: number;
    donor_name: string;
    recipient_name: string;
    donation_status: DonationStatus;
    date: string;
    blood_request: {
      id: number;
      blood_group: string;
      hospital_name: string;
      status: RequestStatus;
      date: string;
    };
  }[];
  received: {
    id: number;
    donor_name: string;
    recipient_name: string;
    donation_status: DonationStatus;
    date: string;
    blood_request: {
      id: number;
      blood_group: string;
      hospital_name: string;
      status: RequestStatus;
      date: string;
    };
  }[];
}
