import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, get, child, set } from "firebase/database";
import { auth, database, storage } from "./config";
import * as ImageManipulator from "expo-image-manipulator";
import { handleImageRecognition } from "../constants/helpers/handleImageRecognition";
import { Alert } from "react-native";

export const handleImageProcessing = async ({ uri }) => {
  try {
    // Extract image name using array.pop()
    const imageName = uri.split("/").pop();

    // Resize and compress the image
    const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300, height: 600 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
    );

    // Fetch the image and convert it to a blob
    const photoResponse = await fetch(resizedUri);
    const blob = await photoResponse.blob();

    // Upload the image to the main images folder and get its download URL
    const allImagesRef = ref(storage, `images/${imageName}`);
    const uploadSnapshot = await uploadBytes(allImagesRef, blob);
    const downloadURL = await getDownloadURL(uploadSnapshot.ref);

    // Run image recognition on the uploaded image
    const recognitionResult = await handleImageRecognition({
      url: downloadURL,
    });

    // Check the recognition result
    if (
      !recognitionResult.toLowerCase().includes("no") &&
      (recognitionResult.toLowerCase().includes("yes") ||
        (recognitionResult.toLowerCase().includes("recyclable") &&
          !recognitionResult.toLowerCase().includes("non")))
    ) {
      // Extract folder name from recognition result
      const responseList = recognitionResult.split(" ");
      let folderName = responseList[1].toLowerCase();
      if (folderName === "aluminum") folderName = "aluminium";

      // Upload the image to the user-specific folder
      const userImagesRef = ref(
        storage,
        `users/${auth.currentUser.uid}/${folderName}/${imageName}`,
      );
      await uploadBytes(userImagesRef, blob);

      // Retrieve user and global data from the database
      const userSnapshot = await get(
        child(dbRef(database), `users/${auth.currentUser.uid}`),
      );
      const globalSnapshot = await get(child(dbRef(database), "global/"));

      // Provide default objects if the fetched data is null
      let userData = userSnapshot.val() || {};
      let globalData = globalSnapshot.val() || {};

      // Initialize required properties if missing
      userData.images = userData.images || {};
      userData.images[folderName] = userData.images[folderName] || [];
      userData.totalPoints = userData.totalPoints || 0;
      userData.purchasablePoint = userData.purchasablePoint || 0;
      userData.plasticObjects = userData.plasticObjects || 0;
      userData.paperObjects = userData.paperObjects || 0;
      userData.aluminiumObjects = userData.aluminiumObjects || 0;
      userData.rewardsIDs = userData.rewardsIDs || [];
      userData.achievementPoints = userData.achievementPoints || 0;
      userData.multiplier = userData.multiplier || 1;

      // Update image list and counters
      userData.images[folderName].push(imageName);
      userData.totalPoints += 1 * userData.multiplier;
      userData.purchasablePoint += 1 * userData.multiplier;
      userData[`${folderName}Objects`] =
        (userData[`${folderName}Objects`] || 0) + 1;
      globalData[folderName] = (globalData[folderName] || 0) + 1;

      // Helper function to update rewards
      const updateReward = (rewardId, message, points = 1) => {
        if (!userData.rewardsIDs.includes(rewardId)) {
          userData.rewardsIDs.push(rewardId);
          userData.totalPoints += points * userData.multiplier;
          userData.purchasablePoint += points * userData.multiplier;
          userData.achievementPoints += points * userData.multiplier;
          Alert.alert("Congrats! New award received! 🥳", message);
        }
      };

      if (userData.plasticObjects >= 1) {
        updateReward(0, "Bottoms up!");
      }
      if (userData.paperObjects >= 1) {
        updateReward(2, "Rock paper and PAPER!");
      }
      if (userData.aluminiumObjects >= 1) {
        updateReward(1, "Aluminium starter!");
      }
      if (
        userData.aluminiumObjects >= 1 &&
        userData.paperObjects >= 1 &&
        userData.plasticObjects >= 1
      ) {
        updateReward(3, "The recycler!", 3);
      }
      if (
        userData.aluminiumObjects >= 5 &&
        userData.paperObjects >= 5 &&
        userData.plasticObjects >= 5
      ) {
        updateReward(4, "That’s a collection.", 5);
      }

      // Write updated data back to the database
      const userUpdateRef = dbRef(database, `users/${auth.currentUser.uid}`);
      const globalUpdateRef = dbRef(database, "global/");
      await set(userUpdateRef, userData);
      await set(globalUpdateRef, globalData);
    }
    console.log(recognitionResult);
    return recognitionResult;
  } catch (error) {
    console.error("Error processing image:", error);
    Alert.alert(
      "Error",
      "There was an error processing your image. Please try again.",
    );
    throw error;
  }
};
