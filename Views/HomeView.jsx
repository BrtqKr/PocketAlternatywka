import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
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
  },
  coinBar: {
    width: 30,
    height: 30
  }
});

export default HomeView;
