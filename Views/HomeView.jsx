import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as imageDictionary from "./ProfileAddresses";
import { ConfigConsumer } from "../Providers/ProfileProviderConfig";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ConfigConsumer>
          {value => {
            return (
              <View style={styles.container}>
                <Text style={styles.title}>{value.title}</Text>

                <Image
                  source={imageDictionary[value.img]}
                  style={styles.picture}
                />

                <Text style={styles.bottomText}>{value.description}</Text>
              </View>
            );
          }}
        </ConfigConsumer>
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

export default HomeView;
