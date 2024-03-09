import { createContext } from "react";

export const TimerContext = createContext({
  // we use it to
  startTimeStamp: Date.now(),
  setStartTimeStamp: () => {},
  // the duration of the challenge
  duration: 60,
  setDuration: () => {},
  // number of scans for the challenge
  scans: 0,
  setScans: () => {},
  // if the challenge is active
  isActiveChallenge: false,
  setIsActiveChallenge: () => {},
  // if at this app start was start at least once a challenge
  initChallenge: false,
  setInitChallenge: () => {},
});
