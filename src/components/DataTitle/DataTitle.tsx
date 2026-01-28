import React, { useEffect, useRef, useState } from "react";
import styles from "./DataTitle.module.scss";
import cn from "classnames";

interface DataTitleI {
  activeDot: number;
}

export const DataTitle: React.FC<DataTitleI> = (props) => {
  const { activeDot } = props;
  const [value, setValue] = useState(1927);
  const targetValue = 1955;
  const animationRef = useRef<number | null>(null);

  const animateNumber = (start: number, end: number, duration: number) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.round(start + (end - start) * progress);
      setValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleStartAnimation = () => {
    animateNumber(1927, targetValue, 230); // 2000 мс = 2 секунды
  };

  useEffect(() => {
    handleStartAnimation();
  }, [activeDot]);
  return (
    <div className={styles.historyBlockDataContent}>
      <h3
        className={cn(
          styles.historyBlockDataContentTitle,
          styles.historyBlockDataContentTitleLeft,
        )}
      >
        {value}
      </h3>
      <h3
        className={cn(
          styles.historyBlockDataContentTitle,
          styles.historyBlockDataContentTitleRight,
        )}
      >
        2022
      </h3>
    </div>
  );
};
