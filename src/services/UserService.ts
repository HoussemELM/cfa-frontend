import User from "@/models/User";
import { API_URL } from "@/utils/constants";
import PocketBase from "pocketbase";

class UserService {
  private static instance: UserService;
  private pb: PocketBase;
  private collectionName = "users";

  private constructor() {
    this.pb = new PocketBase(API_URL); 
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async createUser(user: Omit<User, "id" | "created" | "updated">): Promise<User> {
    return await this.pb.collection(this.collectionName).create(user);
  }

  async getUserById(userId: string): Promise<User> {
    return await this.pb.collection(this.collectionName).getOne(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.pb.collection(this.collectionName).getFullList<User>();
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return await this.pb.collection(this.collectionName).update(userId, userData);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.pb.collection(this.collectionName).delete(userId);
  }
}

export default UserService.getInstance();
