import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, database } from "../config/firebase";

export default function ChatScreen({ route, image }: any) {
  const [messages, setMessages] = useState<any>([]);
  const { id } = route.params;
  useLayoutEffect(() => {
    const collectionRef = collection(database, `chats/${id}/messages`);
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsuscribe = onSnapshot(q, (snapshot: any) => {
      setMessages(
        snapshot.docs.map(
          (doc: {
            id: any;
            data: () => {
              createdAt: any;
              text: any;
              user: any;
            };
          }) => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })
        )
      );
    });
    return () => unsuscribe();
  }, [id]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, `chats/${id}/messages`), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email ? auth?.currentUser?.email : "rand",
        avatar: image,
      }}
    />
  );
}
