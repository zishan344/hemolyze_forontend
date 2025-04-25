/* export type Donor = {
  id: number;
  user: number;
  name: string;
  blood_group: string;
  address: string;
  phone_number: string;
  availability_status: boolean;
  age?: number;
  last_donation_date?: string;
};
 */

import { UserDetailsDataType } from "../../globalType/AuthType";

export type Donor = UserDetailsDataType;
