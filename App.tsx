import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import { createContext, useContext, useState } from "react";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={HomeScreen}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} key="Home" />
      <Stack.Screen name="ChatScreen" component={ChatScreen} key="Chat" />
    </Stack.Navigator>
  );
};
const AuthStack = () => {
  <Stack.Navigator defaultScreenOptions={LoginScreen}>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      key="LoginScreen"
    />
    <Stack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      key="SignUpScreen"
    />
  </Stack.Navigator>;
};

const RootNavigator = () => {
  const { user, setUser }: any = useContext(AuthenticatedUserContext);
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
};

export default function App() {
  return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
