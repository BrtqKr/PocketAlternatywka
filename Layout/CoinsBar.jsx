import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { CoinsConsumer } from "../Providers/CoinsProviderConfig";
import { StaminaConsumer } from "../Providers/StaminaProviderConfig";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StaminaConsumer>
          {staminaProperties => {
            return (
              <CoinsConsumer>
                {coinsProperties => {
                  return (
                    <View style={styles.container}>
                      <Text style={styles.staminaContainer}>
                        {staminaProperties.stamina}
                      </Text>
                      <Text style={styles.coinsContainer}>
                        {coinsProperties.coins}
                      </Text>
                    </View>
                  );
                }}
              </CoinsConsumer>
            );
          }}
        </StaminaConsumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 30
  },
  picture: {
    width: 300,
    height: 300,
    borderRadius: 90 / 2,
    overflow: "hidden"
  },

  title: {
    marginBottom: 10,
    fontSize: 25
  },
  bottomText: {
    marginTop: 10,
    fontSize: 22
  }
});

export default CoinsBar;
