import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

function Logo() {
  return (
    <View style={styles.view}>
      <Image source={require("../assets/logo.png")} style={styles.img}></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  img: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  view: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Logo;
