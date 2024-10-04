import classNames from "classnames";
import { HTMLProps, ReactNode } from "react";
import styles from "./Block.module.css";
import indexstyles from "../index.module.css";
interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Block = (props: Props) => {
  return (
    <div
      {...{ ...props, title: undefined }}
      className={classNames(
        styles["block"],
        props.className,
        indexstyles["border"]
      )}
    >
      <span className={styles["block-title"]}>{props.title}</span>
      {props.children}
    </div>
  );
};
