export interface RequestRecord {
  id: number;
  name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  date: string;
  required_units: number;
  fulfilled_units: number;
  urgency_level: "normal" | "urgent" | "critical";
  status: "pending" | "accepted" | "completed" | "cancelled";
  phone: string;
  description?: string;
  progress_percentage?: number;
  created_at: string;
  updated_at: string;
}

export interface BloodRequestFormValues {
  requester_name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  needed_by_date: string;
  units_needed: number;
  notes?: string;
  contact_number: string;
  urgency_level: "normal" | "urgent" | "critical";
}

export interface AcceptBloodRequest {
  id: number;
  user: number;
  request_user: number;
  request_accept: number;
  donation_status: "pending" | "donated" | "canceled";
  units: number;
  date: string;
  donor_name: string;
}

export interface ReceivedBlood {
  id: number;
  blood_post: number;
  user: number;
  donor: number;
  received_status: "pending" | "received" | "canceled";
  date: string;
  donor_name: string;
}
