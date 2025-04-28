export interface FundDonation {
  id: number;
  username: string;
  amount: number;
  transaction_id: string;
  created_date: string;
}

export interface FundDonationListProps {
  donations: FundDonation[];
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}
