import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-kitten";
import * as Progress from "react-native-progress";
import { StatsConsumer } from "../Providers/StatsProviderConfig";

const progressBarProps = {
  width: 230,
  height: 8,
  color: "green",
  borderColor: "black",
  borderWidth: 2
};

class StatsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StatsConsumer>
        {value => (
          <View style={styles.container}>
            <Text style={styles.header}>Stats</Text>
            <View style={styles.barSection}>
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
            </View>
          </View>
        )}
      </StatsConsumer>
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
