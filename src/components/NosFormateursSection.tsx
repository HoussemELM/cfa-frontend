import { useState, useEffect, useMemo } from 'react';
import { curved_lines } from "@/utils/assets";
import "./NosFormateurSection.scss";
import { teachers } from "@/utils/data";
import EmployeeCard from "./EmployeeCard";

const NosFormateursSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px',
      threshold: 0.5,
    });

    const sectionRef = document.getElementById('nos_formateur');
    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => {
      if (sectionRef) {
        observer.unobserve(sectionRef);
      }
    };
  }, []);

  const renderedTeachers = useMemo(() => {
    return teachers.map((teacher, index) => (
      <EmployeeCard key={index} employee={teacher} />
    ));
  }, []);

  return (
    <div id="nos_formateur" className={`nos-formateurs-section ${isVisible ? 'visible' : ''}`}>
      <div className="bn">
        <img src={curved_lines} alt="Curved lines" />
      </div>

      <div className="highlight">Nos Formateurs</div>

      <div className="section-title">Rencontrez Notre Expert Formateur</div>

      <div className="formateurs">{renderedTeachers}</div>
    </div>
  );
};

export default NosFormateursSection;