"use client";

import { FC } from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { RatingPropTypes } from "@/app/types/components.type";
import styles from "./style.module.scss";

const renderStars = (rating: number, index: number) => {
  if (rating >= index + 1) return <FaStar key={index} className={styles.star} />;
  if (rating > index) return <FaRegStarHalfStroke key={index} className={styles.star} />;
  return <FaRegStar key={index} className={styles.star} />;
};

const Rating: FC<RatingPropTypes> = ({ rating, maxStars = 5 }) => (
  <div className={styles.rating}>
    {Array.from({ length: maxStars }, (_, index) => renderStars(rating, index))}
  </div>
);

export default Rating;

