import { View, Text } from "react-native-ui-lib";
import KSpacer from "../../../components/KSpacer";
import { Button, TextInput } from "react-native";
import { useCallback, useState } from "react";
import { auth } from "../../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const onPressSubmit = useCallback(({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err),
    );
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <KSpacer height={50} />
      <Text>Register</Text>

      <TextInput
        placeholder={"Email"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder={"Password"}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title={"Submit"}
        onPress={() => onPressSubmit({ email: email, password: password })}
      />

      <Button title={"Account?"} onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default RegisterScreen;
