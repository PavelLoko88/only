import React, { FC } from "react";
import Arrow from "../../assets/svg/Arrow";
import MobArrow from "../../assets/svg/MobArrow";
import cn from "classnames";
import styles from "./CircleSlider.module.scss";

interface CircleSliderI {
  activeDot: number;
  setActiveDot: (index: number) => void;
  length: number;
  isMobile: boolean;
}

export const CircleSlider: FC<CircleSliderI> = (props) => {
  const { activeDot, setActiveDot, length, isMobile } = props;

  const nextPoint = () => {
    if (activeDot !== length) {
      setActiveDot(activeDot + 1);
    }
  };
  const backPoint = () => {
    if (activeDot !== 0) {
      setActiveDot(activeDot - 1);
    }
  };
  return (
    <div className={styles.circleSlider}>
      <p className={styles.circleSliderText}>{`${activeDot + 1}/${length}`}</p>
      <div className={styles.circleSliderButtons}>
        <button
          className={cn(
            styles.circleSliderButton,
            activeDot === 0 && styles.circleSliderButtonDisable,
          )}
          onClick={backPoint}
        >
          {isMobile ? <MobArrow /> : <Arrow />}
        </button>
        <button
          className={cn(
            styles.circleSliderButton,
            styles.circleSliderButtonRight,
            activeDot === length - 1 && styles.circleSliderButtonDisable,
          )}
          onClick={nextPoint}
        >
          {isMobile ? <MobArrow /> : <Arrow />}
        </button>
      </div>
    </div>
  );
};
