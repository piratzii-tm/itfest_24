import { createContext } from "react";

export const TimerContext = createContext({
  isTimerActive: false,
  setIsTimerActive: () => {},
  duration: 60,
  setDuration: () => {},
  scans: 0,
  setScans: () => {},
});
