import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, FolderTree } from "lucide-react";
import CategoryModel from "@/models/CategoryModel";

interface CategoriesCheckboxSectionProps {
  title: string;
  categories: CategoryModel[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

interface AnimateHeightProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const AnimateHeight: React.FC<AnimateHeightProps> = ({ isVisible, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (isVisible) {
            setHeight(entry.contentRect.height);
          }
        }
      });

      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setHeight(0);
    } else if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible]);

  return (
    <div 
      className="transition-[height] duration-300 overflow-hidden"
      style={{ height: `${height}px`, transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div ref={contentRef} className="w-full relative">
        {children}
      </div>
    </div>
  );
};

const CategoriesCheckboxSection: React.FC<CategoriesCheckboxSectionProps> = ({
  title,
  categories,
  onSelectionChange
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = useCallback((category: CategoryModel) => {
    setSelectedCategories((prev) => {
      const updated = {
        ...prev,
        [category.id]: !prev[category.id]
      };
      
      const selectedIds = Object.entries(updated)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => id);
      
      onSelectionChange?.(selectedIds);
      return updated;
    });
  }, [onSelectionChange]);

  return (
    <div className="bg-white rounded-[3px] mb-8 border border-slate-200/20 shadow-[0_1px_3px_rgba(0,0,0,0.05)] font-['Inter']">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full hover-effect flex items-center justify-between px-4 py-3 border-b border-slate-200/20"
      >
        <div className="flex items-center space-x-2">
          <FolderTree className="w-5 h-5 text-gray-600" />
          <span className="text-[#1D2026] font-medium uppercase tracking-[0.025em]">{title}</span>
          <span className="bg-gray-100/50 text-xs px-2 py-1 rounded-full text-gray-600">
            {categories.length}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-[#75787A] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimateHeight isVisible={isOpen}>
        <div className="border-t border-slate-200/20">
          <div className="divide-y divide-slate-200/20">
            {categories.map((category, index) => (
              <label
                key={category.id}
                className={`
                  flex items-center justify-between p-3 hover-effect cursor-pointer
                  ${selectedCategories[category.id] ? 'bg-indigo-50/50' : ''}
                `}
                style={{
                  animation: `slideDown 0.3s ease-out forwards ${index * 0.05}s`
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories[category.id] || false}
                    onChange={() => handleCheckboxChange(category)}
                    className="checkbox-custom"
                  />
                  <span className={`text-sm ${
                    selectedCategories[category.id] 
                      ? 'text-[#1D2026] font-medium' 
                      : 'text-[#75787A]'
                  }`}>
                    {category.name}
                  </span>
                </div>
                <div className="text-xs text-[#75787A] px-1.5 py-0.5">
                  {new Date(category.updated).toLocaleDateString()}
                </div>
              </label>
            ))}
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default CategoriesCheckboxSection;