import React, { ReactNode, useState } from "react";
import styles from "./Select.module.css";
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
      <div className={styles["selected-option"]}>
        {props.options[selected].title + "   " + (opened ? "Λ" : "V")}
      </div>
      {opened && (
        <div className={styles["options"]}>
          {props.options.map((el, index) => {
            return (
              <div
                className={styles["option"]}
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
