import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

const AvenirBanner = React.lazy(() => import('../components/AvenirBanner'));
const ReviewSection = React.lazy(() => import('../components/ReviewSection'));
const FinancementSection = React.lazy(() => import('../components/FinancementSection'));
const NosFormateursSection = React.lazy(() => import('../components/NosFormateursSection'));
const AwardsBanner = React.lazy(() => import('../components/AwardsBanner'));
const CfaSection = React.lazy(() => import('../components/CfaSection'));
const FaqSection = React.lazy(() => import('../components/FaqSection'));

import Hero from "../components/Hero";
import NousSection from "../components/NousSection";
import PopularSection from "@/components/PopularSection";

import "./Home.scss";
import { cfaHome, faqHome, nousHome } from '@/utils/assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "tween", 
      duration: 0.5 
    } 
  },
};

const Home: React.FC = React.memo(() => {
  return (
    <div id="home">
      <Hero />
      <PopularSection />
      
      <Suspense fallback={<div>Loading...</div>}>
        <NousSection
          img={nousHome}
          buttontext=""
          amount={3005}
          subtitle="Etudiants"
          title="Notre Mission, Votre Reussite"
          content={<>
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
          </>} 
        />

        <CfaSection 
          title="Le Centre De Formation D'apprentis" 
          img={cfaHome} 
          contect={`Nous sommes un centre de formation dédié à l'excellence et à l'accompagnement personnalisé. Depuis 2023, notre mission est de fournir des formations innovantes et accessibles qui permettent à chaque apprenant de se développer et de réussir dans un monde en constante évolution.`} 
        />

        <AwardsBanner />
        <FinancementSection />
        <AvenirBanner />
        <ReviewSection />
        <FaqSection img={faqHome} />
        <NosFormateursSection />
      </Suspense>
    </div>
  );
});

export default Home;