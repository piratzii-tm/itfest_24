import { View, Text } from "react-native-ui-lib";
import { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Button, useWindowDimensions, TouchableOpacity } from "react-native";
import { handleImageProcessing } from "../../../firebase/handleStorage";
import { Colors } from "../../../constants/theme";
import KSpacer from "../../../components/KSpacer";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ScanScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
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
    if (!isProcessing) {
      cameraRef.takePictureAsync().then((response) => {
        setIsProcessing(true);
        const URL = response.uri;
        handleImageProcessing({ uri: URL }).then((response) => {
          setIsProcessing(false);
          navigation.navigate("AfterScan", { response: response, uri: URL });
        });
      });
    }
  };

  return (
    <Camera
      style={{ flex: 1, justifyContent: "center", paddingBottom: 95 }}
      type={CameraType.back}
      ref={(ref) => setCameraRef(ref)}
    >
      {isProcessing && (
        <View
          abs
          flex
          backgroundColor={Colors.codGray}
          style={{
            opacity: 0.8,
          }}
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
          ></View>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};
export default ScanScreen;
