import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PATH } from "@/common/constants/route-path";
import { auth, db, storage } from "@/services/firebase/firebase";
import { signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

export const UseProfile = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");

  const uploadAvatar = async (file: File) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const storageReference = storageRef(storage, `avatars/${user.uid}`);

      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on("state_changed", async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          setAvatar(downloadURL);
          await updateProfile(user, {
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "userAvatar", user.uid), {
            avatar: downloadURL,
          });
          setAvatar(downloadURL);
        } catch (err) {
          console.error("Error handling upload state:", err);
        }
      });
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0) as File;

    uploadAvatar(file);
  };

  useEffect(() => {
    if (auth.currentUser) {
      const user = auth.currentUser;

      getDoc(doc(db, "user", user.uid)).then((doc) => {
        if (doc.exists()) {
          setUsername(doc.data().displayName);
        }
      });

      getDoc(doc(db, "userAvatar", user.uid)).then((doc) => {
        if (doc.exists()) {
          setAvatar(doc.data().avatar);
        }
      });
    }
  }, [avatar]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate(PATH.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    avatar,
    handleFileChange,
    handleSignOut,
    username,
  };
};
