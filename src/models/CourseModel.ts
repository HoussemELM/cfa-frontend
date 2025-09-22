import { Duration } from "./Duration";
import RatingModel from "./RatingModel";
import { ReviewModel } from "./ReviewModel";
import { SectionModel } from "./SectionModel";
import User from "./User";

export interface RequirementsModel {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  name: string;
  type: string;
  updated: string;
}

export interface CourseModel {
  id: string;
  title: string;
  subtitle?: string;
  name?: string;
  review: RatingModel;
  category: string;
  course_count?: number;
  duration?: Duration;
  language: string;
  isCertified: boolean;
  collectionId:string;
  certification?: string;
  price: number;
  apercu: string;
  reviews: ReviewModel[];
  teacher: User[]; 
  students_enrolled: number;
  isCompleted: boolean;
  progress: number;
  totalReviews: number;
  requirements: RequirementsModel[];
  sections: SectionModel[];
  thumbnail?: string;
  created: Date;
  updated: Date;
}








export default CourseModel;