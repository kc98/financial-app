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

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function AddTransactionPage() {
  const [transactionMode, setTransactionMode] = useState(true);
  function switchTransactionMode() {
    setTransactionMode(!transactionMode);
  }

  return (
    <Container>
      <Header transparent />
      <Segment>
        <Button
          first
          active={transactionMode}
          onPress={() => {
            !transactionMode ? switchTransactionMode() : "";
          }}
        >
          <Text>Expense</Text>
        </Button>
        <Button
          last
          active={!transactionMode}
          onPress={() => {
            transactionMode ? switchTransactionMode() : "";
          }}
        >
          <Text>Income</Text>
        </Button>
      </Segment>
      <Content>
        <Text>
          This is add transaction {transactionMode ? "expense" : "income"} page
        </Text>
      </Content>
    </Container>
  );
}
