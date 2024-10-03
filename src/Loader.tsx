import React, { useEffect, useState } from "react";

type Props = {
  type: "cross" | "slash" | "braile";
};

export const Loader = (props: Props) => {
  const types = {
    cross: ["x", "+"],
    slash: ["/", "-", "\\", "|"],
    braile: ["⠋", "⠙", "⠸", "⠴", "⠦", "⠇"],
  };
  const animation = types[props.type];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1 == animation.length ? 0 : index + 1));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span>
      <div>{animation[index]}</div>
    </span>
  );
};
