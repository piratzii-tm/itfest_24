import KContainer from "../../components/KContainer";
import { Text, View } from "react-native-ui-lib";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../../constants/contexts/timerContext";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import KSpacer from "../../components/KSpacer";
import { KCoin } from "../../components/KCoin";
import { Colors } from "../../constants/theme";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { updateAwardsPoints } from "../../firebase/updateAwardsPoints";

const BeforeStartingChallangeScreen = ({ navigation, route }) => {
  const [finishedScans, setFinishedScans] = useState(0);
  const {
    duration,
    scans,
    setScans,
    isActiveChallenge,
    startTimeStamp,
    setStartTimeStamp,
    setIsActiveChallenge,
  } = useContext(TimerContext);
  const [challange, setChallange] = useState({});
  useEffect(() => {
    setChallange(route.params.challange);
    console.log((Date.now() - startTimeStamp) / 1000);
    if ((Date.now() - startTimeStamp) / 1000 >= duration || scans >= 3) {
      setIsActiveChallenge(false);
      setFinishedScans(scans);
      if (scans >= route.params.challange.minimumScans) {
        updateAwardsPoints({
          points: route.params.challange.prize - scans,
        }).then(() => console.log("Successfully completed the challenge"));
      }
      if ((Date.now() - startTimeStamp) / 1000 >= duration) {
        setScans(0);
      }
    }
  }, []);

  return (
    <KContainer type={2}>
      <KBackButtonHeader onPress={() => navigation.pop()} />
      {challange.instructions !== undefined && (
        <>
          <Text
            challangeCardTitle
            white
            center
            style={{ fontFamily: "DMSans-Bold" }}
          >
            {challange.title}
          </Text>
          <KSpacer height={50} />

          {/*handle the before challenge*/}
          {finishedScans === 0 && (
            <>
              <View paddingH-10>
                <Text
                  challangeCardTitle
                  white
                  left
                  tyle={{ fontFamily: "DMSans-Bold" }}
                >
                  Challenge:
                </Text>
                <KSpacer />
                <Text
                  achivementTitle
                  style={{ fontFamily: "DMSans-Regular" }}
                  saltpan
                >
                  {challange.description}
                </Text>
                <KSpacer height={30} />
                {!isActiveChallenge && (
                  <>
                    <Text
                      challangeCardTitle
                      white
                      left
                      tyle={{ fontFamily: "DMSans-Bold" }}
                    >
                      Instructions:
                    </Text>
                    <KSpacer />
                    <View flex left>
                      {!isActiveChallenge &&
                        challange.instructions.map((instruction) => (
                          <Text
                            saltpan
                            achivementTitle
                            style={{ fontFamily: "DMSans-Regular" }}
                            key={instruction}
                          >
                            • {instruction}
                          </Text>
                        ))}
                    </View>
                    <KSpacer height={30} />
                  </>
                )}
                <KSpacer height={30} />
                <View row centerV>
                  <Text
                    challangeCardTitle
                    white
                    left
                    tyle={{ fontFamily: "DMSans-Bold" }}
                  >
                    Prize:
                  </Text>
                  <View width={10}></View>
                  <View paddingT-10>
                    <KCoin price={challange.prize} size={32} />
                  </View>
                </View>
              </View>
              <KSpacer height={30} />
              {isActiveChallenge && (
                <>
                  <View paddingH-10>
                    <Text
                      challangeCardTitle
                      white
                      left
                      tyle={{ fontFamily: "DMSans-Bold" }}
                    >
                      Time left:
                    </Text>
                  </View>
                  <KSpacer />

                  <View flex center>
                    <CountdownCircleTimer
                      isPlaying={isActiveChallenge}
                      initialRemainingTime={
                        duration - (Date.now() - startTimeStamp) / 1000
                      }
                      duration={duration}
                      colors={[Colors.tundora]}
                      onUpdate={(remainingTime) => {
                        if (remainingTime === 0) {
                          setIsActiveChallenge(false);
                        }
                      }}
                    >
                      {({ remainingTime }) => (
                        <Text challangeCardTitle white>
                          {remainingTime}
                        </Text>
                      )}
                    </CountdownCircleTimer>
                  </View>
                </>
              )}
              <KSpacer height={30} />

              {!isActiveChallenge && (
                <View flex center>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.starkWhite,
                      padding: 10,
                      width: 200,
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      setStartTimeStamp(Date.now());
                      setIsActiveChallenge(true);
                    }}
                  >
                    <Text challangeCardTitle quikSand>
                      Start
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

          {/*handle the after challenge*/}
          {finishedScans !== 0 && (
            <>
              {challange.minimumScans <= finishedScans && (
                <View flex center>
                  <KCoin price={challange.prize} size={48} />
                  <KSpacer />
                  <Image
                    source={require("../../assets/images/trophy.png")}
                    style={{
                      height: 200,
                      width: 200,
                    }}
                  />
                  <View width={340}>
                    <Text challangeCardTitle center goldenrod>
                      Congratulation! You’ve finished the challenge and received
                      your prize.
                    </Text>
                  </View>
                </View>
              )}
              {challange.minimumScans > finishedScans && (
                <View flex center>
                  <KCoin price={finishedScans} size={48} />
                  <KSpacer />
                  <View width={340}>
                    <Text challangeCardTitle center goldenrod>
                      Unfortunately you did not reach the minimum scans
                      necessary to complete the challenge. 😓
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </>
      )}
    </KContainer>
  );
};

export default BeforeStartingChallangeScreen;
