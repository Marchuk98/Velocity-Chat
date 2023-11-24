import { TextField, Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";

import s from "./search.module.scss";

type SearchPropsType = {
  name: string;
};
export const Search = ({ name }: SearchPropsType) => {
  return (
    <div className={s.search}>
      <div className={s.searchForm}>
        <TextField placeholder={"Find a user"} type={"search"} />
      </div>
      <div className={s.userChat}>
        <UserAvatar
          name={name}
          src={
            "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          }
        />
        <div className={s.userChatInfo}>
          <Typography as={"span"} variant={"body_2"}>
            {name}
          </Typography>
        </div>
      </div>
    </div>
  );
};
