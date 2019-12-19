import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, Animated, Dimensions } from "react-native";
import { withNavigationFocus } from "react-navigation";

const screenWidth = Dimensions.get("window").width;

const StatsBar = props => {
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    animation.current.setValue(0);
    Animated.timing(animation.current, {
      toValue: props.value,
      duration: 1200,
      useNativeDriver: true
    }).start();
  }, [props.value, props.isFocused]);

  const scaleX = animation.current;

  return (
    <View style={styles.container}>
      <Text style={styles.barText}>{props.barName}</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            {
              backgroundColor:
                // eslint-disable-next-line no-nested-ternary
                props.value > 0.7
                  ? "#43c916"
                  : props.value > 0.4
                  ? "#f2d30a"
                  : "#d41d0d",
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
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: "hidden"
  },
  barText: {
    alignSelf: "flex-start",
    marginBottom: 8
  }
});
