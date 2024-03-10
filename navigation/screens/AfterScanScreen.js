import KContainer from "../../components/KContainer";
import { Text, View } from "react-native-ui-lib";
import { useContext, useEffect, useState } from "react";
import { KRecycledObject } from "../../components/KRecycledObject";
import { Colors } from "../../constants/theme";
import { useWindowDimensions } from "react-native";
import KSpacer from "../../components/KSpacer";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import { TimerContext } from "../../constants/contexts/timerContext";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../../firebase/config";
import WebView from "react-native-webview";

const AfterScanScreen = ({ navigation, route }) => {
  const [isRecycable, setIsRecycable] = useState(false);
  const [objectType, setObjectType] = useState("trash");
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { isActiveChallenge, setScans } = useContext(TimerContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userRef = ref(database, "users/" + auth.currentUser.uid);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      }
    });
  }, []);

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
              coins={1 * userData["multiplier"]}
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
          <KSpacer height={objectType === "aluminium" ? 90 : 140} />
          <View bg-saltpan style={{ borderRadius: 20 }} padding-10 center>
            <View height={10} width={80} bg-codGray br30 padding></View>
            <KSpacer height={120} />

            <View width={windowWidth}>
              <Text title style={{ paddingHorizontal: 10, fontSize: 42 }}>
                Details:
              </Text>
              <Text
                achivementSubTitle
                style={{ fontSize: 20, paddingHorizontal: 10 }}
              >
                {objectType === "plastic"
                  ? "Stiff, glossy material with a smooth surface, characteristic of plastic, recyclable."
                  : objectType === "paper"
                    ? "Thin, flat material with a fibrous texture, resembling paper, recyclable."
                    : "Lightweight, shiny metallic object, possibly aluminum, recyclable."}
              </Text>

              <View row centerV>
                <Text title style={{ paddingHorizontal: 10, fontSize: 42 }}>
                  Container:
                </Text>
                <View
                  backgroundColor={
                    objectType === "plastic"
                      ? Colors.royalBlue
                      : objectType === "paper"
                        ? Colors.goldenrod
                        : Colors.sushi
                  }
                  height={40}
                  width={40}
                  br60
                ></View>
              </View>
              <Text title style={{ paddingHorizontal: 10, fontSize: 42 }}>
                Map:
              </Text>
              <WebView
                scrollEnabled={false}
                style={{
                  alignSelf: "center",
                  height: 500,
                  width: "100%",
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: Colors.goldenrod,
                }}
                source={{
                  uri: "https://econub.com/map",
                }}
              />
            </View>
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
