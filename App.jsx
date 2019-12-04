import React from "react";
import { mapping, light as lightTheme } from "@eva-design/eva";
import {
  ApplicationProvider,
  Icon,
  IconRegistry
} from "react-native-ui-kitten";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import NavbarBottom from "./Layout/NavbarBottom";

export const MainIcon = <Icon name="person" />;

const LayoutSimpleUsageShowcase = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <IconRegistry icons={EvaIconsPack} />

    <NavbarBottom />
  </ApplicationProvider>
);

export default LayoutSimpleUsageShowcase;
