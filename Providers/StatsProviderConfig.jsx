/* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";

const { Provider, Consumer } = createContext();

const defaultStats = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

class StatsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, stats: null };
    this.loadFromStorage();
  }

  loadFromStorage = async () => {
    const stats = await this.getStoredStats();
    this.setState({
      loading: false,
      stats: stats || defaultStats
    });
  };

  getStoredStats = async () => {
    try {
      const retreived = await AsyncStorage.getItem("stats");
      const item = JSON.parse(retreived);
      return item;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  setStats = newStats => {
    this.setState(prevState => {
      const newState = {
        stats: [
          prevState.stats[0] + newStats[0] >= 1
            ? 1
            : prevState.stats[0] + newStats[0] <= 0
            ? 0
            : prevState.stats[0] + newStats[0],
          prevState.stats[1] + newStats[1],
          prevState.stats[2] + newStats[2] >= 1
            ? 1
            : prevState.stats[2] + newStats[2] <= 0
            ? 0
            : prevState.stats[2] + newStats[2],
          prevState.stats[3] + newStats[3],
          prevState.stats[4] + newStats[4],
          prevState.stats[5] + newStats[5],
          prevState.stats[6] + newStats[6],
          prevState.stats[7] + newStats[7]
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
