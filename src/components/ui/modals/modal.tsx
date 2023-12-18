import { FC, ReactNode } from "react";

import { Close } from "@/assets/icons";
import { Typography } from "@/components/ui";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";

import s from "./modal.module.scss";

type ModalProps = {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title?: string;
  trigger?: ReactNode;
  width?: string;
};

const Root: FC<ModalProps> = ({
  children,
  className,
  isOpen,
  onOpenChange,
  title,
  trigger,
}) => {
  const classNames = {
    body: clsx(s.body),
    content: clsx(s.content, className),
    footer: clsx(s.footer),
    overlay: clsx(s.overlay),
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={classNames.overlay} />
        <Dialog.Content className={classNames.content}>
          {title && <ModalTitle title={title} />}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type ModalTitleProps = {
  title: string;
};
const ModalTitle: FC<ModalTitleProps> = ({ title }) => {
  return (
    <Dialog.Title className={s.titleContainer}>
      <Typography variant={"h2"}>{title}</Typography>
      <Dialog.Close asChild>
        <button className={s.closeIcon}>
          <Close />
        </button>
      </Dialog.Close>
    </Dialog.Title>
  );
};

type ModalChildType = {
  children: ReactNode;
  className?: string;
};

const Body: FC<ModalChildType> = ({ children, className }) => {
  const classNames = {
    body: clsx(s.body, className),
  };

  return <div className={classNames.body}>{children}</div>;
};

const Footer: FC<ModalChildType> = ({ children, className }) => {
  const classNames = {
    footer: clsx(s.footer, className),
  };

  return <div className={classNames.footer}>{children}</div>;
};

export const Modal = { Body, Footer, Root };
