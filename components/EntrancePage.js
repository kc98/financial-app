import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { Container, Header, Content, View, Button, Text } from "native-base";

import logoImg from "../img/logo.png";

export default function EntrancePage() {
  return (
    <Container>
      <Header transparent />
      <Content padder scrollEnabled={false}>
        <View>
          <View style={{ border: "solid pink 3px" }}>
            <AutoHeightImage
              style={styles.logo}
              width={300}
              source={require("../img/logo.png")}
              fallbackSource={logoImg}
            />
          </View>
          <Button style={[styles.primaryButton, styles.Button]}>
            <Text style={styles.primaryFontAndColor}>Log In</Text>
          </Button>
          <Button style={[styles.secondaryButton, styles.Button]}>
            <Text style={styles.secondaryFontAndColor}>Sign Up</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  entrance: {
    flex: 1,
    justifyContent: "center",
  },
  Button: {
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  primaryButton: {
    backgroundColor: "#46C553",
    marginTop: 70,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 2.2,
    borderColor: "#46C553",
    borderRadius: 25,
    marginTop: 40,
  },
  primaryFontAndColor: {
    fontFamily: "Montserrat_Bold",
    color: "#fff",
    fontSize: 18,
  },
  secondaryFontAndColor: {
    fontFamily: "Montserrat_Bold",
    color: "black",
    fontSize: 18,
  },
  primaryFontFamily: {
    fontFamily: "Montserrat_Bold",
  },
  logo: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 110,
    marginBottom: 100,
  },
});
