import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-kitten";

function StatsView() {
  return (
    <View style={styles.container}>
      <Text>ActionsView</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flexDirection: "column",
  //   flexWrap: "wrap",
  //   paddingVertical: 4,
  //   paddingHorizontal: 4
  // }
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  }
});

export default StatsView;
