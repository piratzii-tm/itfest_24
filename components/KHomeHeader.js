import { View } from "react-native-ui-lib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCartShopping,
  faChartSimple,
  faChess,
} from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../constants/theme";
import { TouchableOpacity } from "react-native";

export const KHomeHeader = ({ onShop, onStats, onLeaderBoard }) => {
  return (
    <View right row gap-20 paddingH-20>
      <TouchableOpacity onPress={onShop}>
        <FontAwesomeIcon icon={faChess} size={30} color={Colors.tundora} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onStats}>
        <FontAwesomeIcon
          icon={faChartSimple}
          size={30}
          color={Colors.tundora}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onLeaderBoard}>
        <FontAwesomeIcon
          icon={faCartShopping}
          size={30}
          color={Colors.tundora}
        />
      </TouchableOpacity>
    </View>
  );
};
