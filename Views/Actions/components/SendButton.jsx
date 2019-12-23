import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";

const sendDictionary = [
  {
    text: "Memucha",
    stats: [0.05, 0, 0, -0.2, 0.05, 0, 0, 0],
    summary: "beka XDDDD"
  },
  {
    text: "Smutną piosenkę",
    stats: [0.05, 0, 0, 0.1, 0.1, 0, 0.1, 0.1],
    summary:
      "Super muzyka, ale pamiętaj, że tylko ja w tym związku mogę kurwa słuchać Billie!"
  },
  {
    text: "Weed",
    stats: [0.5, 0, 0.1, -0.2, 0.1, 0, 0, 0],
    summary: "Kurwa popierdoliło cię, żeby wysyłać to pocztą?!"
  }
];

export default function TakeButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.value.setStats(stats);
  };

  const renderSendElement = () => (
    <View>
      {sendDictionary.map(({ text, stats, summary }) => (
        <Button
          key={text}
          style={styles.modalButton}
          status="basic"
          onPress={() => {
            setVisibility(!visible);
            setStats(stats, props.value);
            Alert.alert(
              text,
              summary,
              [{ text: "OK ;_;", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
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
    backgroundColor: "#dedede",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 256,
    padding: 16
  },
  modalButton: {
    margin: 15,
    backgroundColor: "#9e9e9e",
    width: 210,
    borderRadius: 15
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
});
