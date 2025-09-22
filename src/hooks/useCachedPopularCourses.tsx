import { useEffect, useState, useRef } from "react";
import { CourseService } from "@/services/CourseService";
import CourseModel from "@/models/CourseModel";

const useCachedPopularCourses = (courseService: CourseService) => {
  const isFetched = useRef(false);
  const [courses, setCourses] = useState<CourseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Always fetch fresh data on load
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await courseService.getFirstNCourses(4);
        setCourses(fetchedCourses);
        isFetched.current = true;
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching popular courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseService]);

  return { courses, loading, error };
};

export default useCachedPopularCourses;
