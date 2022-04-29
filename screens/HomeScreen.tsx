import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/HomeScreen/Header";
import ImageUploader from "../components/HomeScreen/ImageUploader";
import ChatButton from "../components/HomeScreen/ChatButton";
import useImage from "../hooks/useImage";

export default function HomeScreen({ image, setImage: uploadImage }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header image={image} />
      <ImageUploader uploadImage={uploadImage} />
      <ChatButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
