import React from "react";
import TransactionList from "./TransactionList";
import Reports from "./Reports";
import { Icon } from "native-base";

import { colors } from "../styles/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function MainPage() {
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
    </Tab.Navigator>
  );
}
