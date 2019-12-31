import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import OutfitView from "../Views/OutfitView";
import HomeView from "../Views/HomeView";
import StatsView from "../Views/StatsView";
import InventoryView from "../Views/InventoryView";
import ActionsView from "../Views/Actions/ActionView";

const TabNavigator = createBottomTabNavigator(
  {
    Outfit: {
      screen: OutfitView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="tshirt" color={tintColor} size={24} />
        )
      })
    },
    Stats: {
      screen: StatsView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="chart-bar" color={tintColor} size={24} />
        )
      })
    },
    Home: {
      screen: HomeView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="heart" color={tintColor} size={24} />
        )
      })
    },
    Actions: {
      screen: ActionsView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bolt" color={tintColor} size={24} />
        )
      })
    },
    Inventory: {
      screen: InventoryView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="th-large" color={tintColor} size={24} />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: "#886589",
      activeTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#EC91D8" // TabBar background
      }
    }
  }
);

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
