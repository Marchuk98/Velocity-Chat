import { Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";

import s from "./chats.module.scss";

type ChatsPropsType = {
  avatar?: string;
  handleSelect: (uid: string, name: string) => void;
  message?: string;
  name: string;
  uid: string;
};

export const Chats = ({
  avatar,
  handleSelect,
  message,
  name,
  uid,
}: ChatsPropsType) => {
  return (
    <div className={s.chats}>
      <div className={s.userChat} onClick={() => handleSelect(uid, name)}>
        <UserAvatar name={name} src={avatar} />
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
