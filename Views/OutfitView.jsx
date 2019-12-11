/* eslint-disable react/destructuring-assignment */
import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import * as imageDictionary from "./ProfileAddresses";
import { ConfigConsumer } from "../Providers/ProfileProviderConfig";

const profilePics = [
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 0
  },
  {
    title: "Doge Alternatywka1",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień1",
    id: 1
  },
  {
    title: "Doge Alternatywka2",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień2",
    id: 2
  },
  {
    title: "Doge Alternatywka3",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień3",
    id: 3
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 4
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 5
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 6
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 7
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 8
  }
];

class OutfitView extends React.Component {
  setProfile = (id, value) => {
    value.setProfile(profilePics[id]);
  };

  // onPRess = async () => {
  //   try {
  //     const value = await AsyncStorage.setItem(
  //       "profilePic",
  //       JSON.stringify(this.state.profilePics[id])
  //     );
  //     if (value != null) {
  //       console.log(id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // console.log(this.state.profilePics[id]);
  // };

  // onViewableItemsChanged = ({ viewableItems, changed }) =>
  //   this.setState({ viewableItems });
  // setProfilePic = async index => {
  //   try {
  //     const value = await AsyncStorage.setItem(
  //       "profilePic",
  //       JSON.stringify(this.state.profilePics[index])
  //     );
  //     if (value != null) {
  //       console.log(index);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render() {
    return (
      <ConfigConsumer>
        {value => (
          <View style={styles.container}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
            >
              {profilePics.map(({ title, id, description, img }) => (
                <View key={id} style={styles.scrollContainer}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setProfile(id, value)}
                  >
                    <Image
                      source={imageDictionary[img]}
                      style={styles.picture}
                    />
                  </TouchableOpacity>
                  <Text style={styles.bottomText}>{description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ConfigConsumer>
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
  scrollContainer: {
    alignContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width
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

export default OutfitView;
