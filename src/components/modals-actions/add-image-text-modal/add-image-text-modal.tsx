import { ReactNode } from "react";

import Picture from "@/assets/icons/Picture";
import { useAddImageFrom } from "@/common/schemas/use-add-image-schema";
import { ControlledTextField } from "@/components/controlled";
import { ControlledFileInput } from "@/components/controlled/controlled-file-input/controlled-file-input";
import { Button, Typography } from "@/components/ui";
import { storage } from "@/services/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

import { Modal } from "../../ui/modals/modal";

type AddImageTextModalType = {
  isOpenAddImageText: boolean;
  onSubmitHandler: (data: ChatMessageFormData) => void;
  setIsOpenAddImageText: (value: boolean) => void;
  title: string;
  trigger: ReactNode;
};

type ChatMessageFormData = {
  cover?: FileList | string;
  text?: string;
};

export const AddImageTextModal = (props: AddImageTextModalType) => {
  const {
    isOpenAddImageText,
    onSubmitHandler,
    setIsOpenAddImageText,
    title,
    trigger,
  } = props;

  const { control, handleSubmit, reset } = useAddImageFrom();

  const onSubmit = async (data: any) => {
    try {
      const { cover } = data;

      let imageUrl = "";

      if (data.cover) {
        const storageRef = ref(storage, `/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, cover);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              resolve(downloadURL);
            },
          );
        });
      }

      await onSubmitHandler({ cover: imageUrl, text: data.text });

      setIsOpenAddImageText(false);
      reset();
    } catch (error) {
      console.error("Ошибка при обработке формы:", error);
    }
  };

  return (
    <Modal.Root
      isOpen={isOpenAddImageText}
      onOpenChange={() => {
        reset();
        setIsOpenAddImageText(!isOpenAddImageText);
      }}
      title={title}
      trigger={trigger}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <ControlledFileInput
            control={control}
            name={"cover"}
            variant={"large"}
            withPreview
          >
            {(onClick) => (
              <Button onClick={onClick} type={"button"} variant={"secondary"}>
                <Picture />
                Change cover
              </Button>
            )}
          </ControlledFileInput>
          <ControlledTextField
            control={control}
            name={"text"}
            placeholder={"Введите сообщение здесь..."}
            type={"text"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type={"submit"} variant={"primary"}>
            <Typography variant={"subtitle_2"}>Send Message</Typography>
          </Button>
          <Button
            onClick={() => setIsOpenAddImageText(false)}
            variant={"secondary"}
          >
            <Typography variant={"subtitle_2"}>Cancel</Typography>
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  );
};
