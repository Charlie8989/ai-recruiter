"use client"
import { createContext, useState } from "react";

export const InterviewDataContext = createContext();

export const InterviewDataProvider = ({ children }) => {
  const [interviewInfo, setinterviewInfo] = useState(null);

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setinterviewInfo }}>
      {children}
    </InterviewDataContext.Provider>
  );
};
