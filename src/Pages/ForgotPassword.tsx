import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthContext from "../Hooks/useAuthContext";
import { useState } from "react";

type ForgotPasswordFormType = {
  email: string;
};

export default function ForgotPassword() {
  const { errorMsg, loading, resetPassword } = useAuthContext();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ForgotPasswordFormType>();

  const onSubmit = async (data: ForgotPasswordFormType) => {
    console.log(data);
    try {
      const response = await resetPassword(data.email);

      if (response?.success) {
        setSuccess(true);
        reset();
      }
    } catch {
      // Error handling is already done in useAuth hook via handleAPIError
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8" role="main">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              Reset Your Password
            </h1>
            <p className="mt-2 text-gray-600">
              {success
                ? "Check your email for a reset link"
                : "Enter your email and we'll send you a link to reset your password"}
            </p>
          </div>

          {errorMsg ? (
            <div className="alert alert-error" role="alert">
              <span>{String(errorMsg)}</span>
            </div>
          ) : null}

          {success ? (
            <div className="space-y-6">
              <div className="alert alert-success" role="status">
                <span>
                  We've sent a password reset link to{" "}
                  <strong>{getValues("email")}</strong>. Please check your
                  email.
                </span>
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setSuccess(false);
                    reset();
                  }}
                  className="btn btn-outline btn-primary">
                  <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
                  Try a different email
                </button>
                <Link to="/login" className="btn btn-ghost">
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    aria-hidden="true">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`input input-bordered w-full pl-10 ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span
                      id="email-error"
                      className="text-error text-sm mt-1 block"
                      role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`btn btn-primary btn-block text-white ${
                    loading ? "text-secondary" : ""
                  }`}
                  disabled={loading}>
                  {loading ? "Sending..." : "Send reset link"}
                  {!loading && (
                    <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link to="/login" className="text-primary hover:underline">
                  <ArrowLeft
                    className="h-4 w-4 inline mr-1"
                    aria-hidden="true"
                  />
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
