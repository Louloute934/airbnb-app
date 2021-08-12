import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const axios = require("axios");

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [missingInfo, setMissingInfo] = useState(false);
  const [data, setData] = useState();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.signInPage}>
        <View style={styles.signIn}>
          <View style={styles.logodiv}>
            <Image style={styles.img} source={require("../assets/logo.png")} />
            <Text style={styles.logotxt}>Sign in</Text>
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          {missingInfo && (
            <View style={styles.response}>
              <Text style={styles.responsetext}>Please Fill All Fields</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.signInButton}
            title="Sign in"
            onPress={async () => {
              try {
                if (password && email) {
                  const res = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    { email: email, password: password }
                  );
                  setMissingInfo(false);
                  console.log(res.data);
                  setData(res.data);
                  const userToken = res.data.token;
                  setToken(userToken);
                  // const userToken = res.data.token;
                  // setToken(userToken);
                } else {
                  setMissingInfo(true);
                }
              } catch (error) {
                console.log(error.response.data.error);
              }
            }}
          >
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.link}>No account? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  signInPage: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  signIn: {
    alignItems: "center",
    marginVertical: 60,
    width: 200,
    height: 800,
  },
  signInButton: {
    borderColor: "#F9585D",
    borderWidth: 2,
    width: 160,
    height: 60,

    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  logodiv: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  logotxt: {
    fontSize: 22,
    color: "#717171",
  },
  inputSection: {
    marginVertical: 40,
    width: 160,
  },
  input: {
    backgroundColor: "#FFFFFF",
    height: 30,
    borderBottomColor: "#FFBBC0",
    borderBottomWidth: 1,
  },
  btnText: {
    color: "#757575",
    fontSize: 18,
  },
  img: {
    backgroundColor: "white",
    height: 140,
    width: 140,
    resizeMode: "contain",
    marginVertical: 40,
  },
  link: {
    color: "#999999",
    marginVertical: 20,
  },
  response: {
    height: 60,
    width: 140,
  },
  responsetext: {
    color: "red",
    fontSize: 14,
  },
});
