import { KeyboardEvent } from "react";
import { useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../firebase/firebase"; // Замените на путь к вашему файлу конфигурации Firebase

export const UseSearch = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<any | null>(null); // Используйте `any | null` для user, так как data может быть null

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username),
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();
  };

  return {
    handleKey,
    handleSearch,
  };
};
