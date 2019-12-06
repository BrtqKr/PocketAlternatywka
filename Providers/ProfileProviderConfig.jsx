/* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext();

// Provider will be exported wrapped in ConfigProvider component.
class ConfigProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: {
        title: "Doge Alternatywka",
        img: "Profile1",
        description: "Smutna jest, płacze w kącie cały dzień",
        id: 0
      }
    };
  }

  render() {
    return (
      <Provider
        value={{
          title: this.state.profilePic.title,
          img: this.state.profilePic.img,
          description: this.state.profilePic.description,
          id: this.state.profilePic.id
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { ConfigProvider, Consumer as ConfigConsumer };

// I make this default since it will probably be exported most often.
