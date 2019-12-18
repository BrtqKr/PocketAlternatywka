import React, { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const StatsBar = props => {
  const animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(props.value);
  useInterval(() => {
    if (progress < props.value) {
      setProgress(progress + props.value);
    }
  }, 1000);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 1000
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  return (
    <View style={styles.container}>
      <Text style={styles.barText}>{props.barName}</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill], { backgroundColor: "#8BED4F", width })
          }
        />
      </View>
    </View>
  );
};

export default StatsBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "85%"
  },
  progressBar: {
    flexDirection: "row",
    height: 15,
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5
  },
  barText: {
    alignSelf: "flex-start",
    marginBottom: 8
  }
});
