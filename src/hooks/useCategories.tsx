import { useEffect, useState } from "react";
import CategoryModel from "@/models/CategoryModel";
import CategoryService from "@/services/CategoryService";

const useCategories = () => {
  const [categories, setCategories] = useState<CategoryModel[]>(() => {
    const cachedCategories = localStorage.getItem("categories");
    return cachedCategories ? JSON.parse(cachedCategories) : [];
  });

  const [loading, setLoading] = useState(categories.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (categories.length > 0) return; 

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoryService = CategoryService.getInstance();
        const fetchedCategories = await categoryService.getAllCategories();
        setCategories(fetchedCategories);
        localStorage.setItem("categories", JSON.stringify(fetchedCategories));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
