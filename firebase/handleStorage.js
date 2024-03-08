import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
import * as ImageManipulator from "expo-image-manipulator";
import { handleImageRecognition } from "../constants/helpers/handleImageRecognition";

export const handleImageProcessing = async ({ uri }) => {
  let imageName = uri.split("/");
  imageName = imageName[imageName.length - 1];

  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 300, height: 300 } }],
    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
  );

  const resizedUri = manipResult.uri;

  const allImagesRef = ref(storage, `images/${imageName}`);
  const photo = await fetch(resizedUri);
  const blob = await photo.blob();
  return await uploadBytes(allImagesRef, blob).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((resp) =>
      handleImageRecognition({ url: resp }),
    ),
  );
};
