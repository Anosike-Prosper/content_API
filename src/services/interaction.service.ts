import Interaction, {IInteraction } from "../models/interaction.model";
import { CreateInteractionDto } from "../controller/interaction/interaction.dto";

export class InteractionService {


  async onRecordInteraction(data: Partial<IInteraction>) {
      const {userId, articleId,interactionType} = data
  
      return await Interaction.create({userId, articleId, interactionType})
  
    }
  
  


}
