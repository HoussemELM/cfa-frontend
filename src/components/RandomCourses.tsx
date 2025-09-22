import React from 'react';
import { CourseService } from '@/services/CourseService';
import useCachedRandomCourses from '@/hooks/useCachedRandomCourses';
import CourseCard from './CourseCard';
import { FaRandom } from 'react-icons/fa';
import './RandomCourses.scss';

interface RandomCoursesProps {
  title?: string;
  subtitle?: string;
}

const RandomCourses: React.FC<RandomCoursesProps> = ({ 
  title = "Découvrez Nos Cours", 
  subtitle = "Une sélection aléatoire de nos formations disponibles pour élargir vos compétences professionnelles" 
}) => {
  const courseService = CourseService.getInstance();
  const { courses, loading, refreshCourses } = useCachedRandomCourses(courseService, 4);

  return (
    <div className="random-courses-container relative w-full h-full">
      <div className="random-courses-header">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <button 
          className="refresh-button"
          onClick={refreshCourses}
          aria-label="Rafraîchir les cours"
        >
          <FaRandom /> Nouvelles suggestions
        </button>
      </div>

      {loading ? (
        <div className="random-courses-loading">
          <div className="spinner"></div>
          <p>Chargement des formations...</p>
        </div>
      ) : (
        <div className="random-courses-grid">
          {courses.map(course => (
            <div key={course.id} className="random-course-item">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomCourses;