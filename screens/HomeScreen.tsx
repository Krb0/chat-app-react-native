import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { auth } from "../config/firebase";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/HomeScreen/Header";
import ImageUploader from "../components/HomeScreen/ImageUploader";
import ChatButton from "../components/HomeScreen/ChatButton";

const baseImage =
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

const getImage = () => {
  const storage = getStorage();
  const storageRef = ref(storage, "profile_images/" + auth.currentUser?.uid);
  const url = getDownloadURL(storageRef)
    .then((url) => url)
    .catch(() => baseImage);
  return url;
};

export default function HomeScreen() {
  const [image, setImage] = useState<any>(baseImage);

  useEffect(() => {
    getImage().then((res) => setImage(res));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header image={image} />
      <ImageUploader setImage={setImage} />
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
