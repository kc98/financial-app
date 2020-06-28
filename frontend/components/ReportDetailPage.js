import React, { useState, useEffect } from "react";
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

import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import TransactionReportList from "./TransactionReportList";
import TransactionDataRow from "./TransactionDataRow";

import * as api from "../api";

export default function ReportDetailPage(props) {
  const categoryName = props.route.params.transactionId;
  const month = props.route.params.month;
  const year = props.route.params.year;

  const [transactionData, setTransactionData] = useState([]);
  const [categoryTransactionData, setCategoryTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryType, setCategoryType] = useState(null);

  let defaultCategory;

  var i;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      let response = await api.getTransactionList(token, month, year);

      let transactionData = response.data.transactions.sort(
        (a, b) =>
          moment(b.timestamp).format("YYYYMMDD") -
          moment(a.timestamp).format("YYYYMMDD")
      );
      setTransactionData(transactionData);

      let categoryTransactionData = [];
      let categoryType;
      for (i = 0; i < transactionData.length; i++) {
        if (transactionData[i].category == categoryName) {
          categoryTransactionData.push(transactionData[i]);
          categoryType = transactionData[i].type;
        }
      }
      setCategoryTransactionData(categoryTransactionData);
      setCategoryType(categoryType);
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
            <TransactionDataRow
              title={categoryName}
              type={categoryType}
              transactionData={categoryTransactionData}
              categoryCombine={false}
              navigateTo={"TransactionDetailPage"}
              directTo={"transactionId"}
            />
          )}
        </ScrollView>
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({});
