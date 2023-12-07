import { useEffect, useState } from "react";

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

    console.log("curUs", currentUser?.uid);

    if (!currentUser) {
      return () => {};
    }
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        console.log("Document data:", doc.data());
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
    return <div>...Loading</div>;
  }

  const handleSelect = (uid: string, name: string) => {
    const newUser = { displayName: name, uid: uid };

    dispatch(changeUser({ user: newUser }));
  };

  const mappedChats = chats
    ? Object.entries(chats).map((chat) => {
        return (
          <Chats
            // avatar={chat[1].userInfo.photoURL}
            handleSelect={() =>
              handleSelect(chat[1].userInfo.uid, chat[1].userInfo.displayName)
            }
            key={chat[0]}
            // message={chat[1].lastMessage?.text}
            // name={chat[1].userInfo.displayName}
            // uid={chat[1].userInfo.uid}
          />
        );
      })
    : [];

  return (
    <div className={s.sideBar}>
      <NavBar />
      <Search name={"Vladimir"} />
      <div>{mappedChats.length > 0 ? mappedChats : "No chats available"}</div>
    </div>
  );
};
