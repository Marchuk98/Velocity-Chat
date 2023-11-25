import AddPerson from "@/assets/icons/Add-Person";
import Camera from "@/assets/icons/Camera";
import More from "@/assets/icons/More";
import { Typography } from "@/components/ui";
import { Dialogs } from "@/components/ui/dialogs/dialogs";
import { EntryBlock } from "@/components/ui/entry-block/entry-block";

import s from "./chat.module.scss";

type ChatPropsType = {
  name: string;
};

export const Chat = ({ name }: ChatPropsType) => {
  return (
    <div className={s.chat}>
      <div className={s.chatInfo}>
        <Typography variant={"body_2"}>{name}</Typography>
        <div className={s.chatIcons}>
          <Camera />
          <AddPerson />
          <More />
        </div>
      </div>
      <Dialogs />
      <EntryBlock />
    </div>
  );
};
