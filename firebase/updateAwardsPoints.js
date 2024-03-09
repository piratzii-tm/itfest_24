import { child, get, ref as dbRef, set } from "firebase/database";
import { auth, database } from "./config";

export const updateAwardsPoints = async ({ points }) => {
  const userGet = await get(
    child(dbRef(database), "users/" + auth.currentUser.uid),
  );

  let aux = userGet.val();

  aux["achievementPoints"] += points;
  aux["totalPoints"] += points;

  const userUpdate = dbRef(database, `users/${auth.currentUser.uid}`);
  set(userUpdate, aux).then(() => console.log("Update with success"));
};
