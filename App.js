import WithExpoFonts from "./wrappers/WithExpoFonts";
import Navigation from "./navigation/navigation";
import { configTheme } from "./constants/theme";

configTheme();

export default function App() {
  return (
    <WithExpoFonts>
      <Navigation />
    </WithExpoFonts>
  );
}
