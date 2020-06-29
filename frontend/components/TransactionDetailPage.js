import React, { useState, useEffect, useGlobal } from "reactn";
import {
  Text,
  Container,
  Header,
  View,
  Input,
  Label,
  Button,
  Segment,
} from "native-base";

import { StyleSheet, Alert, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import DatePicker from "react-native-datepicker";
import PickerModal from "react-native-picker-modal-view";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { buttons } from "../styles/buttons";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

import * as api from "../api";
import { exp } from "react-native-reanimated";

export default function TransactionDetailPage(props) {
  const navigation = useNavigation();

  const currentDateTime = new Date();
  const transactionId = props.route.params.transactionId;

  const [transactionMode, setTransactionMode] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [transactionNote, setTransactionNote] = useState(null);
  const [amount, setAmount] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryLoading, setCategoryIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [refresh, reload] = useGlobal("refresh");

  let defaultCategory;

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      let token = await AsyncStorage.getItem("token");

      let response = await api.getTransaction(token, transactionId);
      let transactionData = response.data;
      setTransactionData(transactionData);
      setSelectedDateTime(
        moment(transactionData.timestamp).format("DD/MM/YYYY, h:mm a")
      );

      defaultCategory = { Name: transactionData.category };
      setSelectedCategory(defaultCategory);
      setTransactionNote(transactionData.description);
      setAmount(parseFloat(transactionData.amount).toFixed(2));

      if (transactionData.type != "expense") {
        setTransactionMode(false);
      } else {
        setTransactionMode(true);
      }

      await loadCategoryData();

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
  let dateTime = moment(transactionData.timestamp).format("DD/MM/YYYY, h:mm a");

  const loadCategoryData = async () => {
    if (!isLoading) {
      try {
        setCategoryIsLoading(true);
        let response = await api.getCategoryList();
        let categoryData = response.data;
        setCategoryData(categoryData);

        let expenseArray = [];
        let incomeArray = [];

        for (let i = 0; i < categoryData.length; i++) {
          if (categoryData[i].category == transactionData.category) {
            setSelectedCategoryId(categoryData[i].id);
          }
          if (categoryData[i].transaction_type_id == 2) {
            expenseArray.push({
              Id: categoryData[i].id,
              Name: categoryData[i].category,
            });
          } else {
            incomeArray.push({
              Id: categoryData[i].id,
              Name: categoryData[i].category,
            });
          }
        }

        setExpenseList(expenseArray);
        setIncomeList(incomeArray);

        setCategoryIsLoading(false);
      } catch (error) {
        // Unhandled errors
        console.log(error.response);
      }
    }
  };

  function switchTransactionMode() {
    setTransactionMode(!transactionMode);
  }

  const handleOnDateChange = (datetime) => {
    let timestamp = new Date().getTime();
    setSelectedDateTime(datetime);
  };

  const handleAmountOnChange = (event) => {
    let inputAmount = event.nativeEvent.text;
    setAmount(inputAmount);
  };

  const handleCategoryOnSelect = (event) => {
    let inputCategory = event.Name;
    let inputCategoryId = event.Id;
    setSelectedCategory(inputCategory);
    setSelectedCategoryId(inputCategoryId);
  };

  const handleTransactionNoteOnChange = (event) => {
    let inputTransactionNote = event.nativeEvent.text;
    setTransactionNote(inputTransactionNote);
  };

  const handleUpdateTransactionOnSubmit = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let response = await api.updateTransaction(
        token,
        transactionId,
        transactionNote,
        parseFloat(amount).toFixed(2),
        selectedCategoryId,
        moment(selectedDateTime, "DD/MM/YYYY, h:mm a").utc().format()
      );
      reload(!refresh);

      Alert.alert(
        "Transaction is Updated",
        "Your transaction is updated successfully!",
        [{ text: "OK" }]
      );
    } catch (error) {
      if (error.response) {
        // network errors
        if (error.response.status == 422) {
          let errorString = "";
          for (let errorType of Object.values(error.response.data)) {
            for (let error of errorType) {
              errorString += `- ${error}\n`;
            }
          }

          errorString = errorString.trim();
          Alert.alert("Input error", errorString, [{ text: "OK" }]);
        } else if (error.response.status == 401) {
          await AsyncStorage.clear();
          return navigation.navigate("EntrancePage");
        } else {
          Alert.alert("Contact developer", "Network error", [{ text: "OK" }]);
        }
      } else {
        // Unhandled
        setErrorMessage("Contact developer");
        console.log(error);
        Alert.alert("Error", errorMessage, [{ text: "OK" }]);
      }

      return;
    }
  };

  const handleDeleteTransactionOnSubmit = () => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure to delete this transaction?",
      [{ text: "No" }, { text: "Yes", onPress: deleteTransactionRecord }]
    );
  };

  const deleteTransactionRecord = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let response = await api.deleteTransaction(token, transactionId);
      reload(!refresh);

      Alert.alert(
        "Your Transaction is Removed",
        "Your transaction has been deleted successfully!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      if (error.response) {
        // network errors
        if (error.response.status == 401) {
          await AsyncStorage.clear();
          return navigation.navigate("EntrancePage");
        } else {
          console.log(error.response.data);
          Alert.alert("Contact developer", "Network error", [{ text: "OK" }]);
        }
      } else {
        // Unhandled
        setErrorMessage("Contact developer");
        console.log(error);
        Alert.alert("Error", errorMessage, [{ text: "OK" }]);
      }
      // return;
    }
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        {isLoading && isCategoryLoading ? (
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
          <View
            style={[
              colors.backgroundWhite,
              widths.width_100,
              { marginTop: 40, marginBottom: 35 },
            ]}
          >
            <Row
              style={[
                widths.width_100,
                alignments.center,
                { height: 45, marginBottom: 50 },
              ]}
            >
              <Segment style={[colors.backgroundWhite, { marginTop: 40 }]}>
                <Button
                  first
                  style={{
                    backgroundColor: transactionMode ? "#46C553" : "#fff",
                    borderColor: "#98ab9a",
                    padding: 10,
                  }}
                  active={transactionMode}
                  onPress={() => {
                    !transactionMode ? switchTransactionMode() : "";
                  }}
                >
                  <Text
                    style={{
                      color: transactionMode ? "#fff" : "#000",
                      fontWeight: transactionMode ? "bold" : "normal",
                    }}
                  >
                    Expense
                  </Text>
                </Button>
                <Button
                  last
                  style={{
                    backgroundColor: transactionMode ? "#fff" : "#46C553",
                    borderColor: "#98ab9a",
                    padding: 10,
                  }}
                  active={!transactionMode}
                  onPress={() => {
                    transactionMode ? switchTransactionMode() : "";
                  }}
                >
                  <Text
                    style={{
                      color: transactionMode ? "#000" : "#fff",
                      fontWeight: transactionMode ? "normal" : "bold",
                    }}
                  >
                    Income
                  </Text>
                </Button>
              </Segment>
            </Row>
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
              <Row style={[styles.transactionInputRow]}>
                <Col size={1}>
                  <Label style={[texts.montserratRegular, texts.font_16]}>
                    Date:
                  </Label>
                </Col>
                <Col size={2}>
                  <DatePicker
                    style={{ width: 225 }}
                    date={selectedDateTime}
                    mode="datetime"
                    placeholder="select date and time"
                    format="DD/MM/YYYY, h:mm a"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: { marginLeft: 36 },
                    }}
                    // onDateChange={(date) => {
                    //   setSelectedDate(date);
                    // }}
                    onDateChange={handleOnDateChange}
                  />
                </Col>
              </Row>
              <Row style={[styles.transactionInputRow]}>
                <Col size={2}>
                  <Label style={[texts.montserratRegular, texts.font_16]}>
                    Amount:
                  </Label>
                </Col>
                <Col size={1}>
                  <Label style={[texts.montserratRegular, texts.font_16]}>
                    MYR
                  </Label>
                </Col>
                <Col size={3} style={{ height: 30 }}>
                  <Input
                    type
                    placeholder="0.00"
                    returnKeyType="done"
                    style={[
                      styleSheetMain.labelBlack,
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: "#4EAE58",
                      },
                    ]}
                    keyboardType="numeric"
                    onChange={handleAmountOnChange}
                    value={amount}
                  />
                </Col>
              </Row>
              <Row style={[styles.transactionInputRow]}>
                <Col size={2}>
                  <Label style={[texts.montserratRegular, texts.font_16]}>
                    Category:
                  </Label>
                </Col>
                <Col size={4}>
                  <PickerModal
                    onSelected={handleCategoryOnSelect}
                    items={transactionMode ? expenseList : incomeList} // Original -> expenseArray : incomeArray
                    sortingLanguage={"us"}
                    showToTopButton={true}
                    selected={selectedCategory}
                    showAlphabeticalIndex={true}
                    autoGenerateAlphabeticalIndex={true}
                    selectPlaceholderText={"Select Category..."}
                    searchPlaceholderText={"Search..."}
                    requireSelection={false}
                    autoSort={false}
                  />
                </Col>
              </Row>
              <Row style={[styles.transactionInputRow, { height: 45 }]}>
                <Col size={2}>
                  <Label style={[texts.montserratRegular, texts.font_16]}>
                    Note:
                  </Label>
                </Col>
              </Row>
              <Row
                style={[
                  {
                    paddingLeft: 45,
                    paddingRight: 40,
                    marginBottom: 20,
                    height: 75,
                  },
                ]}
              >
                <Input
                  style={[
                    styleSheetMain.labelBlack,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#4EAE58",
                    },
                  ]}
                  multiline={true}
                  onChange={handleTransactionNoteOnChange}
                  value={transactionNote}
                />
              </Row>
              <Row
                style={[
                  styles.transactionInputRow,
                  widths.width_100,
                  alignments.center,
                  { height: 85 },
                ]}
              >
                <Button
                  style={[
                    styleSheetMain.primaryButton,
                    buttons.radius_18,
                    { marginTop: 30 },
                  ]}
                  onPress={handleUpdateTransactionOnSubmit}
                >
                  <Text style={[colors.white, texts.montserratRegular]}>
                    Update
                  </Text>
                </Button>
              </Row>
              <Row
                style={[
                  widths.width_100,
                  alignments.center,
                  {
                    paddingLeft: 45,
                    paddingRight: 40,

                    alignItems: "center",
                    height: 85,
                  },
                ]}
              >
                <Button
                  style={[
                    styleSheetMain.secondaryButton,
                    buttons.radius_18,
                    { marginTop: 30, borderWidth: 1, marginBottom: 20 },
                  ]}
                  onPress={handleDeleteTransactionOnSubmit}
                >
                  <Text style={[colors.black, texts.montserratRegular]}>
                    Delete
                  </Text>
                </Button>
              </Row>
            </KeyboardAwareScrollView>
          </View>
        )}
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({
  transactionInputRow: {
    paddingLeft: 45,
    paddingRight: 40,
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#98AB9A",
  },
});
