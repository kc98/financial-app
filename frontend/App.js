import "react-native-gesture-handler";
import React from "react";
import { BackHandler } from "react-native";
import { Asset, AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Icon, Button, Badge, Text } from "native-base";

import EntrancePage from "./components/EntrancePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MainPage from "./components/MainPage";
import GoToButton from "./components/GoToButton";
import { colors } from "./styles/colors";
import PreferencePage from "./components/PreferencePage";
import TransactionDetailPage from "./components/TransactionDetailPage";
import InsightsDetailPage from "./components/InsightsDetailPage";
import EditUserProfilePage from "./components/EditUserProfilePage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import ReportDetailPage from "./components/ReportDetailPage";
import BudgetPage from "./components/BudgetPage";

const Stack = createStackNavigator();

function Chatbot() {
  return (
    <Button transparent>
      <Icon
        style={[colors.tertiary, { marginRight: -8 }]}
        type="MaterialCommunityIcons"
        name="robot"
      />
      <Badge
        style={{ width: 20, height: 20, borderRadius: 1000, marginBottom: 24 }}
      >
        <Text style={{ fontSize: 12 }}>2</Text>
      </Badge>
    </Button>
  );
}

function IconWithBadge({ type, name, badgeCount, color }) {
  return (
    <View style={{ width: 24, height: 24, margin: 20 }}>
      <Icon
        type={type}
        name={name}
        style={[color, { marginTop: -5, marginRight: -5 }]}
      />
      {badgeCount > 0 && (
        <View
          style={{
            position: "absolute",
            right: -11,
            top: -4.5,
            backgroundColor: "red",
            borderRadius: 10,
            width: 16,
            height: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount > 9 ? "9+" : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  handleBackButton() {
    BackHandler.exitApp();
  }

  componentDidMount() {
    this._loadFontsAsync();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
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

  backButtonHeader() {
    return {
      headerTitle: "",
      headerBackImage: () => <GoToButton type="goBack" />,
      headerBackTitleVisible: false,
      headerTransparent: true,
    };
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        {/* REMEMBER REMOVE initialRouteName="MainPage" */}
        <Stack.Navigator initialRouteName="MainPage">
          <Stack.Screen
            options={{
              header: () => null,
            }}
            name="EntrancePage"
            component={EntrancePage}
          />
          <Stack.Screen
            options={this.backButtonHeader}
            name="SignUp"
            component={SignUp}
            setIsLoggedIn={this.setIsLoggedIn}
          />
          <Stack.Screen
            options={this.backButtonHeader}
            name="LogIn"
            component={LogIn}
            setIsLoggedIn={this.setIsLoggedIn}
          />
          <Stack.Screen
            options={{
              headerLeft: () => null,
              headerRight: () => (
                <IconWithBadge
                  type="MaterialCommunityIcons"
                  name="robot"
                  badgeCount={99}
                  color={colors.primary}
                />
              ),
              headerTransparent: true,
            }}
            name="MainPage"
            component={MainPage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Preferences",
              headerBackImage: () => <GoToButton type="goBack" />,
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
            name="PreferencePage"
            component={PreferencePage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Transaction",
              headerBackImage: () => <GoToButton type="goBack" />,
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
            name="TransactionDetailPage"
            component={TransactionDetailPage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Insights",
              headerBackImage: () => <GoToButton type="goBack" />,
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
            name="InsightsDetailPage"
            component={InsightsDetailPage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Profile",
              headerBackImage: () => <GoToButton type="goBack" />,
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
            name="EditUserProfilePage"
            component={EditUserProfilePage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Change Password",
              headerBackImage: () => <GoToButton type="goBack" />,
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
            name="ChangePasswordPage"
            component={ChangePasswordPage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Report Details",
              headerBackImage: () => <GoToButton type="goBack" />,
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
            name="ReportDetailPage"
            component={ReportDetailPage}
          />
          <Stack.Screen
            options={{
              headerTitle: "Budget",
              headerBackImage: () => <GoToButton type="goBack" />,
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
            name="BudgetPage"
            component={BudgetPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
