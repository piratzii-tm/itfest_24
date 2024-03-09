import WithExpoFonts from "./wrappers/WithExpoFonts";
import Navigation from "./navigation/navigation";
import { configTheme } from "./constants/theme";
import { useEffect, useState } from "react";
import { TimerContext } from "./constants/contexts/timerContext";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

configTheme();

export default function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [duration, setDuration] = useState(60);
  const [scans, setScans] = useState(0);

  useEffect(() => {
    const intervalH = setInterval(() => {
      setIsTimerActive(false);
      clearInterval(intervalH);
    }, duration * 1000);
  }, [isTimerActive]);
  return (
    <TimerContext.Provider
      value={{
        isTimerActive,
        setIsTimerActive,
        duration,
        setDuration,
        scans,
        setScans,
      }}
    >
      <WithExpoFonts>
        <Navigation />
      </WithExpoFonts>
    </TimerContext.Provider>
  );
}
