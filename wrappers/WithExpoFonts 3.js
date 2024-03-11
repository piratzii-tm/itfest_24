import { useFonts } from "expo-font";

const WithExpoFonts = ({ children }) => {
  const [doneLoading] = useFonts({
    "DMSans-Thin": require("../assets/fonts/DMSans-Thin.ttf"),
    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
    "DMSans-ExtraLight": require("../assets/fonts/DMSans-ExtraLight.ttf"),
    "DMSans-ExtraBold": require("../assets/fonts/DMSans-ExtraBold.ttf"),
    "DMSans-Black": require("../assets/fonts/DMSans-Black.ttf"),
  });
  return doneLoading ? children : null;
};

export default WithExpoFonts;
