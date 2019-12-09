import React from "react";
import { StyleSheet, View, Dimensions, AsyncStorage } from "react-native";
import { Button, Modal } from "react-native-ui-kitten";
import { StatsConsumer } from "../Providers/StatsProviderConfig";

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

  const renderTakeElement = value => (
    <View>
      <Button
        style={styles.button}
        status="basic"
        onPress={() => {
          toggleTake();
          setStats([0, 0, 0.1, 0.1, 0.15, 0, 0, 0], value);
        }}
      >
        Wixapol
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleTake}>
        Sesję na cmentarzu
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleTake}>
        Jaranie weed
      </Button>
    </View>
  );

  const renderBuyElement = () => (
    <View>
      <Button style={styles.button} status="basic" onPress={toggleBuy}>
        Weed
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleBuy}>
        Szmatę z lumpa
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleBuy}>
        Płytę Billie Eilish
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleBuy}>
        Płytę Lil Pepa
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleBuy}>
        Farbę do włosów
      </Button>
    </View>
  );

  const renderOrderElement = () => (
    <View>
      <Button style={styles.button} status="basic" onPress={toggleOrder}>
        Usiądź na mordzie
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleOrder}>
        Zrób dziarkę
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleOrder}>
        Pokaż stopy
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleOrder}>
        Zrób filtry na insta
      </Button>
    </View>
  );

  const renderSendElement = () => (
    <View>
      <Button style={styles.button} status="basic" onPress={toggleSend}>
        Memucha
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleSend}>
        Smutną piosenkę ;_;
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleSend}>
        Weed
      </Button>
    </View>
  );

  const renderOffendElement = () => (
    <View>
      <Button style={styles.button} status="basic" onPress={toggleOffend}>
        Podważ alternatywność
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleOffend}>
        Nazwij atencjuszką
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleOffend}>
        Unfollow na insta
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleOffend}>
        Skrytykuj tatuaż
      </Button>
      <Button style={styles.button} status="basic" onPress={toggleOffend}>
        Obraź Billie
      </Button>
    </View>
  );

  return (
    <StatsConsumer>
      {value => (
        <View style={styles.container}>
          {
            <Button
              style={styles.button}
              status="basic"
              onPress={() => setVisible({ ...visible, take: !visible.take })}
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
              onPress={() => setVisible({ ...visible, order: !visible.order })}
            >
              Rozkaż...
            </Button>
          }

          {
            <Button
              style={styles.button}
              status="basic"
              onPress={() => setVisible({ ...visible, send: !visible.send })}
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
          >
            {renderTakeElement(value)}
          </Modal>

          <Modal
            allowBackdrop
            backdropStyle={styles.backdrop}
            onBackdropPress={toggleBuy}
            visible={visible.buy}
          >
            {renderBuyElement()}
          </Modal>

          <Modal
            allowBackdrop
            backdropStyle={styles.backdrop}
            onBackdropPress={toggleOrder}
            visible={visible.order}
          >
            {renderOrderElement()}
          </Modal>

          <Modal
            allowBackdrop
            backdropStyle={styles.backdrop}
            onBackdropPress={toggleSend}
            visible={visible.send}
          >
            {renderSendElement()}
          </Modal>

          <Modal
            allowBackdrop
            backdropStyle={styles.backdrop}
            onBackdropPress={toggleOffend}
            visible={visible.offend}
          >
            {renderOffendElement()}
          </Modal>
        </View>
      )}
    </StatsConsumer>
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
