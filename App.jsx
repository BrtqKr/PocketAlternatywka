import React from "react";
import { Platform, AppState } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";
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
import { TouchableOpacity } from "react-native-gesture-handler";

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
      <ItemsProvider>
        <StatsProvider>
          <StaminaProvider>
            <CoinsProvider>
              <ProfileProvider>
                <ApplicationProvider mapping={mapping} theme={lightTheme}>
                  <NavbarBottom />
                </ApplicationProvider>
              </ProfileProvider>
            </CoinsProvider>
          </StaminaProvider>
        </StatsProvider>
      </ItemsProvider>
    );
  }
}

export default LayoutSimpleUsageShowcase;
