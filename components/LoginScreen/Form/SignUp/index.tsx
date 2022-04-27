import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

const SignUp = ({ login }: { login: boolean }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        alignSelf: "center",
      }}
    >
      <Text style={{ color: "gray", fontWeight: "bold", fontSize: 15 }}>
        {login ? "Don't have an account?" : "Already have an account?"}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(login ? "SignUpScreen" : "LoginScreen")
        }
      >
        <Text
          style={{
            color: "violet",
            fontWeight: "500",
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          {login ? "Sign Up" : "Log In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
