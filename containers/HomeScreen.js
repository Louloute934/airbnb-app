import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" color='"#00ff00"' />
  ) : (
    <SafeAreaView style={styles.homepage}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", { userId: item._id });
                }}
              >
                <View style={styles.unit}>
                  <View style={styles.photodiv}>
                    <Image
                      source={{ uri: item.photos[0].url }}
                      style={styles.img}
                    ></Image>
                    <Text style={styles.price}>{item.price} €</Text>
                  </View>

                  <View style={styles.desc}>
                    <View>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.title}
                      </Text>

                      <View style={styles.rating}>
                        {item.ratingValue === 5 ? (
                          <Image
                            style={styles.stars}
                            source={require("../assets/5stars.png")}
                          ></Image>
                        ) : (
                          <Image
                            style={styles.stars}
                            source={require("../assets/4stars.png")}
                          ></Image>
                        )}
                        <Text>{item.reviews} reviews</Text>
                      </View>
                    </View>

                    <Image
                      style={styles.userImage}
                      source={{ uri: `${item.user.account.photo.url}` }}
                    ></Image>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    backgroundColor: "white",

    alignItems: "center",
  },
  stars: {
    width: 80,
    height: 20,
    backgroundColor: "white",
    marginVertical: 20,
  },
  unit: {
    width: 350,
    height: 250,
    marginHorizontal: 15,
    marginVertical: 30,
  },
  photodiv: {
    width: "100%",
    position: "relative",
    marginVertical: 10,
  },
  price: {
    position: "absolute",
    backgroundColor: "black",
    color: "white",
    bottom: 10,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  img: {
    height: 180,
    width: "100 %",
  },
  desc: {
    marginVertical: 10,
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#E3E0D5",
    borderBottomWidth: 1,
  },
  title: { fontSize: 18, fontWeight: "bold", width: 270 },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
