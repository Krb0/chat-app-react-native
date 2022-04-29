import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../../config/firebase";

const Header = ({ image }: { image: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="message-plus-outline"
          size={24}
          color={"gray"}
          style={{ marginLeft: 15 }}
        />
      </TouchableOpacity>
      <Text>Chat App</Text>
      <TouchableOpacity onPress={() => signOut(auth)}>
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            borderRadius: 200,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
