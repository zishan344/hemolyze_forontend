import { ReactNode } from "react";

export type userRegisterType = {
  email: string;
  username: string;
  password: string;
  confirm_password?: string;
};
export type userLoginType = {
  email: string;
  password: string;
};

export type userDataType = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export interface UserDetailsDataType {
  id: number;
  name: string;
  address: string;
  age?: number;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  phone_number?: string;
  last_donation_date: string;
  availability_status: boolean;
  user: number;
}

export interface UserDetailsType {
  name: string;
  address: string;
  age: number;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  phone_number?: string;
  availability_status: boolean;
}

export interface childrenType {
  children: ReactNode;
}

/* export type childrenType = {
  children: ReactNode;
};

 */

export interface changePasswordType {
  email: string;
  new_password: string;
  current_password: string;
}

export interface resetPasswordConfirmType {
  uid: string;
  token: string;
  new_password: string;
}

export interface AuthContextType {
  user: userDataType | null;
  loading: boolean;
  errorMsg: unknown | string;
  successMsg: string;
  loginUser: (userData: userLoginType) => Promise<{ success: boolean }>;
  registerUser: (
    userData: userRegisterType
  ) => Promise<{ success: boolean; message: string }>;
  updateUserProfileDetails: (
    userDetails: UserDetailsType
  ) => Promise<{ success: boolean; message: string } | undefined>;
  userDetail: UserDetailsDataType | null;
  logoutUser: () => void;
  changePassword: (
    data: changePasswordType
  ) => Promise<{ success: boolean; message: string } | undefined>;
  resetPassword: (
    email: string
  ) => Promise<{ success: boolean; message: string } | undefined>;
  resetPasswordConfirm: (
    data: resetPasswordConfirmType
  ) => Promise<{ success: boolean; message: string } | undefined>;
}
