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
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
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

export default function InsightsDetailPage() {
  const [refresh, reload] = useGlobal("refresh");
  const [isLoading, setIsLoading] = useState(false);
  const [savingPlan, setSavingPlan] = useState(null);
  const [dataRow, setDataRow] = useState();

  let currentDateMonthYear = moment().format("DD MMM YYYY");
  let nextWeek = moment().add(6, "day").format("DD MMM YYYY");
  let dummyDataDays = [0, 1, 2, 3, 4, 5, 6];

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
            <InsightsDateRow
              key={index}
              date={moment().add(index, "day").format("DD MMM YYYY")}
              week={row.day.charAt(0).toUpperCase() + row.day.slice(1)}
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
              <ActivityIndicator size="large" color="#3C9A46" />
            </View>
          ) : (
            <View>
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
                  Saving Plan ({currentDateMonthYear} - {nextWeek})
                </Text>
              </Row>
              <Col
                style={[
                  colors.backgroundWhite,
                  { padding: 20, marginBottom: 20 },
                ]}
              >
                {dataRow}
              </Col>
            </View>
          )}
        </ScrollView>
      </Grid>
    </Container>
  );
}
