import React from "react";
import { View, StyleSheet, AsyncStorage, Text, Image } from "react-native";
import * as imageDictionary from "./ProfilesAdresses";
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
                  // source={async () => {
                  //   try {
                  //     const retreived = await AsyncStorage.getItem("profilePic");
                  //     if (retreived != null) {
                  //       const item = JSON.parse(retreived);
                  //       console.log(item);
                  //       return imageDictionary[item.img];
                  //     }
                  //   } catch (error) {
                  //     console.log(error);
                  //   }
                  // console.log(this.state.profilePics[id]);

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
