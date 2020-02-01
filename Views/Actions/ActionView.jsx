import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage,
  Button
} from "react-native";
import normalize from "react-native-normalize";

import { StatsConsumer } from "../../Providers/StatsProviderConfig";
import { ItemsConsumer } from "../../Providers/ItemsProviderConfig";
import TakeButton from "./components/TakeButton";
import BuyButton from "./components/BuyButton";
import OrderButton from "./components/OrderButton";
import SendButton from "./components/SendButton";
import OffendButton from "./components/OffendButton";
import { StaminaConsumer } from "../../Providers/StaminaProviderConfig";

function ActionsView() {
  return (
    <StaminaConsumer>
      {staminaValue => (
        <ItemsConsumer>
          {itemValue => (
            <StatsConsumer>
              {statsValue => (
                <View style={styles.container}>
                  <TakeButton statsValue={statsValue} stamina={staminaValue} />
                  <BuyButton itemValue={itemValue} />
                  <OrderButton statsValue={statsValue} stamina={staminaValue} />
                  <SendButton statsValue={statsValue} stamina={staminaValue} />
                  <OffendButton
                    statsValue={statsValue}
                    stamina={staminaValue}
                  />

                  <Button
                    style={styles.button}
                    onPress={async () => AsyncStorage.clear()}
                    title="Clear storage"
                  />
                </View>
              )}
            </StatsConsumer>
          )}
        </ItemsConsumer>
      )}
    </StaminaConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: Dimensions.get("window").width,
    bottom: "5%"
  },
  button: {
    margin: normalize(15, "height"),
    width: "30%",
    backgroundColor: "gray"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: normalize(256),
    padding: normalize(16)
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
});

export default ActionsView;
