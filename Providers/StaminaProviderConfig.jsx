// /* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";
import axios from "react-native-axios";

const { Provider, Consumer } = createContext();

class StaminaProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stamina: null,
      date: null
    };
  }

  async componentDidMount() {
    await this.loadFromStorage();
    try {
      const resp = await axios.get("http://worldtimeapi.org/api/ip");

      const date = new Date(resp.data.datetime);
      const storedDate = new Date(this.state.date);

      if (this.state.date) {
        if ((date - storedDate) / 1000 > 5) {
          AsyncStorage.setItem("date", JSON.stringify(date));
          this.increaseStamina();
        }
      } else {
        this.setState({ date: resp.data.datetime });
        AsyncStorage.setItem("date", JSON.stringify(date));
      }
    } catch (err) {
      console.log(err);
    }
    console.warn(this.state.stamina);
  }

  loadFromStorage = async () => {
    const storedStamina = await this.getStoredStamina();
    const storedDate = await this.getStoredDate();
    if (!storedStamina) {
      AsyncStorage.setItem("stamina", JSON.stringify(100));
    }
    this.setState({
      stamina: storedStamina || 100,
      date: storedDate
    });
  };

  getStoredStamina = async () => {
    try {
      const retreivedStamina = await AsyncStorage.getItem("stamina");

      const stamina = JSON.parse(retreivedStamina);

      return stamina;
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

  increaseStamina = () => {
    this.setState(
      prevState => ({ stamina: prevState.stamina + 100 }),
      () => {
        AsyncStorage.setItem("stamina", JSON.stringify(this.state.stamina));
      }
    );
  };

  spendStamina = value => {
    const decreased = this.state.stamina - value;
    if (decreased < 0) console.warn("Not enough stamina");
    else {
      this.setState({ stamina: decreased });
      AsyncStorage.setItem("stamina", JSON.stringify(decreased));
    }
  };

  render() {
    return (
      <>
        <Provider
          value={{
            stamina: this.state.stamina,
            date: this.state.date,
            spendStamina: value => this.spendStamina(value)
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}
export { StaminaProvider, Consumer as StaminaConsumer };
