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

const offendDictionary = [
  {
    text: "Podważ alternatywność",
    stats: [-0.5, 0, 0.5, 0.2, 0.3, 0, 0.2, 0.2],
    staminaPrice: 50,
    summary: "Ale jak to alternatywki są już zbyt powszechne?! ;_;"
  },
  {
    text: "Nazwij atencjuszką",
    stats: [0.5, 0, 0.5, 0.2, 0.2, 0, 0.3, 0.3],
    staminaPrice: 200,
    summary:
      "*wyciąga żyletkę i wstawia na facebooka post o próbie samobójczej*"
  },
  {
    text: "Unfollow na insta",
    stats: [0, 0, 0.2, 0.2, 0.2, 0, 0.1, 0.1],
    staminaPrice: 200,
    summary: "Ale jak to ten śmieć mnie kurwa nie followuje?!"
  },
  {
    text: "Skrytykuj tatuaż",
    stats: [0.05, 0, 0.1, 0.1, 0.2, 0, 0.3, 0.1],
    staminaPrice: 200,
    summary: "Zajebisty jest, nie zesraj się kurwa! -,-'"
  },
  {
    text: "Obraź Billie",
    stats: [0.15, 0, 0.2, 0.3, 0.2, 0, 0.1, 0.3],
    staminaPrice: 200,
    summary: "Odpierdol się od Billie! -,-,-,-,-'"
  }
];

export default function OffendButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.statsValue.setStats(stats);
  };

  const spendStamina = stamina => {
    return props.stamina.spendStamina(stamina);
  };

  const renderOffendElement = () => (
    <View style={styles.modalContainer}>
      {offendDictionary.map(({ text, stats, staminaPrice, summary }) => (
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
        <Text style={styles.buttonText}>Szkaluj...</Text>
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

        {renderOffendElement()}
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
