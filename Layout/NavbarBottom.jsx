import React from "react";
// import { StyleSheet } from "react-native";
// import { mapping, light as lightTheme } from "@eva-design/eva";
import {
  // BottomNavigation,
  // BottomNavigationTab,
  // Layout,
  // Text,
  // ApplicationProvider,
  Icon
} from "react-native-ui-kitten";
// import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import OutfitView from "../Views/OutfitView";
import HomeView from "../Views/HomeView";
import StatsView from "../Views/StatsView";
import InventoryView from "../Views/InventoryView";
import ActionsView from "../Views/Actions/ActionView";

import RequestView from "../Views/apiRequests/RequestView";

export const MainIcon = <Icon name="person" />;

// export default LayoutSimpleUsageShowcase = ({ navigation }) => (
//   <SafeAreaView>
//     <BottomNavigation
//     // selectedIndex={navigation.state.index}
//     // onSelect={onSelect}
//     >
//       <BottomNavigationTab title="Outfit" />
//       <BottomNavigationTab title="Stats" />
//       <BottomNavigationTab icon={MainIcon} />
//       <BottomNavigationTab title="Actions" />
//       <BottomNavigationTab title="Inventory" />
//     </BottomNavigation>
//   </SafeAreaView>
// );

const TabNavigator = createBottomTabNavigator({
  Outfit: OutfitView,
  Stats: StatsView,
  Home: HomeView,
  Actions: ActionsView,
  Inventory: InventoryView,
  Requests: RequestView
});

export default createAppContainer(TabNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     flexWrap: "wrap",
//     paddingVertical: 4,
//     paddingHorizontal: 4
//   }
// });
