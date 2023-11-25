import { CSSProperties, ComponentProps } from "react";

import * as AvatarRadix from "@radix-ui/react-avatar";
import { clsx } from "clsx";

import s from "./avatar.module.scss";

export type UserAvatarProps = {
  className?: string;
  name: string;
  size?: CSSProperties["width"];
  src?: ComponentProps<"img">["src"];
};

export const UserAvatar = (props: UserAvatarProps) => {
  const { className, name, size = "3rem", src } = props;

  const fallbackText = name?.slice(0, 2).toUpperCase();
  const avatarSize = { height: size, width: size };
  const classNames = {
    avatar: s.avatar,
    avatarRoot: clsx(s.avatarRoot, className),
    fallback: s.fallback,
    icon: s.icon,
  };

  return (
    <AvatarRadix.Root className={classNames.avatarRoot} tabIndex={0}>
      <AvatarRadix.Image
        alt={"user avatar"}
        className={classNames.avatar}
        src={src}
        style={avatarSize}
      />
      <AvatarRadix.Fallback className={classNames.fallback} style={avatarSize}>
        {fallbackText}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
};
