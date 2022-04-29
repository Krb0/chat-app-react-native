import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import AllChatsScreen from "./screens/AllChatsScreen";
import useImage from "./hooks/useImage";

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
  const [image, setImage] = useImage();
  return (
    <Stack.Navigator defaultScreenOptions={HomeScreen}>
      <Stack.Screen
        name="AllChatsScreen"
        component={() => <AllChatsScreen image={image} />}
        key="AllChats"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={() => <HomeScreen image={image} setImage={setImage} />}
        key="Home"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={({ route }) => <ChatScreen image={image} route={route} />}
        key="Chat"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const AuthStack = () => (
  <Stack.Navigator defaultScreenOptions={LoginScreen}>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      key="LoginScreen"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      key="SignUpScreen"
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, setUser }: any = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsuscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
