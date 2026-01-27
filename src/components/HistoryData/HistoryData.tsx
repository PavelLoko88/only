import styles from "./HistoryData.module.scss";
import cn from "classnames";
export const HistoryData = () => {
  const numberOfPoints = 3; // Количество точек

  const radius = 100; // Радиус окружности (в px)
  const center = radius; // Центр окружности (по X и Y)
  const size = radius * 2; // Размер блока, равен диаметру

  const points = Array.from({ length: numberOfPoints }).map((_, index) => {
    const angle = ((2 * Math.PI) / numberOfPoints) * index; // угол точки
    const x = center + radius * Math.cos(angle) - 5; // смещение по X (учитываем размер точки)
    const y = center + radius * Math.sin(angle) - 5; // смещение по Y
    return { x, y };
  });
  return (
    <div className={styles.historyBlock}>
      <div className={styles.historyBlockHeader}>
        <div className={styles.historyBlockHeaderColor}></div>
        <h2 className={styles.historyBlockHeaderTitle}>
          Исторические <br /> даты
        </h2>
      </div>

      <div className={styles.historyBlockData}>
        <h3
          className={cn(
            styles.historyBlockDataTitle,
            styles.historyBlockDataTitleLeft,
          )}
        >
          2015
        </h3>
        <h3
          className={cn(
            styles.historyBlockDataTitle,
            styles.historyBlockDataTitleRight,
          )}
        >
          2022
        </h3>
      </div>

      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          border: "2px solid black",
          boxSizing: "border-box",
        }}
      >
        {points.map((point, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: point.y,
              left: point.x,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "red",
            }}
          />
        ))}
      </div>
    </div>
  );
};
