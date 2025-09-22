import { useEffect, useState, useRef } from "react";
import { CourseService } from "@/services/CourseService";
import CourseModel from "@/models/CourseModel";

const useCachedRandomCourses = (courseService: CourseService, count: number = 4) => {
  const isFetched = useRef(false);
  const [courses, setCourses] = useState<CourseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Always fetch fresh data on initial load
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await courseService.getRandomCourses(count);
        setCourses(fetchedCourses);
        isFetched.current = true;
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching random courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseService, count]);

  const refreshCourses = async () => {
    try {
      setLoading(true);
      const fetchedCourses = await courseService.getRandomCourses(count);
      setCourses(fetchedCourses);
    } catch (err) {
      setError(err as Error);
      console.error("Error refreshing random courses:", err);
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, refreshCourses };
};

export default useCachedRandomCourses;