import {
  Colors as RNUILibColors,
  Typography as RNUILibTypographies,
} from "react-native-ui-lib";

export const Colors = {
  white: "#FFFFFF",
  saltpan: "#EEF4EC",
  tundora: "#444444",
  alto: "#D0D0D0",
  webOrange: "#FFA300",
  olivine: "#99BC85",
  sprout: "#BFD8AF",
  royalBlue: "#387ADF",
  blackHaze: "#F3F4F4",
  sushi: "#779F40",
  visVis: "#FFEAA7",
  berylGreen: "#D4E7C5",
  pigeonPost: "#AFCCD8",
  conifer: "#9BCF53",
  highland: "#6F8860",
  codGray: "#1E1E1E",
  quikSand: "#BC9C85",
  goldenrod: "#FFCD73",
  starkWhite: "#E7DDC5",
};

export const Typographies = {
  dmSansBold: {
    fontFamily: "DMSans-Bold",
  },
};

export const configTheme = () => {
  RNUILibColors.loadColors(Colors);
  RNUILibTypographies.loadTypographies(Typographies);
};
