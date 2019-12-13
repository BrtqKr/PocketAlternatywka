import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";

const buyDictionary = [
  {
    text: "Weed",
    id: 0
  },
  {
    text: "Szmatę z lumpa",
    id: 1
  },
  {
    text: "Płytę Billie Eilish",
    id: 2
  },
  {
    text: "Płytę Lil Pepa",
    id: 3
  },
  {
    text: "Farbę do włosów",
    id: 4
  }
];

export default function BuyButton(props) {
  const [visible, setVisibility] = useState(false);

  const renderBuyElement = () => (
    <View>
      {buyDictionary.map(item => (
        <Button
          key={item.id}
          style={styles.button}
          status="basic"
          onPress={() => {
            setVisibility(!visible);
            props.itemValue.increase(item.id);
          }}
        >
          {item.text}
        </Button>
      ))}
    </View>
  );

  return (
    <View>
      <Button
        style={styles.button}
        status="basic"
        onPress={() => setVisibility(!visible)}
      >
        Kup...
      </Button>

      <Modal
        allowBackdrop
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibility(!visible)}
        visible={visible}
        animationType=""
      >
        {renderBuyElement()}
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 15,
    width: 210,
    backgroundColor: "gray"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 256,
    padding: 16
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
});
