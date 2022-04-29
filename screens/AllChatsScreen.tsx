import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/HomeScreen/Header";
import { auth, database } from "../config/firebase";
import useImage from "../hooks/useImage";

export default function AllChatsScreen() {
  const [image] = useImage();
  const [chats, setChats] = useState<any>([]);

  useEffect(() => {
    const chatsRef = collection(database, "chats");
    const unsuscribe = onSnapshot(chatsRef, (snapshot) => {
      const allChats = snapshot.docs
        .filter((doc) =>
          doc
            .data()
            .users.some((user: any) => user.email === auth?.currentUser?.email)
        )
        .map((doc) => doc.data());
      setChats(allChats);
    });
    return () => unsuscribe();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header image={image} />
      <View>
        <FlatList
          data={chats}
          renderItem={() => (
            <TouchableOpacity
              style={{
                display: "flex",
                alignSelf: "center",
                backgroundColor: "rgba(0,0,0,0.1)",
                padding: 8,
                borderRadius: 8,
                width: "95%",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: "https://picsum.photos/536/354" }}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 15,
                    borderRadius: 200,
                    resizeMode: "cover",
                  }}
                />
                <Text>Hola</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
