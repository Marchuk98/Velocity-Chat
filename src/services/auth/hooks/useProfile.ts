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
  const [loading, setLoading] = useState(false);

  const uploadAvatar = async (file: File) => {
    try {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const storageReference = storageRef(storage, `avatars/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          setLoading(false);
          console.error("Error during upload:", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            setAvatar(downloadURL);
            await updateProfile(user, {
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              displayName: user.displayName,
              email: user.email,
              photoURL: downloadURL,
              uid: user.uid,
            });
            setLoading(false);
          } catch (err) {
            setLoading(false);
            console.error("Error after upload:", err);
          }
        },
      );
    } catch (err) {
      setLoading(false);
      console.error("Error starting upload:", err);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0) as File;

    uploadAvatar(file);
  };

  useEffect(() => {
    if (auth.currentUser) {
      const user = auth.currentUser;

      getDoc(doc(db, "users", user.uid)).then((doc) => {
        if (doc.exists()) {
          setUsername(doc.data().displayName);
          const photoURL = doc.data().photoURL;

          if (photoURL) {
            setAvatar(photoURL);
          } else {
            setAvatar("");
          }
        }
      });
    }
  }, []);

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
    loading,
    username,
  };
};
