import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./PopularSection.scss";
import CourseCard from "./CourseCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { motion, Variants } from "framer-motion";
import { dots } from "@/utils/assets";
import { Link } from "react-router-dom";
import { CourseService } from "@/services/CourseService";
import useCachedPopularCourses from "@/hooks/useCachedPopularCourses";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PopularSection: React.FC = () => {
  const courseService = CourseService.getInstance();
  const { courses } = useCachedPopularCourses(courseService);

  return (
    <motion.div
      id="popular"
      className="px-3 py-2 lg:p-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      transition={{ duration: 0.6 }}
    >
      <img src={dots} className="dots_image" />
      <span className="highlight">Les Plus Populaires</span>

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 mb-6 space-y-6 md:space-y-0">
        <div className="section-title">Choisissez parmi nos formations les plus demandées</div>

        <Link to={"/formations"} className="slide-btn hidden sm:block space-x-2">
          <span>Explore More</span>
          <span className="icon-button"><FaArrowRight /></span>
        </Link>
      </header>

      <p className="lg:max-w-[75%]">
        Développez des compétences professionnelles reconnues grâce à des parcours adaptés aux besoins du marché.
      </p>

      <Carousel opts={{ align: "center" }} className="relative w-full h-full">
  <CarouselContent className="m-0 flex w-full gap-4 px-3 h-full snap-x snap-mandatory scrollbar-hide overflow-x-auto  ">
    {courses.map((course, i) => (
      <CarouselItem key={i} className="w-full p-0 pb-2 md:basis-1/2 lg:basis-1/3">
        <CourseCard course={course} />
      </CarouselItem>
    ))}
  </CarouselContent>

  {/* Left Scroll Button */}
  <CarouselPrevious className="absolute left-0 md:-left-3 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full">
    <FaArrowLeft size={24} />
  </CarouselPrevious>

  {/* Right Scroll Button */}
  <CarouselNext className="absolute right-0 md:-right-3 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full">
    <FaArrowRight size={24} />
  </CarouselNext>
</Carousel>


      <Link to={"/formations"} className="slide-btn block sm:hidden w-44 space-x-2 my-4">
        <span>Explore More</span>
        <span className="icon-button"><FaArrowRight /></span>
      </Link>
    </motion.div>
  );
};

export default PopularSection;
