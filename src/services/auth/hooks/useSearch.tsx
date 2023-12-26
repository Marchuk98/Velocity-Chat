import { KeyboardEvent, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";

export const UseSearch = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username),
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== auth.currentUser?.uid) {
          setUser(doc.data());
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      setLoading(true);
      const res = await getDoc(doc(db, "chats", combineId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combineId + ".date"]: serverTimestamp(),
          [combineId + ".userInfo"]: {
            displayName: user.displayName,
            photoURL: user.photoURL || "",
            uid: user.uid,
          },
        });

        await updateDoc(doc(db, "userChat", user.uid), {
          [combineId + ".date"]: serverTimestamp(),
          [combineId + ".userInfo"]: {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL || "",
            uid: currentUser.uid,
          },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    setUser(null);
    setUsername("");
  };

  return {
    handleKey,
    handleSearch,
    handleSelect,
    loading,
    setUsername,
    user,
    username,
  };
};
