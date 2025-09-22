import { FaArrowRight} from "react-icons/fa";
import { motion } from "framer-motion";
import "./AvenirBanner.scss";
import { BiPlay } from "react-icons/bi";

const AvenirBanner = () => {
  return (
    <motion.div
      className="banner"
      id="avenir-banner"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      
    >
      <motion.div
        className="content px-8 sm:px-16 md:px-32 flex flex-col gap-4 md:flex-row w-full h-full items-center justify-center md:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center  md:justify-start md:items-start 4 w-full md:w-1/3 text-center md:text-left space-y-4"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="highlight text-white">Nos Offres</div>
          <div className="section-title text-white text-2xl md:text-4xl font-bold">
            Investissez en Votre Avenir avec Nos Formations
          </div>
          <motion.div
            className="slide-btn mt-4 text-primary bg-white inline-flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrez Nos Offres <span className="icon-button ml-2"><FaArrowRight /></span>
          </motion.div>
        </motion.div>
        <motion.div
          className="play-btn"
          whileHover={{ scale: 1.1}}
          transition={{ type: "spring", stiffness: 100 }}
        > 
        <BiPlay color="white"/>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AvenirBanner;
