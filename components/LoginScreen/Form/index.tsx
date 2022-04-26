import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../../config/firebase";
import Inputs from "./Inputs";
import SignUp from "./SignUp";

const Form = ({ login }: { login: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      if (login) {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => Alert.alert("Login Success"))
          .catch((err) => Alert.alert("Login Error", err.message));
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => Alert.alert("SignUp Success"))
          .catch((err) => Alert.alert("SignUp Error", err.message));
      }
    }
  };
  return (
    <SafeAreaView style={styles.form}>
      <Text style={styles.title}>{login ? "Login" : "Sign Up"}</Text>
      <Inputs
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={styles.logIn}>{login ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>
      <SignUp login={login} />
    </SafeAreaView>
  );
};

export default Form;

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "purple",
    alignSelf: "center",
    paddingBottom: 24,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "purple",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  logIn: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },
});
