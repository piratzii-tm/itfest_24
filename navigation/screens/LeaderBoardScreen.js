import KContainer from "../../components/KContainer";
import { Text, View } from "react-native-ui-lib";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import { KLeaderBoard } from "../../components/KLeaderBoard";
import KSpacer from "../../components/KSpacer";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../firebase/getLeaderboard";
import { auth } from "../../firebase/config";

export const LeaderBoardScreen = ({ navigation }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    getLeaderboard().then((list) => {
      if (list.length <= 10) {
        setLeaderBoard(list);
      } else {
        setLeaderBoard(list.slice(0, 9));
        if (!leaderBoard.map((el) => el.id).includes(auth.currentUser.uid)) {
          setLeaderBoard((prev) => [
            ...prev,
            leaderBoard.filter((el) => el.id === auth.currentUser.uid)[0],
          ]);
        }
      }
    });
  }, []);

  return (
    <KContainer type={1}>
      <KBackButtonHeader onPress={() => navigation.goBack()} />
      <KSpacer height={20} />
      <View center>
        <Text challangeCardTitle tundora>
          LEADER BOARD 🎉
        </Text>
        <KSpacer />
        <KLeaderBoard leaderBoard={leaderBoard} />
      </View>
    </KContainer>
  );
};
