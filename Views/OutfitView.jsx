import React from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import Profile1 from "../Images/AlternatywkaProfilePics/profile1.jpg";

class OutfitView extends React.Component {
  state = {
    profilePics: [
      { url: "Profile1", id: 1 },
      { url: "Profile1", id: 2 },
      { url: "Profile1", id: 3 },
      { url: "Profile1", id: 4 },
      { url: "Profile1", id: 5 },
      { url: "Profile1", id: 6 },
      { url: "Profile1", id: 7 },
      { url: "Profile1", id: 8 },
      { url: "Profile1", id: 9 }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.profilePics.map(data => (
            <View key={data.id} style={styles.container}>
              <Image source={Profile1} style={styles.picture} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingVertical: 4,
    paddingHorizontal: 4
  },
  picture: {
    alignSelf: "center",
    margin: 5,
    width: 300,
    height: 300
  }
});

export default OutfitView;
