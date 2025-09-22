import { API_URL } from "@/utils/constants";
import PocketBase from "pocketbase";
import RequestModel from "@/models/RequestModel";


export default class RequestService {
    private static instance: RequestService;
    private pb: PocketBase;
  
    private constructor() {
      this.pb = new PocketBase(API_URL);
    }
  
    public static getInstance(): RequestService {
      if (!RequestService.instance) {
        RequestService.instance = new RequestService();
      }
      return RequestService.instance;
    }
  
    public async getRequests(): Promise<RequestModel[]> {
      return await this.pb.collection("requests").getFullList<RequestModel>();
    }
  
    public async getRequestById(id: string): Promise<RequestModel> {
      return await this.pb.collection("requests").getOne<RequestModel>(id);
    }
  
    public async createRequest(
      data: Omit<RequestModel, "id" | "collectionId" | "collectionName" | "created" | "updated">
    ): Promise<RequestModel> {
      const requestData = {
        ...data,
        attachements: data.attachements || [],
      };
    
      console.log("Request Payload:", requestData);
    
      try {
        return await this.pb.collection("requests").create<RequestModel>(requestData);
      } catch (error: any) {
        console.error("PocketBase Error:", error.response || error);
        throw error;
      }
    }
    
    
  
    public async updateRequest(id: string, data: Partial<RequestModel>): Promise<RequestModel> {
      return await this.pb.collection("requests").update<RequestModel>(id, data);
    }
  
    public async deleteRequest(id: string): Promise<void> {
      await this.pb.collection("requests").delete(id);
    }
  }
  