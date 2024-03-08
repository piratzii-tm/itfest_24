import { Text, View, Image } from "react-native-ui-lib";
import { ImageBackground, StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import KSpacer from "./KSpacer";

export const KAchivements = ({
  photoRequire,
  title,
  subTitle,
  price = 0,
  type = "large",
  //POSIBLE TYPES: large, small, locked
}) => {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground
      source={photoRequire}
      imageStyle={{ borderRadius: 10 }}
      style={{
        height: 180,
        width: type === "large" ? width * 0.9 : 180,
      }}
    >
      <LinearGradient
        colors={
          type === "locked"
            ? [(Colors.codGray, Colors.codGray)]
            : [(Colors.transparent, Colors.codGray)]
        }
        style={
          type === "locked"
            ? [
                StyleSheet.absoluteFill,
                {
                  opacity: 0.5,
                  borderRadius: 10,
                },
              ]
            : [
                StyleSheet.absoluteFill,
                {
                  opacity: 0.2,
                  borderRadius: 10,
                },
              ]
        }
      />
      {type === "locked" ? (
        <View absR row center padding-10>
          <Text center priceText webOrange>
            {price}
          </Text>
          <View width={2}></View>
          <Image
            height={26}
            width={26}
            source={require("../assets/images/coins.png")}
          />
        </View>
      ) : (
        <View></View>
      )}
      <View absB left padding-10>
        <Text
          achivementTitle
          saltpan
          style={type === "locked" ? { opacity: 0.5 } : {}}
        >
          {title}
        </Text>
        <Text
          achivementSubTitle
          saltpan
          style={type === "locked" ? { opacity: 0.5 } : {}}
        >
          {subTitle}
        </Text>
      </View>
    </ImageBackground>
  );
};
