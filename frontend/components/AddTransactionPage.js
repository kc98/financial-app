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

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

export default function AddTransactionPage() {
  const [transactionMode, setTransactionMode] = useState(true);
  function switchTransactionMode() {
    setTransactionMode(!transactionMode);
  }

  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <View
          style={[colors.backgroundWhite, widths.width_100, { marginTop: 25 }]}
        >
          <Row
            style={[
              widths.width_100,
              alignments.center,
              { height: 45, marginBottom: 40 },
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
          <Row>
            <Text>
              This is add transaction {transactionMode ? "expense" : "income"}{" "}
              page
            </Text>
          </Row>
        </View>
      </Grid>
    </Container>
  );
}
