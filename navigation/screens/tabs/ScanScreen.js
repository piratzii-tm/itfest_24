import { View, Text } from "react-native-ui-lib";
import { useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useWindowDimensions, TouchableOpacity } from "react-native";
import { handleImageProcessing } from "../../../firebase/handleStorage";
import { Colors } from "../../../constants/theme";
import KSpacer from "../../../components/KSpacer";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ScanScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View padding-20 style={{ flex: 1, justifyContent: "center" }}>
        <Text challangeCardSubTitle tundora style={{ textAlign: "center" }}>
          Ready to <Text sushi>recycle</Text> with a splash of fun? Just need
          your <Text royalBlue>permission </Text> for camera{" "}
          <Text webOrange>magic</Text>!
        </Text>
        <KSpacer height={80} />
        <TouchableOpacity
          style={{
            height: 50,
            width: 100,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={requestPermission}
        >
          <FontAwesomeIcon icon={faRecycle} size={100} color={Colors.sushi} />
          <Text collectionSubTitle tundora>
            PRESS ME
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onPressScan = async () => {
    if (!isProcessing && cameraRef.current) {
      setIsProcessing(true);
      try {
        const response = await cameraRef.current.takePictureAsync();
        const URL = response.uri;
        const processedResponse = await handleImageProcessing({ uri: URL });
        navigation.navigate("AfterScan", {
          response: processedResponse,
          uri: URL,
        });
      } catch (error) {
        console.error("Error taking picture:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <CameraView
      style={{ flex: 1, justifyContent: "center", paddingBottom: 95 }}
      ref={cameraRef}
    >
      {isProcessing && (
        <View
          abs
          flex
          backgroundColor={Colors.codGray}
          style={{ opacity: 0.8 }}
          height={windowHeight}
          width={windowWidth}
          center
        >
          <Text dmSansBold white style={{ fontSize: 30 }}>
            Processing...
          </Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={onPressScan}
          style={{
            padding: 10,
            backgroundColor: Colors.white,
            height: 80,
            width: 80,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: Colors.white,
              height: 65,
              width: 65,
              borderRadius: 999,
              borderColor: Colors.codGray,
              borderWidth: 2,
            }}
          />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

export default ScanScreen;
