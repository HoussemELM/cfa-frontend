import { useMemo, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import "./PaginationSection.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CourseCard from "./CourseCard";
import CourseModel from "@/models/CourseModel";

const PaginationSection = ({isLoading,courses,error}:{isLoading:boolean,courses:CourseModel[],error:any}) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalResults = courses.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const scrollToSection = useCallback(() => {
    const paginationSection = document.getElementById('pagination');
    if (paginationSection) {
      const mainElement = document.getElementById('main');
      if (mainElement) {
        const sectionTop = paginationSection.offsetTop;
        mainElement.scrollTo({
          top: sectionTop - 180,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  const goToPage = (page:number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToSection();
    }
  };
  const currentItems = useMemo(
    () => courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [currentPage, courses]
  );

  if (isLoading) {
    return (
      <section id="pagination" className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl">Loading courses...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pagination" className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-red-500">Error: {error.message}</div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section id="pagination" className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl">No courses found</div>
      </section>
    );
  }

  return (
    <section id="pagination">
      <span className="result">
        <strong>{totalResults}</strong> results for "IT & data"
      </span>
      <div className="courses">
        <AnimatePresence>
          {currentItems.map((item) => (
            <CourseCard key={item.id} course={item} />
          ))}
        </AnimatePresence>
      </div>
      {totalPages > 1 && (
        <div className="pagination-controls flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <FaArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`pagination-btn ${i + 1 === currentPage ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default PaginationSection;
