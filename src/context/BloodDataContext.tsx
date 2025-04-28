import { createContext } from "react";
import { childrenType } from "../globalType/AuthType";

import { BloodDataContextType } from "../types/blood.context.type";
import useBloodData from "../Hooks/useBloodData";

const BloodDataContext = createContext<BloodDataContextType | null>(null);
export const BloodDataProvider = ({ children }: childrenType) => {
  const allContext = useBloodData();
  return (
    <BloodDataContext.Provider value={allContext}>
      {children}
    </BloodDataContext.Provider>
  );
};

export default BloodDataContext;
