import PaperClip from "@/assets/icons/Paper-Clip";
import Picture from "@/assets/icons/Picture";
import { Button, TextField } from "@/components/ui";

import s from "./entry-block.module.scss";

export const EntryBlock = () => {
  return (
    <div className={s.entryBlock}>
      <TextField
        className={s.sendTextField}
        placeholder={"Type something"}
        type={"text"}
      />
      <div className={s.send}>
        <label>
          <PaperClip />
        </label>
        <TextField id={"file"} style={{ display: "none" }} type={"file"} />
        <label htmlFor={"file"}>
          <Picture />
        </label>
        <Button className={s.sendButton} variant={"link"}>
          Send
        </Button>
      </div>
    </div>
  );
};
