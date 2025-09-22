import { validate } from "../../utils/validate";

export class RecommendationValidator {
  constructor() {}

getRecommendationsValidation = validate({
    userId: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'Please provide an article id',
      },
      isMongoId: { errorMessage: 'article id must be a valid Mongo ID' },
    },
  });

}
