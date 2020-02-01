import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import axios from "react-native-axios";
import NetInfo from "@react-native-community/netinfo";

function RequestView(props) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const [connected, setConnection] = useState(false);

  const handleConnectionChange = connection => {
    setConnection(connection.isConnected);
  };

  useEffect(() => {
    getData();
    const didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        getData();
      }
    );
    const didBlurSubscription = props.navigation.addListener("willBlur", () => {
      blur();
    });
    const didConnectionChange = NetInfo.addEventListener(
      handleConnectionChange
    );

    return () => {
      didFocusSubscription.remove();
      didBlurSubscription.remove();
      didConnectionChange();
    };
  }, [props.navigation]);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.coinbase.com/v2/prices/spot?currency=USD"
      );
      await new Promise(r => setTimeout(r, 1000));
      setLoading(false);
      setResponse(resp.data.data.amount);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  const blur = () => {
    setLoading(true);
    setResponse("");
    setError(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <Text>{connected ? response : null}</Text>
      )}
      {error ? <ActivityIndicator size="large" color="red" /> : <Text></Text>}
      {connected ? null : <Text>No Internet connection...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  picture: {
    width: 300,
    height: 300,
    borderRadius: 90 / 2,
    overflow: "hidden"
  },

  title: {
    marginBottom: 10,
    fontSize: 25
  },
  bottomText: {
    marginTop: 10,
    fontSize: 22
  }
});

export default RequestView;
