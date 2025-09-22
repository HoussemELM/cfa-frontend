import { FaPlay } from "react-icons/fa";
import {  img1, img2, img3, sponsor1, sponsor2, sponsor3, sponsor4, sponsor5} from "../utils/assets.ts";
import "./Hero.scss";
import {motion} from "framer-motion";
const Hero = () => {
  return (
    <section id="hero">
      <div className="circle green"></div>
      <div className="circle seafoam"></div>
      <div className="circle yellow"></div>
      <div className="circle peachy "></div>
      <div className="circle orange"></div>
      <div className="circle red"></div>
      <div className="circle teal"></div>
      <div className="circle blue "></div>
      <div className="circle grey"></div>
      <div className="circle rose"></div>
      <div className="head">
      <div className="details">
        <h1>Transformez votre avenir avec des formations 100% financées.</h1>
        <p>Découvrez des programmes certifiés RNCP pour accéder aux métiers de demain, accessibles à tous et soutenus par des financements publics.
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Rechercher une formation"/>
          <button>Rechercher</button>
        </div>
      </div>
      <div className="gallery">
        <motion.div
        initial={{ y: 0 }}
        animate={{
          y: [-11, 0, -11],
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"}}}
        className="play-container">
        <button className="play-button"><FaPlay/></button>
        </motion.div>
        <motion.div 
  className="budge"
  initial={{ y: 0 }}
  animate={{
    y: [-11, 0, -11],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"}}}>
  <h4>2.k</h4>
  <p>Success Courses</p>
</motion.div>
      <img loading="eager" className="i1" src={img1} alt="" />
      <img loading="eager" className="i2" src={img2} alt="" />
      <img loading="eager" className="i3" src={img3} alt="" />
      </div>
      </div>
      <div className="logos">
        <img loading="eager" src={sponsor1} />
        <img loading="eager" src={sponsor2} />
        <img loading="eager" src={sponsor3} />
        <img loading="eager" src={sponsor4} />
        <img loading="eager" src={sponsor5} />
      </div>
    </section>
  );
}

export default Hero;
