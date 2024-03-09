import { Text, View } from "react-native-ui-lib";
import KContainer from "../../../components/KContainer";
import { KHeading } from "../../../components/KHeading";
import { KChallange } from "../../../components/KChallange";
import KSpacer from "../../../components/KSpacer";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../../../constants/contexts/timerContext";
import { challanges } from "../../../data/challanges";
const HomeScreen = ({ navigation }) => {
  const {
    isActiveChallenge,
    startTimeStamp,
    duration,
    setIsActiveChallenge,
    scans,
    setScans,
  } = useContext(TimerContext);

  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    setIsActiveChallenge((currentTime - startTimeStamp) / 1000 < duration);
  }, [startTimeStamp, duration, currentTime]);

  return (
    <KContainer type={1}>
      <View paddingH-30>
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
              navigation.navigate("BeforeStarting", {
                challange: challanges[0],
              })
            }
          />
        </View>
      </View>
    </KContainer>
  );
};

export default HomeScreen;
