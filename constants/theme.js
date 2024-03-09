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
  black: "#000000",
  transparent: "transparent",
};

export const Typographies = {
  dmSansBold: {
    fontFamily: "DMSans-Bold",
  },
  title: {
    fontSize: 48,
    lineHeight: 62,
    fontFamily: "DMSans-Bold",
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "DMSans-Regular",
  },
  achivementTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "DMSans-Bold",
  },
  achivementSubTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "DMSans-Regular",
  },
  priceText: {
    fontSize: 24,
    lineHeight: 31,
    fontFamily: "DMSans-Regular",
  },

  authLabel: {
    fontSize: 26,
    fontFamily: "DMSans-Regular",
  },
  tabBarText: {
    fontSize: 14,
    fontFamily: "DMSans-Bold",
  },
  recycleCard: {
    fontSize: 42,
    lineHeight: 54,
    fontFamily: "DMSans-Bold",
  },
  challangeCardTitle: {
    fontSize: 32,
    lineHeight: 41,
    fontFamily: "DMSans-Medium",
  },
  challangeCardSubTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "DMSans-Regular",
  },
};

export const configTheme = () => {
  RNUILibColors.loadColors(Colors);
  RNUILibTypographies.loadTypographies(Typographies);
};
