import { Router } from "express";
import { InteractionValidator } from "../../validation/interaction/interaction.validation";
import { InteractionController } from "../../controller/interaction/interaction.controller";
import { InteractionService } from "../../services/interaction.service";

export class InteractionRoutes {
  public router: Router;
  public path: string;
  private controller: InteractionController;
  private interactionValidation: InteractionValidator;

  constructor() {
    this.path = "/interaction";
    this.router = Router();

    const interactionService = new InteractionService();
    this.controller = new InteractionController(interactionService);
    this.interactionValidation = new InteractionValidator();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}/`,
      this.interactionValidation.createInteractionValidation,
      this.controller.onRecordInteraction
    );
  }
}
