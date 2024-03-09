import { Share } from "react-native";
import { Colors } from "../theme";

export const onShare = async ({ rewardTitle, rewardDescription }) => {
  const messageToSend = `Recyco ♻️,\n\tthe best app in the industry of recycling apps ,\n\tmotivated me to get the \n\t👉 ${rewardTitle} 👈,\n\t🚀${rewardDescription} 📸`;
  try {
    const result = await Share.share(
      {
        message: messageToSend,
      },
      {
        tintColor: Colors.webOrange,
      },
    );
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (err) {
    console.log(err);
  }
};
