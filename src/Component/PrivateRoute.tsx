import { Navigate } from "react-router";
import { childrenType } from "../globalType/AuthType";
import useAuthContext from "../Hooks/useAuthContext";
import Loadings from "../Shared/Loadings";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }: childrenType) => {
  const { user, loading } = useAuthContext();
  const [countdown, setCountdown] = useState(10);
  const [redirectNow, setRedirectNow] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setRedirectNow(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [user, loading]);

  if (loading) return <Loadings />;
  if (redirectNow) return <Navigate to="/login" />;

  return user ? (
    children
  ) : (
    <div className="text-center p-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p className="font-bold">Unauthorized Access!</p>
        <p>You are not authorized. Please login to access this page.</p>
      </div>
      <div className="text-lg">
        Redirecting to login page in{" "}
        <span className="font-bold text-red-600">{countdown}</span> seconds...
      </div>
    </div>
  );
};

export default PrivateRoute;
