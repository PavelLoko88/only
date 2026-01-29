import { FC, useEffect, useState } from "react";
import styles from "./Circle.module.scss";
import { Content } from "../HistoryContent/content";
import cn from "classnames";
interface Point {
  x: number;
  y: number;
}

interface CircleI {
  setStartData: (index: number) => void;
  setEndData: (index: number) => void;
  setText: (index: string | undefined) => void;
  circleContent: Content[];
  activeDot: number;
  setActiveDot: (index: number) => void;
}

export const Circle: FC<CircleI> = (props) => {
  const {
    setStartData,
    setEndData,
    setText,
    circleContent,
    activeDot,
    setActiveDot,
  } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotate, setRotate] = useState<number>(65);

  const rotateDefault: number = 65;
  const numberOfPoints: number = circleContent.length;
  const radius: number = 265;
  const center: number = radius;
  const size: number = radius * 2;
  //координаты
  const points: Point[] = Array.from({ length: numberOfPoints }).map(
    (_, index) => {
      const angle = ((2 * Math.PI) / numberOfPoints) * index;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    },
  );

  const clickCircle = (index: number) => {
    setStartData(circleContent[index].dataFirst);
    setEndData(circleContent[index].dataSecond);
    if (circleContent[index].text !== undefined) {
      setText(circleContent[index].text);
    }
  };

  useEffect(() => {
    if (activeDot === 0) {
      setRotate(65);
    } else {
      const newRotate2: number =
        rotateDefault + (360 / numberOfPoints) * activeDot;
      setRotate(newRotate2);
    }
    clickCircle(activeDot);
  }, [activeDot]);

  return (
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
  );
};
