import KContainer from "../../components/KContainer";
import { Text, View } from "react-native-ui-lib";
import { useContext, useEffect, useState } from "react";
import { KRecycledObject } from "../../components/KRecycledObject";
import { Colors } from "../../constants/theme";
import { useWindowDimensions } from "react-native";
import KSpacer from "../../components/KSpacer";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import { TimerContext } from "../../constants/contexts/timerContext";

const AfterScanScreen = ({ navigation, route }) => {
  const [isRecycable, setIsRecycable] = useState(false);
  const [objectType, setObjectType] = useState("trash");
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { isActiveChallenge, setScans } = useContext(TimerContext);

  useEffect(() => {
    const response = route.params.response.split(" ");
    console.log(response);
    if (
      response[0].toLowerCase().length >= 3 &&
      (response[0].toLowerCase().includes("yes") ||
        (response[0].toLowerCase().includes("recyclable") &&
          !response[0].toLowerCase().includes("no")))
    ) {
      setIsRecycable(true);
      if (isActiveChallenge) {
        setScans((prev) => prev + 1);
      }
    }
    if (response[1] !== undefined) {
      setObjectType(response[1].toLowerCase());
    }
  }, []);

  return (
    <KContainer type={2}>
      <KBackButtonHeader onPress={() => navigation.pop()} />
      {isRecycable ? (
        <>
          <KSpacer height={60} />

          <View left paddingH-40>
            <Text recycleCard white>
              Toss a coin to your recycler.
            </Text>
          </View>
          <KSpacer height={20} />
          <View paddingH-40 center>
            <KRecycledObject
              coins={1}
              photoUri={route.params.uri}
              text={objectType}
              color={
                objectType === "plastic"
                  ? Colors.royalBlue
                  : objectType === "paper"
                    ? Colors.goldenrod
                    : Colors.sushi
              }
            />
          </View>
        </>
      ) : (
        <View paddingH-40 center>
          <KSpacer height={100} />
          <Text recycleCard saltpan>
            You wizard, that is not recyclable! 😮
          </Text>
          <KSpacer />
          <Text
            subTitle
            saltpan
            style={{ fontFamily: "DMSans-Medium", fontSize: 16 }}
          >
            Or maybe it is, you are the wizard, we are on beta.
          </Text>
        </View>
      )}
    </KContainer>
  );
};

export default AfterScanScreen;
