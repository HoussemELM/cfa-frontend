import { useState, useEffect } from 'react';
import { CourseService } from '@/services/CourseService';
import CategoryService from '@/services/CategoryService';
import CourseModel from '@/models/CourseModel';
import CategoryModel from '@/models/CategoryModel';

interface UseCachedCourseReturn {
  formation: CourseModel | null;
  category: CategoryModel | null;
  courseLoading: boolean;
  categoryLoading: boolean;
  courseError: Error | null;
}

export const useCachedCourse = (
  courseId: string, 
  courseService: CourseService,
  categoryService: CategoryService
): UseCachedCourseReturn => {
  const [formation, setFormation] = useState<CourseModel | null>(null);
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [courseError, setCourseError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCourseLoading(true);
        const courseData = await courseService.getCourseById(courseId);
        setFormation(courseData);
        
        if (courseData.category) {
          setCategoryLoading(true);
          const categoryData = await categoryService.getCategoryById(courseData.category);
          setCategory(categoryData);
          setCategoryLoading(false);
        }
        
        setCourseError(null);
      } catch (error) {
        setCourseError(error instanceof Error ? error : new Error('Failed to fetch course'));
      } finally {
        setCourseLoading(false);
      }
    };

    fetchData();
  }, [courseId, courseService, categoryService]);

  return { formation, category, courseLoading, categoryLoading, courseError };
};