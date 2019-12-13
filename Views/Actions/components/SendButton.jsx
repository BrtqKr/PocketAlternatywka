import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";

const sendDictionary = [
  {
    text: "Memucha",
    stats: [0.05, 0, 0, -0.2, 0.05, 0, 0, 0]
  },
  {
    text: "Smutną piosenkę",
    stats: [0.05, 0, 0, 0.1, 0.1, 0, 0.1, 0.1]
  },
  {
    text: "Weed",
    stats: [0.5, 0, 0.1, -0.2, 0.1, 0, 0, 0]
  }
];

export default function TakeButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.value.setStats(stats);
  };

  const renderSendElement = () => (
    <View>
      {sendDictionary.map(({ text, stats }) => (
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
        Wyślij...
      </Button>

      <Modal
        allowBackdrop
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibility(!visible)}
        visible={visible}
        animationType=""
      >
        {renderSendElement()}
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
