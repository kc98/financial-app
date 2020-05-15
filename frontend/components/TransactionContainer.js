import React, { useState } from "react";
import { Text, View } from "native-base";
import { Image } from "react-native";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import { Col, Row, Grid } from "react-native-easy-grid";

import selectImg from "../img/ImgSelector";

export default function TransactionContainer(props) {
  // let transactionImage = "('../img/" + props.transactionCategory + ".png')";
  // let transactionImage = `../img/${props.transactionCategory}.png`;
  let transactionImage = `../img/movie.png`;
  let testVar = require(`../img/movie.png`);
  console.log(typeof testVar, testVar);
  console.log(typeof transactionImage);
  console.log(transactionImage);

  let x = props.transactionCategory;
  return (
    <Col style={[styleSheetMain.transactionListContainer, { marginTop: 40 }]}>
      <Row
        style={{
          marginLeft: 5,
          height: 70,
          alignItems: "center",
        }}
      >
        <Col style={{ width: 45, height: 40, justifyContent: "center" }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 32, textAlign: "center" }}
          >
            {props.date}
          </Text>
        </Col>
        <Col style={{ width: 100, height: 40 }}>
          <Row>
            <Text style={{ fontSize: 14 }}>{props.dayOfWeek}</Text>
          </Row>
          <Row>
            <Text style={{ fontSize: 14 }}>{props.monthYear}</Text>
          </Row>
        </Col>
        <Col
          style={[
            styleSheetMain.rightContainer,
            { height: 40, marginRight: 10 },
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>- 42.10</Text>
        </Col>
      </Row>

      <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
        <Col style={{ width: 65 }}>
          <View style={styleSheetMain.transactionCatrgoryImage}>
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={require("../img/" + "movie.png")}
            />
          </View>
        </Col>

        <Col>
          <Row>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Grocery</Text>
          </Row>
          <Row>
            <Text style={{ fontSize: 14 }}>Apples, carrots, and tomatoes</Text>
          </Row>
        </Col>
        <Col style={[alignments.centerRight, { marginRight: 10 }]}>
          <Text style={[{ fontSize: 18, fontWeight: "bold" }, colors.red]}>
            12.10
          </Text>
        </Col>
      </Row>
      <Row></Row>
    </Col>
  );
}
