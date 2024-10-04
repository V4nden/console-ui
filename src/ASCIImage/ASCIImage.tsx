import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import styles from "./ASCIImage.module.css";
import indexstyles from "../index.module.css";
import classNames from "classnames";

type Props = {
  src: string;
  width: number;
  height: number;
  size?: number;
  alt?: string;
  darker?: number;
};

export const ASCIImage = (props: Props) => {
  const [image, setImage] = useState(
    Array(props.width * props.height)
      .fill(" ")
      .map((el, index) => (index % props.width == 0 ? `${el}\n` : el))
      .join("")
  );
  const [loaded, setLoaded] = useState(false);
  const gradient = ` ${
    props.darker ? Array(props.darker).fill(" ").join("") : ""
  } .-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@`;
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = props.src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        props.width,
        props.height
      );

      const imageData = ctx?.getImageData(0, 0, props.width, props.height);
      const data = imageData?.data;
      const image = [];
      if (data) {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const pixelBrigtnessPercent = Math.floor(((r + g + b) / 765) * 100);

          image.push(
            (i / 4 + 1) % props.width == 0
              ? gradient[
                  Math.floor((gradient.length / 100) * pixelBrigtnessPercent)
                ] + "\n"
              : gradient[
                  Math.floor((gradient.length / 100) * pixelBrigtnessPercent)
                ]
          );
        }
      }
      setImage(image.join(""));
      setLoaded(true);
    };
  }, []);

  return (
    <div className={classNames(styles["img-block"], indexstyles["border"])}>
      <div className={styles["img-loading"]}>
        {!loaded && <Loader type="braile" />}
      </div>
      <div
        style={{
          lineHeight: (props.size ? props.size / 1.6 : "0.5") + "rem",
          fontSize: (props.size ? props.size : "1") + "rem",
          aspectRatio: props.width / props.height,
        }}
        className={styles["img-display-wrapper"]}
      >
        {image}
      </div>
      {props.alt && <em className={styles["img-alt"]}>{props.alt}</em>}
    </div>
  );
};
