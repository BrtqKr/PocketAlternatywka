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
  }

  async componentDidMount() {
    await this.loadFromStorage();
    try {
      this.setState({ loading: true });
      const resp = await axios.get("http://worldtimeapi.org/api/ip");

      const date = new Date(resp.data.datetime);
      const storedDate = new Date(this.state.date);

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
    this.setState(
      prevState => ({ coins: prevState.coins + 100 }),
      () => {
        AsyncStorage.setItem("coins", JSON.stringify(this.state.coins));
      }
    );
  };

  spendCoins = amount => {
    const decreased = this.state.coins - amount;
    if (decreased < 0) console.warn("Not enough money");
    else {
      this.setState({ coins: decreased });
      AsyncStorage.setItem("coins", JSON.stringify(decreased));
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
