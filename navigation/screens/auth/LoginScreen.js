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
import { signInWithEmailAndPassword } from "firebase/auth";
import KContainer from "../../../components/KContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../../constants/theme";

const LoginScreen = ({ navigation }) => {
  const onPressSubmit = useCallback(({ email, password }) => {
    if (email.length > 0 && password.length > 0) {
      signInWithEmailAndPassword(auth, email, password).catch((err) =>
        alert(err),
      );
    } else {
      alert("Empty fields");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

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
            Login.
          </Text>

          <View
            bg-berylGreen
            padding-40
            paddingH-60
            style={{ borderRadius: 20 }}
          >
            <KSpacer height={20} />
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
            <KSpacer height={100} />
            <TouchableOpacity
              onPress={() =>
                onPressSubmit({ email: email, password: password })
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
                Not a recycler?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text achivementSubTitle olivine>
                  Register.
                </Text>
              </TouchableOpacity>
            </View>
            <KSpacer height={90} />
          </View>
        </View>
      </View>
    </KContainer>
  );
};

export default LoginScreen;
