import classNames from "classnames";
import React, { HTMLProps, useEffect, useState } from "react";
import Markdown from "react-markdown";
import styles from "./Text.module.css";

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
      className={classNames(styles["markdown-wrapper"], props.className)}
    >
      <Markdown className={styles["markdown"]}>
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
