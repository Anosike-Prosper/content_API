import { ObjectId } from "mongoose";

export interface CreateInteractionDto {
  userId: string;              
  articleId: string;          
  interactionType: "view" | "like"; 
}