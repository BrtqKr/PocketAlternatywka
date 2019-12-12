/* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";
import * as itemsDictionary from "../Views/Items";

const { Provider, Consumer } = createContext();

class ItemsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 3,
          id: 0
        },
        {
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 9,
          id: 1
        },
        {
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 3,
          id: 2
        },
        {
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 44,
          id: 3
        },
        {
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 44,
          id: 4
        }
      ]
    };
  }

  increase = id => {
    const x = this.state.items.map(i =>
      i.id === id ? { ...i, amount: i.amount + 1 } : i
    );
    this.setState({ items: x });
  };

  decrease = id => {
    const x = this.state.items.map(i =>
      i.id === id ? { ...i, amount: i.amount - 1 } : i
    );
    this.setState({ items: x });
  };

  render() {
    return (
      <>
        <Provider
          value={{
            items: this.state.items,
            increase: itemParams => this.increase(itemParams),
            decrease: itemParams => this.decrease(itemParams)
          }}
        >
          {this.props.children}
        </Provider>
      </>
    );
  }
}

export { ItemsProvider, Consumer as ItemsConsumer };
