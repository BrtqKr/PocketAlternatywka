// /* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";
import { AsyncStorage } from "react-native";

const { Provider, Consumer } = createContext();

const defaultItems = [
  {
    img: "Weed",
    stats: [0.4, 0, 0, -0.2, 0.1, 0, 0, 0],
    amount: 3,
    id: 0
  },
  {
    img: "Weed",
    stats: [-0.2, 0, 0, -0.2, 0.1, 0, 0, 0],
    amount: 9,
    id: 1
  },
  {
    img: "Weed",
    stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
    amount: 3,
    id: 2
  },
  {
    img: "Weed",
    stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
    amount: 44,
    id: 3
  },
  {
    img: "Weed",
    stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
    amount: 44,
    id: 4
  }
];

class ItemsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: defaultItems
    };
    this.loadFromStorage();
  }

  loadFromStorage = async () => {
    const inventory = await this.getStoredInventory();
    this.setState({
      items: inventory || defaultItems
    });
  };

  getStoredInventory = async () => {
    try {
      const retreived = await AsyncStorage.getItem("inventoryStatus");
      const inventory = JSON.parse(retreived);
      return inventory;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return null;
  };

  increase = id => {
    const x = this.state.items.map(i =>
      i.id === id ? { ...i, amount: i.amount + 1 } : i
    );
    this.setState({ items: x });
    AsyncStorage.setItem("inventoryStatus", JSON.stringify(x));
  };

  decrease = id => {
    const x = this.state.items.map(i =>
      i.id === id ? { ...i, amount: i.amount - 1 } : i
    );
    this.setState({ items: x });
    AsyncStorage.setItem("inventoryStatus", JSON.stringify(x));
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
