// /* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage, Alert } from "react-native";
import axios from "react-native-axios";

const { Provider, Consumer } = createContext();

class CoinsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null,
      date: null
    };
  }

  async componentDidMount() {
    const dateResult = await this.loadFromStorage();
    try {
      const resp = await axios.get("http://worldtimeapi.org/api/ip");

      const date = new Date(resp.data.datetime);
      const storedDate = new Date(dateResult);

      if (this.state.date) {
        if ((date - storedDate) / 1000 > 86400) {
          AsyncStorage.setItem("date", JSON.stringify(date));
          this.increaseCoins();
        }
      } else {
        this.setState({ date: resp.data.datetime });
        AsyncStorage.setItem("date", JSON.stringify(date));
      }
    } catch (err) {
      console.log(err);
    }
  }

  loadFromStorage = async () => {
    const storedCoins = await this.getStoredCoins();
    const storedDate = await this.getStoredDate();
    if (!storedCoins) {
      AsyncStorage.setItem("coins", JSON.stringify(400));
    }
    this.setState({
      coins: storedCoins === null ? 400 : storedCoins,
      date: storedDate
    });
    console.warn(storedCoins);
    return storedDate;
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
    this.setState(
      prevState => ({ coins: prevState.coins + 100 }),
      () => {
        AsyncStorage.setItem("coins", JSON.stringify(this.state.coins));
      }
    );
  };

  spendCoins = amount => {
    const decreased = this.state.coins - amount;
    if (decreased < 0) {
      Alert.alert(
        "Sklep",
        "Nie stać cię. Poczekaj do kolejnej wypłaty...",
        [{ text: "OK ;_;" }],
        { cancelable: false }
      );
      return false;
    } else {
      this.setState({ coins: decreased });
      AsyncStorage.setItem("coins", JSON.stringify(decreased));
      return true;
    }
  };

  render() {
    return (
      <>
        <Provider
          value={{
            coins: this.state.coins,
            date: this.state.date,
            spendCoins: amount => this.spendCoins(amount)
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}
export { CoinsProvider, Consumer as CoinsConsumer };
