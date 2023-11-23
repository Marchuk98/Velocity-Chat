import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import s from "./typography.module.scss";

export type TypographyPropsType<T extends ElementType = "p"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  color?:
    | "error"
    | "form"
    | "inherit"
    | "link"
    | "primary"
    | "secondary"
    | "tertiary";
  variant?:
    | "body_1"
    | "body_2"
    | "caption"
    | "error"
    | "h1"
    | "h2"
    | "h3"
    | "large"
    | "link_1"
    | "link_2"
    | "overline"
    | "subtitle_1"
    | "subtitle_2";
} & ComponentPropsWithoutRef<"p">;
export const Typography = <T extends ElementType = "p">(
  props: TypographyPropsType<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TypographyPropsType<T>>,
) => {
  const {
    as: Component = "p",
    children,
    className,
    color = "primary",
    variant = "body_1",
    ...rest
  } = props;

  return (
    <Component
      className={`${variant && s[variant]} ${s[color]}  ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Component>
  );
};
