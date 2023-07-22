import styles from "./Option.module.css";

export const Option = ({ text, handleClick, colour }) => {
  return (
    <div className={styles.option}>
      <button
        className={styles[colour] || ""}
        onClick={() => handleClick(text)}
      >
        {text}
      </button>
    </div>
  );
};
