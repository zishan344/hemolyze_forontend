import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthContext from "../Hooks/useAuthContext";

type ForgotPasswordFormType = {
  email: string;
};

export default function ForgotPassword() {
  const { errorMsg, loading, resetPassword } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ForgotPasswordFormType>();

  const onSubmit = async (data: ForgotPasswordFormType) => {
    try {
      const response = await resetPassword(data.email);
      if (response) {
        reset();
      }
    } catch (err) {
      console.log("Error sending password reset email:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              Reset Your Password
            </h1>
            <p className="mt-2 text-gray-600">
              {errorMsg
                ? "Check your email for a reset link"
                : "Enter your email and we'll send you a link to reset your password"}
            </p>
          </div>

          {errorMsg && (
            <div className="alert alert-error">
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <span className="text-error text-sm mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`btn btn-primary btn-block text-white ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
                {!loading && <ArrowRight className="h-5 w-5 ml-2" />}
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="text-primary hover:underline">
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Back to login
              </Link>
            </div>
          </form>

          {errorMsg === "Password reset link sent to your email. Please check your inbox." && (
            <div className="space-y-6">
              <div className="alert alert-success">
                <span>
                  We've sent a password reset link to <strong>{getValues("email")}</strong>.
                  Please check your email.
                </span>
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => reset()}
                  className="btn btn-outline btn-primary">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Try a different email
                </button>
                <Link to="/login" className="btn btn-ghost">
                  Return to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
