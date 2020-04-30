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
} from "native-base";

import { StyleSheet, Image, Dimensions, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function TransactionList({ navigation }) {
  return (
    <Container>
      <Header transparent>
        <Left>
          <GoToButton type="goBack" />
        </Left>
        <Body>
          <Title style={colors.black}>Transactions</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>asd</Text>
      </Content>
    </Container>
  );
}
