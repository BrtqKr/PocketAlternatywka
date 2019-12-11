import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import * as itemsDictionary from "./Items";
import { StatsConsumer } from "../Providers/StatsProviderConfig";

class InventoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: "weed",
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 3,
          id: 0
        },
        {
          name: "szmata z lumpa",
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 9,
          id: 1
        },
        {
          name: "billie eilish CD",
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 3,
          id: 2
        },
        {
          name: "lil pep CD",
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 44,
          id: 3
        },
        {
          name: "farba",
          img: itemsDictionary.Weed,
          stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
          amount: 44,
          id: 4
        }
      ]
    };
  }

  decrease = id => {
    const x = this.state.items.map(i =>
      i.id === id ? { ...i, amount: i.amount - 1 } : i
    );
    this.setState({ items: x });
  };

  render() {
    const byAmount = ({ amount }) => amount > 0;

    return (
      <StatsConsumer>
        {value => {
          return (
            <View style={styles.container}>
              {this.state.items.filter(byAmount).map(inventoryItem => (
                <ItemHolder
                  element={inventoryItem}
                  decrease={this.decrease}
                  value={value}
                />
              ))}
            </View>
          );
        }}
      </StatsConsumer>
    );
  }
}

function ItemHolder({ element: { id, amount, img, stats }, decrease, value }) {
  const onPress = () => {
    decrease(id);
    value.setStats(stats);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.item} onPress={onPress}>
      <Image source={img} style={styles.picture} />
      <Text style={styles.amount}>{amount}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    margin: 10
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 4,
    overflow: "hidden",
    margin: 5
  },
  header: {
    fontSize: 20,
    marginBottom: 15
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  amount: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center"
  }
});

export default InventoryView;
