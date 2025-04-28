import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import apiClient from "../../Service/apiClient";
import ErrorAlert from "../ErrorAlert";

const ActivateAccount = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { uid, token } = useParams();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setMessage("Account activated successfully");
      })
      .catch(() => {
        setError("Something Went Wrong. Account activation failed");
      });
  }, [uid, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold">Account Activation</h2>
        {message && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
            <Link to="/login" className="btn btn-primary ml-4">
              Go to Login
            </Link>
          </div>
        )}
        {error && <ErrorAlert message={error} />}
      </div>
    </div>
  );
};

export default ActivateAccount;
