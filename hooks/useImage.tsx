import { doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, database } from "../config/firebase";

const baseImage =
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

const useImage = () => {
  const [image, setImage] = useState<any>(baseImage);

  const getImage = () => {
    const storage = getStorage();
    const storageRef = ref(storage, "profile_images/" + auth.currentUser?.uid);
    const url = getDownloadURL(storageRef)
      .then((url) => url)
      .catch(() => baseImage);
    return url;
  };

  const uploadImage = async (blob: Blob) => {
    const storageRef = ref(
      getStorage(),
      "profile_images/" + auth.currentUser?.uid
    );
    await uploadBytesResumable(storageRef, blob).catch((err: any) =>
      console.log(err)
    );
    await getDownloadURL(storageRef).then((url: any) => {
      setImage(url);
      const docRef = doc(
        database,
        "users/" + auth.currentUser?.email?.toLowerCase()
      );
      setDoc(docRef, {
        email: auth.currentUser?.email?.toLowerCase(),
        avatar: url,
      });
    });
  };

  useEffect(() => {
    getImage().then((res) => setImage(res));
  }, []);
  return [image, uploadImage];
};

export default useImage;
