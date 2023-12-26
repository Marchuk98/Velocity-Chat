import { MainLoader } from "@/assets/loaders/main-loader";
import { TextField, Typography } from "@/components/ui";
import { UserAvatar } from "@/components/ui/avatar/avatar";
import { UseSearch } from "@/services/auth/hooks/useSearch";

import s from "./search.module.scss";

export const Search = () => {
  const { handleKey, handleSelect, loading, setUsername, user, username } =
    UseSearch();

  return (
    <div className={s.search}>
      <div className={s.searchForm}>
        <TextField
          onChange={(e) => setUsername(e.currentTarget.value)}
          onKeyDown={handleKey}
          placeholder={"Find a user"}
          type={"search"}
          value={username}
        />
      </div>

      {loading ? (
        <MainLoader />
      ) : (
        user && (
          <div className={s.userChat} onClick={handleSelect}>
            <UserAvatar name={user.displayName} src={user.photoURL} />
            <div className={s.userChatInfo}>
              <Typography as={"span"} variant={"body_2"}>
                {user.displayName}
              </Typography>
            </div>
          </div>
        )
      )}
    </div>
  );
};
