import Interaction, {IInteraction } from "../models/interaction.model";
import { Types } from "mongoose";

export class InteractionService {


    async findLike(userId: string, articleId: string) {
    return await Interaction.findOne({
      userId: new Types.ObjectId(userId),
      articleId: new Types.ObjectId(articleId),
      interactionType: "like",
    });
  }


  async onRecordInteraction(data: Partial<IInteraction>) {
      const {userId, articleId,interactionType} = data

  
      return await Interaction.create({userId, articleId, interactionType})
  
    }
  
  


}
