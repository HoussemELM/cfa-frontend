import { FaArrowRight } from "react-icons/fa";
import "./ExploreMore.scss";
import { dots, es1, es2, es3, es4, es5, es6, es7 } from "@/utils/assets";
const ExploreMore = () => {
  return (
    <section id="explore-more">
      <img src={es1} className="bg-img"/>
      <img src={es2} className="bg-img"/>
      <img src={es3} className="bg-img"/>
      <img src={es4} className="bg-img"/>
      <img src={es4} className="bg-img"/>
      <img src={es5} className="bg-img"/>
      <img src={es6} className="bg-img"/>
      <img src={es7} className="bg-img"/>
      <img src={dots} className="absolute top-[90%] w-40 md:w-auto left-0 -translate-x-4 translate-y-[-50%]" alt="" />
      <h3>Un accompagnement personnalisé</h3>
      <p>Chez CNF-France, nous analysons votre situation pour trouver la solution de financement la mieux
adaptée. Que vous soyez salarié, en reconversion ou à la recherche d’un emploi, nous vous aidons à
concrétiser votre projet de formation.</p>
         <div className="slide-btn">
          Explore More
          <span className="icon-button"><FaArrowRight/></span>
         </div>
    </section>
  )
}

export default ExploreMore
