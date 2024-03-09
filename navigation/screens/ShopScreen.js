import KContainer from "../../components/KContainer";
import { Text, View } from "react-native-ui-lib";
import KShopCard from "../../components/KShopCard";
import KSpacer from "../../components/KSpacer";
import { KHeading } from "../../components/KHeading";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import { useWindowDimensions } from "react-native";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../../firebase/config";
import { useEffect, useState } from "react";
import { KCoin } from "../../components/KCoin";

const ShopScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    const userRef = ref(database, "users/" + auth.currentUser.uid);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      }
    });
  }, []);

  return (
    <KContainer type={3}>
      {userData !== "undefined" && (
        <>
          <KBackButtonHeader onPress={() => navigation.pop()} />
          <KSpacer height={20} />
          <View width={windowWidth} right paddingH-20>
            <KCoin size={36} price={userData.purchasablePoint} />
          </View>
          <View paddingH-10 center>
            <View bg-tundora padding-20 style={{ borderRadius: 20 }}>
              <Text achivementTitle saltpan>
                More is better, for the nature.
              </Text>
              <Text achivementSubTitle saltpan>
                Multiply your earning by purchasing items below.
              </Text>
            </View>
            <KSpacer height={20} />
            <KShopCard
              settedMultiplier={2}
              settedPrice={
                isNaN(Math.pow(2, userData["multiplier"]))
                  ? ""
                  : Math.pow(2, userData["multiplier"])
              }
            />
            <KSpacer height={10} />
            <KShopCard
              settedMultiplier={3}
              settedPrice={
                isNaN(Math.pow(3, userData["multiplier"]))
                  ? ""
                  : Math.pow(3, userData["multiplier"])
              }
            />
          </View>
        </>
      )}
    </KContainer>
  );
};

export default ShopScreen;
