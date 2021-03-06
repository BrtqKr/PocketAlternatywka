import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import normalize from "react-native-normalize";

import * as itemsDictionary from "./Items";
import { StatsConsumer } from "../Providers/StatsProviderConfig";
import { ItemsConsumer } from "../Providers/ItemsProviderConfig";

class InventoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isOwned = ({ amount }) => amount > 0;

    return (
      <ItemsConsumer>
        {itemValue => (
          <StatsConsumer>
            {statsValue => {
              return (
                <View style={styles.container}>
                  {itemValue.items.filter(isOwned).map(inventoryItem => (
                    <ItemHolder
                      element={inventoryItem}
                      statsValue={statsValue}
                      itemValue={itemValue}
                      key={inventoryItem.id}
                    />
                  ))}
                </View>
              );
            }}
          </StatsConsumer>
        )}
      </ItemsConsumer>
    );
  }
}

function ItemHolder({
  element: { id, amount, img, stats },
  statsValue,
  itemValue
}) {
  const onPress = () => {
    itemValue.decrease(id);
    statsValue.setStats(stats);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.item} onPress={onPress}>
      <Image source={itemsDictionary[img]} style={styles.picture} />
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
    marginLeft: normalize(20, "width"),
    marginRight: normalize(20, "width")
  },
  button: {
    margin: normalize(10)
  },
  picture: {
    width: normalize(70),
    height: normalize(70),
    borderRadius: normalize(4),
    overflow: "hidden",
    margin: normalize(5)
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
    fontSize: normalize(22),
    alignSelf: "center"
  }
});

export default InventoryView;
