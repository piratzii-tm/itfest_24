import { View, Image, Text } from "react-native-ui-lib";
import { Colors } from "../constants/theme";
import { useWindowDimensions } from "react-native";
import { KCoin } from "./KCoin";

export const KRecycledObject = ({
  photoUri,
  text,
  color = Colors.sushi,
  coins = 0,
}) => {
  const { width } = useWindowDimensions();

  return text ? (
    <View
      width={width * 0.8}
      padding={15}
      style={{ borderRadius: 40 }}
      bg-saltpan
    >
      <Image height={270} borderRadius={40} source={{ uri: photoUri }} />

      {text ? (
        <View center>
          <Text recycleCard tundora>
            {" "}
            Less{" "}
            <Text recycleCard color={color}>
              {text}
            </Text>
            , more coins
          </Text>
          <KCoin price={coins} />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  ) : (
    <View
      width={110}
      height={110}
      center
      padding={15}
      style={{ borderRadius: 30 }}
      bg-saltpan
    >
      <Image
        height={100}
        width={100}
        borderRadius={30}
        source={{ uri: photoUri }}
      />
    </View>
  );
};
