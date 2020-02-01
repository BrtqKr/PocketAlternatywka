import { AsyncStorage } from "react-native";

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

export default getStoredStats;
