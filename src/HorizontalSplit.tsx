import React from "react";

type Props = { text: string };

export const HorizontalSplit = (props: Props) => {
  return (
    <div className="h-[1px] flex bg-white/75 relative m-2">
      <div className="absolute -top-3 bg-black left-3 px-1">{props.text}</div>
    </div>
  );
};
