import React from "react";
import { StyleSheet, View, Dimensions, AsyncStorage } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";
import { StatsConsumer } from "../Providers/StatsProviderConfig";
import { ItemsConsumer } from "../Providers/ItemsProviderConfig";

function ActionsView() {
  const [visible, setVisible] = React.useState(false);

  const toggleBuy = () => {
    setVisible(!visible.buy);
  };

  const toggleTake = () => {
    setVisible(!visible.take);
  };

  const toggleOrder = () => {
    setVisible(!visible.order);
  };

  const toggleSend = () => {
    setVisible(!visible.order);
  };

  const toggleOffend = () => {
    setVisible(!visible.offend);
  };

  const setStats = (stats, value) => {
    value.setStats(stats);
  };

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
  const renderTakeElement = value => (
    <View>
      {takeDictionary.map(({ text, stats }) => (
        <Button
          key={text}
          style={styles.button}
          status="basic"
          onPress={() => {
            toggleTake();
            setStats(stats, value);
          }}
        >
          {text}
        </Button>
      ))}
    </View>
  );

  const buyDictionary = [
    {
      text: "Weed",
      id: 0
    },
    {
      text: "Szmatę z lumpa",
      id: 1
    },
    {
      text: "Płytę Billie Eilish",
      id: 2
    },
    {
      text: "Płytę Lil Pepa",
      id: 3
    },
    {
      text: "Farbę do włosów",
      id: 4
    }
  ];

  const renderBuyElement = itemValue => (
    <View>
      {buyDictionary.map(item => (
        <Button
          key={item.id}
          style={styles.button}
          status="basic"
          onPress={() => {
            toggleBuy();
            itemValue.increase(item.id);
          }}
        >
          {item.text}
        </Button>
      ))}
    </View>
  );

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

  const renderOrderElement = value => (
    <View>
      {orderDictionary.map(({ text, stats }) => (
        <Button
          key={text}
          style={styles.button}
          status="basic"
          onPress={() => {
            toggleOrder();
            setStats(stats, value);
          }}
        >
          {text}
        </Button>
      ))}
    </View>
  );

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

  const renderSendElement = value => (
    <View>
      {sendDictionary.map(({ text, stats }) => (
        <Button
          key={text}
          style={styles.button}
          status="basic"
          onPress={() => {
            toggleSend();
            setStats(stats, value);
          }}
        >
          {text}
        </Button>
      ))}
    </View>
  );

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

  const renderOffendElement = value => (
    <View>
      {offendDictionary.map(({ text, stats }) => (
        <Button
          key={text}
          style={styles.button}
          status="basic"
          onPress={() => {
            toggleOffend();
            setStats(stats, value);
          }}
        >
          {text}
        </Button>
      ))}
    </View>
  );

  return (
    <ItemsConsumer>
      {itemValue => (
        <StatsConsumer>
          {value => (
            <View style={styles.container}>
              {
                <Button
                  style={styles.button}
                  status="basic"
                  onPress={() =>
                    setVisible({ ...visible, take: !visible.take })
                  }
                >
                  Weź na...
                </Button>
              }

              {
                <Button
                  style={styles.button}
                  status="basic"
                  onPress={() => setVisible({ ...visible, buy: !visible.buy })}
                >
                  Kup...
                </Button>
              }

              {
                <Button
                  style={styles.button}
                  status="basic"
                  onPress={() =>
                    setVisible({ ...visible, order: !visible.order })
                  }
                >
                  Rozkaż...
                </Button>
              }

              {
                <Button
                  style={styles.button}
                  status="basic"
                  onPress={() =>
                    setVisible({ ...visible, send: !visible.send })
                  }
                >
                  Wyślij...
                </Button>
              }

              {
                <Button
                  style={styles.button}
                  status="basic"
                  onPress={() =>
                    setVisible({ ...visible, offend: !visible.offend })
                  }
                >
                  Szkaluj...
                </Button>
              }

              <Button
                style={styles.button}
                onPress={async () => AsyncStorage.clear()}
              >
                Clear storage
              </Button>

              <Modal
                allowBackdrop
                backdropStyle={styles.backdrop}
                onBackdropPress={toggleTake}
                visible={visible.take}
                animationType=""
              >
                {renderTakeElement(value)}
              </Modal>

              <Modal
                allowBackdrop
                backdropStyle={styles.backdrop}
                onBackdropPress={toggleBuy}
                visible={visible.buy}
              >
                {renderBuyElement(itemValue)}
              </Modal>

              <Modal
                allowBackdrop
                backdropStyle={styles.backdrop}
                onBackdropPress={toggleOrder}
                visible={visible.order}
              >
                {renderOrderElement(value)}
              </Modal>

              <Modal
                allowBackdrop
                backdropStyle={styles.backdrop}
                onBackdropPress={toggleSend}
                visible={visible.send}
              >
                {renderSendElement(value)}
              </Modal>

              <Modal
                allowBackdrop
                backdropStyle={styles.backdrop}
                onBackdropPress={toggleOffend}
                visible={visible.offend}
              >
                {renderOffendElement(value)}
              </Modal>
            </View>
          )}
        </StatsConsumer>
      )}
    </ItemsConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    width: Dimensions.get("window").width
  },
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

export default ActionsView;
