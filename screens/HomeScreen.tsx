import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
const elonUrl = "https://www.pngmart.com/files/21/Elon-Musk-PNG-HD.png";

export default function HomeScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={"lightgray"}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => signOut(auth)}>
          <Image
            source={{ uri: elonUrl }}
            style={{
              width: 40,
              height: 40,
              marginRight: 15,
              borderRadius: 200,
            }}
          />
        </TouchableOpacity>
      ),
      headerTitle: () => <Text>Chat App</Text>,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: "purple",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#232",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
