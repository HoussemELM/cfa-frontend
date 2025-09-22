import User from "./User";

export interface ReviewModel {
  id: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  rating: number;
  review: string;
  updated: Date;
  user: User;
}