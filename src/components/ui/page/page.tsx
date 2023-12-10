import { PropsWithChildren } from "react";

import { clsx } from "clsx";

import s from "./page.module.scss";

type PageProps = PropsWithChildren<{
  flex?: boolean;
  mt?: number | string;
}>;

export const Page = ({ children, flex = false, mt = "100px" }: PageProps) => {
  const classNames = clsx(s.content, {
    [s.flex]: flex,
  });

  return (
    <div className={classNames} style={{ marginTop: mt }}>
      {children}
    </div>
  );
};
