import { Alert } from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { AsyncStorage } from "react-native";

// import { getStoredStats } from "../Providers/StatsProviderUtil";
import notificationsDictionary from "./NotificationsDictionary";

export async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    return;
  }
}

//zapytać dlaczego po przeniesieniu z zew. pliku zaczęło działać (chyba coś nie tak z kontekstem albo importem...)
const getStoredStats = async () => {
  try {
    const retreived = await AsyncStorage.getItem("stats");
    const item = JSON.parse(retreived);
    return item;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return null;
};

export async function pickNotification() {
  const stats = await getStoredStats();
  const min = Math.min(...stats);
  const minimals = [];
  stats.forEach((item, index) => (item === min ? minimals.push(index) : null));
  const result = minimals[Math.floor(Math.random() * minimals.length)];
  return result;
}

export async function initNotification() {
  const notification = await pickNotification();
  // console.warn(notification);
  const localnotification = {
    title: notificationsDictionary.notifications[notification].title,
    body: notificationsDictionary.notifications[notification].body,
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
  return Notifications.scheduleLocalNotificationAsync(
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
