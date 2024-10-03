import { useEffect, useState } from "react";
import { Loader } from "./Loader";

type Props = {
  src: string;
  width: number;
  height: number;
  size?: number;
  alt?: string;
};

export const ASCIImage = (props: Props) => {
  const [image, setImage] = useState(
    Array(props.width * props.height)
      .fill(" ")
      .map((el, index) => (index % props.width == 0 ? `${el}\n` : el))
      .join("")
  );
  const [loaded, setLoaded] = useState(false);
  const gradient = `                            .-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@`;
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS if needed
    img.src = props.src; // Specify your image path

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
              ? gradient[pixelBrigtnessPercent] + "\n"
              : gradient[pixelBrigtnessPercent]
          );
        }
      }
      setImage(image.join(""));
      setLoaded(true);
    };
  }, []);

  return (
    <div className="border border-white/75  text-center m-2 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {!loaded && <Loader type="braile" />}
      </div>
      <div
        style={{
          lineHeight: (props.size ? props.size / 2 : "0.5") + "vw",
          fontSize: (props.size ? props.size : "1") + "vw",
        }}
        className="whitespace-pre-wrap w-fit"
      >
        {image}
      </div>
      {props.alt && <em className="text-xs text-white/75">{props.alt}</em>}
    </div>
  );
};
