import { FaArrowRight } from "react-icons/fa";
import { motion, useInView, Variants } from "framer-motion";
import React, { useRef } from "react";
import "./CfaSection.scss";
import { dots } from "@/utils/assets";

interface CfaSectionType{
  title:string;
  contect:React.ReactNode;
  img:string;
  flipped?:boolean;
  reverse?:boolean;
  isDots?:boolean;
}

const CfaSection = ({title,contect,img,flipped,reverse,isDots}:CfaSectionType) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div id="cfa" className={reverse?"reverse":""} ref={ref}>
     {!flipped?
     <><motion.div
          className="content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInRight}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">CFA</span>
          <motion.div
            className="section-title"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.div>
          <motion.p variants={fadeInUp} transition={{ duration: 0.6, delay: 0.4 }}>
            {contect}
          </motion.p>
          <motion.button
            className="slide-btn"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Explore More <span className="icon-button"><FaArrowRight /></span>
          </motion.button>
        </motion.div><motion.div
          className="gallery"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
            <img src={img} alt="Gallery" />
            <div className="h-[105%] w-[45%]  md:h-[105%] md:w-[35%] absolute bg-primary -right-2 rounded-sm"></div>
          </motion.div></>
     
     : 
     <>
     <motion.div
          className="gallery f"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
            {isDots && <img className="dots z-0 md:w-[30%] md:h-[30%] -top-3 right-0 md:-right-6 absolute " src={dots} />}
            <img src={img} alt="Gallery" />
           {
            !reverse? <div className="h-[105%] w-[45%]  md:h-[101%] md:w-[35%] absolute bg-primary left-0 rounded-sm"></div>:
            <div className="h-[105%] w-[45%]  md:h-[101%] md:w-[35%] absolute bg-r left-0 rounded-sm"></div>
           }
          </motion.div>
     <motion.div
          className="content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInRight}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">CFA</span>
          <motion.div
            className="section-title"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.div>
          <motion.p variants={fadeInUp} transition={{ duration: 0.6, delay: 0.4 }}>
            {contect}
          </motion.p>
          <motion.button
            className="slide-btn"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Explore More <span className="icon-button"><FaArrowRight /></span>
          </motion.button>
        </motion.div></>
     }
      
    </div>
  );
};

export default CfaSection;
