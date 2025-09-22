import FaqSection from "@/components/FaqSection";
import HeadingBanner from "../components/HeadingBanner";
import "./Support.scss";
import { support,  phone_icon, faqSupport } from "@/utils/assets";
import { FaArrowRight } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
const Support = () => {
  return (
    <div id="support_page">
      <HeadingBanner title="Support & FAQ" path="/support"/>
      <FaqSection img={faqSupport}/>
      <section id="support-items">
        <div className="contact">
         <div className="data"> <h4>Adresse</h4>
          <p>localisation exemple</p>
          <Link to={"/contact"} className="slide-btn">
            Contact
            <span className="icon-button"><FaArrowRight/></span>
          </Link>
          </div>
          <img src={support} alt="" />
        </div>
        <div className="call">
       <div className="data">
       <h4>Support 24h/24</h4>
          <p>( + 33 6 19 02 61 10)</p>
          <div className="slide-btn">
          Appelez maintenant
            <span className="icon-button"><BiPhoneCall/></span>
          </div>
       </div>
       <img src={phone_icon} alt="" />
        </div>
      </section>
    </div>
  )
}
export default Support
