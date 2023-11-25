import { Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";

import s from "./message.module.scss";

type MessagePropsType = {
  info: string;
  message: string;
  name: string;
};

export const Message = ({ info, message, name }: MessagePropsType) => {
  return (
    <div className={`${s.message} ${s.owner}`}>
      <div className={s.messageInfo}>
        <UserAvatar
          name={name}
          src={"https://avatars.githubusercontent.com/u/81834571?v=4"}
        />
        <Typography as={"span"} color={"tertiary"} variant={"body_2"}>
          {info}
        </Typography>
      </div>
      <div className={s.messageContent}>
        <Typography as={"p"} color={"tertiary"} variant={"body_2"}>
          {message}
        </Typography>
        <img src={"https://avatars.githubusercontent.com/u/81834571?v=4"} />
      </div>
    </div>
  );
};
