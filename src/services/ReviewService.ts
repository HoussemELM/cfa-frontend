import PocketBase from "pocketbase";
import { ReviewModel } from "@/models/ReviewModel";
import { API_URL } from "@/utils/constants";
import User from "@/models/User";

export default class ReviewService {
  private static instance: ReviewService;
  private pb: PocketBase;

  private constructor() {
    this.pb = new PocketBase(API_URL);
  }

  public static getInstance(): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  async createReview(review: Omit<ReviewModel, "id" | "created" | "updated">): Promise<ReviewModel> {
    try {
      const newReview = await this.pb.collection("reviews").create(review);
      const user = await this.pb.collection("users").getOne(newReview.user);
      
      return {
        ...newReview,
        created: new Date(newReview.created),
        updated: new Date(newReview.updated),
        user: this.mapUser(user)
      } as ReviewModel;
    } catch (error) {
      throw new Error("Failed to create review");
    }
  }

  async getReviewById(id: string): Promise<ReviewModel | null> {
    try {
      if (!id) {
        throw new Error("Invalid review ID");
      }
  
      const review = await this.pb.collection("reviews").getOne(id);
      if (!review) {
        throw new Error("Review not found");
      }
  
      let user = null;
      if (review.user) {
        try {
          user = await this.pb.collection("users").getOne(review.user);
        } catch (userError) {
          console.warn("Failed to fetch user details:", userError);
        }
      }
  
      return {
        ...review,
        created: new Date(review.created),
        updated: new Date(review.updated),
        user: user ? this.mapUser(user) : null,
      } as ReviewModel;
    } catch (error) {
      console.error("Error fetching review:", error);
      return null;
    }
  }

  async getAllReviews(): Promise<ReviewModel[]> {
    try {
      const reviews = await this.pb.collection("reviews").getFullList();
      const userIds = reviews.map(review => review.user);
      
      const users = await Promise.all(
        userIds.map(userId => this.pb.collection("users").getOne(userId))
      );

      return reviews.map((review, index) => ({
        ...review,
        created: new Date(review.created),
        updated: new Date(review.updated),
        user: this.mapUser(users[index])
      })) as ReviewModel[];
    } catch (error) {
      throw new Error("Failed to fetch reviews");
    }
  }

  async updateReview(id: string, reviewData: Partial<ReviewModel>): Promise<ReviewModel> {
    try {
      const updatedReview = await this.pb.collection("reviews").update(id, reviewData);
      const user = await this.pb.collection("users").getOne(updatedReview.user);

      return {
        ...updatedReview,
        created: new Date(updatedReview.created),
        updated: new Date(updatedReview.updated),
        user: this.mapUser(user)
      } as ReviewModel;
    } catch (error) {
      throw new Error("Failed to update review");
    }
  }

  async deleteReview(id: string): Promise<void> {
    try {
      await this.pb.collection("reviews").delete(id);
    } catch (error) {
      throw new Error("Failed to delete review");
    }
  }

  async getReviewsByUserId(userId: string): Promise<ReviewModel[]> {
    try {
      const reviews = await this.pb.collection("reviews").getFullList({
        filter: `user = "${userId}"`
      });
      
      const user = await this.pb.collection("users").getOne(userId);
      
      return reviews.map(review => ({
        ...review,
        created: new Date(review.created),
        updated: new Date(review.updated),
        user: this.mapUser(user)
      })) as ReviewModel[];
    } catch (error) {
      throw new Error("Failed to fetch user reviews");
    }
  }

  async getReviewsByCourseId(courseId: string): Promise<ReviewModel[]> {
    try {
      const reviews = await this.pb.collection("reviews").getFullList({
        filter: `course = "${courseId}"`
      });
      
      const userIds = reviews.map(review => review.user);
      const users = await Promise.all(
        userIds.map(userId => this.pb.collection("users").getOne(userId))
      );

      return reviews.map((review, index) => ({
        ...review,
        created: new Date(review.created),
        updated: new Date(review.updated),
        user: this.mapUser(users[index])
      })) as ReviewModel[];
    } catch (error) {
      throw new Error("Failed to fetch course reviews");
    }
  }

  private mapUser(userData: any): User {
    return {
      id: userData.id,
      name: userData.name || "",
      secondname: userData.secondname,
      username: userData.username,
      collectionId: userData.collectionId,
      email: userData.email,
      emailVisibility: userData.emailVisibility,
      phone: userData.phone,
      avatar: userData.avatar,
      role: userData.role as "teacher" | "student" | "admin",
      description: userData.description,
      enrolled_courses: userData.enrolled_courses,
      verified: userData.verified,
      created: userData.created,
      updated: userData.updated,
    };
  }
}