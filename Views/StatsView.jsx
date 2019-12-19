import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-kitten";
import Constants from "expo-constants";

import { StatsConsumer } from "../Providers/StatsProviderConfig";
import StatsBar from "../Layout/StatsBar";

function StatsView() {
  return (
    <StatsConsumer>
      {value => (
        <View style={styles.container}>
          <Text style={styles.header}>Stats</Text>

          <StatsBar barName="Alternatywność" value={value[0]} />
          <StatsBar barName="Farba na włosach" value={value[1]} />
          <StatsBar barName="Używki we krwi" value={value[2]} />
          <StatsBar barName="Depresja" value={value[3]} />
          <StatsBar barName="Atencja" value={value[4]} />
          <StatsBar barName="Dziary" value={value[5]} />
          <StatsBar barName="LilPep" value={value[6]} />
          <StatsBar barName="Billie Eilish" value={value[7]} />
        </View>
      )}
    </StatsConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 20
  },
  barText: {
    alignSelf: "flex-start"
  },
  barSection: {
    marginBottom: 30
  }
});

export default StatsView;
