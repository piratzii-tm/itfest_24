import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, get, child, set } from "firebase/database";
import { auth, database, storage } from "./config";
import * as ImageManipulator from "expo-image-manipulator";
import { handleImageRecognition } from "../constants/helpers/handleImageRecognition";
import { Alert } from "react-native";

export const handleImageProcessing = async ({ uri }) => {
  let imageName = uri.split("/");
  imageName = imageName[imageName.length - 1];

  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 300, height: 600 } }],
    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
  );

  const resizedUri = manipResult.uri;

  const allImagesRef = ref(storage, `images/${imageName}`);
  const photo = await fetch(resizedUri);
  const blob = await photo.blob();
  const response = await uploadBytes(allImagesRef, blob).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((resp) =>
      handleImageRecognition({ url: resp }),
    ),
  );

  if (
    !response.toLowerCase().includes("no") &&
    (response.toLowerCase().includes("yes") ||
      (response.toLowerCase().includes("recyclable") &&
        !response.toLowerCase().includes("non")))
  ) {
    const responseList = response.split(" ");
    const folderName = responseList[1].toLowerCase();
    const userImagesRef = ref(
      storage,
      `users/${auth.currentUser.uid}/${folderName}/${imageName}`,
    );

    await uploadBytes(userImagesRef, blob);

    const userGet = await get(
      child(dbRef(database), "users/" + auth.currentUser.uid),
    );

    let aux = userGet.val();

    aux["totalPoints"] += 1;
    aux[`${folderName}Objects`] += 1;

    if (aux["plasticObjects"] >= 1 && !aux["rewardsIDs"].includes(0)) {
      aux["rewardsIDs"].push(0);
      aux["totalPoints"] += 1;
      aux["achievementPoints"] += 1;
      Alert.alert("Congrats! New award received! 🥳", "Bottoms up!");
    }
    if (aux["paperObjects"] >= 1 && !aux["rewardsIDs"].includes(2)) {
      aux["rewardsIDs"].push(2);
      aux["totalPoints"] += 1;
      aux["achievementPoints"] += 1;
      Alert.alert("Congrats! New award received! 🥳", "Rock paper and PAPER!");
    }
    if (aux["aluminumObjects"] >= 1 && !aux["rewardsIDs"].includes(1)) {
      aux["rewardsIDs"].push(1);
      aux["totalPoints"] += 1;
      aux["achievementPoints"] += 1;
      Alert.alert("Congrats! New award received! 🥳", "Aluminium starter!");
    }
    if (
      aux["aluminumObjects"] >= 1 &&
      aux["paperObjects"] >= 1 &&
      aux["plasticObjects"] >= 1 &&
      !aux["rewardsIDs"].includes(3)
    ) {
      aux["rewardsIDs"].push(3);
      aux["totalPoints"] += 3;
      aux["achievementPoints"] += 3;
      Alert.alert("Congrats! New award received! 🥳", "The recycler!");
    }
    if (
      aux["aluminumObjects"] >= 5 &&
      aux["paperObjects"] >= 5 &&
      aux["plasticObjects"] >= 5 &&
      !aux["rewardsIDs"].includes(4)
    ) {
      aux["rewardsIDs"].push(4);
      aux["totalPoints"] += 5;
      aux["achievementPoints"] += 5;
      Alert.alert("Congrats! New award received! 🥳", "That’s a collection.");
    }

    const userUpdate = dbRef(database, `users/${auth.currentUser.uid}`);
    set(userUpdate, aux).then(() => console.log("Update with success"));
  }
  return response;
};
