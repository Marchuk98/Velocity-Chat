import { useEffect, useRef } from "react";

import { Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";
import { auth } from "@/services/firebase/firebase";
import { useAppSelector } from "@/services/store/store";

import s from "./message.module.scss";

type MessagePropsType = {
  date: string;
  img?: string;
  senderId: string;
  text: string;
};

export const Message = ({ date, img, senderId, text }: MessagePropsType) => {
  const userInfo = useAppSelector((state) => state.user.photoURL);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [senderId, text, img]);

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return;
  }

  return (
    <div
      className={`${s.message} ${senderId === currentUser.uid ? s.owner : ""}`}
      ref={ref}
    >
      <div className={s.messageInfo}>
        <UserAvatar
          name={userInfo}
          src={
            senderId === currentUser.uid
              ? currentUser.photoURL || undefined
              : userInfo ||
                "https://firebasestorage.googleapis.com/v0/b/velocity-chat-d38da.appspot.com/o/avatars%2F2vjcPZvr3sY3X1WZmNWljVUKw8p2?alt=media&token=ab3d6786-b4cd-4e50-a184-70d1659030c6"
          }
        />
        <Typography as={"span"} color={"tertiary"} variant={"body_2"}>
          {date}
        </Typography>
      </div>
      <div className={s.messageContent}>
        <Typography as={"p"} color={"tertiary"} variant={"body_2"}>
          {text}
        </Typography>
        {img && <img alt={""} src={img} />}
      </div>
    </div>
  );
};
