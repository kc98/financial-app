import React, { useState } from "react";
import { Text, Container, Header, Input, Button } from "native-base";

import { StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { buttons } from "../styles/buttons";
import { widths } from "../styles/widths";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function BudgetSettingPage({ navigation }) {
  const [budgetAmount, setBudgetAmount] = useState(null);
  let budgetAmoutWithTwoDecimal = parseFloat(budgetAmount).toFixed(2);
  const handlebudgetAmountOnChange = (event) => {
    let budgetAmountInput = event.nativeEvent.text;
    setBudgetAmount(budgetAmountInput);
  };

  const handleBudgetChangeOnPress = () => {
    if (!budgetAmount) {
      setBudgetAmount(null);
      Alert.alert("Invalid Budget Amount", "Budget amount cannot be empty.", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert(
        "Update successfully!",
        "Your budget amount has been changed.\nBudget Amount: " +
          budgetAmoutWithTwoDecimal,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
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
            onPress={handleBudgetChangeOnPress}
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
