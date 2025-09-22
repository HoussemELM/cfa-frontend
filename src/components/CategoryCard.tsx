import CategoryModel from "@/models/CategoryModel";
import "./CategoryCard.scss";

type CategoryCardProps = {
  category: CategoryModel;
  selectedNames: string[]; 
  setSelected: (name: string) => void;
};

const CategoryCard = ({ category, selectedNames, setSelected }: CategoryCardProps) => {
  const { name, id } = category;
  const isSelected = selectedNames.includes(id);

  return (
    <div
      onClick={() => setSelected(id)}
      className={`category_card bg-cn ${isSelected ? "selected" : ""}`}
    >
      <div className="h5">{name}</div>
    </div>
  );
};

export default CategoryCard;