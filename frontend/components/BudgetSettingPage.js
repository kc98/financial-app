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
  Switch,
} from "native-base";

import {
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function BudgetSettingPage() {
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
          <Col size={3} style={[styleSheetMain.rightContainer]}>
            <Input
              style={[
                styleSheetMain.labelBlack,

                texts.font_14,
                {
                  color: "#4EAE58",
                  borderBottomWidth: 1,
                  borderBottomColor: "#4EAE58",
                },
              ]}
              // onChange={handleTransactionNoteOnChange}
              value={"800"}
            />
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}
