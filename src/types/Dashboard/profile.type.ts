import {
  userDataType,
  UserDetailsDataType,
  UserDetailsType,
} from "../../globalType/AuthType";

export type activeTabType = "basicInfo" | "details" | "security";

export interface UserDetailFormProps {
  loading: boolean;
  errorMsg: string | undefined;
  isEditing?: boolean;
  user: userDataType | null;
  userDetail: UserDetailsDataType | null;
  updateUserProfileDetails: (
    data: UserDetailsType,
    id?: number | null
  ) => Promise<{ success: boolean; message?: string } | undefined>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
