import { Text, View } from "react-native-ui-lib";
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
    const userRef = ref(database, "users/" + auth.currentUser.uid);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      }
    });
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
      <View paddingH-30 style={{ paddingBottom: 120 }}>
        <KHeading
          title={"Awards."}
          subTitle={"Your achievements as recycler."}
        />
        <KSpacer />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {userData.rewardsIDs !== undefined &&
            userData.rewardsIDs.map(
              (id) =>
                id !== -1 && (
                  <>
                    <KAchivements
                      key={id}
                      photoRequire={awards[id].photo}
                      title={awards[id].title}
                      subTitle={awards[id].description}
                      type={"large"}
                    />
                    <View width={10}></View>
                  </>
                ),
            )}
        </ScrollView>
        <KSpacer height={50} />
        <KHeading
          title={"Challenges."}
          subTitle={"Complete challenges and earn more coins."}
        />
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

        <KHeading
          title={"Collections."}
          subTitle={"Your collected items in one place."}
        />
        <KSpacer />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <KCollectionDisplay
            count={userData["plasticObjects"]}
            onPress={() => {
              //TODO handle navgation
            }}
          />
          <View width={10}></View>
          <KCollectionDisplay
            type={"paper"}
            count={userData["paperObjects"]}
            onPress={() => {
              //TODO handle navgation
            }}
          />
          <View width={10}></View>
          <KCollectionDisplay
            type={"can"}
            count={userData["aluminiumObjects"]}
            onPress={() => {
              //TODO handle navgation
            }}
          />
        </ScrollView>
      </View>
    </KContainer>
  );
};

export default HomeScreen;
