import "./PartnersBanner.scss";
import { partner1, partner2, partner3, partner4, partner5, partner6 } from "@/utils/assets";

const PartnersBanner = () => {
  const partners = [partner1, partner2, partner3, partner4, partner5, partner6];


  return (
    <div id="partners_banner">
      <div className="highlight">Partenaires</div>
      <div className="section-title">Partenaires de Confiance, Réussite Partagée</div>
       <div className="partners">
       {partners.map((item, index) => (
              <img src={item} alt={`partner-${index + 1}`} />
        ))}
       </div>
    </div>
  );
};

export default PartnersBanner;
