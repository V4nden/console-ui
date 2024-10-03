import classNames from "classnames";
import React, { ReactNode } from "react";

type Props = { title: string; children: ReactNode; className?: string };

export const Block = (props: Props) => {
  return (
    <div
      className={classNames(
        "p-2 m-2 border border-white/75 rounded-none relative",
        props.className
      )}
    >
      <h1 className="-top-3 bg-black px-1 left-3 absolute text-white/75">
        {props.title}
      </h1>
      {props.children}
    </div>
  );
};
