import ReviewCard from "./ReviewCard";
import "./ReviewSection.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReviewService from "@/services/ReviewService";
import { ReviewModel } from "@/models/ReviewModel";

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [translateX, setTranslateX] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(278);
  const [minTranslateX, setMinTranslateX] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewService = ReviewService.getInstance();
        const fetchedReviews = await reviewService.getAllReviews();
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const updateScrollAmount = () => {
      const screenWidth = window.innerWidth;
      setScrollAmount(screenWidth <= 600 ? screenWidth - 32 : 278);
    };

    const updateMinTranslateX = () => {
      const screenWidth = window.innerWidth;
      let newMinTranslateX = 0;
      if (screenWidth > 1024) {
        if(reviews.length<=3)
          newMinTranslateX = 0 * scrollAmount;
        else
        newMinTranslateX = -(reviews.length - 3) * scrollAmount;
      } else if (screenWidth > 600 && screenWidth <= 1024) {
        if(reviews.length<=2)
        newMinTranslateX = 0 * scrollAmount;
        else
        newMinTranslateX = -(reviews.length - 2) * scrollAmount;
      } else {
        if(reviews.length<=1)
          newMinTranslateX = 0 * scrollAmount;
        else
        newMinTranslateX = -(reviews.length - 1) * scrollAmount - 40;
      }
      setMinTranslateX(newMinTranslateX);
    };

    updateScrollAmount();
    updateMinTranslateX();
    window.addEventListener("resize", updateScrollAmount);
    window.addEventListener("resize", updateMinTranslateX);
    return () => {
      window.removeEventListener("resize", updateScrollAmount);
      window.removeEventListener("resize", updateMinTranslateX);
    };
  }, [reviews.length]);

  const scrollLeft = () => setTranslateX((prev) => Math.min(prev + scrollAmount, 0));
  const scrollRight = () => setTranslateX((prev) => Math.max(prev - scrollAmount, minTranslateX));

  return (
    <div id="review_section" className="py-12">
      <header className="flex md:items-center gap-2 md:gap-4 px-4 lg:px-20 flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-2">
          <span className="highlight">Témoignages & Avis</span>
          <h2 className="section-title max-w-xl">
          Des témoignages inspirants
          </h2>

        </div>
        <div className="gap-4 hidden md:flex">
          <button
            onClick={scrollLeft}
            className="bg-r rounded-full p-0 flex items-center justify-center text-white w-10 h-10"
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-r rounded-full p-0 flex items-center justify-center text-white w-10 h-10"
          >
            <FaChevronRight className="h-5 w-5" />
          </button>
        </div>
      </header>
      <div
        id="my-carousel"
        className="carousel bg-primary w-[100%] min-h-[55vh] flex flex-row justify-start overflow-hidden space-x-12 md:space-x-6  px-5 py-8  md:w-[85%] md:py-20 md:px-9 m-auto md:mr-0 md:ml-auto rounded-l md:rounded-r-none md:rounded-l-md"
      >
        {reviews.map((element, i) => (
          <ReviewCard
            key={i}
            review={element}
            translateX={translateX}
          />
        ))}
      </div>
      <div className="mt-8 self-center justify-center gap-8 flex md:hidden">
          <button
            onClick={scrollLeft}
            className="bg-r rounded-full p-0 flex items-center justify-center text-white w-10 h-10"
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-r rounded-full p-0 flex items-center justify-center text-white w-10 h-10"
          >
            <FaChevronRight className="h-5 w-5" />
          </button>
        </div>
    </div>
  );
};

export default ReviewSection;
