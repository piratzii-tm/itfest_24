import WithExpoFonts from "./wrappers/WithExpoFonts";
import Navigation from "./navigation/navigation";
import { configTheme } from "./constants/theme";
import { useState } from "react";
import { TimerContext } from "./constants/contexts/timerContext";

configTheme();

export default function App() {
  const [startTimeStamp, setStartTimeStamp] = useState(Date.now());
  const [duration, setDuration] = useState(60);
  const [scans, setScans] = useState(0);
  const [isActiveChallenge, setIsActiveChallenge] = useState(false);
  const [initChallenge, setInitChallenge] = useState(false);

  return (
    <TimerContext.Provider
      value={{
        startTimeStamp,
        setStartTimeStamp,
        duration,
        setDuration,
        scans,
        setScans,
        isActiveChallenge,
        setIsActiveChallenge,
        initChallenge,
        setInitChallenge,
      }}
    >
      <WithExpoFonts>
        <Navigation />
      </WithExpoFonts>
    </TimerContext.Provider>
  );
}
