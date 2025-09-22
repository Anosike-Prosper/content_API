import Article, {IArticle } from "../models/article.model";

export class ArticleService {
  async onCreateArticle(data: Partial<IArticle>) {
    const {title, content, author, summary, embedding} = data

    return await Article.create({title, content,author, summary, embedding})

  }



  async onGetArticleById(id: string) {
    return await Article.findById(id);
  }

   async onGetArticles(limit:number, offset:number) {
    return await Article.find().skip(offset).limit(limit);
  }
}
