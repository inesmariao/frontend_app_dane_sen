import React, { createContext, useContext, useState } from "react";
import { Survey, SurveyContextType } from "@/types";

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  return (
    <SurveyContext.Provider value={{ surveys, setSurveys }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurveyContext debe utilizarse dentro de un SurveyProvider");
  }
  return context;
};
