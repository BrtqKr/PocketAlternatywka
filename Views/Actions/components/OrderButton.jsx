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

const orderDictionary = [
  {
    text: "Usiądź na mordzie",
    stats: [0.1, 0, 0, -0.2, 0.1, 0, 0, 0],
    staminaPrice: 200,
    summary: "Ostatnio każda tak robi, ale okej...niech ci kurwa będzie..."
  },
  {
    text: "Zrób dziarkę",
    stats: [0.15, 0, 0, 0.1, 0.1, 0.3, 0.1, 0.1],
    staminaPrice: 200,
    summary: "Ale jak to kurwa tężec!?"
  },
  {
    text: "Pokaż st00pky",
    stats: [0, 0, 0, -0.1, 0.05, 0, 0, 0],
    staminaPrice: 200,
    summary: "Tylko ostrożnie, bo dawno niemyte -,-'"
  },
  {
    text: "Zrób filtry na insta",
    stats: [0.05, 0, 0.15, 0.05, 0, 0, 0, 0],
    staminaPrice: 200,
    summary:
      "Okej kurwa, ale przynajmniej mi zielsko załatw jak już mam być kreatywna..."
  }
];

export default function OrderButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.statsValue.setStats(stats);
  };

  const spendStamina = stamina => {
    props.stamina.spendStamina(stamina);
  };

  const generateAlert = (isValid, text, summary) => {
    if (isValid) {
      Alert.alert(text, summary, [{ text: "OK ;_;" }], { cancelable: false });
    } else {
      Alert.alert(
        "Jesteś zbyt zmęczony",
        "Odpocznij przed wykonaniem kolejnej akcji",
        [{ text: "OK ;_;" }],
        { cancelable: false }
      );
    }
  };

  const renderOrderElement = () => (
    <View style={styles.modalContainer}>
      {orderDictionary.map(({ text, stats, staminaPrice, summary }) => (
        <TouchableOpacity
          key={text}
          style={styles.modalButton}
          onPress={() => {
            setStats(stats, props.statsValue);
            spendStamina(staminaPrice);
            setVisibility(false);
            setTimeout(() => {
              generateAlert(
                props.stamina.stamina - staminaPrice >= 0,
                text,
                summary
              );
            }, 1000);
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
        <Text style={styles.buttonText}>Rozkaż...</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={() => setVisibility(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        {renderOrderElement()}
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
    borderRadius: 15,
    overflow: "hidden",
    width: "60%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 7
  },
  buttonText: {
    color: "#F8F8F8",
    fontSize: 20
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    position: "relative",
    top: "40%"
  },
  modalButton: {
    backgroundColor: "#B39DB3",
    borderRadius: 15,
    overflow: "hidden",
    width: "86%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 7
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
