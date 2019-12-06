/* eslint-disable react/destructuring-assignment */
import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext();

// Provider will be exported wrapped in ConfigProvider component.
class ConfigProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Doge Alternatywka",
      img: "Profile1",
      description: "Smutna jest, płacze w kącie cały dzień",
      id: 0
    };
  }

  setProfile = profile => {
    this.setState({ title: profile.title });
    this.setState({ img: profile.img });
    this.setState({ description: profile.description });
    this.setState({ id: profile.id });
  };

  render() {
    return (
      <Provider
        value={{
          title: this.state.title,
          img: this.state.img,
          description: this.state.description,
          id: this.state.id,
          setProfile: e => this.setProfile(e)
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { ConfigProvider, Consumer as ConfigConsumer };

// I make this default since it will probably be exported most often.
