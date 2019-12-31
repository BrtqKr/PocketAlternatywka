import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";
import axios from "react-native-axios";

const { Provider, Consumer } = createContext();

const defaultProfile = {
  title: "Doge Alternatywka",
  img: "Profile1",
  description: "Smutna jest, płacze w kącie cały dzień",
  id: 0
};

const profileReduction = [-0.5, -0.5, 0, 0, 0, 0, 0, 0];

class ProfileProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: null, date: null, valid: false };
  }

  async componentDidMount() {
    const dateResult = await this.requestDate();
    const date = new Date(dateResult.data.datetime);
    try {
      const storedResult = await this.loadFromStorage();
      const storedDate = new Date(storedResult);

      console.warn(date, storedDate);

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

  loadFromStorage = async () => {
    const profile = await this.getStoredProfile();
    const storedDate = await this.getStoredDate();
    this.setState({
      profile: profile || defaultProfile,
      date: storedDate
    });
    return storedDate;
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
    return valid;
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

export { ProfileProvider, Consumer as ProfileConsumer };
