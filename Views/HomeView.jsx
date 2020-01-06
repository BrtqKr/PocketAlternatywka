import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import normalize from "react-native-normalize";

import * as imageDictionary from "./ProfileAddresses";
import { ProfileConsumer } from "../Providers/ProfileProviderConfig";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPortrait = value => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{value.title}</Text>

        <Image source={imageDictionary[value.img]} style={styles.picture} />

        <Text style={styles.bottomText}>{value.description}</Text>
      </View>
    );
  };

  render() {
    return (
      <ProfileConsumer>
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
      </ProfileConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
    width: "100%"
  },
  picture: {
    width: normalize(300),
    height: normalize(300),
    borderRadius: normalize(35),
    overflow: "hidden"
  },

  title: {
    marginBottom: normalize(10),
    fontSize: normalize(25)
  },
  bottomText: {
    marginTop: normalize(10),
    fontSize: normalize(20),
    marginRight: normalize(10),
    marginLeft: normalize(10)
  },
  coinBar: {
    width: 30,
    height: 30
  }
});

export default HomeView;
