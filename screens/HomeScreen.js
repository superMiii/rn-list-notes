import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListComponent } from "../Components/ListComponent";

const Home = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [hasilCari, setHasilCari] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const req = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const res = await req.json();
      setNotes(res);
    };
    getNotes();
  }, []);

  const getFilterNotes = (val) => {
    if(val) {
      let filterNotes = notes.filter((p) => p.title.toUpperCase().match(val.toUpperCase()));
      let resArr = [];
      filterNotes.filter(function(item){
        let i = resArr.findIndex(x => (x.title === item.title));
        if(i <= -1){
          resArr.push(item);
        }
        return null;
      });
      if (filterNotes.length > 0) {
        setHasilCari(resArr);
      }
    } else {
      setHasilCari([])
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={{ color: "#006600", fontSize: 40 }}>Home Screen!</Text>
      <Ionicons name="md-home" size={80} color="#006600" /> */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.search} placeholder="Search here.." onChangeText={(val) => getFilterNotes(val)} />
      </View>
      {
        hasilCari.length > 0 ? (
          <View>
            <FlatList
              data={hasilCari}
              renderItem={({ item }) => (
                <ListComponent item={item} navigation={navigation} styles={styles} />
              )}
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={notes}
              renderItem={({ item }) => (
                <ListComponent item={item} navigation={navigation} styles={styles} />
              )}
            />
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    textTransform: 'capitalize'
  },
  desc: {
    padding: 10,
    fontSize: 14,
    textAlign: 'justify'
  },
  wrapper: {
    backgroundColor: "#ccc",
    elevation: 5,
    borderRadius: 5,
    margin: 10,
  },
  searchContainer: {
    margin: 10,
  },
  search: {
    borderColor: '#ccc',
    elevation: 2,
    borderRadius: 20,
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
  }
});

export default Home;
