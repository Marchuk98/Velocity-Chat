import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import preview from "../../../assets/images/upload-file.png";
import { useCreateBlob } from "@/common/constants/useBlob";

import s from "./controlled-file-input.module.scss";



type FileInputPropsType<T extends FieldValues> = {
  children: (onClick: () => void) => JSX.Element;
  cover?: string;
  disabled?: boolean;
  variant?: "large" | "medium" | "small";
  withPreview: boolean;
} & Omit<
  UseControllerProps<T>,
  "defaultValues" | "onChange" | "rules" | "type" | "value"
>;

export const ControlledFileInput = <T extends FieldValues>({
  children,
  control,
  cover,
  disabled,
  name,
  variant,
  withPreview,
  ...rest
}: FileInputPropsType<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>();

  const {
    field: { onChange, ref, value, ...field },
  } = useController({ control, name });

  const { blob } = useCreateBlob(cover ?? preview);
  const myFile = new File([blob ?? ""], "cover.png", { type: "image/png" });

  useEffect(() => {
    if (cover) {
      setPreviewImage(myFile);
      onChange(myFile as any);
    } else {
      // If no cover is provided, don't set a default image
      setPreviewImage(null);
      onChange(null);
    }
  }, [blob, cover]); // Add cover to dependency array

  const addMediaFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreviewImage(undefined);
      onChange(undefined)
      return;
    }
    setPreviewImage(e.target.files[0]);
    onChange(e?.target?.files[0] as any);
  };
  const onClick = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };

  return (
    <>
      {withPreview && (
        <img
          alt={"Preview"}
          className={s.previewImage}
          src={previewImage ? URL.createObjectURL(previewImage) : preview}
        />
      )}
      <input
        className={s.input}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        type={"file"}
        {...rest}
        onChange={addMediaFileHandler}
        {...field}
      />

      {children(onClick)}
    </>
  );
};
