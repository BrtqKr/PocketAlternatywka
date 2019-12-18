import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-kitten";
import Constants from "expo-constants";

import { StatsConsumer } from "../Providers/StatsProviderConfig";
import StatsBar from "../Layout/StatsBar";

function StatsView(props) {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(true);
    const didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        setReload(false);
      }
    );
    return () => {
      didFocusSubscription.remove();
    };
  }, [props.navigation]);

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

          {/* <View style={styles.barSection}>
              <Text>Alternatywność </Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[0]}
              />
            </View>
            <View style={styles.barSection}>
              <Text>Farba na włosach</Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[1]}
              />
            </View>
            <View style={styles.barSection}>
              <Text>Używki we krwi</Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[2]}
              />
            </View>
            <View style={styles.barSection}>
              <Text>Depresja</Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[3]}
              />
            </View>
            <View style={styles.barSection}>
              <Text>Atencja</Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[4]}
              />
            </View>
            <View style={styles.barSection}>
              <Text>Dziary</Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[5]}
              />
            </View>
            <View style={styles.barSection}>
              <Text>LilPep</Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[6]}
              />
            </View>
            <View style={styles.barSection}>
              <Text>Billie Eilish</Text>
              <Progress.Bar
                {...progressBarProps} // spread
                progress={value[7]}
              />
            </View> */}
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
