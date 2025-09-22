import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaArrowRight, FaClock, FaFacebook, FaInstagram, FaBars, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./Header.scss";
import { FaPerson, FaPhoneFlip } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { navElements } from "../utils/data";
import { logo } from "../utils/assets";

const Header = ({navigation=true}:{navigation:boolean}) => {
  const [menuOpen, setMenuOpen] = useState(false);
 
  const staggerVariants: Variants = {
    hidden: { opacity: 0, skew: 10 },
    visible: {
      opacity: 1,
      skew: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, skew: 10 },
    visible: { 
      opacity: 1, 
      skew: 0,
      transition: { 
        duration: 0.5 
      } 
    },
  };

  const parallaxVariants: Variants = {
    offscreen: { 
      y: 100, 
      opacity: 0 
    },
    onscreen: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        bounce: 0.4, 
        duration: 0.8 
      } 
    },
  };

  const slideVariants: Variants = {
    hidden: { 
      x: -50, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5 
      } 
    },
  };

  return (
    <motion.header 
      id="header"
      initial="hidden"
      animate="visible"
      variants={staggerVariants}
    >
      <motion.div 
        id="header-info" 
        variants={childVariants}
      >
        <motion.div variants={parallaxVariants} initial="offscreen" animate="onscreen">
          <span className="h-travail">
            <FaClock className="header-info-icon" /> Heure de travail: Lundi-Vendredi 9am-5pm
          </span>
          <span>
            <FaPhoneFlip className="header-info-icon" /> +33 6 19 02 61 10
          </span>
        </motion.div>
        <motion.div variants={parallaxVariants} initial="offscreen" animate="onscreen">
          <span className="conect">
            <FaPerson className="header-info-icon" /> Se connecter / S'inscrire
          </span>
          <hr />
          <span>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </span>
        </motion.div>
      </motion.div>
      
      <motion.nav variants={childVariants}>
        {navigation ? 
        <Link to="/">
        <motion.div 
          className="logo" 
          variants={slideVariants}
        >
          <img loading="eager" src={logo} alt="Logo" />
        </motion.div>
        </Link>:
        <div>
        <motion.div 
          className="logo" 
          variants={slideVariants}
        >
          <img loading="eager" src={logo} alt="Logo" />
        </motion.div>
        </div>
        }
        <motion.ul 
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          {navigation && navElements.map((e, i) => (
            <motion.li 
              key={i} 
              variants={childVariants}
            >
              <Link to={e.href}>{e.name}</Link>
            </motion.li>
          ))}
        </motion.ul>
        
       {navigation && <motion.div 
          className="actions" 
          variants={slideVariants}
        >
          <Link to={"/contact"} className="slide-btn">
            <span>Contact</span>
            <div className="icon-button">
              <FaArrowRight />
            </div>
          </Link>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FaBars />}
          </button>
        </motion.div>}
      </motion.nav>
     
      <ul 
        className={`nav__items ${menuOpen ? "active" : ""}`} 
        id="nav-items"
      >
        {[...navElements, { name: "Contact", href: "/contact" }].map((e, i) => (
          <li 
            key={i} 
          >
            <Link onClick={() => setMenuOpen(false)} to={e.href}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </motion.header>
  );
};
export default Header;