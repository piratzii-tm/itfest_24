import { View, Text, Image } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native";

//type can by: bottle, can, box
export const KCollectionDisplay = ({ type = "bottle", count = 0, onPress }) => {
  return type === "bottle" ? (
    <TouchableOpacity onPress={onPress}>
      <View
        height={270}
        width={170}
        bg-pigeonPost
        padding-10
        gap-30
        style={{ borderRadius: 10 }}
      >
        <Text challangeCardTitle royalBlue>
          Bottle.
        </Text>
        <View center gap-10>
          <Image
            height={100}
            width={95}
            source={require("../assets/images/collection_display/bottle.png")}
          />
          <Text counter royalBlue>
            {count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : type === "can" ? (
    <TouchableOpacity onPress={onPress}>
      <View
        height={270}
        width={170}
        bg-sprout
        padding-10
        gap-30
        style={{ borderRadius: 10 }}
      >
        <Text challangeCardTitle sushi>
          Can.
        </Text>
        <View center gap-10>
          <Image
            height={100}
            width={95}
            source={require("../assets/images/collection_display/can.png")}
          />
          <Text counter sushi>
            {count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View
        height={270}
        width={170}
        bg-visVis
        padding-10
        gap-30
        style={{ borderRadius: 10 }}
      >
        <Text challangeCardTitle goldenrod>
          Boxes.
        </Text>
        <View center gap-10>
          <Image
            height={100}
            width={95}
            source={require("../assets/images/collection_display/box.png")}
          />
          <Text counter goldenrod>
            {count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
