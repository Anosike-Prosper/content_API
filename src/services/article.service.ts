import Article, {IArticle } from "../models/article.model";

export class ArticleService {
  async onCreateArticle(data: Partial<IArticle>) {
    const {title, content, author, summary} = data

    return await Article.create({title, content,author, summary})

  }



  async onGetArticleById(id: string) {
    return await Article.findById(id);
  }

   async onGetArticles(limit:number, offset:number) {
    return await Article.find().skip(offset).limit(limit);
  }
}
