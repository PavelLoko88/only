import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import cn from "classnames";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./SwiperData.module.scss";
import ArrowSwiper from "../../assets/svg/ArrowSwiper";
import { ContentList } from "../HistoryContent/content";

interface SwiperI {
  content: ContentList[];
  activeDot: number;
  isMobile: boolean;
}

export const SwiperData: React.FC<SwiperI> = (props) => {
  const { content, activeDot, isMobile } = props;

  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (content[activeDot]) {
      setAnimateOut(true);
      const timeout = setTimeout(() => {
        setAnimateOut(false);
      }, 230);
      return () => clearTimeout(timeout);
    }
  }, [activeDot, content]);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  return (
    <div
      className={cn(styles.swiper, animateOut ? styles.fadeOut : styles.fadeIn)}
    >
      {!isMobile && (
        <>
          <button
            className={cn(
              styles.swiperButton,
              styles.swiperButtonLeft,
              isBeginning && styles.swiperButtonOpacity,
            )}
            onClick={handlePrev}
          >
            <ArrowSwiper />
          </button>
          <button
            className={cn(
              styles.swiperButton,
              styles.swiperButtonRight,
              isEnd && styles.swiperButtonOpacity,
            )}
            onClick={handleNext}
          >
            <ArrowSwiper />
          </button>
        </>
      )}

      <Swiper
        slidesPerView={!isMobile ? 3 : "auto"}
        spaceBetween={content.length}
        grabCursor={true}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination]}
        pagination={isMobile ? { clickable: true } : false}
      >
        {content.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.swiperCard}>
              <h4 className={styles.swiperCardTitle}>{item.title}</h4>
              <p className={styles.swiperCardText}>{item.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
