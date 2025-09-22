import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import "./NousSection.scss";
import { a1, a2, a3, a4, dots } from "@/utils/assets";
interface NousSectionType{
  title:string;
  content:React.ReactNode;
  img:string;
  buttontext:string;
  subtitle:string;
  amount:number;
  reverse?:boolean

}
function formatNumber(amount:number) {
  if (amount >= 1e6) {
      return (amount / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (amount >= 1e3) {
      return (amount / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return amount.toString();
}
const NousSection = ({title,content,img,buttontext,reverse,amount,subtitle}:NousSectionType) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      id="nous"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="nous-section"
    >
      {reverse? <>
      <motion.div className="content" variants={fadeInUp}>
        <motion.div className="highlight" variants={fadeInUp}>
          Qui Sommes Nous?
        </motion.div>

        <motion.span className="section-title" variants={fadeInUp}>
          {title}
        </motion.span>
        {content}
        <motion.button className="slide-btn" variants={fadeInUp}>
          {buttontext} <span className="icon-button"><FaArrowRight /></span>
        </motion.button>
      </motion.div>
      <motion.div
        className="gallery r"
        variants={fadeInUp}
      >
        <img src={img} alt="Gallery image" />
        <div className="w-[50%] md:w-[37%] h-[100%] md:h-[90%]  bg-primary -right-1 rounded-sm absolute top-0 md:top-5 z-0"></div>
        <img src={dots} alt="" className="dots" />
        <div className="etudiants">
          <div className="data">
            <span className="count">{formatNumber(amount)}</span>
            <span>{subtitle}</span>
          </div>
        </div>
      </motion.div>
</>:<><motion.div
        className="gallery"
        variants={fadeInUp}
      >
        <img src={img} alt="Gallery image" className="" />
        <img src={dots}  alt="" className="dots" />
        <div className="w-[50%] md:w-[37%] h-[90%] md:h-[90%] -left-1 bg-primary top-0 md:top-5 rounded-sm absolute"></div>
        <div className="etudiants">
          <div className="data">
            <span className="count">{formatNumber(amount)}</span>
            <span>{subtitle}</span>
          </div>
          <div className="imgs">
            <img src={a1} alt="" />
            <img src={a2} alt="" />
            <img src={a3} alt="" />
            <img src={a4} alt="" />
          </div>
        </div>
      </motion.div>

      <motion.div className="content" variants={fadeInUp}>
        <motion.div className="highlight" variants={fadeInUp}>
          Qui Sommes Nous?
        </motion.div>

        <motion.span className="section-title" variants={fadeInUp}>
          {title}
        </motion.span>
        {content}
        <motion.button className="slide-btn" variants={fadeInUp}>
          Explore More <span className="icon-button"><FaArrowRight /></span>
        </motion.button>
      </motion.div>
</>}
          </motion.div>
  );
};
export default NousSection;
