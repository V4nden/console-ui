import classNames from "classnames";
import React, { HTMLProps, ReactNode } from "react";
import styles from "./Block.module.css";
interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Block = (props: Props) => {
  return (
    <div
      {...{ ...props, title: undefined }}
      className={classNames(styles.block, props.className)}
    >
      <h1 className={styles["block-title"]}>{props.title}</h1>
      {props.children}
    </div>
  );
};
