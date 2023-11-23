import { ComponentPropsWithoutRef, ReactNode } from "react";

import s from "./card.module.scss";

export type CardProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export const Card = (props: CardProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={`${s.card ? s.card : ""} ${className ?? ""} `} {...rest}>
      {children}
    </div>
  );
};
