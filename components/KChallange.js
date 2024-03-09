import { View, Text, Image } from "react-native-ui-lib";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { KCoin } from "./KCoin";

export const KChallange = ({ requirement, price = 0, onPress }) => {
  const { width } = useWindowDimensions();

  return requirement ? (
    <TouchableOpacity onPress={onPress}>
      <View
        width={width * 0.95}
        height={250}
        padding-10
        gap-10
        style={{ borderRadius: 10 }}
        bg-berylGreen
      >
        <Text challangeCardTitle highland>
          Recycle is business!
        </Text>
        <Text challangeCardSubTitle olivine>
          {requirement}
        </Text>

        <KCoin price={price} />
        <View
          absR
          padding-10
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            justifyContent: "flex-end",
            bottom: 0,
          }}
        >
          <Image
            height={100}
            width={100}
            source={require("../assets/images/challange_require.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View
        width={width * 0.95}
        height={250}
        padding-10
        gap-10
        style={{ borderRadius: 10 }}
        bg-starkWhite
      >
        <Text challangeCardTitle quikSand>
          Recycle is business!
        </Text>
        <Text challangeCardSubTitle quikSand>
          In progress...
        </Text>

        <KCoin price={price} />

        <View
          absR
          padding-10
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            justifyContent: "flex-end",
            bottom: 0,
          }}
        >
          <Image
            height={100}
            width={100}
            source={require("../assets/images/challange_inProgress.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
