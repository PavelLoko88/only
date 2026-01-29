import styles from "./HistoryData.module.scss";

export const HistoryData: React.FC = () => {
  return (
    <div className={styles.historyHeader}>
      <div className={styles.historyHeaderColor}></div>
      <h2 className={styles.historyHeaderTitle}>
        Исторические <br /> даты
      </h2>
    </div>
  );
};
