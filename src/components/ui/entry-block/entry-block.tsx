import { ChangeEvent, KeyboardEvent, useState } from "react";

import Picture from "@/assets/icons/Picture";
import { MainLoader } from "@/assets/loaders/main-loader";
import { AddImageTextModal } from "@/components/modals-actions/add-image-text-modal/add-image-text-modal";
import { Button, TextField } from "@/components/ui";
import { auth, db } from "@/services/firebase/firebase";
import { setMessageText } from "@/services/slice/chat.slice";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import s from "./entry-block.module.scss";

export const EntryBlock = () => {
  const chatId = useAppSelector((state) => state.chatId);
  const userId = useAppSelector((state) => state.user.uid);
  const text = useAppSelector((state) => state.text);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddImageText, setIsOpenAddImageText] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMessageText(e.currentTarget.value));
  };

  const handleSend = async (messageData: any) => {
    const currentUser = auth.currentUser;

    if (
      !messageData.cover &&
      (!text || !text.trim()) &&
      (!messageData.text || !messageData.text.trim())
    ) {
      return;
    }

    setIsLoading(true);

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
        img: messageData.cover || "",
        senderId: currentUser.uid,
        text: messageData.text || text,
      };

      await updateDoc(chatDocRef, {
        messages: arrayUnion(messageObject),
      });

      await updateDoc(doc(db, "userChat", currentUser.uid), {
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: { text },
      });

      await updateDoc(doc(db, "userChat", userId), {
        [chatId + ".date"]: serverTimestamp(),
        [chatId + ".lastMessage"]: { text },
      });

      dispatch(setMessageText(""));
      setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSend({});
  };

  return (
    <div className={s.entryBlock}>
      <TextField
        className={s.sendTextField}
        onChange={handleTextChange}
        onKeyDown={handleKey}
        placeholder={"Type something"}
        type={"text"}
        value={text}
      />
      <div className={s.send}>
        <AddImageTextModal
          isOpenAddImageText={isOpenAddImageText}
          onSubmitHandler={(data) => handleSend(data)}
          setIsOpenAddImageText={setIsOpenAddImageText}
          title={"Отправить изображение"}
          trigger={
            <div>
              <Picture />
            </div>
          }
        />
        {isLoading && <MainLoader />}
        <Button className={s.sendButton} onClick={handleSend} variant={"link"}>
          Send
        </Button>
      </div>
    </div>
  );
};
