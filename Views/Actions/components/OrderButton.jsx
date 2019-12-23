import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";

const orderDictionary = [
  {
    text: "Usiądź na mordzie",
    stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
    summary: "Ostatnio każda tak robi, ale okej...niech ci kurwa będzie..."
  },
  {
    text: "Zrób dziarkę",
    stats: [0.15, 0, 0, 0.1, 0.1, 0.3, 0.1, 0.1],
    summary: "Ale jak to kurwa tężec!?"
  },
  {
    text: "Pokaż st00pky",
    stats: [0, 0, 0, -0.1, 0.05, 0, 0, 0],
    summary: "Tylko ostrożnie, bo dawno niemyte -,-'"
  },
  {
    text: "Zrób filtry na insta",
    stats: [0.05, 0, 0.15, 0.05, 0, 0, 0, 0],
    summary:
      "Okej kurwa, ale przynajmniej mi zielsko załatw jak już mam być kreatywna..."
  }
];

export default function TakeButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.value.setStats(stats);
  };

  const renderOrderElement = value => (
    <View>
      {orderDictionary.map(({ text, stats, summary }) => (
        <Button
          key={text}
          style={styles.modalButton}
          status="basic"
          onPress={() => {
            setVisibility(!visible);
            setStats(stats, value);
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
