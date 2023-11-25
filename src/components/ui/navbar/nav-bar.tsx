import { Button, Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";

import s from "./nav-bar.module.scss";

type NavBarPropsType = {
  name: string;
};

export const NavBar = ({ name }: NavBarPropsType) => {
  return (
    <div className={s.navBar}>
      <Typography className={s.logo} variant={"body_2"}>
        Mini Chat
      </Typography>
      <div className={s.user}>
        <UserAvatar
          name={name}
          src={
            "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          }
        />
        <Typography variant={"body_2"}>{name}</Typography>
        <Button variant={"link"}>Logout</Button>
      </div>
    </div>
  );
};
