import { validate } from "../../utils/validate";

export class ArticleValidator {
  constructor() {}

  
  createArticleValidation = validate({
    title: {
      notEmpty: { errorMessage: "Please provide a title" },
      isString: { errorMessage: "Title must be a string" },
      trim: true,
    },
    content: {
      notEmpty: { errorMessage: "Please provide content" },
      isString: { errorMessage: "Content must be a string" },
      trim: true,
    },
    author: {
      notEmpty: { errorMessage: "Please provide an author" },
      isString: { errorMessage: "Author must be a string" },
      trim: true,
    },
    summary: {
      optional: true,
      isString: { errorMessage: "Summary must be a string" },
      trim: true,
    },
  });



getArticleByIdValidation = validate({
    articleId: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'Please provide an article id',
      },
      isMongoId: { errorMessage: 'article id must be a valid Mongo ID' },
    },
  });

}
