import classNames from "classnames";
import React, { HTMLProps, useEffect, useState } from "react";
import Markdown from "react-markdown";

interface Props extends HTMLProps<HTMLDivElement> {
  animated?: boolean;
  children: string;
}

export const Text = (props: Props) => {
  const [animationState, setAnimationState] = useState(-1);

  useEffect(() => {
    let interval: number;
    if (props.animated) {
      setInterval(() => {
        setAnimationState((state) => {
          state <= -props.children.length && clearInterval(interval);

          return state - 1;
        });
      }, 1);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, []);

  return (
    <div
      {...props}
      className={classNames("p-2 m-2 border border-white/75", props.className)}
    >
      <Markdown className={"markdown"}>
        {props.animated
          ? props.children
              .split("")
              .reverse()
              .splice(animationState)
              .reverse()
              .join("")
          : props.children}
      </Markdown>
    </div>
  );
};
