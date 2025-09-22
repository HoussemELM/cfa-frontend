import { motion } from "framer-motion";
import { BiAlarm, BiNotepad, BiUser } from "react-icons/bi";
import "./CourseCard.scss";
import ReviewBar from "./ReviewBar";
import { CourseModel } from "@/models/CourseModel";
import { Link } from "react-router-dom";
import { a1 } from "@/utils/assets";
import {  FILE_URL } from "@/utils/constants";

const formatNumber = (num: number) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'k';
  }
  return num.toString();
};

const CourseCard = ({ course }: { course: CourseModel }) => {
  return (
    <motion.div
      initial={{ scale: 0.0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{duration: 0.1,
        ease: "easeOut",}}     
      className="course-card"
    > <Link to={"/formations/"+course.id} className="w-full h-full">
      <img src={`${FILE_URL}/${course.collectionId}/${course.id}/${course.thumbnail}`} alt={course.title} />
      
      <div className="pl-2"><ReviewBar review={course.review} /></div>
      <h3 className="title">{course.title}</h3>
      <div className="info">
        <span><BiNotepad /> {course.course_count} Cours</span>
        <span><BiAlarm /> {course.duration ?? "N/A"}</span>
        <span><BiUser /> {formatNumber(course.students_enrolled ?? 0)} Etudiants</span>
      </div>
      <div className="actions">
        <div className="profile">
        {course.teacher[0].avatar ? (
            <img
              src={`${FILE_URL}/${course.teacher[0].collectionId}/${course.teacher[0].id}/${course.teacher[0].avatar}`}
              alt="Instructor 1"
            />
          ) : (
            <img src={a1} alt="Instructor 1" />
          )}
          <span className="name">{course.teacher[0].name}</span>
        </div>
        <Link to={"/formations/"+course.id}><button>Inscrivez-Vous</button></Link>
      </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;