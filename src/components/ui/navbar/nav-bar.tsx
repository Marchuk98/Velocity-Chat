import { useRef } from "react";
import { Logout } from "@/assets/icons/Logout";
import { MainLoader } from "@/assets/loaders/main-loader";
import { Button, Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";
import { UseProfile } from "@/services/auth/hooks/useProfile";
import { Logo } from "@/assets/icons/Logo";

import s from "./nav-bar.module.scss";

export const NavBar = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const { avatar, handleFileChange, handleSignOut, loading, username } =
    UseProfile();

  return (
    <div className={s.navBar}>
      <Typography className={s.logo} variant={"body_2"}>
        <Logo />
      </Typography>
      {loading && <MainLoader />}
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
      <Typography variant={"h3"}>{username}</Typography>
      <Button className={s.logoutIcon} onClick={handleSignOut} variant={"link"}>
        Logout
        <Logout />
      </Button>
    </div>
  );
};
