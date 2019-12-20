import { Alert } from "react-native";
import { Permissions } from "expo-permissions";
import { Notifications } from "expo";

export async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    return;
  }
}

export function handleButtonPress() {
  const localnotification = {
    title: "Anon wróć do mn!",
    body: "Domagam się atencji",
    data: {
      thisIsYourData: "hello world"
    },
    android: {
      sound: true
    },
    ios: {
      sound: true
    }
  };
  let sendAfterFiveSeconds = Date.now();
  sendAfterFiveSeconds += 5000;

  const schedulingOptions = { time: sendAfterFiveSeconds };
  Notifications.scheduleLocalNotificationAsync(
    localnotification,
    schedulingOptions
  );
}

export function handleNotification({ origin, data, remote }) {
  const type = remote ? "Push" : "Local";
  const info = `${type} notification ${origin} with data: ${JSON.stringify(
    data
  )}`;
  Alert.alert("Notification!", info);
}

export function listenForNotifications() {
  Notifications.addListener(handleNotification);
}
