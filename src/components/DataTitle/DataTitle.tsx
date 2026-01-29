import React, { useEffect, useRef, useState } from "react";
import styles from "./DataTitle.module.scss";
import cn from "classnames";

interface DataTitleI {
  activeDot: number;
  startData: number;
  endData: number;
  text: string | undefined;
}

export const DataTitle: React.FC<DataTitleI> = (props) => {
  const { startData, endData } = props;
  // ЛЕВАЯ ДАТА
  const [valueFirst, setValueFirst] = useState<number>(1900);
  const newFirstValue = startData;
  // ПРАВАЯ
  const [valueSecond, setValueSecond] = useState<number>(1900);
  const newSecondValue = endData;

  const animationRefFirst = useRef<number | null>(null);
  const animationRefSecond = useRef<number | null>(null);

  const animateNumber = (
    start: number,
    end: number,
    duration: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    animationRef: React.RefObject<number | null>,
  ) => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.round(start + (end - start) * progress);
      setValue(currentValue);
      if (progress < 1) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleStartAnimationFirst = () => {
    if (startData !== undefined) {
      animateNumber(
        valueFirst,
        newFirstValue,
        230,
        setValueFirst,
        animationRefFirst,
      );
    }
  };

  const handleStartAnimationSecond = () => {
    if (endData !== undefined) {
      animateNumber(
        valueSecond,
        newSecondValue,
        230,
        setValueSecond,
        animationRefSecond,
      );
    }
  };

  useEffect(() => {
    handleStartAnimationFirst();
  }, [startData]);

  useEffect(() => {
    handleStartAnimationSecond();
  }, [endData]);

  return (
    <div className={styles.historyData}>
      <h3 className={cn(styles.historyDataTitle, styles.historyDataTitleLeft)}>
        {valueFirst}
      </h3>
      <h3 className={cn(styles.historyDataTitle, styles.historyDataTitleRight)}>
        {valueSecond}
      </h3>
    </div>
  );
};
