/* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";
import axios from "react-native-axios";

const { Provider, Consumer } = createContext();

const defaultStats = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
const reductionStats = [-0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1];

function checkBorders(a, b) {
  if (a + b >= 1) return 1;
  else if (a + b <= 0) return 0;
  return a + b;
}

class StatsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { stats: null, date: null };
    // this.loadFromStorage();
  }

  async componentDidMount() {
    await this.loadFromStorage();
    try {
      const resp = await axios.get("http://worldtimeapi.org/api/ip");

      const date = new Date(resp.data.datetime);
      const storedDate = new Date(this.state.date);

      if (this.state.date) {
        if ((date - storedDate) / 1000 > 5) {
          console.warn("reducing");
          AsyncStorage.setItem("statsDate", JSON.stringify(date));
          this.setStats(
            reductionStats.map(a => (a * (date - storedDate)) / 5000)
          );
        }
      } else {
        this.setState({ date: resp.data.datetime });
        AsyncStorage.setItem("statsDate", JSON.stringify(date));
      }
    } catch (err) {
      this.setState({ error: err });
    }
  }

  loadFromStorage = async () => {
    const stats = await this.getStoredStats();
    const storedDate = await this.getStoredDate();
    this.setState({
      stats: stats || defaultStats,
      date: storedDate
    });
  };

  getStoredStats = async () => {
    try {
      const retreived = await AsyncStorage.getItem("stats");
      const item = JSON.parse(retreived);
      return item;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return null;
  };

  getStoredDate = async () => {
    try {
      const retreivedDate = await AsyncStorage.getItem("statsDate");

      const date = JSON.parse(retreivedDate);

      return date;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return null;
  };

  setStats = newStats => {
    this.setState(prevState => {
      const newState = {
        stats: [
          checkBorders(prevState.stats[0], newStats[0]),
          checkBorders(prevState.stats[1], newStats[1]),
          checkBorders(prevState.stats[2], newStats[2]),
          checkBorders(prevState.stats[3], newStats[3]),
          checkBorders(prevState.stats[4], newStats[4]),
          checkBorders(prevState.stats[5], newStats[5]),
          checkBorders(prevState.stats[6], newStats[6]),
          checkBorders(prevState.stats[7], newStats[7])
        ]
      };
      // eslint-disable-next-line react/no-access-state-in-setstate
      if (this.state != null)
        AsyncStorage.setItem("stats", JSON.stringify(newState.stats));
      return newState;
    });
  };

  render() {
    return (
      <>
        <Provider
          value={{
            ...this.state.stats,
            setStats: e => this.setStats(e)
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}
export { StatsProvider, Consumer as StatsConsumer };
