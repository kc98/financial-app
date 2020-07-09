import React, { useState, useEffect, useGlobal } from "reactn";
import { Text, Container, Header, View, Button } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { widths } from "../styles/widths";
import { buttons } from "../styles/buttons";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import InsightsDateRow from "./InsightsDateRow";

import * as api from "../api";

export default function InsightsPage({ navigation }) {
  const [refresh, reload] = useGlobal("refresh");
  const [isLoading, setIsLoading] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(null);
  const [savingPlan, setSavingPlan] = useState(null);
  const [savingPlanPeriod, setSavingPlanPeriod] = useState([]);
  const [userData, setUserData] = useGlobal("userData");

  useEffect(() => {
    loadData();
  }, [refresh]);

  let savingPlanData;
  const loadData = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");

      let response = await api.getSavingPlan(token);
      let savingPlan = response.data;

      setSavingPlan(savingPlan);

      savingPlanData = savingPlan.map((row, index) => {
        if (row.day == moment().format("dddd").toLowerCase()) {
          setSavingPlanPeriod(row.period);
        }
      });

      await getUserInfo();
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

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      let response = await api.me(token);

      let userData = response.data;
      setUserData(userData);

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      try {
        await AsyncStorage.clear();
      } finally {
        return navigation.navigate("EntrancePage");
      }
    }
  };

  // const getTodaySavingPlan = () => {
  //   moment().format("dddd");

  // }
  // getTodaySavingPlan();

  const handleInsightsDetailOnPress = () => {
    return navigation.navigate("InsightsDetailPage");
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {isLoading ? (
            <View
              style={[
                {
                  height: "100%",
                  width: "100%",
                },
                alignments.center,
              ]}
            >
              <ActivityIndicator size="large" color="#3C9A46" />
            </View>
          ) : (
            <View>
              <Row
                style={[
                  {
                    height: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 40,
                  },
                ]}
              >
                <Col size={2}>
                  <Text style={[texts.montserratBold, texts.font_16]}>
                    Average Monthly Spending:
                  </Text>
                </Col>
                <Col size={1} style={styleSheetMain.rightContainer}>
                  <Text style={[texts.montserratRegular, texts.font_16]}>
                    MYR{" "}
                    {parseFloat(userData.monthly_average_spending).toFixed(2)}
                  </Text>
                </Col>
              </Row>
              <Row
                style={[
                  {
                    height: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                  },
                ]}
              >
                <Col size={2}>
                  <Text style={[texts.montserratBold, texts.font_16]}>
                    Your Budget Amount:
                  </Text>
                </Col>
                <Col size={1} style={styleSheetMain.rightContainer}>
                  <Text style={[texts.montserratRegular, texts.font_16]}>
                    MYR {parseFloat(userData.budget).toFixed(2)}
                  </Text>
                </Col>
              </Row>
              <Row
                style={[
                  {
                    height: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                  },
                ]}
              >
                <Col
                  size={3}
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={[texts.montserratBold, texts.font_15]}>
                    Past 12 weeks transactions details:
                  </Text>
                </Col>
                <Col size={1} style={styleSheetMain.centerContainer}>
                  <Button
                    style={[
                      buttons.primary,
                      alignments.center,
                      {
                        height: 35,
                        width: 85,
                        borderRadius: 12,
                      },
                    ]}
                    onPress={() => navigation.navigate("ReportTransaction")}
                  >
                    <Text style={[texts.montserratRegular, texts.font_16]}>
                      View
                    </Text>
                  </Button>
                </Col>
              </Row>
              <Row
                style={[
                  {
                    height: 35,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 30,
                  },
                ]}
              >
                <Text style={[texts.montserratBold, texts.font_15]}>
                  Saving Plan
                </Text>
              </Row>
              <Col
                style={[
                  colors.backgroundWhite,
                  { padding: 20, marginBottom: 20 },
                ]}
              >
                <InsightsDateRow
                  date={moment().format("DD MMM YYYY")}
                  week={moment().format("dddd")}
                  insightData={savingPlanPeriod}
                />
                <Col size={1}>
                  <Row>
                    <Button
                      style={[
                        buttons.primary,
                        alignments.center,
                        widths.width_40,
                        { height: 35, borderRadius: 12 },
                      ]}
                      onPress={handleInsightsDetailOnPress}
                    >
                      <Text
                        style={[
                          texts.montserratRegular,
                          texts.font_14,
                          colors.white,
                        ]}
                      >
                        View Details
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Col>
            </View>
          )}
        </ScrollView>
      </Grid>
    </Container>
  );
}
