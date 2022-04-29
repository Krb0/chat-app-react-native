import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Pressable,
  Text,
  View,
  Modal as ModalNative,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { auth, database } from "../../../config/firebase";
import useImage from "../../../hooks/useImage";

const Modal = ({
  chats,
  modalVisible,
  setModalVisible,
}: {
  chats: any[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [contact, setContact] = useState<string>("");
  const [image] = useImage();
  const handleAdd = () => {
    if (contact.length > 0) {
      const chatsRef = collection(database, "chats");
      const usersRef = doc(database, `users/${contact.toLowerCase()}`);
      getDoc(usersRef).then((doc: any) => {
        if (!chats.find((chat) => chat.user.email === contact)) {
          if (doc.data()) {
            addDoc(chatsRef, {
              users: [
                {
                  email: auth?.currentUser?.email,
                  avatar: image,
                },
                {
                  email: contact,
                  avatar: doc.data().avatar,
                },
              ],
            });
            setModalVisible(false);
          } else {
            setModalVisible(false);
            Alert.alert("User not found");
          }
        } else {
          Alert.alert("Contact already exists!");
          setModalVisible(false);
        }
      });
    }
  };
  return (
    <ModalNative
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 25,
            }}
          >
            New Contact
          </Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={(text) => setContact(text)}
            placeholder="Enter email"
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonAdd]}
              onPress={() => handleAdd()}
            >
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ModalNative>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 42,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    marginLeft: 4,
    padding: 10,
    elevation: 4,
  },

  buttonClose: {
    backgroundColor: "rgb(190,0,0)",
  },
  buttonAdd: {
    backgroundColor: "rgb(0,160,0)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalInput: {
    marginBottom: 15,
    width: 200,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default Modal;
