import classNames from "classnames";
import React, { HTMLProps } from "react";
interface Props extends HTMLProps<HTMLInputElement> {
  className?: string;
}

export const Input = (props: Props) => {
  return (
    <div className={classNames("flex items-center m-2", props.className)}>
      <span>~ $ </span>
      <input
        {...props}
        className={"bg-transparent p-2 m-21 outline-none flex-1"}
      />
    </div>
  );
};
