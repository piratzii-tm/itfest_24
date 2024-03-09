import { Text, View } from "react-native-ui-lib";
import KContainer from "../../components/KContainer";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import PieChart from "react-native-pie-chart";
import { Colors } from "../../constants/theme";
import { useWindowDimensions } from "react-native";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/config";
import { useEffect, useState } from "react";
import KSpacer from "../../components/KSpacer";

export const StatsScreen = ({ navigation }) => {
  const [series, setSeries] = useState([1, 1, 1]);

  useEffect(() => {
    onValue(ref(database, "global/"), (snapshot) => {
      if (snapshot.exists()) {
        let suma =
          parseInt(snapshot.val().plastic) +
          parseInt(snapshot.val().paper) +
          parseInt(snapshot.val().aluminium);
        setSeries([
          ((parseInt(snapshot.val().plastic) * 100) / suma).toFixed(2),
          ((parseInt(snapshot.val().paper) * 100) / suma).toFixed(2),
          ((parseInt(snapshot.val().aluminium) * 100) / suma).toFixed(2),
        ]);
      }
    });
  }, []);

  const { width } = useWindowDimensions();
  const sliceColor = [Colors.royalBlue, Colors.webOrange, Colors.sushi];

  return (
    <KContainer type={1}>
      <KBackButtonHeader onPress={() => navigation.goBack()} />
      <KSpacer height={30} />

      <View center>
        <Text challangeCardTitle tundora>
          Global recycle 🌎
        </Text>
      </View>

      <KSpacer height={30} />

      <View center>
        <PieChart
          widthAndHeight={width * 0.8}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.4}
          coverFill={Colors.transparent}
        />
      </View>
      <KSpacer height={50} />
      <View center gap-10>
        <View
          height={50}
          center
          width={width * 0.8}
          style={{ borderRadius: 10 }}
          bg-royalBlue
        >
          <Text collectionTitle center pigeonPost>
            Plastic {series[0]}%
          </Text>
        </View>
        <View
          height={50}
          center
          width={width * 0.8}
          style={{ borderRadius: 10 }}
          bg-webOrange
        >
          <Text collectionTitle center visVis>
            Paper {series[1]}%
          </Text>
        </View>
        <View
          height={50}
          center
          width={width * 0.8}
          style={{ borderRadius: 10 }}
          bg-sushi
        >
          <Text collectionTitle center sprout>
            Aluminium {series[2]}%
          </Text>
        </View>
      </View>
    </KContainer>
  );
};
