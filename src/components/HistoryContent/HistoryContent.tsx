import { useEffect, useState } from "react";
import styles from "./HistoryContent.module.scss";
import { SwiperData } from "../SwiperData/SwiperData";
import { circleContent } from "./content";
import { DataTitle } from "../DataTitle/DataTitle";
import { Circle } from "../Circle/Circle";
import { CircleSlider } from "../CircleSlider/CircleSlider";

export const HistoryContent = () => {
  const [activeDot, setActiveDot] = useState<number>(0);

  const [startData, setStartData] = useState<number>(
    circleContent[0].dataFirst,
  );
  const [endData, setEndData] = useState<number>(circleContent[0].dataSecond);
  const [text, setText] = useState<string | undefined>();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 670);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.historyContent}>
        <DataTitle
          activeDot={activeDot}
          startData={startData}
          endData={endData}
          text={text}
        />
        <div className={styles.historyContentLine}></div>
        <Circle
          setStartData={setStartData}
          setEndData={setEndData}
          setText={setText}
          circleContent={circleContent}
          activeDot={activeDot}
          setActiveDot={setActiveDot}
        />
      </div>
      <CircleSlider
        activeDot={activeDot}
        setActiveDot={setActiveDot}
        length={circleContent.length}
        isMobile={isMobile}
      />
      <SwiperData
        content={circleContent[activeDot].contentList}
        activeDot={activeDot}
        isMobile={isMobile}
      />
    </>
  );
};
