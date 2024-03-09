import { View, Text } from "react-native-ui-lib";
import KSpacer from "../../../components/KSpacer";
import {
  Button,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useCallback, useState } from "react";
import { auth } from "../../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import KContainer from "../../../components/KContainer";
import { Colors } from "../../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { handleCreateUser } from "../../../firebase/handleCreateUser";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const onPressSubmit = useCallback(
    ({ email, password, rePassword, username }) => {
      if (
        email.length > 0 &&
        password.length > 0 &&
        rePassword.length > 0 &&
        username.length > 0
      ) {
        if (password === rePassword) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              handleCreateUser({ username: username, mail: email });
            })
            .catch((err) => alert(err));
        } else {
          alert("Passwords don't match");
        }
      } else {
        console.log(email, password, rePassword, username);
        alert("Empty fields");
      }
    },
    [],
  );

  return (
    <KContainer type={0} isScrollable={false}>
      <View width={windowWidth} right paddingH-20>
        <Text title style={{ fontFamily: "DMSans-Regular" }} olivine>
          Recyco.
        </Text>
      </View>

      <View
        flex
        style={{
          justifyContent: "flex-end",
          paddingBottom: bottom + 50,
        }}
        height={windowHeight}
      >
        <View paddingH-20>
          <Text title style={{ fontFamily: "DMSans-Regular" }} tundora>
            Register.
          </Text>

          <View
            bg-berylGreen
            padding-40
            paddingH-60
            style={{ borderRadius: 20 }}
          >
            <Text authLabel olivine>
              Email
            </Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              style={{
                backgroundColor: Colors.sprout,
                height: 60,
                borderRadius: 10,
                paddingLeft: 20,
                fontSize: 22,
                color: Colors.olivine,
              }}
            />
            <KSpacer height={20} />
            <Text authLabel olivine>
              Password
            </Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={{
                backgroundColor: Colors.sprout,
                height: 60,
                borderRadius: 10,
                paddingLeft: 20,
                fontSize: 22,
                color: Colors.olivine,
              }}
            />
            <KSpacer height={20} />
            <Text authLabel olivine>
              Re-enter Password
            </Text>
            <TextInput
              onChangeText={(text) => setRePassword(text)}
              style={{
                backgroundColor: Colors.sprout,
                height: 60,
                borderRadius: 10,
                paddingLeft: 20,
                fontSize: 22,
                color: Colors.olivine,
              }}
            />
            <KSpacer height={20} />
            <Text authLabel olivine>
              Username
            </Text>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              style={{
                backgroundColor: Colors.sprout,
                height: 60,
                borderRadius: 10,
                paddingLeft: 20,
                fontSize: 22,
                color: Colors.olivine,
              }}
            />
            <KSpacer height={50} />
            <TouchableOpacity
              onPress={() =>
                onPressSubmit({ email, password, rePassword, username })
              }
              style={{
                backgroundColor: Colors.olivine,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 15,
                borderRadius: 10,
              }}
            >
              <Text
                authLabel
                saltpan
                style={{ backgroundColor: Colors.transparent }}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <KSpacer height={5} />
            <View row gap>
              <Text achivementSubTitle olivine style={{ opacity: 0.8 }}>
                Already a recycler?
              </Text>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Text achivementSubTitle olivine>
                  Login.
                </Text>
              </TouchableOpacity>
            </View>
            <KSpacer height={60} />
          </View>
        </View>
      </View>
    </KContainer>
  );
};

export default RegisterScreen;
