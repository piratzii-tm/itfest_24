import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/tabs/HomeScreen";
import ScanScreen from "./screens/tabs/ScanScreen";
import ProfileScreen from "./screens/tabs/ProfileScreen";
import CollectionsScreen from "./screens/CollectionsScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import AfterScanScreen from "./screens/AfterScanScreen";
import { Colors } from "../constants/theme";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text } from "react-native-ui-lib";
import ChallengeScreen from "./screens/ChallengeScreen";
import { LeaderBoardScreen } from "./screens/LeaderBoardScreen";
import { StatsScreen } from "./screens/StatsScreen";
import ShopScreen from "./screens/ShopScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: 32,
          backgroundColor: Colors.blackHaze,
          height: 95,
          shadowColor: "black",
          shadowRadius: 2,
          shadowOpacity: 0.3,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              size={30}
              icon={faHouse}
              color={focused ? Colors.olivine : Colors.alto}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text tabBarText alto olivine={focused}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={"Scan"}
        component={ScanScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faCamera}
              size={30}
              color={focused ? Colors.tundora : Colors.alto}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text tabBarText alto tundora={focused}>
              Camera
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faCircleUser}
              size={30}
              color={focused ? Colors.olivine : Colors.alto}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text tabBarText alto olivine={focused}>
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Tabs"} component={Tabs} />
      <Stack.Screen name={"Collections"} component={CollectionsScreen} />
      <Stack.Screen name={"AfterScan"} component={AfterScanScreen} />
      <Stack.Screen name={"ChallengeScreen"} component={ChallengeScreen} />
      <Stack.Screen name={"LeaderBoardScreen"} component={LeaderBoardScreen} />
      <Stack.Screen name={"ShopScreen"} component={ShopScreen} />
      <Stack.Screen name={"StatsScreen"} component={StatsScreen} />
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isLogged && <AppStack />}
      {!isLogged && <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
