import ContactSection from "@/components/ContactSection";
import HeadingBanner from "../components/HeadingBanner";
import "./Contact.scss";
const Contact = () => {
  return (
    <div id="contact_page">
      <HeadingBanner title="Nous Sommes a Votre Ecoute" path="/contact"/>
      <ContactSection/>
    </div>
  )
}

export default Contact
