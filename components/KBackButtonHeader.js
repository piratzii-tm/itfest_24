import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "../constants/theme";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const KBackButtonHeader = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon icon={faArrowLeft} size={25} color={Colors.tundora} />
    </TouchableOpacity>
  );
};
