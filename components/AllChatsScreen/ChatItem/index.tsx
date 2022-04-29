import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChatItem = ({
  item,
}: {
  item: {
    id: string;
    user: {
      email: string;
      avatar: string;
    };
  };
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("ChatScreen", { id: item.id })}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: item?.user?.avatar ? item.user.avatar : "" }}
          style={styles.image}
        />
        <Text>{item?.user?.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    display: "flex",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    borderRadius: 8,
    width: "95%",
    marginTop: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 200,
    resizeMode: "cover",
  },
});
