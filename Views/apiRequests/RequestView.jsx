import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button
} from "react-native";
import axios from "react-native-axios";

class RequestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: "",
      error: false
    };
  }

  componentWillMount() {
    axios
      .get("https://api.coinbase.com/v2/prices/spot?currency=USD")
      .then(response => {
        this.setState({
          loading: false,
          response: response.data.data.amount + " USD"
        });
      })

      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  forceUpdateHandler = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <Text>{this.state.response}</Text>
        )}
        {this.state.error ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <Text></Text>
        )}
        <Button title="Reload" />
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

export default RequestView;
