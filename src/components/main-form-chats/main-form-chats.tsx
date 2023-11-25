import { Card } from "@/components/ui";
import { Chat } from "@/components/ui/chat/chat";
import { Sidebar } from "@/components/ui/sidebar/sidebar";

import s from "./main-form-chats.module.scss";

export const MainFormChats = () => {
  return (
    <div className={s.main}>
      <Card className={s.container}>
        <div className={s.mainWrapper}>
          <Sidebar />
          <Chat name={"Vladimir"} />
        </div>
      </Card>
    </div>
  );
};
