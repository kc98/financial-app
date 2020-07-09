import React, { useState, useEffect, useGlobal } from "reactn";
import { Text, Container, Header, Input, Button } from "native-base";

import { StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from "@react-native-community/async-storage";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { buttons } from "../styles/buttons";
import { widths } from "../styles/widths";
import { styleSheetMain } from "../styles/styleSheetMain";

import * as api from "../api";

export default function BudgetSettingPage({ navigation }) {
  const [budgetAmount, setBudgetAmount] = useState(null);
  const [refresh, reload] = useGlobal("refresh");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");

      let response = await api.getBudget(token);

      let budgetData = response.data.budget;

      setBudgetAmount(parseFloat(budgetData).toFixed(2));
      setIsLoading(false);
    } catch (error) {
      if (error.response.status == 401) {
        await AsyncStorage.clear();
        return navigation.navigate("EntrancePage");
      } else {
        // Unhandled errors
        console.log(error.response);
      }
    }
  };

  const handlebudgetAmountOnChange = (event) => {
    let budgetAmountInput = event.nativeEvent.text;
    setBudgetAmount(budgetAmountInput);
  };

  const handleBudgetUpdateOnPress = async () => {
    if (!budgetAmount) {
      setBudgetAmount(null);
      Alert.alert("Invalid Budget Amount", "Budget amount cannot be empty.", [
        { text: "OK" },
      ]);
    } else if (budgetAmount < 100) {
      Alert.alert(
        "Invalid Budget Amount",
        "Budget amount cannot less than MYR 100.00.",
        [{ text: "OK" }]
      );
    } else {
      try {
        let token = await AsyncStorage.getItem("token");
        let response = await api.updateBudget(token, budgetAmount);

        Alert.alert(
          "Update successfully!",
          "Your budget amount has been changed."[
            { text: "OK", onPress: () => navigation.goBack() }
          ]
        );

        reload(!refresh);

        Alert.alert("Update successfully!", "Your profile has been updated.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } catch (error) {
        console.log(error.response);

        return;
      }
    }
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        <Row
          style={[
            colors.backgroundWhite,
            {
              height: 60,
              marginTop: 30,
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 10,
              alignItems: "center",
            },
          ]}
        >
          <Col size={6}>
            <Text style={[styleSheetMain.mediumText]}>Budget Amount</Text>
          </Col>
          <Col
            size={3}
            style={[styleSheetMain.rightContainer, { marginRight: 5 }]}
          >
            <Text style={[styleSheetMain.mediumText, { color: "#4EAE58" }]}>
              MYR
            </Text>
          </Col>
          <Col size={3} style={[styleSheetMain.rightContainer]}>
            <Input
              style={[
                styleSheetMain.labelBlack,
                texts.font_15,
                {
                  color: "#4EAE58",
                  borderBottomWidth: 1,
                  borderBottomColor: "#4EAE58",

                  height: 28,
                },
              ]}
              placeholder="0.00"
              keyboardType="numeric"
              onChange={handlebudgetAmountOnChange}
              value={budgetAmount}
            />
          </Col>
        </Row>
        <Row
          style={[
            alignments.center,
            { height: 30, marginTop: 45, marginBottom: 10 },
          ]}
        >
          <Button
            style={[styles.primaryButtonRadius25, widths.width_40]}
            onPress={handleBudgetUpdateOnPress}
          >
            <Text style={[styleSheetMain.buttonTextMedium, colors.white]}>
              Save
            </Text>
          </Button>
        </Row>
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({
  primaryButtonRadius25: {
    ...buttons.primary,
    ...alignments.center,
    height: 42,
    ...buttons.radius_25,
  },
});
