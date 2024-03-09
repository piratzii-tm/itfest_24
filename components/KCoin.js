import { Image, Text, View } from "react-native-ui-lib";

export const KCoin = ({ price, size = 26 }) => {
  return (
    <View row>
      <Text
        priceText
        webOrange
        style={{ fontSize: size, lineHeight: size + 2 }}
      >
        {price}
      </Text>
      <View width={2}></View>
      <Image
        height={size}
        width={size}
        source={require("../assets/images/coins.png")}
      />
    </View>
  );
};
