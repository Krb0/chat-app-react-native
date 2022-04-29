import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatItem from "../components/AllChatsScreen/ChatItem";
import Header from "../components/AllChatsScreen/Header";
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
        .map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
      const mappedChat = allChats.map((chat: any) => {
        return {
          user: chat.users.find(
            (user: any) => user.email !== auth?.currentUser?.email
          ),
          id: chat.id,
        };
      });
      setChats(mappedChat);
    });
    return () => unsuscribe();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header image={image} />
      <View>
        <FlatList
          data={chats}
          renderItem={({ item }) => <ChatItem item={item} />}
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
