import React from "react";
import TransactionList from "./TransactionList";
import Reports from "./Reports";
import { Icon } from "native-base";

import { colors } from "../styles/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddTransactionPage from "./AddTransactionPage";
import InsightsPage from "./InsightsPage";
import UserProfilePage from "./UserProfilePage";

const Tab = createBottomTabNavigator();

export default function MainPage({ navigation, route }) {
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
        component={TransactionList}
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
        name="Reports"
        component={Reports}
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
