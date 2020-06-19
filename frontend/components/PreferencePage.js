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

export default function PreferencePage({ navigation }) {
  const [dailyReminder, setDailyReminder] = useState(true);

  const handleDailyReminderOnChange = () => {
    setDailyReminder(!dailyReminder);
  };
  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        {/* <Row
          style={[
            styleSheetMain.tertiaryButton,
            {
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 15,
              paddingRight: 12,
            },
          ]}
        >
          <Col size={6}>
            <Text style={[styleSheetMain.mediumText]}>Date Format</Text>
          </Col>
          <Col size={3} style={[styleSheetMain.rightContainer]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Text style={[colors.primary, texts.font_14]}>1 Jan 2020</Text>
            </TouchableOpacity>
          </Col>
          <Col size={1} style={[styleSheetMain.rightContainer]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Icon
                style={[colors.primary, texts.font_26]}
                type="AntDesign"
                name="right"
              />
            </TouchableOpacity>
          </Col>
        </Row> */}
        {/* <Row
          style={[
            styleSheetMain.tertiaryButton,
            {
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 15,
              paddingRight: 12,
            },
          ]}
        >
          <Col size={6}>
            <Text style={[styleSheetMain.mediumText]}>Currency Format</Text>
          </Col>
          <Col size={3} style={[styleSheetMain.rightContainer]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Text style={[colors.primary, texts.font_14]}>MYR</Text>
            </TouchableOpacity>
          </Col>
          <Col size={1} style={[styleSheetMain.rightContainer]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Icon
                style={[colors.primary, texts.font_26]}
                type="AntDesign"
                name="right"
              />
            </TouchableOpacity>
          </Col>
        </Row> */}
        <Row
          style={[
            styleSheetMain.tertiaryButton,
            {
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 15,
              paddingRight: 12,
            },
          ]}
        >
          <Col size={6}>
            <Text style={[styleSheetMain.mediumText]}>
              Daily Reminder of adding transaction
            </Text>
          </Col>
          <Col size={3} style={[styleSheetMain.rightContainer]}></Col>
          <Col size={1} style={[styleSheetMain.rightContainer]}>
            <Switch
              value={dailyReminder}
              onValueChange={handleDailyReminderOnChange}
            />
          </Col>
        </Row>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ backgroundColor: null, width: "100%" }}
            onPress={() => navigation.navigate("BudgetSettingPage")}
          >
            <Row
              style={[
                styleSheetMain.tertiaryButton,
                {
                  height: 50,
                  marginTop: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  paddingLeft: 15,
                  paddingRight: 12,
                },
              ]}
            >
              <Col size={6}>
                <Text style={[styleSheetMain.mediumText]}>
                  Set Monthly Budget
                </Text>
              </Col>
              <Col size={3} style={[styleSheetMain.rightContainer]}>
                <Text style={[colors.primary, texts.font_14]}>800</Text>
              </Col>
              <Col size={1} style={[styleSheetMain.rightContainer]}>
                <Icon
                  style={[colors.primary, texts.font_26]}
                  type="AntDesign"
                  name="right"
                />
              </Col>
            </Row>
          </TouchableOpacity>
        </View>
      </Grid>
    </Container>
  );
}
