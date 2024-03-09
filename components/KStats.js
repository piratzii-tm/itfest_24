import { View, Text, Image } from "react-native-ui-lib";
import { useWindowDimensions } from "react-native";

// Type can by: 0 or 1
export const KStats = ({ type = 0, coins = 0 }) => {
  const { width } = useWindowDimensions();

  return (
    <View
      center
      width={185}
      height={300}
      style={{ borderRadius: 10, justifyContent: "space-evenly" }}
      bg-sprout
    >
      <View center>
        <Text counter webOrange>
          {coins}
        </Text>
        <Image
          height={35}
          width={42}
          source={require("../assets/images/coins.png")}
        />
      </View>
      {type ? (
        <Text achivementSubTitle>
          Points for recycling, <Text royalBlue>bottles</Text>,{" "}
          <Text sushi>cans</Text> & <Text webOrange>boxes</Text>.
        </Text>
      ) : (
        <Text achivementSubTitle>
          Points for completing <Text webOrange>challenges</Text> &{" "}
          <Text webOrange>awards</Text>.
        </Text>
      )}
      {type ? (
        <View row gap-10>
          <Image
            height={52}
            width={35}
            source={require("../assets/images/collection_display/bottle.png")}
          />
          <Image
            height={52}
            width={50}
            source={require("../assets/images/collection_display/can.png")}
          />
          <Image
            height={52}
            width={50}
            source={require("../assets/images/collection_display/box.png")}
          />
        </View>
      ) : (
        <Image
          height={80}
          width={80}
          source={require("../assets/images/challange_require.png")}
        />
      )}
    </View>
  );
};
