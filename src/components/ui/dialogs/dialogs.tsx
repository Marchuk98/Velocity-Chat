import { useEffect, useState } from "react";

import { formatCustomDate } from "@/common/constants/formatCustomDate";
import { Message } from "@/components/ui/dialogs/message/message";
import { db } from "@/services/firebase/firebase";
import { useAppSelector } from "@/services/store/store";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";

import s from "./dialogs.module.scss";

interface MessageArrInt {
  date: Timestamp;
  id: string;
  img?: string;
  senderId: string;
  text: string;
}

interface ChatDialogs {
  messages: MessageArrInt[];
}

export const Dialogs = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<ChatDialogs>({ messages: [] });
  const chatId = useAppSelector((state) => state.chatId);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data() as ChatDialogs);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const mappedDialogs = messages.messages?.map((m) => {
    const formattedDate = m.date ? formatCustomDate(m.date.toDate()) : "";

    return (
      <Message
        date={formattedDate}
        img={m.img}
        key={m.id}
        senderId={m.senderId}
        text={m.text}
      />
    );
  });

  return (
    <div className={s.dialogs}>{mappedDialogs || "No dialogs available"}</div>
  );
};
