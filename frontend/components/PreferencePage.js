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
import { Col, Row, Grid } from "react-native-easy-grid";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function PreferencePage() {
  return (
    <Container>
      <Header transparent />
      <Grid>
        <Row
          style={[styleSheetMain.tertiaryButton, { height: 50, margin: 20 }]}
        >
          <Text style={styleSheetMain.mediumText}>This is preference page</Text>
        </Row>
        <Row
          style={[styleSheetMain.tertiaryButton, { height: 50, margin: 20 }]}
        >
          <Text style={styleSheetMain.mediumText}>This is preference page</Text>
        </Row>
        <Row
          style={[styleSheetMain.tertiaryButton, { height: 50, margin: 20 }]}
        >
          <Text style={styleSheetMain.mediumText}>This is preference page</Text>
        </Row>
        <Row
          style={[styleSheetMain.tertiaryButton, { height: 50, margin: 20 }]}
        >
          <Text style={styleSheetMain.mediumText}>This is preference page</Text>
        </Row>
      </Grid>
    </Container>
  );
}
