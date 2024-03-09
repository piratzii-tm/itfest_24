import { child, get, ref, set } from "firebase/database";
import { auth, database } from "./config";

export const updateAwardsPoints = async ({ points }) => {
  const userGet = await get(
    child(ref(database), "users/" + auth.currentUser.uid),
  );

  let aux = userGet.val();

  aux["achievementPoints"] += points;
  aux["totalPoints"] += points;
  aux["purchasablePoint"] += points;

  const userUpdate = ref(database, `users/${auth.currentUser.uid}`);
  set(userUpdate, aux).then(() => console.log("Update with success"));
};
