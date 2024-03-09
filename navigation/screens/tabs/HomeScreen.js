import { View } from "react-native-ui-lib";
import KContainer from "../../../components/KContainer";
import { KHeading } from "../../../components/KHeading";
import { KChallange } from "../../../components/KChallange";
import KSpacer from "../../../components/KSpacer";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../../../constants/contexts/timerContext";
import { challanges } from "../../../data/challanges";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../../../firebase/config";
import { ScrollView } from "react-native";
import { awards } from "../../../data/awards";
import { KAchivements } from "../../../components/KAchivements";
import { KCollectionDisplay } from "../../../components/KCollectionDisplay";
import { KHomeHeader } from "../../../components/KHomeHeader";
const HomeScreen = ({ navigation }) => {
  const {
    isActiveChallenge,
    startTimeStamp,
    duration,
    setIsActiveChallenge,
    initChallenge,
  } = useContext(TimerContext);

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = ref(database, "users/" + auth.currentUser.uid);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      });
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    if (initChallenge) {
      setIsActiveChallenge((currentTime - startTimeStamp) / 1000 < duration);
    }
  }, [startTimeStamp, duration, currentTime]);

  return (
    <KContainer type={1}>
      <KHomeHeader navigation={navigation} />
      <View style={{ paddingBottom: 120 }}>
        <View paddingH-30>
          <KHeading
            title={"Awards."}
            subTitle={"Your achievements as recycler."}
          />
        </View>
        <KSpacer />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {userData != null &&
            userData.rewardsIDs !== undefined &&
            userData.rewardsIDs.map(
              (id) =>
                id !== -1 && (
                  <>
                    <View width={5}></View>
                    <KAchivements
                      key={id}
                      photoRequire={awards[id].photo}
                      title={awards[id].title}
                      subTitle={awards[id].description}
                      type={"large"}
                    />
                    <View width={5}></View>
                  </>
                ),
            )}
        </ScrollView>
        <KSpacer height={50} />
        <View paddingH-30>
          <KHeading
            title={"Challenges."}
            subTitle={"Complete challenges and earn more coins."}
          />
        </View>
        <KSpacer height={20} />
        <View center>
          <KChallange
            requirement={!isActiveChallenge ? challanges[0].description : ""}
            price={challanges[0].prize}
            onPress={() =>
              navigation.navigate("ChallengeScreen", {
                challange: challanges[0],
              })
            }
          />
        </View>
        <KSpacer height={50} />
        <View paddingH-30>
          <KHeading
            title={"Collections."}
            subTitle={"Your collected items in one place."}
          />
        </View>
        <KSpacer />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View width={5}></View>
          <KCollectionDisplay
            key={1}
            count={userData["plasticObjects"]}
            onPress={() =>
              navigation.navigate("Collections", { type: "plastic" })
            }
          />
          <View width={10}></View>
          <KCollectionDisplay
            key={2}
            type={"paper"}
            count={userData["paperObjects"]}
            onPress={() =>
              navigation.navigate("Collections", { type: "paper" })
            }
          />
          <View width={10}></View>
          <KCollectionDisplay
            key={3}
            type={"can"}
            count={userData["aluminiumObjects"]}
            onPress={() =>
              navigation.navigate("Collections", { type: "aluminium" })
            }
          />
        </ScrollView>
      </View>
    </KContainer>
  );
};

export default HomeScreen;
