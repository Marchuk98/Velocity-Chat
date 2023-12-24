import { Close } from "@/assets/icons";
import { Modal } from "@/components/ui/modals/modal";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

import s from "./image-modal.module.scss";

type ImagePropsType = {
  alt: string;
  isOpen: boolean;
  onClick?: () => void;
  setIsOpen: (isOpen: boolean) => void;
  src: string;
};

export const ImageModal = (props: ImagePropsType) => {
  const { alt, isOpen, onClick, setIsOpen, src } = props;

  return (
    <Modal.Root
      className={s.modal}
      isOpen={isOpen}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Dialog.Close asChild>
          <button className={s.closeIcon}>
            <Close />
          </button>
        </Dialog.Close>
        <img alt={alt} className={s.image} onClick={onClick} src={src} />
      </motion.div>
    </Modal.Root>
  );
};
