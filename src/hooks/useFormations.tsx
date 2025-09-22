import { useEffect, useState } from "react";
import { CourseService } from "@/services/CourseService";
import CourseModel from "@/models/CourseModel";
import { ClientResponseError } from "pocketbase";

const useFormations = () => {
  const [courses, setFormations] = useState<CourseModel[]>(() => {
    const cachedFormations = localStorage.getItem("courses");
    return cachedFormations ? JSON.parse(cachedFormations) : [];
  });
  const courseService = CourseService.getInstance();
  const [isLoading, setLoading] = useState(courses.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (courses.length > 0) return; 

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const courses = await courseService.getAllCourses(); 
        setFormations(courses);
      } catch (err) {
        if (err instanceof ClientResponseError && err.isAbort) {
          return; 
        }
        setError(err instanceof Error ? new Error(err.message) : new Error('Failed to fetch courses'));
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, isLoading, error };
};

export default useFormations;
