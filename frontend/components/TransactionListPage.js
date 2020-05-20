import React, { useState } from "react";
import {
  Text,
  Container,
  Header,
  Content,
  Picker,
  View,
  Icon,
  Button,
} from "native-base";
import {
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import TransactionContainer from "./TransactionContainer";

export default function TransactionList() {
  const initDate = new Date();
  const [date, setDate] = useState(
    new Date(initDate.getFullYear(), initDate.getMonth())
  );
  const [temp, setTemp] = useState("Wallet");
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function MonthPicker() {
    const startDate = new Date(date.getFullYear() - 1, date.getMonth() + 1);
    const endDate = new Date(date.getFullYear() + 1, date.getMonth() + 1);
    let allowedDates = [];

    for (let i = startDate; i <= endDate; i.setMonth(i.getMonth() + 1)) {
      allowedDates.push(i);
    }
    console.log(allowedDates);

    return (
      <Picker
        note
        mode="dialog"
        selectedValue={`${month[date.getMonth()]} ${date.getFullYear()}`}
        onValueChange={handleMonthPickerOnValueChange}
      >
        {allowedDates.map((allowedDate) => (
          <Picker.Item
            key={`${
              month[allowedDate.getMonth()]
            } ${allowedDate.getFullYear()}`}
            label={`${
              month[allowedDate.getMonth()]
            } ${allowedDate.getFullYear()}`}
            value={`${
              month[allowedDate.getMonth()]
            } ${allowedDate.getFullYear()}`}
          />
        ))}
      </Picker>
    );
  }

  function handleMonthPickerOnValueChange(value) {
    setDate(new Date(value));
    console.log(date);
  }

  console.log(
    `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
  );
  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        {/* MonthPicker is popping out red error, so commented for now */}
        {/* <MonthPicker /> */}
        <Row style={[styleSheetMain.selectMonthYearContainer]}>
          <Col size={1}></Col>
          <Col size={1} style={[alignments.center]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Text style={[styleSheetMain.selectedMothYearText]}>
                May 2020
              </Text>
            </TouchableOpacity>
          </Col>
          <Col size={1} style={[alignments.centerRight]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Icon
                style={styleSheetMain.dropdownIcon}
                type="AntDesign"
                name="caretdown"
              />
            </TouchableOpacity>
          </Col>
        </Row>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 120 }}>
            <Row
              style={[
                styleSheetMain.totalTransactionsContainer,
                { marginTop: 20 },
              ]}
            >
              <Col>
                <Text style={{ fontSize: 15 }}>Total Expenses:</Text>
              </Col>
              <Col style={[styleSheetMain.rightContainer, { marginRight: 10 }]}>
                <Text style={{ fontSize: 15 }}>- RM </Text>

                <Text style={{ fontSize: 15 }}>XXX.XX</Text>
              </Col>
            </Row>
            <Row
              style={[
                styleSheetMain.totalTransactionsContainer,
                { marginTop: 10 },
              ]}
            >
              <Col>
                <Text style={{ fontSize: 15 }}>Total Income:</Text>
              </Col>
              <Col style={[styleSheetMain.rightContainer, { marginRight: 10 }]}>
                <Text style={{ fontSize: 15 }}>+ RM </Text>
                <Text style={{ fontSize: 15 }}>XXXX.XX</Text>
              </Col>
            </Row>
            <Row
              style={{
                height: 25,
                marginLeft: 20,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Col></Col>
              <Col
                style={[
                  styleSheetMain.rightContainer,
                  {
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    alignItems: "center",
                    height: 35,
                    marginTop: 5,
                  },
                ]}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>RM </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  XXXX.XX
                </Text>
              </Col>
            </Row>
          </View>
          <Col
            style={[styleSheetMain.transactionListContainer, { marginTop: 40 }]}
          >
            <Row
              style={{
                marginLeft: 10,
                height: 70,
                alignItems: "center",
              }}
            >
              <Col style={{ width: 45, height: 40, justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 32 }}>11</Text>
              </Col>
              <Col style={{ width: 100, height: 40 }}>
                <Row>
                  <Text style={{ fontSize: 14 }}>Monday</Text>
                </Row>
                <Row>
                  <Text style={{ fontSize: 14 }}>May 2020</Text>
                </Row>
              </Col>
              <Col
                style={[
                  styleSheetMain.rightContainer,
                  { height: 40, marginRight: 10 },
                ]}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  - 42.10
                </Text>
              </Col>
            </Row>
            <Row style={{ paddingLeft: 10, marginBottom: 20 }}>
              <Col>
                <Row>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Grocery
                  </Text>
                </Row>
                <Row>
                  <Text style={{ fontSize: 14 }}>
                    Apples, carrots, and tomatoes
                  </Text>
                </Row>
              </Col>
              <Col style={[alignments.centerRight, { marginRight: 10 }]}>
                <Text
                  style={[{ fontSize: 18, fontWeight: "bold" }, colors.red]}
                >
                  12.10
                </Text>
              </Col>
            </Row>
            <Row style={{ paddingLeft: 10, marginBottom: 20 }}>
              <Col>
                <Row>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Movie
                  </Text>
                </Row>
                <Row>
                  <Text style={{ fontSize: 14 }}>Mr.Bean</Text>
                </Row>
              </Col>
              <Col style={[alignments.centerRight, { marginRight: 10 }]}>
                <Text
                  style={[{ fontSize: 18, fontWeight: "bold" }, colors.red]}
                >
                  30.00
                </Text>
              </Col>
            </Row>
          </Col>
          <TransactionContainer
            date="10"
            dayOfWeek="Sunday"
            monthYear="May 2020"
            transactionType="expense"
            transactionCategory="movie"
          />
          <TransactionContainer
            date="9"
            dayOfWeek="Sunday"
            monthYear="May 2020"
            transactionType="expense"
            transactionCategory="fuel"
          />
        </ScrollView>
      </Grid>
    </Container>
  );
}
