import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AddPerson from "@/assets/icons/Add-Person";
import Camera from "@/assets/icons/Camera";
import More from "@/assets/icons/More";
import { Typography } from "@/components/ui";
import { Dialogs } from "@/components/ui/dialogs/dialogs";
import { EntryBlock } from "@/components/ui/entry-block/entry-block";
import { RootState, useAppSelector } from "@/services/store/store";

import s from "./chat.module.scss";

export const Chat = () => {
  const displayName = useSelector<RootState, string>(
    (state) => state.user.displayName,
  );
  const chatId = useAppSelector((state) => state.chatId);

  const [isChatSelected, setIsChatSelected] = useState(false);

  useEffect(() => {
    if (chatId) {
      setIsChatSelected(true);
    } else {
      setIsChatSelected(false);
    }
  }, [chatId]);

  return (
    <div className={s.chat}>
      {isChatSelected ? (
        <>
          <div className={s.chatInfo}>
            <Typography variant={"h3"}>{displayName}</Typography>
            <div className={s.chatIcons}>
              <Camera />
              <AddPerson />
              <More />
            </div>
          </div>
          <Dialogs />
          <EntryBlock />
        </>
      ) : (
        <div className={s.chatPlaceholder}>Выберите чат, чтобы продолжить</div>
      )}
    </div>
  );
};
