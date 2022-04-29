import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Buttons = ({
  setModalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.chatButton}
      >
        <Entypo name="home" size={24} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.chatButton}
      >
        <Entypo name="new-message" size={24} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    bottom: 0,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
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
    marginBottom: 30,
  },
});
