import React, { useState } from "react";
import {
  Text,
  Container,
  Header,
  View,
  Input,
  Label,
  Button,
  Segment,
} from "native-base";

import { StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import DatePicker from "react-native-datepicker";
import PickerModal from "react-native-picker-modal-view";
import moment from "moment";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { buttons } from "../styles/buttons";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

export default function TransactionDetailPage() {
  const currentDateTime = new Date();

  const transactionData = {
    key: 1,
    note: "Movie",
    amount: 20,
    timestamp: "1590858208778",
    category: "Income #2",
    transactionType: "income",
  };
  const defaultCategory = { Id: 2, Name: "Income #2" };
  let dateTime = moment(transactionData.timestamp, "x").format(
    "DD/MM/YYYY, h:mm a"
  );

  let selectedTransactionMode = true;
  if (transactionData.transactionType != "expense") {
    selectedTransactionMode = false;
  }

  const [transactionMode, setTransactionMode] = useState(
    selectedTransactionMode
  );
  const [selectedDateTime, setSelectedDateTime] = useState(dateTime);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [transactionNote, setTransactionNote] = useState(transactionData.note);
  const [amount, setAmount] = useState(
    parseFloat(transactionData.amount).toFixed(2)
  );
  const expenseList = [
    { Id: 1, Name: "Expense #1" },
    { Id: 2, Name: "Expense #2" },
    { Id: 3, Name: "Expense #3" },
    { Id: 4, Name: "Expense #4" },
    { Id: 5, Name: "testing " },
    { Id: 6, Name: "food" },
    { Id: 7, Name: "testing " },
    { Id: 8, Name: "fossssod" },
    { Id: 9, Name: "testing123" },
    { Id: 10, Name: "aaaaaaa" },
    { Id: 11, Name: "bbbbbbb " },
    { Id: 12, Name: "vvvvvv" },
    { Id: 13, Name: "xxxxxxxx" },
    { Id: 14, Name: "zzzzzzzzzz" },
    { Id: 15, Name: "bbnnnn" },
    { Id: 16, Name: "qqqqqqq" },
  ];

  const incomeList = [
    { Id: 1, Name: "Income #1" },
    { Id: 2, Name: "Income #2" },
    { Id: 3, Name: "Income #3" },
    { Id: 4, Name: "Income #4" },
    { Id: 5, Name: "interest testing" },
    { Id: 6, Name: "Deposit" },
    { Id: 7, Name: "testing111" },
    { Id: 8, Name: "cccccccccc" },
    { Id: 9, Name: "testing321 " },
    { Id: 10, Name: "mmmmmmmmm" },
    { Id: 11, Name: "bbbbbbb " },
    { Id: 12, Name: "vvvvvv" },
    { Id: 13, Name: "xxxxxxxx " },
    { Id: 14, Name: "zzzzzzzzzz" },
    { Id: 15, Name: "bbnnnn" },
    { Id: 16, Name: "qqqqqqq" },
  ];

  function switchTransactionMode() {
    setTransactionMode(!transactionMode);
  }

  const handleOnDateChange = (datetime) => {
    let timestamp = new Date().getTime();
    setSelectedDateTime(datetime);
  };

  const handleAmountOnChange = (event) => {
    let inputAmount = event.nativeEvent.text;
    setAmount(inputAmount);
  };

  const handleCategoryOnSelect = (event) => {
    let inputCategory = event.Name;
    setSelectedCategory(inputCategory);
  };

  const handleTransactionNoteOnChange = (event) => {
    let inputTransactionNote = event.nativeEvent.text;
    setTransactionNote(inputTransactionNote);
  };

  const handleAddTransactionOnSubmit = () => {
    if (!selectedDateTime || !amount || !selectedCategory) {
      // setSelectedDate(null);
      // setAmount(defaultAmount);
      // setSelectedCategory(null);
      // setTransactionNote(null);
    } else {
      let dateTimeToTimestamp = moment(
        selectedDateTime,
        "DD/MM/YYYY, h:mm:ss a"
      ).format("x");
      let timestampToDateTime = moment(dateTimeToTimestamp, "x").format(
        "DD/MM/YYYY, h:mm:ss a"
      );
      let amoutWithTwoDecimal = parseFloat(amount).toFixed(2);
      Alert.alert(
        "Transaction is Updated",
        "Date and Time: " +
          timestampToDateTime +
          " Amount: " +
          amoutWithTwoDecimal +
          " Category: " +
          selectedCategory +
          " Note: " +
          transactionNote,
        [{ text: "OK" }]
      );
      setSelectedDateTime(timestampToDateTime);
      setAmount(amoutWithTwoDecimal);

      //setCategory not sure yet, need to be confirmed once iterate with database
      setSelectedCategory(selectedCategory);
      setTransactionNote(transactionNote);
    }
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
                  style={{ width: 225 }}
                  date={selectedDateTime}
                  mode="datetime"
                  placeholder="select date and time"
                  format="DD/MM/YYYY, h:mm a"
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
                  // onDateChange={(date) => {
                  //   setSelectedDate(date);
                  // }}
                  onDateChange={handleOnDateChange}
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
                  placeholder="0.00"
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
              <Col size={4}>
                <PickerModal
                  onSelected={handleCategoryOnSelect}
                  items={transactionMode ? expenseList : incomeList}
                  sortingLanguage={"tr"}
                  showToTopButton={true}
                  selected={selectedCategory}
                  showAlphabeticalIndex={true}
                  autoGenerateAlphabeticalIndex={true}
                  selectPlaceholderText={"Select Category..."}
                  searchPlaceholderText={"Search..."}
                  requireSelection={false}
                  autoSort={false}
                />
              </Col>
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
                onChange={handleTransactionNoteOnChange}
                value={transactionNote}
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
                onPress={handleAddTransactionOnSubmit}
              >
                <Text style={[colors.white, texts.montserratRegular]}>
                  Update
                </Text>
              </Button>
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
