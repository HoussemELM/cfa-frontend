import NousSommeSection from "@/components/NousSommeSection";
import HeadingBanner from "../components/HeadingBanner";
import "./Apropos.scss";
import PartnersBanner from "@/components/PartnersBanner";
import AvenirBanner from "@/components/AvenirBanner";
import ReviewSection from "@/components/ReviewSection";
import ContactSection from "@/components/ContactSection";
import {motion} from "framer-motion";
import NousSection from "@/components/NousSection";
import { group1} from "@/utils/assets";
const Apropos = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  return (
    <div id="apropos">
      <HeadingBanner title="Qui sommes nous ?" path="/apropos"/>
      <NousSection 
      img={group1} reverse
      buttontext="Voir nos formations" amount={2400} subtitle="Success Courses"
      title="Notre Mission, Votre Reussite"  content={<>
                    <motion.p 
                      initial="hidden" 
                      animate="visible" 
                      variants={fadeInUp}
                    >
                      Chez CNF-France, nous sommes bien plus qu’un centre de formation. Nous sommes une équipe
      passionnée, dédiée à accompagner les individus dans leur développement professionnel et personnel.
      Depuis notre création, nous avons pour ambition de démocratiser l’accès à des formations de qualité,
      certifiées RNCP et alignées sur les besoins actuels du marché de l’emploi.
      <br className="mb-1"/>
      CNF s'engage à fournir des formations innovantes et accessibles, permettant à chaque apprenant de
      se développer et de réussir dans un monde en constante évolution.
                     </motion.p>
                    
                    <motion.div 
                      className="our" 
                      initial="hidden" 
                      animate="visible" 
                      variants={fadeInUp}
                    >
                      <div className="feature">
                        <span className="subtitle">MISSION:</span>
                        <p>Offrir à chacun les moyens de réussir sa carrière grâce à des formations accessibles, certifiées, et
adaptées aux évolutions du marché. Chez CNF-France, nous croyons que chaque individu mérite une
chance de développer ses compétences et d'accéder à des opportunités professionnelles valorisantes.
                        </p>
                      </div>
                      <div className="feature">
                        <span className="subtitle">VISION:</span>
                        <p>Chez CNF, nous imaginons un futur où chacun peut évoluer librement dans sa carrière grâce à des
formations accessibles et adaptées. Nous aspirons à bâtir un environnement où la montée en
compétences est non seulement une possibilité, mais une évidence.</p>
                      </div>
                    </motion.div>
                  </>} />
      <NousSommeSection/>
      <div className="container mx-auto p-4">
  <div className="grid grid-cols-1 md:grid-cols-2 py-12 gap-6 md:gap-12">
    <div>
      <h2 className="text-lg font-semibold text-primary mb-4">Ce que nous faisons:</h2>
      <div className="space-y-4">
        <div>
          <span className="text-md font-semibold text-gray-800">Accompagnement personnalisé :</span>
          <p className="sm:text-sm   text-gray-700">Nous guidons nos apprenants à chaque étape de leur parcours
          pour garantir leur réussite.</p>
        </div>
        <div>
          <span className="text-md font-semibold text-gray-800">Formation de qualité :</span>
          <p className="text-sm text-gray-700">Tous nos programmes sont certifiés RNCP et reconnus par l'État, alliant
          théorie et pratique.</p>
        </div>
        <div>
          <span className="text-md font-semibold text-gray-800">Accessibilité pour tous : </span>
          <p className="text-sm text-gray-700">Grâce à des dispositifs de financement publics, nos formations sont 100%
          financées pour la majorité des apprenants.</p>
        </div>

        <p className="text-md text-gray-800">Ensemble, nous construisons l’avenir professionnel de nos apprenants, avec passion et engagement</p>
      </div>
    </div>
    
    <div>
      <h2 className="text-lg font-semibold text-primary mb-4">Nos priorités :</h2>
      <div className="space-y-4">
        <div>
          <span className="text-md font-semibold text-gray-800">Un avenir inclusif :</span>
          <p className="text-sm text-gray-700">Offrir des solutions de formation sans barrières, pour permettre à chacun de
          révéler son potentiel.</p>
        </div>
        <div>
          <span className="text-md font-semibold text-gray-800">Une excellence continue :</span>
          <p className="text-sm text-gray-700">Anticiper les besoins du marché pour préparer nos apprenants aux
          métiers de demain.</p>
        </div>
        <div>
          <span className="text-md font-semibold text-gray-800">Un impact durable :</span>
          <p className="text-sm text-gray-700">Contribuer activement à la transformation des compétences pour répondre
          aux défis sociaux, économiques et environnementaux.</p>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* <NosFormateursSection/> */}
      <PartnersBanner/>
      <AvenirBanner/>
      <ReviewSection/>
      <ContactSection/>
    </div>
  )
}

export default Apropos
