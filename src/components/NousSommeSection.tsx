import { mission, valeur, vision } from "@/utils/assets";
import NousCard, { NousCardType } from "./NousCard";
import "./NousSommeSection.scss";
const NousSommeSection = () => {
    const cards : NousCardType[] = [
            {title:"Mission",img:mission
              ,content:`Offrir à chacun les moyens de réussir sa carrière grâce à des formations accessibles, certifiées, et
adaptées aux évolutions du marché. Chez CNF-France, nous croyons que chaque individu mérite une
chance de développer ses compétences et d'accéder à des opportunités professionnelles valorisantes.`},
            {title:"VISION",img: vision 
              ,content:`Chez CNF, nous imaginons un futur où chacun peut évoluer librement dans sa carrière grâce à des
formations accessibles et adaptées. Nous aspirons à bâtir un environnement où la montée en
compétences est non seulement une possibilité, mais une évidence`,isReverse:true},
            {title:"VALEURS",img:valeur
              ,keyFeatures:[
                { key: "Excellence", feature: "Nous offrons des formations certifiées et reconnues pour maximiser le succès de nos apprenants." },
                { key: "Accessibilité", feature: "Nous rendons la formation accessible à tous grâce à un financement adapté et une approche inclusive." },
                { key: "Engagement", feature: "Nous accompagnons nos apprenants avec bienveillance et détermination tout au long de leur parcours." }
              ]
              }
    ];
  return (
    <section id='somme_nous'>
        <span className="highlight">Qui Sommes nous</span>
        <div className="section-title">Mission, Vision, Valeurs</div>
        <div className="flex flex-col gap-5 items-center md:flex-row md:justify-center">
            {cards.map((c,i)=>(
                <NousCard key={i} props={c} />
            ))}
        </div>
    </section>
  )
}

export default NousSommeSection
