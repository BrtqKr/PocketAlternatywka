import React from "react";
import { Platform, AppState, View } from "react-native";

import { Notifications } from "expo";

import NavbarBottom from "./Layout/NavbarBottom";
import { ProfileProvider } from "./Providers/ProfileProviderConfig";
import { StatsProvider } from "./Providers/StatsProviderConfig";
import { ItemsProvider } from "./Providers/ItemsProviderConfig";
import { CoinsProvider } from "./Providers/CoinsProviderConfig";
import {
  listenForNotifications,
  getiOSNotificationPermission,
  initNotification
} from "./Notifications/NotificationsScheduler";
import { StaminaProvider } from "./Providers/StaminaProviderConfig";
import CoinsBar from "./Layout/CoinsBar";

Platform.select({ ios: "Arial", android: "Comic Sans" });

class LayoutSimpleUsageShowcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }

  async componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    getiOSNotificationPermission();
    listenForNotifications();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = async nextAppState => {
    if (
      this.state.appState === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
      const notificationId = initNotification();
      this.setState({ idPromise: notificationId });
    } else if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.state.idPromise.then(value =>
        Notifications.cancelScheduledNotificationAsync(value)
      );
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <View style={{ backgroundColor: "#FFD5F4", flex: 1 }}>
        <ItemsProvider>
          <StatsProvider>
            <StaminaProvider>
              <CoinsProvider>
                <ProfileProvider>
                  <CoinsBar />
                  <NavbarBottom />
                </ProfileProvider>
              </CoinsProvider>
            </StaminaProvider>
          </StatsProvider>
        </ItemsProvider>
      </View>
    );
  }
}

export default LayoutSimpleUsageShowcase;
