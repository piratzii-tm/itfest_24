import { View, Text } from "react-native-ui-lib";
import KContainer from "../../../components/KContainer";
import { TouchableOpacity } from "react-native";
import { auth } from "../../../firebase/config";
import { signOut } from "firebase/auth";

const ProfileScreen = () => {
  return (
    <KContainer type={1}>
      <TouchableOpacity
        onPress={() => {
          signOut(auth).catch((err) => console.log(err));
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </KContainer>
  );
};

export default ProfileScreen;
