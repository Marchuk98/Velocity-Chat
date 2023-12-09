import { useRef } from "react";

import { Button, Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";
import { UseProfile } from "@/services/auth/hooks/useProfile";

import s from "./nav-bar.module.scss";

export const NavBar = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const { avatar, handleFileChange, handleSignOut, username } = UseProfile();

  return (
    <div className={s.navBar}>
      <Typography className={s.logo} variant={"body_2"}>
        Mini Chat
      </Typography>
      <UserAvatar
        className={s.avatarWrapper}
        name={username}
        onClick={() => fileRef.current && fileRef.current.click()}
        src={avatar}
      />
      <div className={s.avatarWrapper}>
        <input
          className={s.fileInput}
          onChange={handleFileChange}
          ref={fileRef}
          style={{ display: "none" }}
          type={"file"}
        />
      </div>
      <Typography variant={"body_2"}>{username}</Typography>
      <Button onClick={handleSignOut} variant={"link"}>
        Logout
      </Button>
    </div>
  );
};
