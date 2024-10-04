import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  options?: {
    disabled?: boolean;
    type?: "primary" | "secondary" | "outline";
  };
}

export const Button = (props: Props) => {
  const types = {
    primary: styles["button-primary"],
    secondary: styles["button-secondary"],
    outline: styles["button-outline"],
  };

  return (
    <button
      {...props}
      className={classNames(
        "m-2",
        props.options && props.options.type
          ? types[props.options.type]
          : types["primary"],
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
