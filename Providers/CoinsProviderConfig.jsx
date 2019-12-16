// /* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";
import axios from "react-native-axios";

const { Provider, Consumer } = createContext();

class CoinsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      coins: null,
      error: false,
      date: null
    };
    // AsyncStorage.setItem("coins", JSON.stringify(this.state.coins));

    this.loadFromStorage();
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const resp = await axios.get("http://worldtimeapi.org/api/ip");

      const date = new Date(resp.data.datetime);
      const storedDate = new Date(this.state.date);

      if (this.state.date) {
        console.warn(date, storedDate);
        console.warn(this.state.coins);
        if ((date - storedDate) / 1000 > 5) {
          AsyncStorage.setItem("date", JSON.stringify(date));
          this.increaseCoins();
        }
      } else {
        this.setState({ date: resp.data.datetime });
        AsyncStorage.setItem("date", JSON.stringify(date));
      }
    } catch (err) {
      this.setState({ error: err, loading: false });
    }
  }

  loadFromStorage = async () => {
    const storedCoins = await this.getStoredCoins();
    const storedDate = await this.getStoredDate();
    if (!storedCoins) {
      AsyncStorage.setItem("coins", JSON.stringify(1000));
    }
    this.setState({
      coins: storedCoins || 1000,
      date: storedDate
    });
  };

  getStoredCoins = async () => {
    try {
      const retreivedCoins = await AsyncStorage.getItem("coins");

      const coins = JSON.parse(retreivedCoins);

      return coins;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return null;
  };

  getStoredDate = async () => {
    try {
      const retreivedDate = await AsyncStorage.getItem("date");

      const date = JSON.parse(retreivedDate);

      return date;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return null;
  };

  increaseCoins = () => {
    this.setState(prevState => ({ coins: prevState.coins + 100 }));
    AsyncStorage.setItem("coins", JSON.stringify(this.state.coins));
  };

  render() {
    return (
      <>
        <Provider
          value={{
            coins: this.state.coins,
            date: this.state.date
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}
export { CoinsProvider, Consumer as CoinsConsumer };
