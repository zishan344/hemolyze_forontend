import React from "react";
import { Donor } from "./Donor/Donor.typ";
import {
  acceptedBloodDonations,
  BloodRequestItem,
} from "./Dashboard/DonationRequests.types";
import { RequestRecord } from "../Component/Dashboard/BloodRequest/BloodRequestType";

export interface BloodDataContextType {
  fetchDonors: () => Promise<void>;
  donors: Donor[];
  filteredDonors: Donor[];
  setFilteredDonors: React.Dispatch<React.SetStateAction<Donor[]>>;

  fetchDonationRequests: () => Promise<void>;
  bloodDonationRequests: BloodRequestItem[];
  handleUpdateDonationStatus: (
    acceptedRequestId: number,
    status: string
  ) => Promise<void>;
  handleRequestAccepted: (requestId: number, units: number) => Promise<void>;
  handleUpdateAcceptedBloodRequest: (
    requestId: number,
    status: string
  ) => Promise<void>;
  fetchBloodDonationAccepted: () => Promise<void>;
  handleCancelBloodPostRequest: (requestId: number) => Promise<void>;
  bloodDonationAccepted: acceptedBloodDonations[];
  requestHistory: RequestRecord[];
  successMessage: string | null;
  loading: boolean;
  updateLoading: boolean;
  error: string | null;
}
