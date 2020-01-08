import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import normalize from "react-native-normalize";

import { CoinsConsumer } from "../Providers/CoinsProviderConfig";
import { StaminaConsumer } from "../Providers/StaminaProviderConfig";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  render() {
    return (
      <View style={styles.container}>
        <StaminaConsumer>
          {staminaProperties => {
            return (
              <CoinsConsumer>
                {coinsProperties => {
                  return (
                    <View style={styles.innerContainer}>
                      <Text>
                        <Icon name="bolt" color="black" size={normalize(15)} />
                        <Text> </Text>
                        {staminaProperties.stamina}
                      </Text>
                      <Text>
                        <Icon name="coins" color="black" size={normalize(15)} />
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
    alignItems: "center",
    backgroundColor: "#FFCCF1",
    width: "100%",
    height: "8%",
    paddingBottom: "6%",
  },
  innerContainer: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingLeft: "22%",
    paddingRight: "22%",
    paddingTop: "9%",
    height: "8%",

    width: "100%",
    backgroundColor: "#FFCCF1",
  }
});

export default CoinsBar;
