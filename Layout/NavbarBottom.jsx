import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import OutfitView from "../Views/OutfitView";
import HomeView from "../Views/HomeView";
import StatsView from "../Views/StatsView";
import InventoryView from "../Views/InventoryView";
import ActionsView from "../Views/Actions/ActionView";
import HeartButton from "./HomeButton/HeartButton";
import NavigationService from "./HomeButton/NavigationService";
import CameraView from "../Views/CameraView";

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
        // tabBarIcon: ({ tintColor }) => (
        //   <Icon name="heart" color={tintColor} size={24} />
        // )
        tabBarIcon: ({ tintColor, focused }) => (
          <HeartButton
            color={tintColor}
            focused={focused}
            style={{ marginBottom: 30 }}
          />
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
    },

    Camera: {
      screen: CameraView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="camera" color={tintColor} size={24} />
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
        backgroundColor: "#EC91D8"
      }
    }
  }
);

const NavAppCointainer = createAppContainer(TabNavigator);

export default class Nav extends Component {
  render() {
    return (
      <NavAppCointainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
