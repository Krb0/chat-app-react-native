import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../../../config/firebase";

const ImageUploader = ({
  uploadImage,
}: {
  uploadImage: (blob: any) => void;
}) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const img = await fetch(result.uri);
      const blob = await img.blob();
      uploadImage(blob);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => pickImage()}
        style={{
          backgroundColor: "rgba(50,0,100,0.5)",
          padding: 20,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: "white" }}>Upload Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploader;
