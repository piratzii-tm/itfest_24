import { View, Text, Image } from "react-native-ui-lib";
import KContainer from "../../../components/KContainer";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { auth, database } from "../../../firebase/config";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import KSpacer from "../../../components/KSpacer";
import { KHeading } from "../../../components/KHeading";
import { awards } from "../../../data/awards";
import { KAchivements } from "../../../components/KAchivements";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "../../../constants/theme";
import { KStats } from "../../../components/KStats";
import { onShare } from "../../../constants/helpers/share";

const ProfileScreen = () => {
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
    <KContainer type={1}>
      {userData.rewardsIDs !== undefined && (
        <View flex style={{ paddingBottom: 120 }}>
          <View width={windowWidth} center>
            <KSpacer height={80} />
            <Text title style={{ fontSize: 64, lineHeight: 70 }} tundora>
              {userData.username}
            </Text>
            <KSpacer height={30} />
            <Text title webOrange style={{ fontSize: 82, lineHeight: 85 }}>
              {userData.purchasablePoint}
            </Text>
            <Image
              style={{ marginTop: -15 }}
              height={64}
              width={64}
              source={require("../.././../assets/images/coins.png")}
            />
          </View>
          <KSpacer height={30} />
          <View paddingL-30>
            <KHeading
              title={"Awards"}
              subTitle={"All the awards available and collected."}
            />
          </View>
          <KSpacer />

          <View row style={{ flexWrap: "wrap" }} center gap-10>
            {awards.map((award, index) => (
              <TouchableOpacity
                key={index}
                disabled={!userData.rewardsIDs.includes(awards.indexOf(award))}
                onLongPress={() =>
                  onShare({
                    rewardTitle: award.title,
                    rewardDescription: award.description,
                  })
                }
              >
                <KAchivements
                  key={award.title}
                  price={award.coins}
                  photoRequire={award.photo}
                  title={award.title}
                  subTitle={award.description}
                  type={
                    userData.rewardsIDs.includes(awards.indexOf(award))
                      ? "small"
                      : "locked"
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
          <KSpacer height={30} />
          <View paddingL-30>
            <KHeading
              title={"Stats"}
              subTitle={"Statistics about your activity on the app"}
            />
          </View>
          <KSpacer />
          <View row center gap-10>
            <KStats
              type={1}
              coins={userData.totalPoints - userData.achievementPoints}
            />
            <KStats coins={userData.achievementPoints} />
          </View>
          <KSpacer height={80} />
          <TouchableOpacity
            onPress={() => {
              signOut(auth).catch((err) => console.log(err));
            }}
          >
            <View row center gap-5>
              <Text logoutText tundora>
                Logout
              </Text>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size={20}
                color={Colors.tundora}
              />
            </View>
          </TouchableOpacity>
          <KSpacer height={80} />
        </View>
      )}
    </KContainer>
  );
};

export default ProfileScreen;
