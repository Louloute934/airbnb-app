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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [missingInfo, setMissingInfo] = useState(false);
  const [error, setError] = useState("");

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <View style={styles.signUpPage}>
          <View style={styles.signUp}>
            <View style={styles.logodiv}>
              <Image
                style={styles.img}
                source={require("../assets/logo.png")}
              />
              <Text style={styles.logotxt}>Sign up</Text>
            </View>
            <View style={styles.inputSection}>
              <TextInput
                placeholder="email"
                style={styles.input}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />

              <TextInput
                placeholder="username"
                style={styles.input}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              ></TextInput>
              <TextInput
                style={styles.textArea}
                multiline={true}
                textAlignVertical="top"
                placeholder="Describe yourself in a few words..."
                onChangeText={(text) => {
                  setDescription(text);
                }}
              ></TextInput>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              ></TextInput>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
              ></TextInput>
            </View>
            <View style={styles.response}>
              <Text style={styles.responsetext}>{error}</Text>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              title="Sign up"
              onPress={async () => {
                if (
                  password &&
                  email &&
                  username &&
                  confirmPassword &&
                  description
                ) {
                  if (password === confirmPassword) {
                    try {
                      const res = await axios.post(
                        "https://express-airbnb-api.herokuapp.com/user/sign_up",
                        {
                          email: email,
                          username: username,
                          description: description,
                          password: password,
                        }
                      );
                      console.log(res.data);
                      setError("");
                      const userToken = res.data.token;
                      setToken(userToken);
                    } catch (error) {
                      if (
                        error.response.data.error ===
                          "This username already has an account." ||
                        error.response.data.error ===
                          "This email already has an account."
                      ) {
                        setError(error.response.data.error);
                      } else {
                        setError("An Error Occured");
                      }
                    }
                  } else {
                    setError("Passwords must be the same");
                  }
                } else {
                  setError("Missing informations");
                }
              }}
            >
              <Text>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.link}>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  signUpPage: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  signUp: {
    alignItems: "center",
    marginVertical: 60,
    width: 220,
    height: 800,
  },
  img: {
    backgroundColor: "white",
    height: 140,
    width: 140,
    resizeMode: "contain",
    marginVertical: 40,
  },
  logotxt: {
    fontSize: 22,
    color: "#717171",
  },
  logodiv: {
    alignItems: "center",
    marginVertical: 30,
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
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    borderWidth: 1,
    borderColor: "#FFBBC0",
    marginBottom: 10,
  },
  signUpButton: {
    borderColor: "#F9585D",
    borderWidth: 2,
    width: 160,
    height: 50,

    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  link: {
    color: "#999999",
    marginVertical: 20,
  },
  response: {
    height: 60,
    width: 160,
  },
  responsetext: {
    color: "red",
    fontSize: 14,
  },
});
