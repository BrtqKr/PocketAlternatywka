import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";

const { Provider, Consumer } = createContext();

const defaultProfile = {
  title: "Doge Alternatywka",
  img: "Profile1",
  description: "Smutna jest, płacze w kącie cały dzień",
  id: 0
};

// Provider will be exported wrapped in ConfigProvider component.
class ConfigProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, profile: null };
    this.loadFromStorage();
  }

  loadFromStorage = async () => {
    const profile = await this.getStoredProfile();
    this.setState({
      loading: false,
      profile: profile || defaultProfile
    });
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

  setProfile = profile => {
    this.setState({
      profile: {
        title: profile.title,
        img: profile.img,
        description: profile.description,
        id: profile.id
      }
    });
    if (this.state != null)
      AsyncStorage.setItem(
        "profile",
        JSON.stringify({
          title: profile.title,
          img: profile.img,
          description: profile.description,
          id: profile.id
        })
      );
  };

  render() {
    return (
      <>
        <Provider
          value={{
            ...this.state.profile,
            setProfile: e => this.setProfile(e)
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}

export { ConfigProvider, Consumer as ConfigConsumer };
