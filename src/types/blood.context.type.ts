import React from "react";
import { Donor } from "./Donor/Donor.typ";
import {
  AcceptedRequestItem,
  BloodRequestItem,
} from "./Dashboard/DonationRequests.types";

export interface BloodDataContextType {
  fetchDonors: () => Promise<void>;
  donors: Donor[];
  filteredDonors: Donor[];
  setFilteredDonors: React.Dispatch<React.SetStateAction<Donor[]>>;
  acceptedDonationRequest: AcceptedRequestItem | undefined;
  fetchAcceptedDonationRequest: (requestId: number) => Promise<void>;
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
  successMessage: string | null;
  loading: boolean;
  error: string | null;
}
