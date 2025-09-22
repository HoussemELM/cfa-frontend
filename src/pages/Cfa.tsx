import CfaSection from "@/components/CfaSection";
import HeadingBanner from "../components/HeadingBanner";
import "./Cfa.scss";
import PartnersBanner from "@/components/PartnersBanner";
import ContactSection from "@/components/ContactSection";
import { cfa1, cfa2 } from "@/utils/assets";
const Cfa = () => {
  return (
    <div id="cfa_page">
      <HeadingBanner title="CFA" path="/cfa"/>
      <CfaSection title="Le Centre De Formation D'apprentis" img={cfa1} contect={<>Nous sommes un centre de formation dédié à l'excellence et à l'accompagnement personnalisé.
          Depuis 2023, notre mission est de fournir des formations innovantes et accessibles qui
          permettent à chaque apprenant de se développer et de réussir dans un monde en constante
          évolution.
          <br/>
          <br />
          Découvrez la voie qui vous correspond et atteignez vos objectifs grâce à des formations
          adaptées à vos besoins.</>} />
        <PartnersBanner/>
        <CfaSection title={"Le Centre De Formation D'apprentis"} contect={<>Nous sommes un centre de formation dédié à l'excellence et à l'accompagnement personnalisé.
          Depuis 2023, notre mission est de fournir des formations innovantes et accessibles qui
          permettent à chaque apprenant de se développer et de réussir dans un monde en constante
          évolution.
          <br/>
          <br />
          Découvrez la voie qui vous correspond et atteignez vos objectifs grâce à des formations
          adaptées à vos besoins.</>} img={cfa2} flipped reverse/>
          <ContactSection/>
    </div>
  )
}

export default Cfa;
