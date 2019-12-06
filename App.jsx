import React from "react";
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

export const MainIcon = <Icon name="person" />;
Platform.select({ ios: "Arial", android: "Comic Sans" });

const LayoutSimpleUsageShowcase = () => (
  <LinearGradient colors={["pink", "#d14fe8"]} style={{ flex: 1 }}>
    <ConfigProvider>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <NavbarBottom />
      </ApplicationProvider>
    </ConfigProvider>
  </LinearGradient>
);

export default LayoutSimpleUsageShowcase;
