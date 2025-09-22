import TReviewBar from "./TReviewBar";
import "./ReviewCard.scss";
import { ReviewModel } from "@/models/ReviewModel";
import { a1 } from "@/utils/assets";
import { FILE_URL } from "@/utils/constants";

const ReviewCard = ({
  review,
  translateX,
  
}: {
  review: ReviewModel;
  translateX: number;
}) => {
  return (
    <div
      className="review_card flex-shrink-0"
      style={{
        transform: `translateX(${translateX}px)`,
        transition: "transform 0.3s ease",
      }}
    >
      <p className="review_text">"{review.review}"</p>
      <TReviewBar rating={review.rating} />
      <div className="reviewer_info">
        {review.user.avatar ?
        <img
        src={`${FILE_URL}/${review.user.collectionId}/${review.user.id}/${review.user.avatar}`}
        alt={`${review.user.name}'s picture`}
        className="reviewer_image"
      />:<img
      src={a1}
      alt={`${review.user.name}'s picture`}
      className="reviewer_image"
    />
      }
       
        <h5 className="reviewer_name">{review.user.name}</h5>
        <span className="reviewer_job">Student</span>
      </div>
    </div>
  );
};

export default ReviewCard;
