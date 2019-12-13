import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";

const orderDictionary = [
  {
    text: "Usiądź na mordzie",
    stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0]
  },
  {
    text: "Zrób dziarkę",
    stats: [0.15, 0, 0, 0.1, 0.1, 0.3, 0.1, 0.1]
  },
  {
    text: "Pokaż stopy",
    stats: [0, 0, 0, -0.1, 0.05, 0, 0, 0]
  },
  {
    text: "Zrób filtry na insta",
    stats: [0.05, 0, 0.15, 0.05, 0, 0, 0, 0]
  }
];

export default function TakeButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.value.setStats(stats);
  };

  const renderOrderElement = value => (
    <View>
      {orderDictionary.map(({ text, stats }) => (
        <Button
          key={text}
          style={styles.button}
          status="basic"
          onPress={() => {
            setVisibility(!visible);
            setStats(stats, value);
          }}
        >
          {text}
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
        Rozkaż...
      </Button>

      <Modal
        allowBackdrop
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibility(!visible)}
        visible={visible}
        animationType=""
      >
        {renderOrderElement()}
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
