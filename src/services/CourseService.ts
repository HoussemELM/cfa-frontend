import CourseModel, { RequirementsModel } from "../models/CourseModel";
import { ReviewModel } from "@/models/ReviewModel";
import User from "@/models/User";
import { API_URL } from "@/utils/constants";
import { calculateDuration } from "@/utils/functions";
import { SectionModel } from "@/models/SectionModel";
import LectureModel from "@/models/LectureModel";
import ReviewService from "./ReviewService";

export class CourseService {
  private static instance: CourseService;
  private constructor() {}

  public static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }
    return CourseService.instance;
  }

  private async fetchCollection(collection: string, id?: string, filter?: string): Promise<any[]> {
    let url = `${API_URL}/api/collections/${collection}/records`;
    const params: string[] = [];
    if (id) url += `/${id}`;
    if (filter) params.push(`filter=${encodeURIComponent(filter)}`);
    if (params.length > 0) url += `?${params.join("&")}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${collection}`);
    const data = await res.json();
    return id ? [data] : data.items;
  }

  async createCourse(course: Omit<CourseModel, "id" | "created" | "updated">): Promise<CourseModel> {
    const res = await fetch(`${API_URL}/api/collections/courses/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    if (!res.ok) throw new Error("Failed to create course");
    return await res.json();
  }

  async getCourseById(id: string): Promise<CourseModel> {
    try {
      const [course] = await this.fetchCollection("courses", id);

      const [reviews, requirements, teachers, sections] = await Promise.all([
        this.getReviewsByIds(course.reviews || []),
        this.getRequirementsByIds(course.requirements || []),
        this.getUsersByIds(course.teacher || []),
        this.getSectionsByIds(course.sections || []),
      ]);

      return {
        id: course.id,
        title: course.title,
        subtitle: course.subtitle,
        name: course.name,
        collectionId: course.collectionId,
        review: {
          rating: course.rating || 0,
          count: course.totalReviews || 0,
        },
        category: course.category,
        duration: calculateDuration(course.startDate, course.endDate),
        language: course.language || "Français",
        isCertified: course.isCertified || false,
        certification: course.certification,
        price: course.price || 0,
        apercu: course.description,
        reviews,
        teacher: teachers,
        students_enrolled: course.students_enrolled || 0,
        isCompleted: course.isCompleted || false,
        progress: course.progress || 0,
        totalReviews: course.totalReviews || 0,
        requirements: requirements.filter((r) => !["name", "email", "phonenumber", "yearJoinedUni"].includes(r.name)),
        sections: sections || [],
        thumbnail: course.thumbnail,
        created: new Date(course.created),
        updated: new Date(course.updated),
      };
    } catch (error) {
      throw new Error("Failed to fetch course details");
    }
  }

  async getAllCourses(): Promise<CourseModel[]> {
    try {
      const courses = await this.fetchCollection("courses");

      const allReviewIds = courses.flatMap((c) => c.reviews);
      const allRequirementIds = courses.flatMap((c) => c.requirements);
      const allTeacherIds = courses.flatMap((c) => c.teacher);
      const allSectionsIds = courses.flatMap((c) => c.sections);

      const [allReviews, allRequirements, allTeachers, allSections] = await Promise.all([
        this.getReviewsByIds(allReviewIds),
        this.getRequirementsByIds(allRequirementIds),
        this.getUsersByIds(allTeacherIds),
        this.getSectionsByIds(allSectionsIds),
      ]);

      return courses.map((course) => {
        const reviews = allReviews.filter((r) => course.reviews.includes(r.id));
        const requirements = allRequirements.filter((r) => course.requirements.includes(r.id));
        const teachers = allTeachers.filter((t) => course.teacher.includes(t.id));
        const sections = allSections.filter((s) => course.sections.includes(s.id));

        return {
          id: course.id,
          img: course.thumbnail || "",
          title: course.title,
          subtitle: course.subtitle,
          name: course.name,
          collectionId: course.collectionId,
          review: {
            rating: course.rating,
            count: course.totalReviews,
          },
          category: course.category,
          course_count: course.course_count,
          duration: calculateDuration(course.startDate, course.endDate),
          language: course.language || "Français",
          isCertified: course.isCertified || false,
          certification: course.certification,
          price: course.price || 0,
          apercu: course.description,
          reviews,
          teacher: teachers,
          students_enrolled: course.students_enrolled,
          isCompleted: course.isCompleted,
          progress: course.progress,
          totalReviews: course.totalReviews,
          requirements: requirements.filter((r) => !["name", "email", "phonenumber", "yearJoinedUni"].includes(r.name)),
          sections,
          thumbnail: course.thumbnail,
          created: new Date(course.created),
          updated: new Date(course.updated),
        } as CourseModel;
      });
    } catch (error) {
      throw error;
    }
  }

  async getFirstNCourses(n: number): Promise<CourseModel[]> {
    const all = await this.getAllCourses();
    return all.slice(0, n);
  }
  
  async getRandomCourses(n: number): Promise<CourseModel[]> {
    const all = await this.getAllCourses();
    // Shuffle the array using Fisher-Yates algorithm
    const shuffled = [...all];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
  }

  async updateCourse(id: string, courseData: Partial<CourseModel>): Promise<CourseModel> {
    const res = await fetch(`${API_URL}/api/collections/courses/records/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    });
    if (!res.ok) throw new Error("Failed to update course");
    const course = await res.json();

    const [reviews, requirements, teachers] = await Promise.all([
      this.getReviewsByIds(course.reviews || []),
      this.getRequirementsByIds(course.requirements || []),
      this.getUsersByIds(course.teacher || []),
    ]);

    return {
      id: course.id,
      thumbnail: course.thumbnail || "",
      title: course.title,
      subtitle: course.subtitle,
      name: course.name,
      collectionId: course.collectionId,
      review: {
        rating: course.rating || 0,
        count: course.totalReviews || 0,
      },
      category: course.category,
      course_count: course.course_count,
      duration: calculateDuration(course.startDate, course.endDate),
      language: course.language || "Français",
      isCertified: course.isCertified || false,
      certification: course.certification,
      price: course.price || 0,
      apercu: course.description,
      reviews,
      teacher: teachers,
      students_enrolled: course.students_enrolled || 0,
      isCompleted: course.isCompleted || false,
      progress: course.progress || 0,
      totalReviews: course.totalReviews || 0,
      requirements: requirements.filter((r) => !["name", "email", "phonenumber", "yearJoinedUni"].includes(r.name)),
      sections: course.sections || [],
      created: new Date(course.created),
      updated: new Date(course.updated),
    };
  }

  async deleteCourse(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/api/collections/courses/records/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete course");
  }

  private reviewService = ReviewService.getInstance();

  private async getReviewsByIds(reviewIds: string[]): Promise<ReviewModel[]> {
    if (reviewIds.length === 0) return [];
    const reviews = await Promise.all(reviewIds.map((id) => this.reviewService.getReviewById(id)));
    return reviews.filter((r) => r !== null);
  }

  private async getRequirementsByIds(ids: string[]): Promise<RequirementsModel[]> {
    if (ids.length === 0) return [];
    const filter = ids.map((id) => `id='${id}'`).join("||");
    return await this.fetchCollection("requirements", undefined, filter) as RequirementsModel[];
  }

  private async getUsersByIds(ids: string[]): Promise<User[]> {
    if (ids.length === 0) return [];
    const filter = ids.map((id) => `id='${id}'`).join("||");
    const users = await this.fetchCollection("users", undefined, filter);
    return users.map((user) => ({
      id: user.id,
      name: user.name || "",
      secondname: user.secondname,
      username: user.username,
      collectionId: user.collectionId,
      email: user.email,
      emailVisibility: user.emailVisibility,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      description: user.description,
      enrolled_courses: user.enrolled_courses,
      verified: user.verified,
      created: user.created,
      updated: user.updated,
    })) as User[];
  }

  private async getSectionsByIds(ids: string[]): Promise<SectionModel[]> {
    if (ids.length === 0) return [];
    const filter = ids.map((id) => `id='${id}'`).join("||");
    const sections = await this.fetchCollection("sections", undefined, filter);
    return Promise.all(
      sections.map(async (section) => {
        const lectures = await this.getLecturesByIds(section.lectures);
        return {
          id: section.id,
          collectionId: section.collectionId,
          collectionName: section.collectionName,
          created: new Date(section.created),
          description: section.description,
          lectures,
          name: section.name,
          thumbnail: section.thumbnail || "",
          updated: new Date(section.updated),
        };
      })
    );
  }

  private async getLecturesByIds(ids: string[]): Promise<LectureModel[]> {
    if (ids.length === 0) return [];
    const filter = ids.map((id) => `id='${id}'`).join("||");
    const lectures = await this.fetchCollection("lectures", undefined, filter);
    return lectures.map((lecture) => ({
      collectionId: lecture.collectionId,
      collectionName: lecture.collectionName,
      created: lecture.created,
      description: lecture.description,
      duration: lecture.duration,
      id: lecture.id,
      name: lecture.name,
      posts: lecture.posts,
      time: lecture.time,
      updated: lecture.updated,
    })) as LectureModel[];
  }
}