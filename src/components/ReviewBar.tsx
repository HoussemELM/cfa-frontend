import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ReviewModel from "../models/RatingModel";
import "./ReviewBar.scss";

const ReviewBar = ({ review }: { review: ReviewModel }) => {
  const { rating, count } = review;

  const formatCount = (num: number) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  return (
    <div className="review-bar">
      <div className="stars">{renderStars()}</div>
      {review.count>0 && <span className="count">{formatCount(count)}</span>}
    </div>
  );
};

export default ReviewBar;
