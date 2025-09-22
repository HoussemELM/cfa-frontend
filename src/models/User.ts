export default interface User {
    id: string;
    name: string;
    secondname?: string;
    username?: string;
    collectionId:string;
    email?: string;
    emailVisibility?: boolean;
    phone?: string;
    avatar?: string;
    role?: "teacher" | "student" | "admin";
    description?: string;
    enrolled_courses?: string[];
    verified?: boolean;
    created?: Date;
    updated?: Date;
  }
  