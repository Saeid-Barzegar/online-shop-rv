"use client";

import { FC } from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { RatingProps } from "@/app/types/components.type";
import styles from "./style.module.scss";

const Rating: FC<RatingProps> = ({
  rating,
  maxStars = 5,
}) => {
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (rating >= i + 1) {
      stars.push(<FaStar key={i} className={styles.star} />);
    } else if (rating > i && rating < i + 1) {
      stars.push(<FaRegStarHalfStroke key={i} className={styles.star} />);
    } else {
      stars.push(<FaRegStar key={i} className={styles.star} />);
    }
  }

  return <div className={styles.rating}>{stars}</div>;
};

export default Rating;
