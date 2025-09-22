import "./NousCard.scss";
export interface NousCardType{
    title:string;
    img:string;
    content?:string;
    isReverse?:boolean;
    keyFeatures?:{key:string;feature:string}[]
}
const NousCard = ({props}:{props:NousCardType}) => {
  return (
    <div className={`nous-card ${props.isReverse?"r":""}`}>
      <div className="icon">
      <img src={props.img} alt="" />

      </div>
      <div className="title">{props.title}</div>
     {props.content && <p>
      {props.content}
      </p>}
      {
        props.keyFeatures && <div className="flex flex-col gap-1 items-start">
        {props.keyFeatures.map(v=><p><span className="font-semibold text-gray-800">{v.key}</span>: {v.feature}</p>)}
      </div>
      }
    </div>
  )
}

export default NousCard
