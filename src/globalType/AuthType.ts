import React from "react";

export type userRegisterType = {
  email: string;
  username: string;
  password: string;
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

export interface childrenType {
  children: React.ReactNode;
}

export interface changePasswordType {
  new_password: string;
  current_password: string;
}

export interface AuthContextType {
  user: null | userDataType;
  errorMsg: unknown;
  loginUser: (userData: userLoginType) => Promise<{ success: boolean }>;
  registerUser: (
    userData: userRegisterType
  ) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => void;
  changePassword: (
    data: changePasswordType
  ) => Promise<{ success: boolean; message: string } | undefined>;
}
