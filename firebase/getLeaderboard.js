import { get, ref } from "firebase/database";
import { auth, database } from "./config";

export const getLeaderboard = () => {
  const usersRef = ref(database, `users/`);
  return get(usersRef).then((snapshots) => {
    return Object.values(snapshots.val())
      .map((elem, index) => {
        return {
          uid: Object.keys(snapshots.val())[index],
          index,
          username: elem.username,
          coins: elem.totalPoints,
        };
      })
      .sort((el1, el2) => el2.coins - el1.coins);
  });
};
