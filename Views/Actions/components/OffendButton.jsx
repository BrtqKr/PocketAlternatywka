import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";

const offendDictionary = [
  {
    text: "Podważ alternatywność",
    stats: [-0.5, 0, 0.5, 0.2, 0.3, 0, 0.2, 0.2]
  },
  {
    text: "Nazwij atencjuszką",
    stats: [0.5, 0, 0.5, 0.2, 0.2, 0, 0.3, 0.3]
  },
  {
    text: "Unfollow na insta",
    stats: [0, 0, 0.2, 0.2, 0.2, 0, 0.1, 0.1]
  },
  {
    text: "Skrytykuj tatuaż",
    stats: [0.05, 0, 0.1, 0.1, 0.2, 0, 0.3, 0.1]
  },
  {
    text: "Obraź Billie",
    stats: [0.15, 0, 0.2, 0.3, 0.2, 0, 0.1, 0.3]
  }
];

export default function OffendButton(props) {
  const [visible, setVisibility] = useState(false);

  const setStats = stats => {
    props.value.setStats(stats);
  };

  const renderOffendElement = () => (
    <View>
      {offendDictionary.map(({ text, stats }) => (
        <Button
          key={text}
          style={styles.modalButton}
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
        Szkaluj...
      </Button>

      <Modal
        allowBackdrop
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibility(!visible)}
        visible={visible}
        animationType=""
      >
        {renderOffendElement()}
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
