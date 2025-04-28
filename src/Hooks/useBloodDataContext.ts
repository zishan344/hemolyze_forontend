import { useContext } from "react";
import BloodDataContext from "../context/BloodDataContext";
import { BloodDataContextType } from "../types/blood.context.type";

const useBloodDataContext = (): BloodDataContextType => {
  const context = useContext(BloodDataContext);
  if (!context) {
    throw new Error(
      "useBloodDataContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export default useBloodDataContext;
