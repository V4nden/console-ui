import React, { createRef, useEffect, useState } from "react";
import styles from "./Slider.module.css";

type Props = {
  size: number;
  width: number;
  min: number;
  max: number;
  current: number;
  onChange?: (e: number) => void;
};

export const Slider = (props: Props) => {
  const ref = createRef<HTMLDivElement>();
  const [display, setDisplay] = useState("");
  const [current, setCurrent] = useState(props.current);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const displayArray = Array(props.width).fill("-");

    displayArray[
      Math.floor(
        (displayArray.length * (current - props.min)) / (props.max - props.min)
      )
    ] = "o";
    setDisplay(displayArray.join(""));
  }, [current]);

  const setValue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const calculatedCurrent =
      props.min +
      ((props.max - props.min) / 100) *
        Math.floor(
          ((e.clientX - e.currentTarget.getBoundingClientRect().x) /
            e.currentTarget.getBoundingClientRect().width) *
            100
        );
    setCurrent(calculatedCurrent);
    props.onChange && props.onChange(calculatedCurrent);
  };

  return (
    <div
      className={styles["slider"]}
      style={{ fontSize: props.size + "px" }}
      ref={ref}
      onMouseDown={() => {
        setPressed(true);
      }}
      onMouseUp={() => {
        setPressed(false);
      }}
      onMouseMove={(e) => {
        pressed && setValue(e);
      }}
      onClick={setValue}
      onMouseLeave={() => {
        setPressed(false);
      }}
    >
      {display}
    </div>
  );
};
