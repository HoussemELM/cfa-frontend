import { faqs } from "@/utils/data";
import "./FaqSection.scss";
import FaqModel from "@/models/FaqModel";
import React, { useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";  // Import Framer Motion

interface FaqItemProps extends FaqModel {
  isExpanded: boolean;
  onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, content, isExpanded, onToggle }) => {
  return (
    <motion.div
      onClick={onToggle}
      className={`bg-white rounded-lg overflow-hidden shadow-md border transition-all duration-300 ${
        isExpanded ? "max-h-96" : "max-h-20"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className={`flex justify-between items-start p-3 md:p-4 cursor-pointer ${
          isExpanded ? "text-white bg-primary" : "text-secondary"
        }`}
      >
        <div className="text-xl font-semibold">{question}</div>
        {isExpanded ? <FaMinus /> : <FaPlus />}
      </div>
      <div
        className={`px-5 p-2 md:p-5 overflow-hidden transition-all duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
};

const FaqSection = ({ img }: { img: string }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="gallery">
        <motion.img
          src={img}
          alt="Decorative"
          className="max-w-full h-auto object-cover rounded-lg"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        />
      </div>
      <div className="content">
        <motion.div
          className="highlight text-primary uppercase font-bold text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.div>
        <motion.div
          className="section-title text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Questions fréquentes sur nos formations
        </motion.div>
        <div className="flex flex-col gap-3 w-full">
          {faqs.map((element) => (
            <FaqItem
              key={element.id}
              id={element.id}
              question={element.question}
              content={element.content}
              isExpanded={expandedId === element.id}
              onToggle={() => handleToggle(element.id)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FaqSection;
