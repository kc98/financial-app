import React from "react";
import { Asset, AppLoading } from "expo";
import {
  Container,
  Text,
  Header,
  Content,
  Body,
  Title,
  Left,
  Right,
  View,
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import EntrancePage from "./components/EntrancePage";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Montserrat_Black: require("./assets/fonts/Montserrat_Black.otf"),
      Montserrat_Bold: require("./assets/fonts/Montserrat_Bold.otf"),
      Montserrat_ExtraBold: require("./assets/fonts/Montserrat_ExtraBold.otf"),
      Montserrat_Italic: require("./assets/fonts/Montserrat_Italic.otf"),
      Montserrat_Light: require("./assets/fonts/Montserrat_Light.otf"),
      Montserrat_Medium: require("./assets/fonts/Montserrat_Medium.otf"),
      Montserrat_Regular: require("./assets/fonts/Montserrat_Regular.otf"),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return <EntrancePage />;
  }
}
