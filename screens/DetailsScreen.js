import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
  
const Details = ({route, navigation}) => {
  const [note, setNote] = useState([]);
  const { noteId } = route.params;
  useEffect(() => {
    const getDetail = async () => {
      const req = await fetch(`https://jsonplaceholder.typicode.com/posts/${noteId}`);
      const res = await req.json();
      setNote(res);
    }
    getDetail();
  }, [])
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ backgroundColor: "#eee", margin: 10, marginTop: 0 }}>
          <Image style={styles.img} source={{ uri: 'https://placeimg.com/400/225/arch' }} />
          <Text style={styles.item}>{note.title}</Text>
          <Text style={styles.desc}>{note.body}</Text>
      </View>
    </View>
  );
};

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 20,
  },
  desc: {
    padding: 10,
    fontSize: 16,
  },
  img: {
    width: win.width,
    height: 150
  }
})
  
export default Details;