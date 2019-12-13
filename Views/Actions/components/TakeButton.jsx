import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";

const takeDictionary = [
  {
    text: "Wixapol",
    stats: [0, 0, 0.1, 0.1, 0.15, 0, 0, 0]
  },
  {
    text: "Sesję na cmentarzu",
    stats: [0.1, 0.05, 0, 0.2, 0.1, 0, 0, 0]
  },
  {
    text: "Jaranie weed",
    stats: [0, 0, -0.1, -0.1, 0.05, 0, 0, 0]
  }
];

export default function TakeButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.value.setStats(stats);
  };

  const renderTakeElement = () => (
    <View>
      {takeDictionary.map(({ text, stats }) => (
        <Button
          key={text}
          style={styles.button}
          status="basic"
          onPress={() => {
            setVisibility(!visible);
            setStats(stats, props.value);
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
        Weź na...
      </Button>

      <Modal
        allowBackdrop
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibility(!visible)}
        visible={visible}
        animationType=""
      >
        {renderTakeElement()}
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
