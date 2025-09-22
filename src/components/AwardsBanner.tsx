import React, { useRef } from 'react';
import { certified, coursesIcon, curved_lines, earth_icon, enroll, learn } from "../utils/assets";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from 'swiper/modules';
import { motion, Variants, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import "./AwardsBanner.scss";

// Define types
interface AwardItem {
  icon: string;
  count: number;
  label: string;
}

// Award data
const awardItems: AwardItem[] = [
  { icon: learn, count: 8879, label: "Learners & counting" },
  { icon: coursesIcon, count: 3327, label: "Courses & Video" },
  { icon: certified, count: 6359, label: "Certified Students" },
  { icon: enroll, count: 7327, label: "Registered Enrolls" }
];

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const AwardsBanner: React.FC = () => {
  return (
    <div className="banner" id="awards-banner">
      <img src={earth_icon} alt="Earth icon" id="earth" />
      <img src={curved_lines} alt="Curved lines" id="curved_lines" />
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 2 },
          1024.1: { slidesPerView: 4 }
        }}
        className="award-container"
      >
        {awardItems.map((item, index) => (
          <SwiperSlide key={index}>
            <AwardItemComponent item={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Separate component for each award item
interface AwardItemComponentProps {
  item: AwardItem;
  index: number;
}

const AwardItemComponent: React.FC<AwardItemComponentProps> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="award-circle"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="icon-container">
        <span className="icon">
          <img src={item.icon} alt={item.label} />
        </span>
      </div>
      <h2>
        {isInView ? (
          <CountUp start={0} end={item.count} duration={2} separator="," />
        ) : (
          "0"
        )}
      </h2>
      <small>{item.label}</small>
    </motion.div>
  );
};

export default AwardsBanner;
