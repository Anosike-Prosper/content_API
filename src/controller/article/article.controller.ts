import { Request, Response } from "express";
import { ArticleService } from "../../services/article.service";
import { PostArticleDto } from "./article.dto";
import { getPagination } from "../../utils/pagination";
import { generateEmbedding } from "../../services/embedding.service";

export class ArticleController {
  constructor(private articleService: ArticleService) {}

  onCreateArticle = async (
    req: Request<any, any, PostArticleDto>,
    res: Response
  ) => {
    const { title, content, summary, author } = req.body;

     // Generate embedding for title + summary + content
    const embedding = await generateEmbedding(`${title} ${summary ?? ""} ${content}`);


    const article = await this.articleService.onCreateArticle({
      title,
      content,
      summary,
      author,
      embedding
    });

    return res.status(201).json({
      article,
      message: "success",
    });
  };

  onGetArticleById = async (
    req: Request<{ articleId: string }, any, any>,
    res: Response
  ) => {
    const { articleId } = req.params;

    const article = await this.articleService.onGetArticleById(articleId);

    if (!article) {
      return res.status(404).json({
        message: "article not found",
      });
    }

    return res.status(200).json({
      article,
      message: "success",
    });
  };

  onGetArticles = async (
    req: Request<any, any, any, { limit: string; page: string }>,
    res: Response
  ) => {
    const { limit, offset } = getPagination(req.query);

    const article = await this.articleService.onGetArticles(limit, offset);

    return res.status(200).json({
      article,
      message: "success",
    });
  };
}
