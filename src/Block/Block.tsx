import classNames from "classnames";
import React, { ReactNode } from "react";
import styles from "./Block.module.css";
type Props = { title: string; children: ReactNode; className?: string };

export const Block = (props: Props) => {
  return (
    <div className={classNames(styles.block, props.className)}>
      <h1 className={styles["block-title"]}>{props.title}</h1>
      {props.children}
    </div>
  );
};
