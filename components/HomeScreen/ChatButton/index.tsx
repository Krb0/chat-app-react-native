import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

const ChatButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AllChatsScreen")}
      style={styles.chatButton}
    >
      <Entypo name="chat" size={24} color={"white"} />
    </TouchableOpacity>
  );
};

export default ChatButton;

const styles = StyleSheet.create({
  chatButton: {
    backgroundColor: "purple",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    shadowColor: "#232",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 30,
  },
});
