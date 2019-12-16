import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import axios from "react-native-axios";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      datetime: "",
      timezone: "",
      error: false,
      coins: ""
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const resp = await axios.get("http://worldtimeapi.org/api/ip");

      if (resp)
        this.setState({
          loading: false,
          datetime: resp.data.datetime,
          timezone: resp.data.timezone,
          coins: 1000
        });

      // if (this.state != null)
      // AsyncStorage.setItem("stats", JSON.stringify(newState.stats));

      const date = new Date(this.state.datetime);

      const storedDate = this.getStoredItem("date");
      const storedTimezone = this.getStoredItem("timezone");

      if (storedTimezone !== this.state.timezone)
        console.warn(this.state.datetime);
    } catch (err) {
      this.setState({ error: err, loading: false });
    }
  }

  getStoredItem = async key => {
    try {
      const retreived = await AsyncStorage.getItem(key);
      const item = JSON.parse(retreived);
      return item;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return null;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="small" color="green" />
        ) : (
          <Text>{this.state.coins}</Text>
        )}
        <Text>{this.state.datetime}</Text>
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

export default CoinsBar;
