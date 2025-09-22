import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./CategoriesCheckboxes.scss";

interface OptionType {
  id: string;
  name: string;
  count?: number;
}

interface CheckboxesSectionProps {
  title: string;
  options: OptionType[];
  initialOpen?: boolean;
  onSelectionChange?: (selection: string[]) => void;
  selectedItems:string[];
  setSelectedItems:React.Dispatch<React.SetStateAction<string[]>>;
  toggleSelection: (id: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>, onSelectionChange?: (selection: string[]) => void) => void;
}

const AnimateHeight: React.FC<{ isVisible: boolean; children: React.ReactNode }> = ({ isVisible, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (isVisible) {
          setHeight(entry.contentRect.height);
        }
      }
    });

    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setHeight(0);
    } else if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible]);

  return (
    <div className="animate-height" style={{ height: `${height}px`, overflow: "hidden", transition: "height 0.3s ease" }}>
      <div ref={contentRef} className="animate-height-content">{children}</div>
    </div>
  );
};


const CheckboxesSection: React.FC<CheckboxesSectionProps> = ({
  title,
  options = [],
  initialOpen = true,
  onSelectionChange,
  toggleSelection,
  setSelectedItems,
  selectedItems
}) => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState<boolean>(initialOpen);

  const toggleMainDropdown = useCallback(() => {
    setMainDropdownOpen((prev) => !prev);
  }, []);

  return (
    <div className="checkbox-section">
      <div onClick={toggleMainDropdown} className="name-btn" aria-expanded={mainDropdownOpen}>
        <span className="name-btn__text">{title}</span>
        <ChevronDown className={`name-btn__icon ${mainDropdownOpen ? "is-open" : ""}`} />
      </div>

      <AnimateHeight isVisible={mainDropdownOpen}>
        {options.length > 0 ? (
          <ul className="subcategory-list">
            {options.map((item) => (
              <li key={item.id} className="subcategory-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelection(item.id, selectedItems, setSelectedItems, onSelectionChange)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">{item.name}</span>
                  {item.count !== undefined && <span className="checkbox-count">{item.count}</span>}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm flex justify-center py-2">Aucune option disponible</p>
        )}
      </AnimateHeight>
    </div>
  );
};

export default CheckboxesSection;