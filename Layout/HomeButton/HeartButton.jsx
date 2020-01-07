import React, { useRef, useEffect } from "react";
import { TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import NavigationService from "./NavigationService";

const SIZE = 95;

Animatable.initializeRegistryWithDefinitions({
  scaledPulse: {
    0: {
      scale: 1
    },
    0.5: {
      scale: 2
    },
    1: {
      scale: 1
    }
  }
});

const HeartButton = props => {
  const goHome = () => {
    NavigationService.navigate("Home");
  };

  const animateRef = useRef(null);

  useEffect(() => {
    if (props.focused)
      animateRef.current.animate({
        0: { scale: 1 },
        0.5: { scale: 1.2 },
        1: { scale: 1 }
      });
  });

  return (
    <View
      style={{
        position: "absolute",
        alignItems: "center"
      }}
    >
      <TouchableHighlight
        onPress={() => {
          goHome();
        }}
        underlayColor="#EC91D8"
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: SIZE + 8,
          height: SIZE - 8,
          borderRadius: SIZE / 2,
          backgroundColor: "#EC91D8"
        }}
      >
        <Animatable.View
          animation="scaledPulse"
          iterationCount={2}
          duration={500}
          ref={animateRef}
          style={{ textAlign: "center" }}
        >
          <Icon name="heart" solid size={60} color={props.color} />
        </Animatable.View>
      </TouchableHighlight>
    </View>
  );
};
export default HeartButton;
