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
    <div className={styles.slider}>
      <p className={styles.sliderText}>{`${activeDot + 1}/${length}`}</p>
      <div className={styles.sliderButtons}>
        <button
          className={cn(
            styles.sliderButton,
            activeDot === 0 && styles.sliderButtonDisable,
          )}
          onClick={backPoint}
        >
          {isMobile ? <MobArrow /> : <Arrow />}
        </button>
        <button
          className={cn(
            styles.sliderButton,
            styles.sliderButtonRight,
            activeDot === length - 1 && styles.sliderButtonDisable,
          )}
          onClick={nextPoint}
        >
          {isMobile ? <MobArrow /> : <Arrow />}
        </button>
      </div>
    </div>
  );
};
