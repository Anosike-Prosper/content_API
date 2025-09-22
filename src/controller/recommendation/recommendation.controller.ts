import { Request, Response } from "express";
import { RecommendationService } from "../../services/recommendation.service";



export class RecommendationController {
     constructor(private recommendationService: RecommendationService) {}
  onGetRecommendations = async (
    req: Request<{ userId: string }, any, any>,
    res: Response
  ) => {
    try {
      const { userId } = req.params;
      const recommendations = await this.recommendationService.getRecommendations(userId);

      if(!recommendations){
        return res.status(404).json({ error: "User not found" })
      }

      return res.status(200).json({
        recommendations,
        message: "success",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: err.message || "Internal Server Error",
      });
    }
  };
}
