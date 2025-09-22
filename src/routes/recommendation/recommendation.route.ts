import { Router } from 'express';
import { RecommendationController } from '../../controller/recommendation/recommendation.controller';
import { RecommendationService } from '../../services/recommendation.service';
import { RecommendationValidator } from '../../validation/recommendation/recommendation.validation';


export class RecommendationRoutes {
    
  public router: Router;
  public path: string;
  private controller: RecommendationController;
  private recommendationValidation: RecommendationValidator;

  constructor() {
    this.path = '/recommendations';
    this.router = Router();

    const recommendationService = new RecommendationService();
    this.controller = new RecommendationController(recommendationService);
    this.recommendationValidation = new RecommendationValidator();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/:userId`,
        this.recommendationValidation.getRecommendationsValidation,
        this.controller.onGetRecommendations,
    );

    

    

   

    

    

    
  }
}
