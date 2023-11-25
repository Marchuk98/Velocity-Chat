import { Chats } from "@/components/ui/chats/chats";
import { NavBar } from "@/components/ui/navbar/nav-bar";
import { Search } from "@/components/ui/search/search";

import s from "./sidebar.module.scss";

export const Sidebar = () => {
  return (
    <div className={s.sideBar}>
      <NavBar name={"Vladimir"} />
      <Search name={"Vladimir"} />
      <Chats message={"Hello"} name={"Dimka Tractorist"} />
      <Chats message={"Я удаляю все треки замая"} name={"Alexey fan Zamaya"} />
      <Chats message={"Методы объекта"} name={"Vasya"} />
      <Chats message={"C кем не бывает "} name={"Oleg"} />
    </div>
  );
};
