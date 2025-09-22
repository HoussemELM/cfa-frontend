import CategoryModel from "@/models/CategoryModel";
import { API_URL } from "@/utils/constants";
import PocketBase from "pocketbase";



export default class CategoryService {
  private static instance: CategoryService;
  private pb: PocketBase;

  private constructor() {
    this.pb = new PocketBase(API_URL);
  }

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async createCategory(category: Omit<CategoryModel, "id" | "created" | "updated">): Promise<CategoryModel> {
    const newCategory: CategoryModel = await this.pb.collection("category").create(category);
    return newCategory;
  }

  async getCategoryById(id: string): Promise<CategoryModel> {
    const cat = await this.pb.collection("category").getOne(id);
    const  category : CategoryModel = {...cat,created:new Date(cat.created),updated:new Date(cat.updated),name:cat.name}; 
    return category;
  }

  async getAllCategories(): Promise<CategoryModel[]> {
    const cats = await this.pb.collection("category").getFullList();
    const categories : CategoryModel[] = cats.map((category)=>{
      return {...category , created:new Date(category.created),updated:new Date(category.updated),name:category.name};

    });
    return categories
  }

  async updateCategory(id: string, category: Partial<CategoryModel>): Promise<CategoryModel> {
    const updatedCategory: CategoryModel = await this.pb.collection("category").update(id, category);
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.pb.collection("category").delete(id);
  }

  async getCategoriesByIds(categoryIds: string[]): Promise<CategoryModel[]> {
    var categories = await Promise.all(
      categoryIds.map(async (id) => {
        return await this.pb.collection("category").getOne(id);
      })
    );
    const cats : CategoryModel[] = categories.map((category)=> {
      return {...category,created:new Date(category.created),updated:new Date(category.updated),name:category.name}
    });
    return cats;
  }
}