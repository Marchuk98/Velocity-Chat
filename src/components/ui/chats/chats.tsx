import { Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";

import s from "./chats.module.scss";

type ChatsPropsType = {
  message: string;
  name: string;
};

export const Chats = ({ message, name }: ChatsPropsType) => {
  return (
    <div className={s.chats}>
      <div className={s.userChat}>
        <UserAvatar name={name} />
        <div className={s.userChatInfo}>
          <Typography as={"span"} variant={"body_2"}>
            {name}
          </Typography>
          <Typography as={"p"} variant={"body_2"}>
            {message}
          </Typography>
        </div>
      </div>
    </div>
  );
};
