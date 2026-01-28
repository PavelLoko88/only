import { useEffect, useState } from "react";
import styles from "./HistoryData.module.scss";
import cn from "classnames";
import { DataTitle } from "../DataTitle/DataTitle";

interface Point {
  x: number;
  y: number;
}

export const HistoryData: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(65);

  const rotateDefault: number = 65;
  const numberOfPoints: number = 10;
  const radius: number = 265;
  const center: number = radius;
  const size: number = radius * 2;
  const points: Point[] = Array.from({ length: numberOfPoints }).map(
    (_, index) => {
      const angle = ((2 * Math.PI) / numberOfPoints) * index;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    },
  );

  useEffect(() => {
    if (activeDot === 0) {
      setRotate(65);
    } else {
      const newRotate2: number =
        rotateDefault + (360 / numberOfPoints) * activeDot;
      setRotate(newRotate2);
    }
  }, [activeDot]);

  return (
    <div className={styles.historyBlock}>
      <div className={styles.historyBlockHeader}>
        <div className={styles.historyBlockHeaderColor}></div>
        <h2 className={styles.historyBlockHeaderTitle}>
          Исторические <br /> даты
        </h2>
      </div>

      <div className={styles.historyBlockData}>
        <div className={styles.historyBlockDataLine}></div>

        
        <DataTitle activeDot={activeDot}/>

        <div
          className={styles.circle}
          style={{
            width: size,
            height: size,

            transform: `rotate(-${rotate}deg)`,
          }}
        >
          {points.map((point, index) => (
            <div
              key={index}
              className={cn(
                styles.circleDot,
                activeDot === index && styles.circleDotActive,
              )}
              style={{
                top: point.y,
                left: point.x,
                transformOrigin: "center",
                cursor: "pointer",
                width: hoveredIndex === index ? "56px" : "10px",
                height: hoveredIndex === index ? "56px" : "10px",
                transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveDot(index)}
            >
              <p className={styles.circleDotText}>{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
