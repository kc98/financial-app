import React, { useState, useEffect, useGlobal } from "reactn";
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

import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { texts } from "../styles/texts";
import { alignments } from "../styles/alignments";
import { colors } from "../styles/colors";
import ReportTransactionList from "./ReportTransactionList";
import * as api from "../api";

export default function ReportAnalyse({ navigation }) {
  const [refresh, reload] = useGlobal("refresh");
  const [isLoading, setIsLoading] = useState(false);
  const [savingPlan, setSavingPlan] = useState(null);
  const [dataRow, setDataRow] = useState();

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
      // console.log(savingPlan);
      // savingPlan.map((row, index) => {
      //   if (row.day == moment().format("dddd").toLowerCase()) {
      //     console.log("HIT");
      //     setSavingPlanPeriod(row.period);
      //     // console.log(savingPlanPeriod);
      //   }
      // });

      setDataRow(
        savingPlan.map((row, index) => {
          return (
            <ReportTransactionList
              key={index}
              day={row.day.charAt(0).toUpperCase() + row.day.slice(1)}
              insightData={row.period}
            />
          );
        })
      );

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
              <ActivityIndicator
                // style={alignments.center}
                size="large"
                color="#3C9A46"
              />
            </View>
          ) : (
            <View>
              <Col
                style={[
                  colors.backgroundWhite,
                  { padding: 10, marginBottom: 30, marginTop: 30 },
                ]}
              >
                <Row
                  style={{
                    height: 30,
                    width: "100%",
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,

                    alignItems: "center",
                  }}
                >
                  <Text style={[texts.montserratBold, texts.font_16]}>
                    Transaction Insight in 12 Weeks
                  </Text>
                </Row>
                {dataRow}
              </Col>
            </View>
          )}
          {/* 
          
          Show:
          - average every morning to night spending in the day of week
          - average of category spending
           */}
        </ScrollView>
      </Grid>
    </Container>
  );
}
