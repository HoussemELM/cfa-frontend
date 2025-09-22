import FinancementSection from "@/components/FinancementSection";
import HeadingBanner from "../components/HeadingBanner";
import "./Financement.scss";
import AvenirBanner from "@/components/AvenirBanner";
import CfaSection from "@/components/CfaSection";
import {finance2 } from "@/utils/assets";
import PartnersBanner from "@/components/PartnersBanner";
import ExploreMore from "@/components/ExploreMore";
import FinancingSolutions from "@/components/FinancementSolutions";
const Financement = () => {
  return (
    <div id="financement_page">
      <HeadingBanner title="Financement" path="/financement"/>
      <FinancementSection/>
      <FinancingSolutions/>
      <AvenirBanner/>
      <CfaSection isDots title={"Le Centre De Formation D'apprentis"} contect={<>Nous sommes un centre de formation dédié à l'excellence et à l'accompagnement personnalisé.
          Depuis 2023, notre mission est de fournir des formations innovantes et accessibles qui
          permettent à chaque apprenant de se développer et de réussir dans un monde en constante
          évolution.
          <br/>
          <br />
          Découvrez la voie qui vous correspond et atteignez vos objectifs grâce à des formations
          adaptées à vos besoins.</>} img={finance2} flipped/>
          <PartnersBanner/>
          <ExploreMore/>
    </div>
  )
}

export default Financement
