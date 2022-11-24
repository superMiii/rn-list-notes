import { Text, TouchableOpacity, View } from "react-native";

export const ListComponent = ({ navigation, styles, item }) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
            onPress={() =>
                navigation.navigate("Details", {
                noteId: item.id,
                })
            }
            >
                <Text style={styles.item}>{item.title}</Text>
            {/* <Text style={styles.desc}>{item.body}</Text> */}
            </TouchableOpacity>
        </View>
    );
}