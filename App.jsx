import React, { useRef, useEffect } from "react";
import { Platform } from "react-native";
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

export const MainIcon = <Icon name="person" />;
Platform.select({ ios: "Arial", android: "Comic Sans" });

function LayoutSimpleUsageShowcase() {
  return (
    <LinearGradient colors={["pink", "#d14fe8"]} style={{ flex: 1 }}>
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

export default LayoutSimpleUsageShowcase;
