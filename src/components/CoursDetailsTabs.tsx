import React, { useState } from "react";
import "./CoursDetailsTabs.scss";

export interface TabType {
  element: React.ReactNode;
  title: string;
}

const CoursDetailsTabs = ({ tabs }: { tabs: TabType[] }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="course_tabs">
      <div className="tabs_navigation">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab_button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab_content">
        {tabs[activeTab].element}
      </div>
    </div>
  );
};

export default CoursDetailsTabs;

