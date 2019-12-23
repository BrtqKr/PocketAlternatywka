import React from "react";
import { Platform, AppState } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import {
  ApplicationProvider,
  Icon,
  IconRegistry
} from "react-native-ui-kitten";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Notifications } from "expo";

import NavbarBottom from "./Layout/NavbarBottom";
import { ConfigProvider } from "./Providers/ProfileProviderConfig";
import { StatsProvider } from "./Providers/StatsProviderConfig";
import { ItemsProvider } from "./Providers/ItemsProviderConfig";
import { CoinsProvider } from "./Providers/CoinsProviderConfig";
import {
  listenForNotifications,
  getiOSNotificationPermission,
  initNotification
} from "./Notifications/NotificationsScheduler";
import { getStoredStats } from "./Providers/StatsProviderUtil";
import { StaminaProvider } from "./Providers/StaminaProviderConfig";

export const MainIcon = <Icon name="person" />;
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
      <LinearGradient colors={["pink", "#e07cf2"]} style={{ flex: 1 }}>
        <ItemsProvider>
          <StatsProvider>
            <StaminaProvider>
              <CoinsProvider>
                <ConfigProvider>
                  <ApplicationProvider mapping={mapping} theme={lightTheme}>
                    <IconRegistry icons={EvaIconsPack} />
                    <NavbarBottom />
                  </ApplicationProvider>
                </ConfigProvider>
              </CoinsProvider>
            </StaminaProvider>
          </StatsProvider>
        </ItemsProvider>
      </LinearGradient>
    );
  }
}

export default LayoutSimpleUsageShowcase;
