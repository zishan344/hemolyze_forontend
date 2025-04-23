import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate password reset process
    try {
      // This would be replaced with actual password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              Reset Your Password
            </h1>
            <p className="mt-2 text-gray-600">
              {isSubmitted
                ? "Check your email for a reset link"
                : "Enter your email and we'll send you a link to reset your password"}
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {isSubmitted ? (
            <div className="space-y-6">
              <div className="alert alert-success">
                <span>
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your email.
                </span>
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-outline btn-primary">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Try a different email
                </button>
                <Link to="/login" className="btn btn-ghost">
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`btn btn-primary btn-block text-white ${
                    isLoading ? "loading" : ""
                  }`}
                  disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset link"}
                  {!isLoading && <ArrowRight className="h-5 w-5 ml-2" />}
                </button>
              </div>

              <div className="text-center">
                <Link to="/login" className="text-primary hover:underline">
                  <ArrowLeft className="h-4 w-4 inline mr-1" />
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
