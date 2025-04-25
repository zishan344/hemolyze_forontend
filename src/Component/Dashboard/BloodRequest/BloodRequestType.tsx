import { DonationStatus } from "../../../globalType/GlobalTypes";

export interface RequestRecord {
  id: number;
  requester_name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  request_date: string;
  needed_by_date: string;
  status: DonationStatus;
  units_needed: number;
  notes?: string;
  contact_number?: string;
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
}
