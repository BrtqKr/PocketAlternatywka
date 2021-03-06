import React, { Component, createContext } from "react";
import { AsyncStorage, Alert } from "react-native";
import axios from "react-native-axios";
import NetInfo from "@react-native-community/netinfo";

const { Provider, Consumer } = createContext();

const defaultProfile = {
  title: "Doge Alternatywka",
  img: "Profile1",
  description: "Smutna jest, płacze w kącie cały dzień",
  id: 0,
  type: "defined"

};

class ProfileProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: null, date: null, connectionStatus: "", customProfilePics: null };
  }

  async componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected === true) {
        this.setState({ connectionStatus: "Online" });
      } else {
        this.setState({ connectionStatus: "Offline" });
      }
    });

    const storedResult = await this.loadFromStorage();

    try {
      const dateResult = await this.requestDate();
      const date = new Date(dateResult.data.datetime);

      const storedDate = new Date(storedResult);

      if (this.state.date) {
        if ((date - storedDate) / 1000 > 5) {
          AsyncStorage.setItem("profileDate", JSON.stringify(date));
        }
      } else {
        this.setState({ date: { date } });
        AsyncStorage.setItem("profileDate", JSON.stringify(date));
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    if (isConnected === true) {
      this.setState({ connectionStatus: "Online" });
    } else {
      this.setState({ connectionStatus: "Offline" });
    }
  };

  loadFromStorage = async () => {
    const profile = await this.getStoredProfile();
    const storedDate = await this.getStoredDate();
    const storedProfiles = await this.getStoredProfiles();

    if (!storedProfiles) {
      AsyncStorage.setItem("customProfiles", JSON.stringify([]));
    }

    this.setState({
      profile: profile === null ? defaultProfile : profile,
      date: storedDate,
      customProfilePics: storedProfiles === null ? [] : storedProfiles,
    });
    return storedDate;
  };

  getStoredProfiles = async () => {
    try {
      const retreivedProfiles = await AsyncStorage.getItem("customProfiles");

      const profiles = JSON.parse(retreivedProfiles);

      return profiles;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return null;
  };

  requestDate = async () => {
    try {
      const resp = await axios.get("http://worldtimeapi.org/api/ip");
      return resp;
    } catch (error) {
      return null;
    }
  };

  getStoredProfile = async () => {
    try {
      const retreived = await AsyncStorage.getItem("profile");
      const item = JSON.parse(retreived);
      return item;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  getStoredDate = async () => {
    try {
      const retreivedDate = await AsyncStorage.getItem("profileDate");

      const date = JSON.parse(retreivedDate);

      return date;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return null;
  };

  setProfile = async profile => {
    let valid = false;
    if (this.state.connectionStatus === "Online") {
      try {
        const resp = await axios.get("http://worldtimeapi.org/api/ip");
        const date = new Date(resp.data.datetime);
        const storedDate = new Date(this.state.date);

        if ((date - storedDate) / 1000 > 5) {
          if (profile.id !== this.state.profile.id) valid = true;
        }

        this.setState({ date: resp.data.datetime });
        AsyncStorage.setItem("profileDate", JSON.stringify(date));
      } catch (err) {
        console.log(err);
      }
    } else if (this.state.connectionStatus === "Offline") {
      Alert.alert(
        "Alternatywka",
        "Nie mogę zmienić outfitu bez Internetu -,-' nie wiem czy będę wtedy inna niż wszystkie",
        [{ text: "OK ;_;" }],
        { cancelable: false }
      );
      return false;
    }
    this.setState({
      profile: {
        title: profile.title,
        img: profile.img,
        description: profile.description,
        id: profile.id,
        type: "defined"
      }
    });
    if (this.state != null)
      AsyncStorage.setItem(
        "profile",
        JSON.stringify({
          ...profile
        })
      );
    return valid;
  };

  setProfileFromStorage = async (id, title, img, bottomText) => {
    let valid = false;
    if (this.state.connectionStatus === "Online") {
      try {
        const resp = await axios.get("http://worldtimeapi.org/api/ip");
        const date = new Date(resp.data.datetime);
        const storedDate = new Date(this.state.date);

        if ((date - storedDate) / 1000 > 5) {
          if (id !== this.state.profile.id) valid = true;
        }

        this.setState({ date: resp.data.datetime });
        AsyncStorage.setItem("profileDate", JSON.stringify(date));
      } catch (err) {
        console.log(err);
      }
    } else if (this.state.connectionStatus === "Offline") {
      Alert.alert(
        "Alternatywka",
        "Nie mogę zmienić outfitu bez Internetu -,-' nie wiem czy będę wtedy inna niż wszystkie",
        [{ text: "OK ;_;" }],
        { cancelable: false }
      );
      return false;
    }
    this.setState({
      profile: {
        title: title,
        img: img,
        description: bottomText,
        id: id,
        type: "custom"
      }
    });
    if (this.state != null)
      AsyncStorage.setItem(
        "profile",
        JSON.stringify({
          title: title,
          img: img,
          description: bottomText,
          id: id,
          type: "custom"
        })
      );
    return valid;
  };

  customsPush = async (title, bottomText, uri) => {
    const stored = await AsyncStorage.getItem("customProfiles");
    const customProfilePics = [...JSON.parse(stored), { title: title, bottomText: bottomText, uri: uri }]
    this.setState({ customProfilePics: customProfilePics });
    console.log(customProfilePics)
    AsyncStorage.setItem("customProfiles", String(JSON.stringify(customProfilePics)))
    console.warn(customProfilePics)
  }

  render() {
    return (
      <>
        <Provider
          value={{
            ...this.state.profile,
            customs: this.state.customProfilePics,
            setProfile: e => this.setProfile(e),
            setProfileFromStorage: (id, title, img, bottomText) => this.setProfileFromStorage(id, title, img, bottomText),
            customsPush: async (title, bottomText, uri) => this.customsPush(title, bottomText, uri),
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}

export { ProfileProvider, Consumer as ProfileConsumer };
