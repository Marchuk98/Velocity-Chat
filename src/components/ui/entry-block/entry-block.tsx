import { ChangeEvent, useState } from "react";

import PaperClip from "@/assets/icons/Paper-Clip";
import Picture from "@/assets/icons/Picture";
import { Button, TextField } from "@/components/ui";
import { auth, db, storage } from "@/services/firebase/firebase";
import { useAppSelector } from "@/services/store/store";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

import s from "./entry-block.module.scss";

export const EntryBlock = () => {
  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<File | null>();
  const chatId = useAppSelector((state) => state.chatId);
  const userId = useAppSelector((state) => state.user.uid);

  const handleChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImages(e.currentTarget.files[0]);
    }
  };

  const handleSend = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser || !chatId) {
      return;
    }

    try {
      const chatDocRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatDocRef);

      if (!chatDoc.exists()) {
        await setDoc(chatDocRef, { messages: [] });
      }

      const messageObject = {
        date: Timestamp.now(),
        id: uuid(),
        senderId: currentUser.uid,
        text,
      };

      if (images) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, images);

        uploadTask.on("state_changed", async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateDoc(chatDocRef, {
            messages: arrayUnion({
              ...messageObject,
              img: downloadURL,
            }),
          });
        });
      } else {
        await updateDoc(chatDocRef, {
          messages: arrayUnion(messageObject),
        });
      }

      await updateDoc(doc(db, "userChat", currentUser.uid), {
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: {
          text,
        },
      });

      await updateDoc(doc(db, "userChat", userId), {
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: {
          text,
        },
      });

      setText("");
      setImages(null);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return (
    <div className={s.entryBlock}>
      <TextField
        className={s.sendTextField}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setText(e.currentTarget.value)
        }
        placeholder={"Type something"}
        type={"text"}
        value={text}
      />
      <div className={s.send}>
        <label>
          <PaperClip />
        </label>
        <TextField
          id={"file"}
          onChange={handleChangeFiles}
          style={{ display: "none" }}
          type={"file"}
        />
        <label htmlFor={"file"}>
          <Picture />
        </label>
        <Button className={s.sendButton} onClick={handleSend} variant={"link"}>
          Send
        </Button>
      </div>
    </div>
  );
};
