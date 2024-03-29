import { auth, database } from "./config";
import { ref, set } from "firebase/database";

export const handleCreateUser = ({ username, mail }) => {
  const userData = {
    mail,
    username,
    id: auth.currentUser.uid,
    totalPoints: 0,
    purchasablePoint: 0,
    multiplier: 1,
    plasticObjects: 0,
    paperObjects: 0,
    aluminiumObjects: 0,
    achievementPoints: 0,
    rewardsIDs: [-1],
    images: {
      plastic: ["IGNORE"],
      paper: ["IGNORE"],
      aluminium: ["IGNORE"],
    },
  };

  const usersRef = ref(database, "users/" + auth.currentUser.uid);
  set(usersRef, userData).then(() => console.log("Registered with success"));
};
