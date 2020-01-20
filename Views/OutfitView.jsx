/* eslint-disable react/destructuring-assignment */
import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity, AsyncStorage
} from "react-native";
import normalize from "react-native-normalize";

import * as imageDictionary from "./ProfileAddresses";
import { ProfileConsumer } from "../Providers/ProfileProviderConfig";
import { StatsConsumer } from "../Providers/StatsProviderConfig";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";


const profilePics = [
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 0,
    type: "defined"
  },
  {
    title: "Doge Alternatywka1",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień1",
    id: 1,
    type: "defined"
  },
  {
    title: "Doge Alternatywka2",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień2",
    id: 2,
    type: "defined"
  },
  {
    title: "Doge Alternatywka3",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień3",
    id: 3,
    type: "defined"
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 4,
    type: "defined"
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 5,
    type: "defined"
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 6,
    type: "defined"
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 7,
    type: "defined"
  },
  {
    title: "Doge Alternatywka",
    img: "Profile1",
    description: "Smutna jest, płacze w kącie cały dzień",
    id: 8,
    type: "defined"
  }
];

class OutfitView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photo: null }
  }

  pickFromGallery = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') { return }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [2, 2],
        exif: false
      });

      this.setState({ photo: result.uri });

      return result.uri;

    } catch (error) {
      console.log(error)
    }
  }

  setProfile = async (id, value, stats) => {
    const validChange = await value.setProfile(profilePics[id]);
    // console.warn(validChange);
    if (validChange) stats.setStats([0.5, 0.1, 0, 0, 0, 0, 0, 0]);
  };

  setProfileFromStorage = async (id, title, uri, bottomText, value, stats) => {
    const validChange = await value.setProfileFromStorage(id, title, uri, bottomText);
    if (validChange) stats.setStats([0.5, 0.1, 0, 0, 0, 0, 0, 0]);
  }

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
                  {value.customs.map(({ title, bottomText, uri }) => (
                    <View key={title} style={styles.scrollContainer}>
                      <Text style={styles.title}>{title}</Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.setProfileFromStorage(title, title, uri, bottomText, value, stats)}
                      >
                        <Image
                          source={{ uri: uri }}
                          style={styles.picture}
                        />
                      </TouchableOpacity>
                      <Text style={styles.bottomText}>{bottomText}</Text>
                    </View>
                  ))}



                  <View key={100} style={styles.scrollContainer}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => this.props.navigation.navigate("Camera")}
                    >
                      <Text style={{ fontSize: 30 }}>Take photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={async () => {
                        const imagePicked = await this.pickFromGallery();
                        this.props.navigation.navigate("CustomGenerator", {
                          uri: imagePicked
                        });
                      }}
                    >

                      <Text style={{ fontSize: 30 }}>Pick existing</Text>
                    </TouchableOpacity>

                  </View>
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
