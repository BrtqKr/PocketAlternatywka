import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "react-native-ui-kitten";

function HomeView() {
  return (
    <Layout style={styles.container}>
      <Text>HomeView</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    paddingVertical: 4,
    paddingHorizontal: 4
  }
});

export default HomeView;
