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
import { CoinsConsumer } from "../../../Providers/CoinsProviderConfig";

const buyDictionary = [
  {
    text: "Weed",
    id: 0,
    price: 200
  },
  {
    text: "Szmatę z lumpa",
    id: 1,
    price: 120
  },
  {
    text: "Płytę Billie Eilish",
    id: 2,
    price: 50
  },
  {
    text: "Płytę Lil Pepa",
    id: 3,
    price: 50
  },
  {
    text: "Farbę do włosów",
    id: 4,
    price: 35
  }
];

export default function BuyButton(props) {
  const [visible, setVisibility] = useState(false);

  const renderBuyElement = () => (
    <View style={styles.modalContainer}>
      <CoinsConsumer>
        {coinsProperties => {
          return (
            <View style={styles.container}>
              {buyDictionary.map(({ text, id, price }) => (
                <TouchableOpacity
                  key={text}
                  style={styles.modalButton}
                  onPress={() => {
                    setVisibility(false);

                    setTimeout(() => {
                      Alert.alert(
                        "Sklep",
                        "Czy na pewno chcesz kupić ".concat(
                          text,
                          " za ",
                          price,
                          " DogeCoins?"
                        ),
                        [
                          {
                            text: "OK ;_;",
                            onPress: () => {
                              props.itemValue.increase(id);
                              coinsProperties.spendCoins(price);
                            }
                          },
                          {
                            text: "Anuluj",
                            style: "cancel"
                          }
                        ],
                        { cancelable: false }
                      );
                    }, 1000);
                  }}
                >
                  <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
      </CoinsConsumer>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setVisibility(true)}
      >
        <Text style={styles.buttonText}>Kup...</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisibility(false)}
        transparent
      >
        <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        {renderBuyElement()}
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
    top: "35%"
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
