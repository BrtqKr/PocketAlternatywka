import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome5";

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
                      <Text>
                        <Icon
                          name="bolt"
                          color="black"
                          style={styles.icon}
                          size={15}
                        />
                        <Text> </Text>
                        {staminaProperties.stamina}
                      </Text>
                      <Text>
                        <Icon name="coins" color="black" size={15} />
                        <Text> </Text>
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
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: "5%",
    backgroundColor: "#FFCCF1",
    width: "100%",
    height: "9%",
    paddingLeft: "13%",
    paddingRight: "13%",
    paddingTop: "15%"
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
    margin: 10,
    fontSize: 22
  },
  staminaContainer: {
    justifyContent: "space-between"
  }
});

export default CoinsBar;
