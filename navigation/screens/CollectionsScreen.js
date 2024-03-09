import { View, Text } from "react-native-ui-lib";
import KContainer from "../../components/KContainer";
import { KBackButtonHeader } from "../../components/KBackButtonHeader";
import { KRecycledObject } from "../../components/KRecycledObject";
import { auth, database, storage } from "../../firebase/config";
import { onValue, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { useEffect, useState } from "react";

//type : plastic, paper, aluminium
const CollectionsScreen = ({ navigation, route }) => {
  const types = route.params?.type;

  const [images, setImages] = useState([]);

  useEffect(() => {
    const userRef = ref(database, "users/" + auth.currentUser.uid);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        let aux = snapshot.val();
        aux["images"][`${types}`].map((imageName) => {
          let strgRef = storageRef(
            storage,
            `users/${auth.currentUser.uid}/${types}/${imageName}`,
          );
          getDownloadURL(strgRef).then((response) => {
            console.log(response);
            setImages((prev) => [...prev, response]);
          });
        });
      }
    });
  }, []);

  return (
    <KContainer type={3}>
      <KBackButtonHeader onPress={() => navigation.goBack()} />
      <View padding-20>
        <Text collectionTitle saltpan>
          {types === "plastic"
            ? "Plastic."
            : types === "paper"
              ? "Paper."
              : "Aluminium."}
        </Text>

        <Text collectionSubTitle saltpan>
          Your recycled{" "}
          {types === "plastic"
            ? "plastic"
            : types === "paper"
              ? "paper"
              : "aluminium"}
          , to remember the good you made.
        </Text>
      </View>
      <View row center left gap-10 style={{ flexWrap: "wrap" }}>
        {images.map(
          (element) =>
            element !== "IGNORE" && (
              <KRecycledObject key={element} photoUri={element} />
            ),
        )}
      </View>
    </KContainer>
  );
};

export default CollectionsScreen;
