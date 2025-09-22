import "./FinancementSection.scss";
import {motion, Variants} from "framer-motion"
import { FaArrowRight } from 'react-icons/fa';
import { dots, finance1 } from '@/utils/assets';
const FinancementSection = () => {
    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      };
      const textFadeIn: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { delay: 0.2, duration: 0.6, staggerChildren: 0.15 }
        },
      };
      
      const imgScale: Variants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
      };
  return (
    <motion.section
        id="financement"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="content" variants={textFadeIn} viewport={{ once: true }}>
          <motion.span className="highlight" variants={textFadeIn}>
            Financement
          </motion.span>
          <motion.div className="section-title" variants={textFadeIn}>
            Financement : Investissez en Votre Avenir
          </motion.div>
          <motion.p variants={textFadeIn}>
          Chez CNF-France, nous mettons tout en œuvre pour que la formation professionnelle soit accessible à tous.
Grâce à de nombreux dispositifs de financement, vous pouvez vous former sans contrainte financière et
préparer votre avenir sereinement</motion.p>
          <motion.span className="list-title" variants={textFadeIn}>Key :</motion.span>
          <motion.ul variants={textFadeIn}>
            <li>Le Compte Personnel de Formation (CPF)</li>
            <li>Aide Individuelle à la Formation (AIF)</li>
            <li>Le Plan de Développement des Compétences</li>
            <li>Dispositifs spécifiques</li>
          </motion.ul>
          <motion.button
            className="slide-btn"
            transition={{ type: "spring", stiffness: 300 }}
          >
            Explore More<span className="icon-button"><FaArrowRight /></span>
          </motion.button>
        </motion.div>
        
        <div className="gallery">
          <motion.img
            className="dots_icon"
            src={dots}
            alt=""
            initial="rest"
            whileHover="hover"
            variants={imgScale}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={finance1}
            alt=""
            initial="rest"
            whileHover="hover"
            variants={imgScale}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          />
          <motion.div id="red-rec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}></motion.div>
        </div>
      </motion.section>
  )
}

export default FinancementSection
