import { useEffect, useRef } from "react";

import { useImageOpen } from "@/common/constants/useImageOpen";
import { ImageModal } from "@/components/modals-actions/image-modal/image-modal";
import { Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";
import { BlurHashCanvas } from "@/components/ui/image/blur-hash-image";
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

  const { image, isImageModalOpen, openImageInModal, setImageModalOpen } =
    useImageOpen();

  const scrollIntoView = () => {
    const messageContainer = ref.current as HTMLDivElement;
    const lastMessage = messageContainer.lastElementChild as HTMLElement | null;

    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollIntoView();
  }, [text, img]);

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  return (
    <div
      className={`${s.message} ${senderId === currentUser.uid ? s.owner : ""}`}
      ref={ref}
    >
      <ImageModal
        alt={"image-modal"}
        isOpen={isImageModalOpen}
        setIsOpen={setImageModalOpen}
        src={image}
      />
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
        {img && (
          <div
            onClick={() => openImageInModal(img)}
            style={{ cursor: "pointer" }}
          >
            <BlurHashCanvas
              alt={"message-image"}
              blurHeight={100}
              blurWidth={100}
              src={img}
            />
          </div>
        )}
      </div>
    </div>
  );
};
