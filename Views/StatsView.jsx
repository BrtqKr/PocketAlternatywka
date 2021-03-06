import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import normalize from "react-native-normalize";

import { StatsConsumer } from "../Providers/StatsProviderConfig";
import StatsBar from "../Layout/StatsBar";
import { ScrollView } from "react-native-gesture-handler";

function StatsView() {
  return (
    <StatsConsumer>
      {value => (

        <ScrollView vertical>
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
            <StatsBar barName="Billie Eilish" value={value[7]} />
            <StatsBar barName="Billie Eilish" value={value[7]} />
            <StatsBar barName="Billie Eilish" value={value[7]} />
            <StatsBar barName="Billie Eilish" value={value[7]} />
            <StatsBar barName="Billie Eilish" value={value[7]} />
            <StatsBar barName="Billie Eilish" value={value[7]} />
            <StatsBar barName="Billie Eilish" value={value[7]} />
            <StatsBar barName="Billie Eilish" value={value[7]} />
          </View>
        </ScrollView>


      )
      }
    </StatsConsumer >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "4%",
    marginBottom: "15%",
    width: "100%"
  },
  header: {
    paddingTop: "4%",
    marginTop: "4%",

    fontSize: 20,
    marginBottom: 8
  },
  barText: {
    alignSelf: "flex-start"
  },
  barSection: {
    marginBottom: 30
  }
});

export default StatsView;
