import React, { useState } from "react";
import {
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  View,
  Form,
  Input,
  Label,
  Item,
  Icon,
  Title,
  Button,
  Segment,
} from "native-base";

import { StyleSheet, Image, Dimensions, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import DatePicker from "react-native-datepicker";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { buttons } from "../styles/buttons";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

export default function AddTransactionPage() {
  const [transactionMode, setTransactionMode] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  function switchTransactionMode() {
    setTransactionMode(!transactionMode);
  }

  var defaultAmount = 0;
  defaultAmount = parseFloat(defaultAmount).toFixed(2);
  const [amount, setAmount] = useState(defaultAmount);

  const handleAmountOnChange = (event) => {
    let inputAmount = event.nativeEvent.text;
    // inputAmount = parseFloat(inputAmount);
    setAmount(inputAmount);
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <View
          style={[
            colors.backgroundWhite,
            widths.width_100,
            { marginTop: 40, marginBottom: 35, height: 550 },
          ]}
        >
          <Row
            style={[
              widths.width_100,
              alignments.center,
              { height: 45, marginBottom: 50 },
            ]}
          >
            <Segment style={[colors.backgroundWhite, { marginTop: 40 }]}>
              <Button
                first
                style={{
                  backgroundColor: transactionMode ? "#46C553" : "#fff",
                  borderColor: "#98ab9a",
                  padding: 10,
                }}
                active={transactionMode}
                onPress={() => {
                  !transactionMode ? switchTransactionMode() : "";
                }}
              >
                <Text
                  style={{
                    color: transactionMode ? "#fff" : "#000",
                    fontWeight: transactionMode ? "bold" : "normal",
                  }}
                >
                  Expense
                </Text>
              </Button>
              <Button
                last
                style={{
                  backgroundColor: transactionMode ? "#fff" : "#46C553",
                  borderColor: "#98ab9a",
                  padding: 10,
                }}
                active={!transactionMode}
                onPress={() => {
                  transactionMode ? switchTransactionMode() : "";
                }}
              >
                <Text
                  style={{
                    color: transactionMode ? "#000" : "#fff",
                    fontWeight: transactionMode ? "normal" : "bold",
                  }}
                >
                  Income
                </Text>
              </Button>
            </Segment>
          </Row>
          <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <Row style={[styles.transactionInputRow]}>
              <Col size={1}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Date:
                </Label>
              </Col>
              <Col size={2}>
                <DatePicker
                  style={{ width: 200 }}
                  date={currentDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: { marginLeft: 36 },
                  }}
                  onDateChange={(date) => {
                    setCurrentDate(date);
                  }}
                />
              </Col>
            </Row>
            <Row style={[styles.transactionInputRow]}>
              <Col size={2}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Amount:
                </Label>
              </Col>
              <Col size={1}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  MYR
                </Label>
              </Col>
              <Col size={3} style={{ height: 30 }}>
                <Input
                  returnKeyType="done"
                  style={[
                    styleSheetMain.labelBlack,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#4EAE58",
                    },
                  ]}
                  keyboardType="numeric"
                  onChange={handleAmountOnChange}
                  value={amount}
                />
              </Col>
            </Row>
            <Row style={[styles.transactionInputRow]}>
              <Col size={2}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Category:
                </Label>
              </Col>
              <Col size={4}></Col>
            </Row>
            <Row style={[styles.transactionInputRow, { height: 45 }]}>
              <Col size={2}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Note:
                </Label>
              </Col>
            </Row>
            <Row
              style={[
                {
                  paddingLeft: 45,
                  paddingRight: 40,
                  marginBottom: 20,
                  height: 75,
                },
              ]}
            >
              <Input
                style={[
                  styleSheetMain.labelBlack,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "#4EAE58",
                  },
                ]}
                multiline={true}
                // onChange={handleAmountOnChange}
                // value={amount}
              />
            </Row>
            <Row
              style={[
                styles.transactionInputRow,
                widths.width_100,
                alignments.center,
                { height: 85 },
              ]}
            >
              <Button
                style={[
                  styleSheetMain.primaryButton,

                  buttons.radius_18,
                  { marginTop: 30 },
                ]}
              >
                <Text style={[colors.white, texts.montserratRegular]}>
                  Add Transaction
                </Text>
              </Button>
            </Row>
            <Row>
              <Text>
                This is add transaction {transactionMode ? "expense" : "income"}{" "}
                page
              </Text>
            </Row>
          </KeyboardAwareScrollView>
        </View>
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({
  transactionInputRow: {
    paddingLeft: 45,
    paddingRight: 40,
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#98AB9A",
  },
});
