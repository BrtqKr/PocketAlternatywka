import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import normalize from "react-native-normalize";

const sendDictionary = [
  {
    text: "Memucha",
    stats: [0.5, 0, 0, -0.2, 0.05, 0, 0, 0],
    staminaPrice: 50,
    summary: "beka XDDDD"
  },
  {
    text: "Smutną piosenkę",
    stats: [0.05, 0, 0, 0.1, 0.1, 0, 0.1, 0.1],
    staminaPrice: 200,
    summary:
      "Super muzyka, ale pamiętaj, że tylko ja w tym związku mogę kurwa słuchać Billie!"
  },
  {
    text: "Weed",
    stats: [0.5, 0, 0.1, -0.2, 0.1, 0, 0, 0],
    staminaPrice: 200,
    summary: "Kurwa popierdoliło cię, żeby wysyłać to pocztą?!"
  }
];

export default function SendButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.statsValue.setStats(stats);
  };

  const spendStamina = stamina => {
    return props.stamina.spendStamina(stamina);
  };

  const renderSendElement = () => (
    <View style={styles.modalContainer}>
      {sendDictionary.map(({ text, stats, staminaPrice, summary }) => (
        <TouchableOpacity
          key={text}
          style={styles.modalButton}
          onPress={() => {
            setVisibility(false);

            if (spendStamina(staminaPrice)) {
              setTimeout(() => {
                setStats(stats, props.statsValue);

                Alert.alert(text, summary, [{ text: "OK ;_;" }], {
                  cancelable: false
                });
              }, 1000);
            } else {
              setTimeout(() => {
                Alert.alert(
                  "Jesteś zbyt zmęczony",
                  "Odpocznij przed wykonaniem kolejnej akcji",
                  [{ text: "OK ;_;" }],
                  { cancelable: false }
                );
              }, 1000);
            }
          }}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setVisibility(true)}
      >
        <Text style={styles.buttonText}>Wyślij...</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisibility(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        {renderSendElement()}
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  mainButton: {
    backgroundColor: "#B39DB3",
    borderRadius: normalize(15),
    overflow: "hidden",
    width: "60%",
    margin: normalize(5, "height"),
    justifyContent: "center",
    alignItems: "center",
    padding: 7
  },
  buttonText: {
    color: "#F8F8F8",
    fontSize: normalize(20)
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    position: "relative",
    top: "35%"
  },
  modalButton: {
    backgroundColor: "#B39DB3",
    borderRadius: normalize(15),
    overflow: "hidden",
    width: "86%",
    margin: normalize(5, "height"),
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(7)
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1
  }
});
