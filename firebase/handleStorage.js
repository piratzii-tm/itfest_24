import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, get, child, set } from "firebase/database";
import { auth, database, storage } from "./config";
import * as ImageManipulator from "expo-image-manipulator";
import { handleImageRecognition } from "../constants/helpers/handleImageRecognition";

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
    response.toLowerCase().length >= 3 &&
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

    console.log(userGet);

    const userUpdate = dbRef(database, `users/${auth.currentUser.uid}`);
    set(userUpdate, aux).then(() => console.log("Update with success"));
  }
  return response;
};
