import { FaTeamspeak } from "react-icons/fa";
import "./EmployeeCard.scss";
import EmployeeModel from "@/models/EmployeeModel";

const EmployeeCard = ({ employee }: { employee: EmployeeModel }) => {
  return (
    <article
      className="employee-card"
    >
      <img src={employee.img} alt={employee.fullname} />
      <div className="details">
        <span><FaTeamspeak /></span>
        <h4>{employee.fullname}</h4>
        <small>{employee.role}</small>
      </div>
    </article>
  );
};

export default EmployeeCard;
