import { Text } from "react-native-ui-lib";

import KContainer from "../../components/KContainer";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";

export const StatsScreen = ({ navigation }) => {
  return (
    <KContainer type={1}>
      <KBackButtonHeader onPress={() => navigation.goBack()} />
      <Text>Stats</Text>
    </KContainer>
  );
};
