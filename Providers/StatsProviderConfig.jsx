/* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";

const { Provider, Consumer } = createContext();

class StatsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { stats: [0, 0, 0, 0, 0, 0, 0, 0] };
    //   this.loadFromStorage();
  }

  // loadFromStorage = async () => {
  //   const profile = await this.getStoredProfile();
  //   this.setState({
  //     loading: false,
  //     profile: profile || defaultProfile
  //   });
  // };

  // getStoredProfile = async () => {
  //   try {
  //     const retreived = await AsyncStorage.getItem("profile");
  //     const item = JSON.parse(retreived);
  //     return item;
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   return null;
  // };

  setStats = newStats => {
    this.setState({
      stats: [
        newStats[0],
        newStats[1],
        newStats[2],
        newStats[3],
        newStats[4],
        newStats[5],
        newStats[6],
        newStats[7]
      ]
    });
    // if (this.state != null)
    //   AsyncStorage.setItem(
    //     "stats",
    //     JSON.stringify({
    //       alter: stats.alter,
    //       hairDye: stats.hairDye,
    //       drugs: stats.drugs,
    //       depression: stats.depression,
    //       attention: stats.attention,
    //       tattoos: stats.tattoos,
    //       lilPep: stats.lilPep,
    //       billie: stats.billie
    //     })
    //   );
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
