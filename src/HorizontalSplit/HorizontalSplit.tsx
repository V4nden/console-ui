import styles from "./HorizontalSplit.module.css";

type Props = { text: string };

export const HorizontalSplit = (props: Props) => {
  return (
    <div className={styles["horizontal-split-wrapper"]}>
      <div className={styles["horizontal-split-text"]}>{props.text}</div>
    </div>
  );
};
