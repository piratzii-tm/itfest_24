import { View, Text } from "react-native-ui-lib";

export const KHeading = ({ title = "", subTitle = "" }) => {
  return (
    <View>
      <Text title tundora>
        {title}
      </Text>
      <Text subTitle tundora>
        {subTitle}
      </Text>
    </View>
  );
};
