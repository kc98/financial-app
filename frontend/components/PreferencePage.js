import React, { useState, useEffect, useGlobal } from "reactn";
import { Text, Container, Header, View, Icon, Switch } from "native-base";

import { TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from "@react-native-community/async-storage";

import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";

import * as api from "../api";

export default function PreferencePage({ navigation }) {
  const [refresh, reload] = useGlobal("refresh");
  const [dailyReminder, setDailyReminder] = useState(true);
  const [budgetData, setBudgetData] = useGlobal("budget");
  const [isLoading, setIsLoading] = useState(false);
  const handleDailyReminderOnChange = () => {
    setDailyReminder(!dailyReminder);
  };

  useEffect(() => {
    loadData();
  }, [refresh, budgetData]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");

      let response = await api.getBudget(token);

      let budgetData = response.data.budget;

      setBudgetData(budgetData);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status == 401) {
        await AsyncStorage.clear();
        return navigation.navigate("EntrancePage");
      } else {
        // Unhandled errors
        console.log(error.response);
      }
    }
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
                <Text style={[colors.primary, texts.font_14]}>
                  {budgetData > 0
                    ? parseFloat(budgetData).toFixed(2)
                    : "Not Set"}
                </Text>
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
