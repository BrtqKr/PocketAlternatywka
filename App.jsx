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
import NavbarBottom from "./Layout/NavbarBottom";
import { ConfigProvider } from "./Providers/ProfileProviderConfig";
import { StatsProvider } from "./Providers/StatsProviderConfig";
import { ItemsProvider } from "./Providers/ItemsProviderConfig";
import { CoinsProvider } from "./Providers/CoinsProviderConfig";
import {
  listenForNotifications,
  getiOSNotificationPermission,
  handleButtonPress
} from "./Notifications/NotificationsScheduler";

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

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
      handleButtonPress();
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <LinearGradient colors={["pink", "#e07cf2"]} style={{ flex: 1 }}>
        <ItemsProvider>
          <StatsProvider>
            <CoinsProvider>
              <ConfigProvider>
                <ApplicationProvider mapping={mapping} theme={lightTheme}>
                  <IconRegistry icons={EvaIconsPack} />
                  <NavbarBottom />
                </ApplicationProvider>
              </ConfigProvider>
            </CoinsProvider>
          </StatsProvider>
        </ItemsProvider>
      </LinearGradient>
    );
  }
}

export default LayoutSimpleUsageShowcase;
