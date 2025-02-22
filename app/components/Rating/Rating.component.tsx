import { FC } from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { RatingProps } from "@/app/types/components.type";

const Rating: FC<RatingProps> = ({
  rating,
  maxStars = 5,
  size = "18px",
  color = "#FFD700"
}) => {
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (rating >= i + 1) {
      stars.push(<FaStar key={i} style={{ fontSize: size, color }} />);
    } else if (rating > i && rating < i + 1) {
      stars.push(<FaRegStarHalfStroke style={{ fontSize: size, color }} />);
    } else {
      stars.push(<FaRegStar style={{ fontSize: size, color }} />);
    }
  }

  return <div style={{ display: "flex", gap: "2px" }}>{stars}</div>;
};

export default Rating;