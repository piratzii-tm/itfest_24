import { createContext } from "react";

export const TimerContext = createContext({
  startTimeStamp: Date.now(),
  setStartTimeStamp: () => {},
  duration: 60,
  setDuration: () => {},
  scans: 0,
  setScans: () => {},
  isActiveChallenge: false,
  setIsActiveChallenge: () => {},
});
