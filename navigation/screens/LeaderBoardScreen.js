import KContainer from "../../components/KContainer";
import { Text, View } from "react-native-ui-lib";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import { KLeaderBoard } from "../../components/KLeaderBoard";
import KSpacer from "../../components/KSpacer";

export const LeaderBoardScreen = ({ navigation }) => {
  return (
    <KContainer type={1}>
      <KBackButtonHeader onPress={() => navigation.goBack()} />
      <KSpacer height={20} />
      <View center>
        <Text challangeCardTitle tundora>
          LEADER BOARD 🎉
        </Text>
        <KSpacer />
        <KLeaderBoard
          leaderBoard={[
            {
              uid: "4YH3udYHZ5XzCXMXBpwL1S1YSe02",
              index: 1,
              name: "Julius",
              coins: 56,
            },
            {
              uid: "u5XCQ9IylVMpUeoFDPdNoYvlZI43",
              index: 2,
              name: "Pop",
              coins: 30,
            },
            {
              index: 3,
              name: "Mihai",
              coins: 21,
            },
            {
              uid: "WEyRydjB6PXLcLcBVpkido0CYGD2",
              index: 4,
              name: "Julius",
              coins: 56,
            },
            {
              uid: "LYq0G385BuXI4MHXANo9xIXgoDw2",
              index: 5,
              name: "Pop",
              coins: 30,
            },
            {
              index: 6,
              name: "Mihai",
              coins: 21,
            },
            {
              index: 7,
              name: "Julius",
              coins: 56,
            },
            {
              uid: "iw7ahnYliwZCmPaH76ofRufQgrZ2",
              index: 8,
              name: "Pop",
              coins: 30,
            },
            {
              index: 9,
              name: "Mihai",
              coins: 21,
            },
            {
              index: 15,
              name: "Mihai",
              coins: 21,
            },
          ]}
        />
      </View>
    </KContainer>
  );
};
