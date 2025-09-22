import LectureModel from "./LectureModel";

export interface SectionModel {
    id: string;
    collectionId: string;
    collectionName: string;
    created: Date;
    description: string;
    lectures: LectureModel[]; 
    name: string;
    thumbnail: string;
    updated: Date;
  }