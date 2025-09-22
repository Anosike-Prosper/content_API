import { Request, Response } from 'express';
import { InteractionService } from '../../services/interaction.service'
import {CreateInteractionDto} from './interaction.dto'
import { Types } from "mongoose";




export class InteractionController {
  constructor(private interactionService: InteractionService) {}

  onRecordInteraction = async (req: Request<any, any, CreateInteractionDto>, res:Response) => {

    const {userId, articleId,interactionType }= req.body

   

    if (interactionType === "like") {
        const existingLike = await this.interactionService.findLike(
          userId,
          articleId
        );

        if (existingLike) {
          return res.status(400).json({
            message: "User has already liked this article",
          });
        }
      }

       const interaction = await this.interactionService.onRecordInteraction({
        userId: new Types.ObjectId(userId),
        articleId: new Types.ObjectId(articleId),
        interactionType
    })


    return res.status(201).json({
      interaction,
      message: "success",
    });

  }

}
