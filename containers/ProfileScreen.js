import React from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { SwiperFlatList } from "react-native-swiper-flatlist";

export default function ProfileScreen() {
  const { params } = useRoute();
  const [data, setData] = useState();
  const [photos, setPhotos] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.userId}`
        );
        setData(response.data);

        setPhotos(response.data.photos);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <SwiperFlatList
            data={photos}
            renderItem={({ item }) => {
              return (
                <View style={styles.child}>
                  <Image style={styles.img} source={{ uri: item.url }} />
                </View>
              );
            }}
          />
        </View>
        <View style={styles.pres}>
          <Text style={styles.title}>{data.title}</Text>
          <Image></Image>
          <Image></Image>
        </View>
        ;
      </ScrollView>
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("window").width;
const styles = StyleSheet.create({
  img: {
    width: 420,
    height: 200,
    resizeMode: "cover",
  },
  child: {
    height: 200,
    width: 420,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    width,
  },
  flat: {
    width,
    height: 500,
  },
  pres: {
    width,
    height: 150,
    marginVertical: 15,
    marginHorizontal: 15,
    height: 100,
    borderColor: "black",
    borderWidth: 5,
  },
  title: {
    fontSize: 16,

    color: "black",
  },
});
