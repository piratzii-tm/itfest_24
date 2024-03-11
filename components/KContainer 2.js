import { View, Image } from "react-native-ui-lib";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ImageBackground } from "react-native";
import KSpacer from "./KSpacer";

const KContainer = ({ children, type = 0, isScrollable = true }) => {
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View flex bg-serenade>
        {
          <View absF>
            {type === 0 ? (
              <ImageBackground
                style={{ height: height, width: width }}
                source={require("../assets/images/image1.png")}
              ></ImageBackground>
            ) : type === 1 ? (
              <ImageBackground
                blurRadius={10}
                style={{ height: height, width: width }}
                source={require("../assets/images/image1.png")}
              >
                <LinearGradient
                  colors={[Colors.codGray, Colors.white]}
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      opacity: 0.4,
                      borderRadius: 8,
                    },
                  ]}
                />
              </ImageBackground>
            ) : (
              <ImageBackground
                style={{ height: height, width: width }}
                source={require("../assets/images/image15.png")}
              >
                <LinearGradient
                  colors={[Colors.codGray, Colors.codGray]}
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      opacity: 0.5,
                      borderRadius: 8,
                    },
                  ]}
                />
              </ImageBackground>
            )}
          </View>
        }
        <ScrollView
          scrollEnabled={isScrollable}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: insets.top }}
        >
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default KContainer;
