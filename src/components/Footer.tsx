import { FaLocationCrosshairs, FaX } from "react-icons/fa6";
import "./Footer.scss";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { navElements } from "../utils/data";
import { Link } from "react-router-dom";
import { footer_logo } from "../utils/assets";
const Footer = () => {
  return (
    <footer>
        <div className="main">
        <div className="infos">
          <article id="adress">
            <div className="icon-circle"><FaLocationCrosshairs/></div>
            <div className="data">
              <span className="data-title">Adress:</span>
              <h4>Paris,France</h4>
            </div>
          </article>
          <article id="phone">
            <div className="icon-circle"><FaPhone/></div>
            <div className="data">
              <span className="data-title">Phone:</span>
              <h4>+33 6 19 02 61 10</h4>
            </div>
          </article>
          <article id="email">
            <div className="icon-circle"><FaEnvelope/></div>
            <div className="data">
              <span className="data-title">Email:</span>
              <h4>contact@gmail.com</h4>
            </div>
          </article>
        </div>
        <div className="overview">
          <div>
            <img className="logo" src={footer_logo}/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit</p>
            <div className="social-media">
              <a href="#"><FaLinkedin/></a>
              <a href="#"><FaFacebook/></a>
              <a href="#"><FaInstagram/></a>
              <a href="#"><FaX/></a>
            </div>
          </div>
          <div>
            <h4>Liens Rapide</h4>
            <ul>
              {navElements.map((e,i)=><i key={i}><Link to={e.href}>{e.name}</Link></i>)}
            </ul>
          </div>
          <div>
          <h4>Privacy Policy</h4>
          <ul>
            <li>Privacy policy Center</li>
            <li>FAQ</li>
          </ul>

          </div>
      
        </div>
        </div>
        <div className="rights">
          Copyright © 2024 || All Rights Reserved
        </div>
    </footer>
  )
}

export default Footer
