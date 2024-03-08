import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/tabs/HomeScreen";
import ScanScreen from "./screens/tabs/ScanScreen";
import ProfileScreen from "./screens/tabs/ProfileScreen";
import CollectionsScreen from "./screens/CollectionsScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"Scan"} component={ScanScreen} />
      <Tab.Screen name={"Profile"} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Tabs"} component={Tabs} />
      <Stack.Screen name={"Collections"} component={CollectionsScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Register"} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <NavigationContainer>
      {isLogged && <AppStack />}
      {!isLogged && <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
