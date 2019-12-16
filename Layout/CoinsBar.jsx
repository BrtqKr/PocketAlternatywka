import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { CoinsConsumer } from "../Providers/CoinsProviderConfig";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <CoinsConsumer>
          {coinsProperties => {
            return (
              <View style={styles.container}>
                {this.state.loading ? (
                  <ActivityIndicator size="small" color="green" />
                ) : (
                  <Text>{coinsProperties.coins}</Text>
                )}
                <Text>{coinsProperties.date}</Text>
              </View>
            );
          }}
        </CoinsConsumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
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
