import React, { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet, Animated, Dimensions } from "react-native";
import { withNavigationFocus } from "react-navigation";

const screenWidth = Dimensions.get("window").width;

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
      setProgress(progress + 0.05);
    }
  }, 100);

  useEffect(() => {
    animation.current.setValue(0);
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, [progress, props.isFocused]);

  const scaleX = animation.current;

  return (
    <View style={styles.container}>
      <Text style={styles.barText}>{props.barName}</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            {
              backgroundColor: "#8BED4F",
              width: "100%",
              transform: [
                {
                  translateX: Animated.multiply(
                    Animated.subtract(scaleX, 1),
                    0.5 * (screenWidth * 0.85 - 16)
                  )
                },
                { scaleX }
              ]
            })
          }
        />
      </View>
    </View>
  );
};

export default withNavigationFocus(StatsBar);

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
    borderRadius: 3
  },
  barText: {
    alignSelf: "flex-start",
    marginBottom: 8
  }
});
