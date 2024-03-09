import { View, Text } from "react-native-ui-lib";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import KSpacer from "./KSpacer";
import { KCoin } from "./KCoin";
import { handlePurchase } from "../firebase/handlePurchase";

const KShopCard = ({ settedPrice, settedMultiplier }) => {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() =>
        handlePurchase({
          priceOfProduct: settedPrice,
          multiplier: settedMultiplier,
        })
      }
    >
      <View
        bg-saltpan
        width={windowWidth * 0.9}
        padding-10
        spread
        style={{ borderRadius: 20 }}
        row
      >
        <View>
          <View row>
            <Text achivementTitle olivine>
              Recyco.
            </Text>
            <View width={20}></View>
            <Text achivementTitle highland>
              {settedMultiplier}x
            </Text>
          </View>
          <KSpacer height={5} />
          <Text
            achivementSubTitle
            style={{ fontFamily: "DMSans-Bold" }}
            lineBreakMode={"tail"}
            tundora
          >
            Multiply your earning{"\n"}with {settedMultiplier}.
          </Text>
        </View>
        <View flex right centerV>
          <KCoin size={48} price={settedPrice} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default KShopCard;
