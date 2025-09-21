import { validate } from "../../utils/validate";

export class InteractionValidator {
  constructor() {}

  createInteractionValidation = validate({
    userId: {
      notEmpty: { errorMessage: "userId is required" },
      isMongoId: { errorMessage: "userId must be a valid Mongo ID" },
    },
    articleId: {
      notEmpty: { errorMessage: "articleId is required" },
      isMongoId: { errorMessage: "articleId must be a valid Mongo ID" },
    },
    interactionType: {
      notEmpty: { errorMessage: "interactionType is required" },
      isIn: {
        options: [["view", "like"]],
        errorMessage: "interactionType must be either 'view' or 'like'",
      },
    },
  });
}
