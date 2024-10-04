import classNames from "classnames";
import { HTMLProps } from "react";
import styles from "./Input.module.css";

interface Props extends HTMLProps<HTMLInputElement> {
  className?: string;
}

export const Input = (props: Props) => {
  return (
    <div className={classNames(styles["input-container"], props.className)}>
      <span>~ $ </span>
      <input {...props} className={styles.input} />
    </div>
  );
};
