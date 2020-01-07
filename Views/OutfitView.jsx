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
import normalize from "react-native-normalize";

import * as imageDictionary from "./ProfileAddresses";
import { ProfileConsumer } from "../Providers/ProfileProviderConfig";
import { StatsConsumer } from "../Providers/StatsProviderConfig";

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
  setProfile = async (id, value, stats) => {
    const validChange = await value.setProfile(profilePics[id]);
    console.warn(validChange);
    if (validChange) stats.setStats([0.5, 0.1, 0, 0, 0, 0, 0, 0]);
  };

  render() {
    return (
      <StatsConsumer>
        {stats => (
          <ProfileConsumer>
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
                        onPress={() => this.setProfile(id, value, stats)}
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
          </ProfileConsumer>
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
  picture: {
    width: normalize(300),
    height: normalize(300),
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
    fontSize: normalize(25)
  },
  bottomText: {
    marginTop: normalize(10),
    fontSize: normalize(20)
  }
});

export default OutfitView;
