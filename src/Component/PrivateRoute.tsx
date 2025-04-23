import { Navigate } from "react-router";
import { childrenType } from "../globalType/AuthType";
import useAuthContext from "../Hooks/useAuthContext";

const PrivateRoute = ({ children }: childrenType) => {
  const { user } = useAuthContext();
  if (user === null) return "Loading...";
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
