import { ArrowLeft, KeyRound } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

type PasswordResetConfirmFormType = {
  new_password: string;
  confirm_password: string;
};

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const [resetSuccess, setResetSuccess] = useState<boolean>();
  const navigate = useNavigate();
  const { successMsg, errorMsg, loading, resetPasswordConfirm } =
    useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordResetConfirmFormType>();

  const onSubmit = async (data: PasswordResetConfirmFormType) => {
    if (!uid || !token) {
      return;
    }
    try {
      const resetConfirmData = {
        uid,
        token,
        new_password: data.new_password,
      };
      const response = await resetPasswordConfirm(resetConfirmData);

      if (response?.success) {
        setResetSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      console.error("Error resetting password:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              Set New Password
            </h1>
            <p className="mt-2 text-gray-600">Please enter your new password</p>
          </div>

          {errorMsg ? (
            <div className="alert alert-error">
              <span>{String(errorMsg)}</span>
            </div>
          ) : null}
          {resetSuccess && (
            <div className="space-y-6">
              <div className="alert alert-success">
                <span>{successMsg}! Redirecting to login...</span>
              </div>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="new_password"
                  className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="new_password"
                    type="password"
                    className={`input input-bordered w-full pl-10 ${
                      errors.new_password ? "input-error" : ""
                    }`}
                    placeholder="Enter new password"
                    {...register("new_password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.new_password && (
                    <span className="text-error text-sm mt-1 block">
                      {errors.new_password.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm_password"
                    type="password"
                    className={`input input-bordered w-full pl-10 ${
                      errors.confirm_password ? "input-error" : ""
                    }`}
                    placeholder="Confirm new password"
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("new_password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirm_password && (
                    <span className="text-error text-sm mt-1 block">
                      {errors.confirm_password.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`btn btn-primary btn-block text-white ${
                  loading ? "text-secondary" : ""
                }`}
                disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="text-primary hover:underline">
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
