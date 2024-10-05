import React, { createRef, useEffect, useState } from "react";
import styles from "./Slider.module.css";

type Props = {
  size: number;
  min: number;
  max: number;
  current: number;
  style?: { pointer: string; line: string };
  onChange?: (e: number) => void;
};

export const Slider = (props: Props) => {
  const ref = createRef<HTMLDivElement>();
  const [display, setDisplay] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [current, setCurrent] = useState(props.current);
  const resize = ({ contentRect }: ResizeObserverEntry) => {
    const line = Array(
      Math.floor((contentRect.width / props.size) * 1.67)
    ).fill(props.style?.line || "-");

    let pointIndex = Math.floor(
      line.length * ((current - props.min) / (props.max - props.min))
    );

    line[pointIndex == line.length ? line.length - 1 : pointIndex] =
      props.style?.pointer || "0";
    setDisplay(line.join(""));
  };

  const handleWindowMouse = (e: MouseEvent) => {
    if (!capturing) return;

    if (!ref.current) return;

    const boundingClientRect = ref.current.getBoundingClientRect();

    let newCurrent: number;

    if (e.x - boundingClientRect.x < 0) {
      newCurrent = props.min;
    } else if (e.x - boundingClientRect.x > boundingClientRect.width) {
      newCurrent = props.max;
    } else {
      newCurrent = Math.round(
        props.min +
          (((props.max - props.min) / 100) *
            Math.floor(
              ((e.x - boundingClientRect.x) / boundingClientRect.width) * 100
            ) +
            1)
      );
    }

    setCurrent(newCurrent);
    props.onChange && props.onChange(newCurrent);
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleWindowMouse);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouse);
    };
  }, [capturing, ref]);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((e) => {
        resize(e[0]);
      });
      observer.observe(ref.current);
    }
  }, [ref.current, current]);

  return (
    <div
      className={styles["slider"]}
      style={{ fontSize: props.size + "px", height: props.size * 1.68 }}
      ref={ref}
      onPointerDown={(e) => {
        (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
        setCapturing(true);
      }}
      onPointerUp={() => {
        setCapturing(false);
      }}
    >
      <span style={{ position: "absolute" }}>{display}</span>
    </div>
  );
};
