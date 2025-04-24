import React from "react";

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
};

export interface UserDetails {
  name: string;
  address: string;
  age?: number;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  phone_number?: string;
  availability_status: boolean;
}

export interface childrenType {
  children: React.ReactNode;
}

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
  user: null | userDataType;
  loading: boolean;
  errorMsg: string;
  successMsg: string | undefined;
  loginUser: (userData: userLoginType) => Promise<{ success: boolean }>;
  registerUser: (
    userData: userRegisterType
  ) => Promise<{ success: boolean; message: string }>;
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
