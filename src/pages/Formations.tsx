import HeadingBanner from "../components/HeadingBanner";
import "./Formations.scss";
import CategoryCard from "../components/CategoryCard";
import React, { useState, useEffect, useMemo } from "react";
import PaginationSection from "@/components/PaginationSection";
import { FaFilter, FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import CheckBoxesSection from "@/components/filters/CheckBoxesSection";
import useCategories from "@/hooks/useCategories";
import useFormations from "@/hooks/useFormations";
const MemoizedCategoryCard = React.memo(CategoryCard);
const Formations = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { categories } = useCategories();
  const { courses, isLoading, error } = useFormations();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth > 600) setOpen(false);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);
  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };
  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        (selectedCategories.length === 0 || selectedCategories.includes(course.category)) &&
        (!searchQuery || course.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [courses, selectedCategories, searchQuery]);
  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth <= 600);
    if (window.innerWidth > 600) setOpen(false);
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  const openAndCloseFilterSection = () => {
    if (isMobile) setOpen(!isOpen);
  };

 
  return (
    <div id="formation_page">
      <HeadingBanner title="NOS FORMATIONS" path="/formations" />

      <section id="categories_section">
        <span className="highlight">Categories</span>
        <div className="section-title">Découvrir par catégories</div>
        <div className="categories"> {categories.map((category, i) => (
            <MemoizedCategoryCard
              key={i}
              category={category}
              selectedNames={selectedCategories}
              setSelected={toggleCategorySelection}
            />
          ))}</div>
      </section>

      <section id="explore_section">
        <header className="filter_header">
          <div className="flex items-center gap-4 h-11">
            <div
              onClick={openAndCloseFilterSection}
              className="flex items-center gap-2 bg-white px-3 h-full w-28 md:w-40 rounded-md shadow-sm cursor-pointer md:cursor-default"
            >
              <FaFilter className="text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Filter</span>
              <span className="ml-auto bg-cn text-primary rounded-full text-xs px-2 py-1">{selectedCategories.length}</span>
            </div>
            <div className="relative bg-white rounded-md shadow-sm h-full w-64 md:w-80">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full h-full text-sm border-none outline-none"
              />
            </div>
          </div>
        </header>

        <div className="items_container">
          <aside className={`filter_aside ${isOpen ? "open" : ""} fixed left-0 top-0 w-[100vw] h-[100vh] bg-white md:bg-transparent md:translate-y-0 md:static md:w-[100%] p-4 md:p-1 rounded-md`}>
            <button className="md:hidden" onClick={openAndCloseFilterSection}>
              <FaX />
            </button>
            <CheckBoxesSection title={"Categories"} options={categories.map((item) => ({ id: item.id, name: item.name }))} toggleSelection={toggleCategorySelection} selectedItems={selectedCategories} setSelectedItems={setSelectedCategories} />
            <CheckBoxesSection title={"Niveau"} options={[]} toggleSelection={()=>{}} selectedItems={[]} setSelectedItems={()=>{}} />
            <CheckBoxesSection title={"DURÉE"} options={[]} toggleSelection={()=>{}} selectedItems={[]} setSelectedItems={()=>{}}   />
            <CheckBoxesSection title={"cfa"} options={[]} toggleSelection={()=>{}} selectedItems={[]} setSelectedItems={()=>{}}  />
          </aside>
          <PaginationSection courses={filteredCourses} isLoading={isLoading} error={error} />
        </div>
      </section>
    </div>
  );
};

export default Formations;
