import { useState } from "react";
import styles from "./Select.module.css";
import indexstyles from "../index.module.css";
import classNames from "classnames";
type Option = { value: string; title: string };
type Props = {
  options: Option[];
  onChange?: (index: number) => void;
  value?: number;
};

export const Select = (props: Props) => {
  const [selected, setSelected] = useState(props.value ? props.value : 0);
  const [opened, setOpened] = useState(false);
  return (
    <div
      className={styles["select"]}
      onClick={() => {
        setOpened(!opened);
      }}
    >
      <div
        className={classNames(styles["selected-option"], indexstyles["border"])}
      >
        <span>{props.options[selected].title}</span>{" "}
        <span>{opened ? "Λ" : "V"}</span>
      </div>
      {opened && (
        <div className={styles["options"]}>
          {props.options.map((el, index) => {
            return (
              <div
                className={classNames(styles["option"], indexstyles["border"])}
                key={index}
                onClick={() => {
                  setSelected(index);
                  setOpened(false);
                  props.onChange && props.onChange(index);
                }}
              >
                {el.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
