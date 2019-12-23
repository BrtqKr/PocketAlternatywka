import React from "react";
import { StyleSheet, View, Dimensions, AsyncStorage } from "react-native";
import { Button } from "react-native-ui-kitten";
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
              {value => (
                <View style={styles.container}>
                  <TakeButton value={value} stamina={staminaValue} />
                  <BuyButton itemValue={itemValue} />
                  <OrderButton value={value} stamina={staminaValue} />
                  <SendButton value={value} stamina={staminaValue} />
                  <OffendButton value={value} stamina={staminaValue} />

                  <Button
                    style={styles.button}
                    onPress={async () => AsyncStorage.clear()}
                  >
                    Clear storage
                  </Button>
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
    width: Dimensions.get("window").width
  },
  button: {
    margin: 15,
    width: 210,
    backgroundColor: "gray"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 256,
    padding: 16
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
});

export default ActionsView;
