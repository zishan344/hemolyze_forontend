import { useEffect, useState } from "react";
import apiClient from "../Service/apiClient";
import {
  changePasswordType,
  resetPasswordConfirmType,
  userDataType,
  userLoginType,
  userRegisterType,
} from "../globalType/AuthType";
import authApiClient from "../Service/authApiClient";

const useAuth = () => {
  const [user, setUser] = useState<userDataType | null>(null);
  const [errorMsg, setErrorMsg] = useState<unknown | string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());
  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);

  const handleSuccess = (message: string) => {
    setSuccessMsg(message);
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  const handleAPIError = (
    error: any,
    defaultMessage = "Something Went Wrong! Try Again"
  ) => {
    console.log(error);
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMsg);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/auth/users/me", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("fetchUserProfile error", error);
    } finally {
      setLoading(false);
    }
  };

  // Update User Profile
  /* 
  const updateUserProfile = async (
    data: userLoginType
  ): Promise<{ success: boolean; message: string }> => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      return handleAPIError(error);
    }
  };

   */
  //password change
  const changePassword = async (data: changePasswordType) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Reset Password

  const resetPassword = async (email: string) => {
    setErrorMsg("");
    setLoading(true);
    try {
      await apiClient.post("/auth/users/reset_password/", { email });
      return {
        success: true,
        message:
          "Password reset link sent to your email. Please check your inbox.",
      };
    } catch (error) {
      return handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  // reset Password confirm
  const resetPasswordConfirm = async (
    data: resetPasswordConfirmType
  ): Promise<{ success: boolean; message: string }> => {
    setErrorMsg("");

    setLoading(true);
    try {
      const response = await authApiClient.post(
        "/auth/users/reset_password_confirm/",
        data
      );
      handleSuccess("Password changed successfully");
      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      return handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const loginUser = async (
    userData: userLoginType
  ): Promise<{ success: boolean }> => {
    setLoading(true);
    setErrorMsg("");
    console.log("loginUser", userData);
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      // after Login
      await fetchUserProfile();

      return { success: true };
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.response?.data?.detail);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // register user
  const registerUser = async (
    userData: userRegisterType
  ): Promise<{ success: boolean; message: string }> => {
    setErrorMsg("");
    setLoading(true);
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
          .flat()
          .join("\n");
        setErrorMsg(errorMessage);
        return { success: false, message: errorMessage };
      }
      setErrorMsg("Registration failed. Please try again");
      return {
        success: false,
        message: "Registration failed. Please try again",
      };
    } finally {
      setLoading(false);
    }
  };
  // logout user
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    errorMsg,
    successMsg,
    loginUser,
    loading,
    registerUser,
    logoutUser,
    changePassword,
    resetPassword,
    resetPasswordConfirm,
  };
};

export default useAuth;
