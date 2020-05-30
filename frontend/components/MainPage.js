import React from "react";
import TransactionListPage from "./TransactionListPage";
import ReportPage from "./ReportPage";
import { Icon } from "native-base";

import { colors } from "../styles/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import AddTransactionPage from "./AddTransactionPage";
import InsightsPage from "./InsightsPage";
import UserProfilePage from "./UserProfilePage";

const Tab = createBottomTabNavigator();

export default function MainPage({ navigation, route }) {
  // console.log(navigation);
  // navigation.reset({
  //   index: 0,
  //   routes: [],
  // });

  if (route.state) {
    let currentScreenName = route.state.routes[route.state.index].name;

    if (currentScreenName == "Add") {
      currentScreenName = "New Transaction";
    }

    navigation.setOptions(
      {
        headerTitle: currentScreenName,
      },
      [navigation, route]
    );
  } else {
    navigation.setOptions(
      {
        headerTitle: "Transaction",
      },
      [navigation, route]
    );
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary.color,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type="Entypo" name="wallet" style={{ color: color }} />
          ),
        }}
        name="Transactions"
        component={TransactionListPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="file-document"
              style={{ color: color }}
            />
          ),
        }}
        name="ReportPage"
        component={ReportPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type="AntDesign" name="pluscircle" style={{ color: color }} />
          ),
        }}
        name="Add"
        component={AddTransactionPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="lightbulb-on"
              style={{ color: color }}
            />
          ),
        }}
        name="Insights"
        component={InsightsPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              type="FontAwesome"
              name="user-circle-o"
              style={{ color: color }}
            />
          ),
        }}
        name="Profile"
        component={UserProfilePage}
      />
    </Tab.Navigator>
  );
}
