import { useEffect, useState } from "react";

import { MainLoader } from "@/assets/loaders/main-loader";
import { Chats } from "@/components/ui/chats/chats";
import { NavBar } from "@/components/ui/navbar/nav-bar";
import { Search } from "@/components/ui/search/search";
import { auth, db } from "@/services/firebase/firebase";
import { changeUser } from "@/services/slice/chat.slice";
import { useAppDispatch } from "@/services/store/store";
import { doc, onSnapshot } from "firebase/firestore";

import s from "./sidebar.module.scss";

interface Chat {
  date: {
    nanoseconds: number;
    seconds: number;
  };
  lastMessage: string;
  userInfo: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
}

interface UserChats {
  chats: { [key: string]: Chat };
}

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState<UserChats>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);

      return () => {};
    }
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(doc.data() as UserChats);
        setLoading(false);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [auth.currentUser]);

  if (loading) {
    return <MainLoader />;
  }

  const handleSelect = (uid: string, name: string, photoURL: string) => {
    const newUser = { displayName: name, photoURL, uid: uid };

    dispatch(changeUser({ user: newUser }));
  };

  const mappedChats = chats
    ? Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <Chats
              avatar={chat[1].userInfo.photoURL}
              handleSelect={() =>
                handleSelect(
                  chat[1].userInfo.uid,
                  chat[1].userInfo.displayName,
                  chat[1].userInfo.photoURL,
                )
              }
              key={chat[0]}
              message={chat[1].lastMessage?.text}
              name={chat[1].userInfo.displayName}
              uid={chat[1].userInfo.uid}
            />
          );
        })
    : [];

  return (
    <div className={s.sideBar}>
      <NavBar />
      <Search />
      <div>{mappedChats.length > 0 ? mappedChats : "No chats available"}</div>
    </div>
  );
};
