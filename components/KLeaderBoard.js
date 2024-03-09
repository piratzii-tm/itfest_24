import { Text, View } from "react-native-ui-lib";
import { useWindowDimensions } from "react-native";
import { Colors } from "../constants/theme";
import { auth } from "../firebase/config";

export const KLeaderBoard = ({ leaderBoard }) => {
  const { width } = useWindowDimensions();
  const currentUser = auth.currentUser.uid;

  return leaderBoard.map((element) => {
    return (
      <View
        key={element.index}
        width={width * 0.9}
        row
        spread
        bg-saltpan
        padding-10
        style={
          element.index === 1
            ? {
                borderColor: Colors.olivine,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderWidth: 2,
              }
            : leaderBoard.indexOf(element) !== leaderBoard.length - 1
              ? {
                  borderColor: Colors.olivine,
                  borderBottomWidth: 2,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                }
              : {
                  borderColor: Colors.olivine,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomWidth: 2,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                }
        }
      >
        <View row gap-10>
          <View width={30}>
            <Text
              logoutText
              style={[
                element.index === 1
                  ? { color: Colors.gold }
                  : element.index === 2
                    ? { color: Colors.silver }
                    : element.index === 3
                      ? { color: Colors.bronze }
                      : { color: Colors.black },
                element.uid === currentUser ? { opacity: 1 } : { opacity: 0.5 },
              ]}
            >
              {element.index}
            </Text>
          </View>
          <Text
            logoutText
            style={[
              element.index === 1
                ? { color: Colors.gold }
                : element.index === 2
                  ? { color: Colors.silver }
                  : element.index === 3
                    ? { color: Colors.bronze }
                    : { color: Colors.black },
              element.uid === currentUser ? { opacity: 1 } : { opacity: 0.5 },
            ]}
          >
            {element.name}
          </Text>
        </View>
        <Text logoutText webOrange>
          {element.coins}
        </Text>
      </View>
    );
  });
};
