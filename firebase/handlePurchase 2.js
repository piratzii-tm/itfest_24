import { auth, database } from "./config";
import { get, ref, set } from "firebase/database";
import { Alert } from "react-native";

export const handlePurchase = ({ priceOfProduct, multiplier }) => {
  const userRef = ref(database, `users/${auth.currentUser.uid}`);
  get(userRef).then((response) => {
    let aux = response.val();

    if (aux["purchasablePoint"] > priceOfProduct) {
      aux["purchasablePoint"] -= priceOfProduct;
      aux["multiplier"] *= multiplier;
      set(userRef, aux).then(() => console.log("Purchased with success"));
    } else {
      Alert.alert("Oops", "Not enough coins...");
    }
  });
};
