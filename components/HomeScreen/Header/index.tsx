import { FontAwesome5 } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { Image, TouchableOpacity, View } from "react-native";
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
      <FontAwesome5
        name="search"
        size={24}
        color={"lightgray"}
        style={{ marginLeft: 15 }}
      />
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
