import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-kitten";
import * as Progress from "react-native-progress";

const progressBarProps = {
  progress: 0.3,
  width: 230,
  height: 8,
  color: "green",
  borderColor: "black",
  borderWidth: 2
};

function StatsView() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stats</Text>
      <View style={styles.barSection}>
        <Text>Alternatywność </Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
      <View style={styles.barSection}>
        <Text>Farba na włosach</Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
      <View style={styles.barSection}>
        <Text>Używki we krwi</Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
      <View style={styles.barSection}>
        <Text>Depresja</Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
      <View style={styles.barSection}>
        <Text>Atencja</Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
      <View style={styles.barSection}>
        <Text>Dziary</Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
      <View style={styles.barSection}>
        <Text>LilPep</Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
      <View style={styles.barSection}>
        <Text>Billie Elish</Text>
        <Progress.Bar
          {...progressBarProps} // spread
        />
      </View>
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
  },
  barText: {
    alignSelf: "flex-start"
  },
  barSection: {
    marginBottom: 30
  },
  header: {
    fontSize: 20,
    marginBottom: 15
  }
});

export default StatsView;
