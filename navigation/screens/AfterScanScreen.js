import KContainer from "../../components/KContainer";
import { Text } from "react-native-ui-lib";
import { useEffect, useState } from "react";

const AfterScanScreen = ({ navigation, route }) => {
  const [isRecycable, setIsRecycable] = useState(false);
  const [objectType, setObjectType] = useState("");

  useEffect(() => {
    const response = route.params.response.split(" ");
    console.log(response);
    if (
      response[0].toLowerCase() === "yes" ||
      response[0].toLowerCase() === "recyclable" ||
      response[0].toLowerCase().contains("yes") ||
      response[0].toLowerCase().contains("recyclable")
    ) {
      setIsRecycable(true);
    }
    setObjectType(response[1].toLowerCase());
  }, []);

  return (
    <KContainer type={2}>
      {isRecycable ? <Text>Recycable</Text> : <Text>Nope</Text>}
      <Text>{objectType}</Text>
    </KContainer>
  );
};

export default AfterScanScreen;
