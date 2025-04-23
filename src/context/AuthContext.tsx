import { createContext } from "react";
import { AuthContextType, childrenType } from "../globalType/AuthType";
import useAuth from "../Hooks/useAuth";

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: childrenType) => {
  const allContext = useAuth();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
