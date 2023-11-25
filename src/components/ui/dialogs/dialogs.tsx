import { Message } from "@/components/ui/dialogs/message/message";

import s from "./dialogs.module.scss";

export const Dialogs = () => {
  return (
    <div className={s.dialogs}>
      <Message info={"Just Now"} message={"hello"} name={"Vladimir"} />
      <Message info={"1 hour ago"} message={"Buy"} name={"Alex"} />
      <Message info={"Just Now"} message={"hello"} name={"Vladimir"} />
      <Message info={"1 hour ago"} message={"Buy"} name={"Alex"} />
      <Message info={"Just Now"} message={"hello"} name={"Vladimir"} />
      <Message info={"1 hour ago"} message={"Buy"} name={"Alex"} />
      <Message info={"Just Now"} message={"hello"} name={"Vladimir"} />
      <Message info={"1 hour ago"} message={"Buy"} name={"Alex"} />
    </div>
  );
};
