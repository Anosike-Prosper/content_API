import { Router } from 'express';
import { ArticleController } from '../../controller/article/article.controller';
import { ArticleService } from '../../services/article.service';
import { ArticleValidator } from '../../validation/article/article.validation';

export class ArticleRoutes {
  public router: Router;
  public path: string;
  private controller: ArticleController;
  private articleValidation: ArticleValidator;

  constructor() {
    this.path = '/article';
    this.router = Router();

    const articleService = new ArticleService();
    this.controller = new ArticleController(articleService);
    this.articleValidation = new ArticleValidator();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}`,
        this.articleValidation.createArticleValidation,
        this.controller.onCreateArticle,
    );

     this.router.get(
      `${this.path}/:articleId`,
        this.articleValidation.getArticleByIdValidation,
      this.controller.onGetArticleById,
    );

    this.router.get(
      `${this.path}`,
      //   this.authValidation.onSelectAcccountValidation,
        this.controller.onGetArticles,
    );

   

    

    

    
  }
}
