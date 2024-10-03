import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  options?: {
    disabled?: boolean;
    type?: "primary" | "secondary" | "outline";
  };
}

export const Button = (props: Props) => {
  const styles = {
    primary: "bg-white text-black font-bold  p-2 rounded-none",
    secondary: "bg-white/75 text-black/75 rounded-none font-bold p-2",
    outline: "text-white/75 border-white/75 p-2 border rounded-none",
  };

  return (
    <button
      {...props}
      className={classNames(
        "m-2",
        props.options && props.options.type
          ? styles[props.options.type]
          : styles["primary"],
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
